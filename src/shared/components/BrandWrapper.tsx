import {StyleSheet, View} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import React, {ReactNode} from 'react';
import {Shadow} from 'react-native-shadow-2';
import {StandardWrapper} from './StandardWrapper';
import {CustomImage} from './CustomImage';
import {AppImages} from '../assets';
import {isIOS, widthFullScreen} from '../utils';

/**
 * BrandWrapper component
 *
 * This component wraps its children within a styled container featuring
 * a header with a logo and an optional Bitcoin icon.
 * The layout and visibility of certain elements adjust based on the `isDetails` prop.
 *
 * @param children - ReactNode elements to be wrapped inside this component
 * @param isDetails - Flag to adjust layout and visibility for detailed views (default: false)
 * @returns JSX.Element rendering the branded wrapper layout
 */
export const BrandWrapper = ({
  children,
  isDetails = false,
}: {
  children: ReactNode;
  isDetails?: boolean;
}): React.JSX.Element => {
  const {container, header, logoImg} = styles;

  return (
    <StandardWrapper>
      <View style={{...container}}>
        <Shadow
          distance={10}
          startColor={'#0000001A'}
          offset={[-1, isIOS() ? 2 : -3]}>
          <View
            style={{
              ...header,
              justifyContent: isDetails ? 'flex-start' : 'space-between',
            }}>
            <CustomImage
              src={AppImages.bitCoinLogo}
              isLocalUrl
              style={{...logoImg}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                display: isDetails ? 'none' : 'flex',
              }}>
              <Icon
                iconStyle="solid"
                name="bitcoin-sign"
                size={widthFullScreen * 0.065}
                color="#0000008A"
              />
            </View>
          </View>
        </Shadow>
        {children}
      </View>
    </StandardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: widthFullScreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthFullScreen * (0.025 * 2),
    paddingVertical: widthFullScreen * (0.025 / 2),
    backgroundColor: '#fff',
  },
  logoImg: {
    width: widthFullScreen * 0.14,
    height: widthFullScreen * 0.14,
    resizeMode: 'contain',
  },
  footer: {
    width: widthFullScreen,
  },
});
