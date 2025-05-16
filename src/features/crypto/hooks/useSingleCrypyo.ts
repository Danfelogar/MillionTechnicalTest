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

export const useSingleCrypto = ({id}: Props) => {
  const {
    //state
    isLoading,
    singleCrypto,
    //actions
    getSingleCrypto,
    clearSingleCrypto,
  } = useCryptoState();

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

  useEffect(() => {
    if (id) {
      getSingleCrypto(id);
    }
    return () => {
      // Cleanup function
      clearSingleCrypto();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    //state
    isLoading,
    singleCrypto,
    infoDetailsConfig,
    //methods
    //actions
    clearSingleCrypto,
  };
};
