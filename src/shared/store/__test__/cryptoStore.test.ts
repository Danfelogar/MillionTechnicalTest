import {act, renderHook} from '@testing-library/react-native';
import {
  CRYPTO_LIST_MOCK,
  INITIAL_STATE_MOCK,
  MOCK_API_INFO,
  SINGLE_CRYPTO_MOCK,
  useCryptoStoreMock,
} from '../../__mocks__';
import {CryptoUi} from '../../../features';

describe('Testing cryptoStore.ts', () => {
  test('should return the initial start ', () => {
    const {result} = renderHook(() => useCryptoStoreMock());

    //get the initial state from the actual hook
    const actions = {
      setIsFirstRenderOnHome: expect.any(Function),
      setIsLoading: expect.any(Function),
      getCryptoList: expect.any(Function),
      getSingleCrypto: expect.any(Function),
      clearSingleCrypto: expect.any(Function),
      setFilterName: expect.any(Function),
      setCryptoListWithFilter: expect.any(Function),
    };

    expect(result.current).toEqual({
      ...INITIAL_STATE_MOCK,
      ...actions,
    });
  });

  test('should set isLoading to true and false', () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {setIsLoading} = result.current;

    act(() => {
      setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      setIsLoading(false);
    });
    expect(result.current.isLoading).toBe(false);
  });

  test('should set isFirstRenderOnHome to true and false', () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {setIsFirstRenderOnHome} = result.current;

    act(() => {
      setIsFirstRenderOnHome(true);
    });

    expect(result.current.isFirstRenderOnHome).toBe(true);

    act(() => {
      setIsFirstRenderOnHome(false);
    });

    expect(result.current.isFirstRenderOnHome).toBe(false);
  });

  test('clearSingleCrypto should set singleCrypto to null', () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {clearSingleCrypto} = result.current;

    act(() => {
      clearSingleCrypto();
    });

    expect(result.current.singleCrypto).toBe(null);
  });

  test('setFilterName should set nameFiltered to the given value', () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {setFilterName} = result.current;

    act(() => {
      setFilterName('test');
    });

    expect(result.current.nameFiltered).toBe('test');
  });

  test('should set cryptoListWithFilter to the given value', () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {setCryptoListWithFilter} = result.current;

    act(() => {
      result.current.cryptoList = CRYPTO_LIST_MOCK.map(CryptoUi.fromNetModel);
      result.current.nameFiltered = 'Bitcoin';
    });

    act(() => {
      setCryptoListWithFilter();
    });

    expect(result.current.cryptoListWithFilter).toEqual(
      CRYPTO_LIST_MOCK.filter(crypto => {
        return crypto.name.toLowerCase().includes('bitcoin');
      }).map(CryptoUi.fromNetModel),
    );
  });

  test('successfully case should get crypto list', async () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {getCryptoList} = result.current;

    result.current.cryptoList = [];
    result.current.nameFiltered = '';

    await act(async () => {
      await getCryptoList({start: '1', limit: '10'});
    });

    expect(result.current.cryptoListWithFilter).toEqual(
      CRYPTO_LIST_MOCK.map(CryptoUi.fromNetModel),
    );
    expect(result.current.infoDataNet).toEqual({
      start: '1',
      limit: '10',
    });
    expect(result.current.maxNumOfPages).toEqual(
      Math.ceil(MOCK_API_INFO.coins_num / parseInt('10', 10)),
    );
  });

  test('error case should get crypto list', async () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {getCryptoList} = result.current;

    await act(async () => {
      await getCryptoList({start: '999', limit: '10'});
    });

    expect(result.current.cryptoList).toEqual([]);
    expect(result.current.infoDataNet).toEqual({
      start: '0',
      limit: '10',
    });
  });

  test('successfully case should get single crypto', async () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {getSingleCrypto} = result.current;

    await act(async () => {
      await getSingleCrypto('1');
    });

    expect(result.current.singleCrypto).toEqual(
      SINGLE_CRYPTO_MOCK.map(CryptoUi.fromNetModelById)[0],
    );
  });

  test('error case should get single crypto', async () => {
    const {result} = renderHook(() => useCryptoStoreMock());
    const {getSingleCrypto} = result.current;

    await act(async () => {
      await getSingleCrypto('999');
    });

    expect(result.current.singleCrypto).toBe(null);
  });
});
