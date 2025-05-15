import {CryptoNet} from './CryptoNet';

export interface CryptoByIdNet extends Omit<CryptoNet, 'volume24a'> {
  volume24_native: number;
}

export interface CryptoByIdRes {
  data: CryptoByIdNet[];
}
