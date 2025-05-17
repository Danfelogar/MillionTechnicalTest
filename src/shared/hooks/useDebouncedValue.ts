import {useState, useEffect} from 'react';

/**
 * useDebouncedValue hook
 *
 * Returns a debounced version of the input value that updates only after
 * a specified delay (time) has passed without changes.
 *
 * Useful for limiting the rate of expensive operations such as API calls
 * or input validation triggered by rapidly changing values.
 *
 * @param input - The value to debounce (default is an empty string)
 * @param time - The debounce delay in milliseconds (default is 500ms)
 * @returns The debounced value that updates after the delay
 */
export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return debouncedValue;
};
