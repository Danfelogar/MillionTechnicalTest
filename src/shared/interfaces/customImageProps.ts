import {ImageProps} from 'react-native';
import {AppImages} from '../assets';

export interface CustomImageProps extends Omit<ImageProps, 'source'> {
  src: keyof typeof AppImages | string;
  isLocalUrl?: boolean;
  defaultErrorImage?: string;
}
