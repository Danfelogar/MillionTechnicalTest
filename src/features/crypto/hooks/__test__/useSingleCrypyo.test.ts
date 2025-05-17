import {renderHook, useCryptoState} from '../../../../shared';
import {useSingleCrypto} from '../useSingleCrypyo';

// Mock the useCryptoState hook
jest.mock('../../../../shared/store/crytoStore', () => ({
  useCryptoState: jest.fn(),
}));

describe('testing useSingleCrypyo.ts', () => {
  const getSingleCrypto = jest.fn();
  const clearSingleCrypto = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCryptoState as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      singleCrypto: null,
      getSingleCrypto,
      clearSingleCrypto,
    });
  });

  test('should call getSingleCrypto with the given id on mount', () => {
    renderHook(() => useSingleCrypto({id: '1'}));
    expect(getSingleCrypto).toHaveBeenCalledWith('1');
  });

  test('should call clearSingleCrypto on unmount', () => {
    const {unmount} = renderHook(() => useSingleCrypto({id: '1'}));
    unmount();
    expect(clearSingleCrypto).toHaveBeenCalled();
  });
});
