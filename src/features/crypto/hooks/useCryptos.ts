import {useEffect} from 'react';
import {useCryptoState, useDebouncedValue} from '../../../shared';
import {useForm} from 'react-hook-form';

/**
 * Custom hook for managing crypto list state and behavior.
 * It handles:
 * - Fetching the initial list
 * - Managing search/filter by name with debounce
 * - Auto-pagination (infinite scroll)
 */
export const useCryptos = () => {
  const {
    // State from global crypto store
    nameFiltered,
    isFirstRenderOnHome,
    cryptoList,
    cryptoListWithFilter,
    infoDataNet,
    metaDataNet,
    isLoading,
    // Actions from global crypto store
    getCryptoList,
    setFilterName,
    setCryptoListWithFilter,
  } = useCryptoState();

  // Fetch crypto list on first render
  useEffect(() => {
    if (isFirstRenderOnHome) {
      getCryptoList({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determines if more data should be fetched (pagination logic)
  const shouldFetchMore =
    metaDataNet?.coins_num &&
    Number(infoDataNet.start) + Number(infoDataNet.limit) <
      metaDataNet.coins_num;

  // React Hook Form setup
  const {control, watch, setValue, reset} = useForm<{filterByName: string}>({
    defaultValues: {
      filterByName: nameFiltered,
    },
  });

  // Watching user input for filtering by name
  const filterByName = watch('filterByName');

  // Clears the name filter input and resets the store
  const clearFilterByName = () => {
    setValue('filterByName', '');
    reset();
    setFilterName('');
  };

  // Debounced value of the name filter (700ms delay)
  const filterByNameDebounced = useDebouncedValue(filterByName, 700);

  // Update store name filter on input change
  useEffect(() => {
    setFilterName(filterByName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName]);

  // Filter crypto list after debounce delay
  useEffect(() => {
    setCryptoListWithFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNameDebounced]);

  // Handles auto-fetching next page of cryptos (on scroll)
  const handleAutoFetch = async () => {
    if (!shouldFetchMore) {
      return;
    }

    const nextStart = String(
      Number(infoDataNet.start) + Number(infoDataNet.limit),
    );

    getCryptoList({start: nextStart});
  };

  return {
    // State
    isFirstRenderOnHome,
    cryptoList,
    cryptoListWithFilter,
    infoDataNet,
    metaDataNet,
    isLoading,
    shouldFetchMore,
    filterByName,
    // Methods
    control,
    // Actions
    setFilterName,
    getCryptoList,
    handleAutoFetch,
    clearFilterByName,
  };
};
