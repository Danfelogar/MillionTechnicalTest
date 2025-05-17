import {create} from 'zustand';
import {type StateCreator} from 'zustand';
import {CryptoState, CryptoWithoutActions} from '../store';
import {
  CryptoByIdNet,
  CryptoNetParams,
  CryptoNetRes,
  CryptoUi,
} from '../../features';
import {MockCryptoApiRes} from './cryptoApiResMock';

export const INITIAL_STATE_MOCK: CryptoWithoutActions = {
  nameFiltered: '',
  isFirstRenderOnHome: true,
  isLoading: false,
  infoDataNet: {
    start: '0',
    limit: '10',
  },
  metaDataNet: undefined,
  cryptoList: [],
  cryptoListWithFilter: [],
  singleCrypto: null,
};

export const useCryptoStateTest: StateCreator<CryptoState> = (set, get) => ({
  ...INITIAL_STATE_MOCK,
  //actions
  setIsFirstRenderOnHome: (val?: boolean) => {
    set({isFirstRenderOnHome: val ?? false});
  },
  setIsLoading: (val: boolean) => {
    set({isLoading: val});
  },
  getCryptoList: async (params: CryptoNetParams) => {
    const {
      setIsLoading,
      infoDataNet,
      cryptoList,
      setIsFirstRenderOnHome,
      setCryptoListWithFilter,
    } = get();
    setIsLoading(true);
    try {
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)]),
        ),
      );
      const {data} = await MockCryptoApiRes.get<CryptoNetRes>(
        `/tickers/?${query}`,
      );
      const {data: cryptoData, info} = data;

      set({
        cryptoList: !params.start
          ? cryptoData.map(CryptoUi.fromNetModel)
          : [...cryptoList, ...cryptoData.map(CryptoUi.fromNetModel)],
        metaDataNet: {
          coins_num: info.coins_num,
          time: info.time,
        },
        infoDataNet: {
          start: params.start ?? infoDataNet.start,
          limit: params.limit ?? infoDataNet.limit,
        },
        maxNumOfPages: Math.ceil(
          info.coins_num /
            parseInt(params.limit ?? String(infoDataNet.limit), 10),
        ),
      });
      setCryptoListWithFilter();
    } catch (error) {
      set({
        cryptoList: [],
        metaDataNet: undefined,
        infoDataNet: {
          start: '0',
          limit: '10',
        },
        maxNumOfPages: 0,
      });
      console.error('Error fetching crypto list:', error);
    } finally {
      setIsLoading(false);
      if (setIsFirstRenderOnHome) {
        setIsFirstRenderOnHome(false);
      }
    }
  },
  async getSingleCrypto(id: string) {
    const {setIsLoading, clearSingleCrypto} = get();
    setIsLoading(true);
    try {
      const {data} = await MockCryptoApiRes.get<CryptoByIdNet[]>(
        `/ticker/?id=${id}`,
      );
      const crypto = CryptoUi.fromNetModelById(data[0]);
      set({singleCrypto: crypto});
    } catch (error) {
      clearSingleCrypto();
      console.error('Error fetching single crypto:', error);
    } finally {
      setIsLoading(false);
    }
  },
  clearSingleCrypto: () => set({singleCrypto: null}),
  setFilterName: (name: string) => set({nameFiltered: name}),
  setCryptoListWithFilter: () => {
    const {cryptoList, nameFiltered} = get();

    if (!nameFiltered || nameFiltered.length === 0) {
      set({cryptoListWithFilter: cryptoList});
      return;
    } else {
      //insensitive search and filter
      const filteredList = cryptoList.filter(crypto =>
        crypto.name.toLowerCase().includes(nameFiltered.toLowerCase()),
      );
      set({cryptoListWithFilter: filteredList});
      return;
    }
  },
});

export const useCryptoStoreMock = create<CryptoState>(useCryptoStateTest);
