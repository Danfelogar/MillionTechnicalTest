import {useEffect} from 'react';
import {useCryptoState, useDebouncedValue} from '../../../shared';
import {useForm} from 'react-hook-form';

export const useCryptos = () => {
  const {
    //state
    nameFiltered,
    isFirstRenderOnHome,
    cryptoList,
    cryptoListWithFilter,
    infoDataNet,
    metaDataNet,
    isLoading,
    //actions
    getCryptoList,
    setFilterName,
    setCryptoListWithFilter,
  } = useCryptoState();

  useEffect(() => {
    if (isFirstRenderOnHome) {
      getCryptoList({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const shouldFetchMore =
    metaDataNet?.coins_num &&
    Number(infoDataNet.start) + Number(infoDataNet.limit) <
      metaDataNet.coins_num;

  const {control, watch, setValue, reset} = useForm<{filterByName: string}>({
    defaultValues: {
      filterByName: nameFiltered,
    },
  });
  const filterByName = watch('filterByName');
  const clearFilterByName = () => {
    setValue('filterByName', '');
    reset();
    setFilterName('');
  };
  const filterByNameDebounced = useDebouncedValue(filterByName, 700);

  useEffect(() => {
    setFilterName(filterByName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName]);

  useEffect(() => {
    setCryptoListWithFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNameDebounced]);

  const handleAutoFetch = async () => {
    if (!shouldFetchMore) {
      return;
    }

    const nextStart = String(
      Number(infoDataNet.start) + Number(infoDataNet.limit),
    );

    getCryptoList({
      start: nextStart,
    });
  };

  return {
    //state
    isFirstRenderOnHome,
    cryptoList,
    cryptoListWithFilter,
    infoDataNet,
    metaDataNet,
    isLoading,
    shouldFetchMore,
    filterByName,
    //methods
    control,
    //actions
    setFilterName,
    getCryptoList,
    handleAutoFetch,
    clearFilterByName,
  };
};
