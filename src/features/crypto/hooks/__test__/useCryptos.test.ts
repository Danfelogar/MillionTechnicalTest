import {useCryptos} from '../useCryptos';
import {
  act,
  renderHook,
  useCryptoState,
  useDebouncedValue,
} from '../../../../shared';

import {useForm} from 'react-hook-form';

// Mock the external dependencies
jest.mock('../../../../shared/store', () => ({
  useCryptoState: jest.fn(),
}));

jest.mock('../../../../shared/hooks', () => ({
  useDebouncedValue: jest.fn(value => value), // Skip debounce for testing
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('Testing useCryptos.ts', () => {
  const mockGetCryptoList = jest.fn();
  const mockSetFilterName = jest.fn();
  const mockSetCryptoListWithFilter = jest.fn();

  const defaultState = {
    nameFiltered: '',
    isFirstRenderOnHome: true,
    cryptoList: [],
    cryptoListWithFilter: [],
    infoDataNet: {start: '0', limit: '10'},
    metaDataNet: {coins_num: 100},
    isLoading: false,
    getCryptoList: mockGetCryptoList,
    setFilterName: mockSetFilterName,
    setCryptoListWithFilter: mockSetCryptoListWithFilter,
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementations
    (useCryptoState as unknown as jest.Mock).mockReturnValue(defaultState);
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      watch: jest.fn().mockReturnValue(''),
      setValue: jest.fn(),
      reset: jest.fn(),
    });
  });

  test('should fetch crypto list on first render', () => {
    renderHook(() => useCryptos());

    expect(mockGetCryptoList).toHaveBeenCalledTimes(1);
    expect(mockGetCryptoList).toHaveBeenCalledWith({});
  });

  test('should not fetch crypto list on subsequent renders', () => {
    (useCryptoState as unknown as jest.Mock).mockReturnValue({
      ...defaultState,
      isFirstRenderOnHome: false,
    });

    renderHook(() => useCryptos());

    // Verify that getCryptoList was not called
    expect(mockGetCryptoList).not.toHaveBeenCalled();
  });

  test('should update filter name when filterByName changes', () => {
    const mockWatch = jest.fn().mockReturnValue('bitcoin');
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      watch: mockWatch,
      setValue: jest.fn(),
      reset: jest.fn(),
    });

    renderHook(() => useCryptos());

    // Verify that setFilterName was called with the new value
    expect(mockSetFilterName).toHaveBeenCalledWith('bitcoin');
  });

  test('should update crypto list with filter when debounced filter changes', () => {
    // Mock the debounced value to simulate a change
    (useDebouncedValue as jest.Mock).mockImplementation(value => value);

    const mockWatch = jest.fn().mockReturnValue('eth');
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      watch: mockWatch,
      setValue: jest.fn(),
      reset: jest.fn(),
    });

    renderHook(() => useCryptos());

    // Verify that setCryptoListWithFilter was called
    expect(mockSetCryptoListWithFilter).toHaveBeenCalled();
  });

  test('should clear filter name when clearFilterByName is called', () => {
    const mockSetValue = jest.fn();
    const mockReset = jest.fn();
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      watch: jest.fn().mockReturnValue(''),
      setValue: mockSetValue,
      reset: mockReset,
    });

    const {result} = renderHook(() => useCryptos());

    act(() => {
      result.current.clearFilterByName();
    });

    // Verify that form was reset and filter was cleared
    expect(mockSetValue).toHaveBeenCalledWith('filterByName', '');
    expect(mockReset).toHaveBeenCalled();
    expect(mockSetFilterName).toHaveBeenCalledWith('');
  });

  test('should calculate shouldFetchMore correctly when more data is available', () => {
    const {result} = renderHook(() => useCryptos());

    // With default state (start: 0, limit: 10, coins_num: 100)
    expect(result.current.shouldFetchMore).toBe(true);
  });

  test('should calculate shouldFetchMore correctly when no more data is available', () => {
    (useCryptoState as unknown as jest.Mock).mockReturnValue({
      ...defaultState,
      infoDataNet: {start: '90', limit: '10'},
      metaDataNet: {coins_num: 100},
    });

    const {result} = renderHook(() => useCryptos());

    // 90 + 10 = 100, which equals coins_num (100)
    expect(result.current.shouldFetchMore).toBe(false);
  });

  test('should fetch more data when handleAutoFetch is called and shouldFetchMore is true', () => {
    const {result} = renderHook(() => useCryptos());

    act(() => {
      result.current.handleAutoFetch();
    });

    // Verify that getCryptoList was called with the next start value
    expect(mockGetCryptoList).toHaveBeenCalledWith({start: '10'});
  });
});
