import {StyleSheet, View} from 'react-native';
import Icon from '@react-native-vector-icons/evil-icons';

import {
  AppImages,
  BrandWrapper,
  CustomImage,
  heightFullScreen,
  InputGeneric,
  widthFullScreen,
} from '../../../shared';
import {useCryptos} from '../hooks';
import {CryptoListComponent} from '../components';

export const HomeScreen = () => {
  const {
    container,
    scrollWrapper,
    imgFullLogo,
    inputStyles,
    loadingImg,
    contenteList,
  } = styles;
  const {
    //state
    cryptoListWithFilter,
    //methods
    control,
    //actions
    clearFilterByName,
  } = useCryptos();

  return (
    <BrandWrapper>
      <View style={container}>
        <View style={scrollWrapper}>
          <CustomImage
            isLocalUrl
            src={AppImages.logoTitle}
            style={{
              ...imgFullLogo,
            }}
          />
          <InputGeneric
            control={control}
            borderColor={'#00000061'}
            firstIcon={
              <Icon
                name="search"
                size={widthFullScreen * 0.08}
                color={'#00000061'}
              />
            }
            name={'filterByName'}
            inputStyle={inputStyles}
            placeholder="Filter by name..."
            keyboardType="default"
            placeholderTextColor={'#00000061'}
            inputColor={'#000000'}
            autoCorrect={false}
          />
          <View
            style={{
              ...contenteList,
            }}>
            {cryptoListWithFilter.length === 0 ? (
              <CustomImage
                isLocalUrl
                src={AppImages.loading}
                style={{
                  ...loadingImg,
                }}
              />
            ) : (
              <CryptoListComponent clearFilterByName={clearFilterByName} />
            )}
          </View>
        </View>
      </View>
    </BrandWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: widthFullScreen * 0.05,
  },
  scrollWrapper: {
    flex: 1,
    paddingHorizontal: widthFullScreen * (0.025 * 2),
  },
  imgFullLogo: {
    width: widthFullScreen * 0.9,
    height: widthFullScreen * 0.22,
    resizeMode: 'cover',
    marginBottom: widthFullScreen * 0.025,
  },
  inputStyles: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: widthFullScreen * 0.9,
    height: heightFullScreen * 0.065,
    marginBottom: widthFullScreen * 0.05,
  },
  loadingImg: {
    width: widthFullScreen * 0.9,
    height: widthFullScreen * 0.9,
    margin: 'auto',
    resizeMode: 'contain',
  },
  contenteList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
