import {CryptoNetParams, CryptoUi} from '../../../features';

export interface CryptoState {
  //state
  nameFiltered: string;
  isFirstRenderOnHome: boolean;
  isLoading: boolean;
  infoDataNet: CryptoNetParams;
  metaDataNet?: {
    coins_num: number;
    time: number;
  } | null;
  maxNumOfPages?: number;
  cryptoList: CryptoUi[];
  cryptoListWithFilter: CryptoUi[];
  singleCrypto?: CryptoUi | null;
  //action
  setIsFirstRenderOnHome: (isFirstRenderOnHome?: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  getCryptoList: (params: CryptoNetParams) => void;
  getSingleCrypto: (id: string) => void;
  clearSingleCrypto: () => void;
  setFilterName: (name: string) => void;
  setCryptoListWithFilter: () => void;
}

export interface CryptoWithoutActions
  extends Omit<
    CryptoState,
    | 'setIsFirstRenderOnHome'
    | 'setIsLoading'
    | 'getCryptoList'
    | 'getSingleCrypto'
    | 'clearSingleCrypto'
    | 'setFilterName'
    | 'setCryptoListWithFilter'
  > {}
