import {create} from 'zustand';
import {CryptoState, CryptoWithoutActions} from './interface';
import {
  CryptoNetParams,
  CryptoServices,
  CryptoUi,
  GetCryptoById,
  GetCryptoList,
} from '../../features';

const INITIAL_STATE: CryptoWithoutActions = {
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

export const useCryptoState = create<CryptoState>((set, get) => ({
  ...INITIAL_STATE,

  /**
   * Sets the flag indicating whether the home screen is being rendered for the first time.
   * @param val Optional boolean value; defaults to false if undefined.
   */
  setIsFirstRenderOnHome: (val?: boolean) => {
    set({isFirstRenderOnHome: val ?? false});
  },

  /**
   * Toggles the loading state of the crypto data.
   * @param val Boolean indicating loading status.
   */
  setIsLoading: (val: boolean) => {
    set({isLoading: val});
  },

  /**
   * Fetches a list of cryptocurrencies from the API based on provided parameters.
   * Updates the crypto list state, pagination info, and applies any active filters.
   * @param params Object with 'start' and 'limit' to control pagination.
   */
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
      const apiService = new CryptoServices();
      const res = await new GetCryptoList(apiService).execute({
        start: params.start,
        limit: params.limit,
      });

      const {data, info} = res;

      set({
        cryptoList: !params.start
          ? data.map(CryptoUi.fromNetModel)
          : [...cryptoList, ...data.map(CryptoUi.fromNetModel)],
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
      // Reset state in case of error
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

  /**
   * Fetches detailed data of a single cryptocurrency by its ID.
   * Sets the singleCrypto state or clears it on error.
   * @param id The unique identifier of the cryptocurrency.
   */
  async getSingleCrypto(id: string) {
    const {setIsLoading, clearSingleCrypto} = get();
    setIsLoading(true);
    try {
      const apiService = new CryptoServices();
      const res = await new GetCryptoById(apiService).execute(id);
      const crypto = CryptoUi.fromNetModelById(res[0]);
      set({singleCrypto: crypto});
    } catch (error) {
      console.error('Error fetching single crypto:', error);
      clearSingleCrypto();
    } finally {
      setIsLoading(false);
    }
  },

  /**
   * Clears the single cryptocurrency state.
   */
  clearSingleCrypto: () => set({singleCrypto: null}),

  /**
   * Sets the name filter string used to filter the crypto list.
   * @param name Filter string to match cryptocurrency names.
   */
  setFilterName: (name: string) => set({nameFiltered: name}),

  /**
   * Filters the cryptoList by the current nameFiltered string.
   * The filter is case-insensitive.
   * Updates the cryptoListWithFilter state accordingly.
   */
  setCryptoListWithFilter: () => {
    const {cryptoList, nameFiltered} = get();

    if (!nameFiltered || nameFiltered.length === 0) {
      set({cryptoListWithFilter: cryptoList});
      return;
    } else {
      // Case-insensitive filtering of crypto list by name
      const filteredList = cryptoList.filter(crypto =>
        crypto.name.toLowerCase().includes(nameFiltered.toLowerCase()),
      );
      set({cryptoListWithFilter: filteredList});
      return;
    }
  },
}));
