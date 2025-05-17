import {act, renderHook} from '@testing-library/react-native';
import {useDebouncedValue} from '../useDebouncedValue';

describe('testing useDebouncedValue.ts', () => {
  beforeEach(() => {
    // Use fake timers to control time flow
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return the initial value immediately', () => {
    const {result} = renderHook(() => useDebouncedValue('hello', 500));

    expect(result.current).toBe('hello');
  });

  it('should update the value after the debounce time', () => {
    const {result, rerender} = renderHook(
      ({value}) => useDebouncedValue(value, 500),
      {initialProps: {value: 'hello'}},
    );

    // Change the input value
    rerender({value: 'hello world'});
    // Before time passes, value should remain unchanged
    expect(result.current).toBe('hello');

    // Advance the simulated time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now it should reflect the updated value
    expect(result.current).toBe('hello world');
  });

  it('should reset the timer if input changes before it expires', () => {
    const {result, rerender} = renderHook(
      ({value}) => useDebouncedValue(value, 500),
      {initialProps: {value: 'a'}},
    );

    // Change before 500ms have passed
    rerender({value: 'ab'});
    act(() => {
      jest.advanceTimersByTime(300); // still not 500ms
    });

    // Value should remain the same
    expect(result.current).toBe('a');

    // Change again and advance full debounce time
    rerender({value: 'abc'});
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now it should reflect the final value
    expect(result.current).toBe('abc');
  });
});
