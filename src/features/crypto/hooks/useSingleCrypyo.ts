import {useEffect} from 'react';
import {useCryptoState} from '../../../shared';
import {CryptoUi} from '../model';

interface InfoDetailConfig {
  title: string;
  key: keyof CryptoUi;
  format?: (value: any) => string;
}

interface Props {
  id: string;
}

/**
 * Custom hook to manage the state and logic for a single cryptocurrency detail.
 *
 * @param id - The unique identifier of the cryptocurrency to fetch.
 * @returns An object containing loading state, crypto details, config, and actions.
 */
export const useSingleCrypto = ({id}: Props) => {
  const {
    // State from global crypto store
    isLoading,
    singleCrypto,
    // Actions from global crypto store
    getSingleCrypto,
    clearSingleCrypto,
  } = useCryptoState();

  // Configuration for displaying info details of the crypto,
  // with optional formatting functions.
  const infoDetailsConfig: InfoDetailConfig[] = [
    {title: 'Symbol', key: 'symbol'},
    {title: 'Name ID', key: 'nameid'},
    {title: 'Ranking', key: 'rank', format: value => `# ${value}`},
    {title: 'Price in USD', key: 'formattedPriceUSD'},
    {title: 'Percent Change 7d', key: 'formattedPercentChange7d'},
    {title: 'Percent Change 24h', key: 'formattedPercentChange24h'},
    {title: 'Percent Change 1h', key: 'formattedPercentChange1h'},
    {title: 'Price in BTC', key: 'formattedPriceBTC'},
    {title: 'Market Cap USD', key: 'formattedMarketCapUSD'},
    {title: 'Volume 24h', key: 'formattedVolume24'},
    {title: 'Volume Native 24h', key: 'formattedVolume24a'},
    {title: 'csupply', key: 'csupply'},
    {title: 'tsupply', key: 'tsupply'},
    {title: 'msupply', key: 'msupply'},
  ];

  // Fetch crypto details when id changes; clear details on unmount
  useEffect(() => {
    if (id) {
      getSingleCrypto(id);
    }
    return () => {
      clearSingleCrypto();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    // State
    isLoading,
    singleCrypto,
    infoDetailsConfig,
    // Methods (none currently)
    // Actions
    clearSingleCrypto,
  };
};
