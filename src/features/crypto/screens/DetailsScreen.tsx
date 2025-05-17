import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import {
  BrandWrapper,
  ButtonGeneric,
  CustomImage,
  heightFullScreen,
  RootStackMainParams,
  widthFullScreen,
} from '../../../shared';
import {StackScreenProps} from '@react-navigation/stack';
import InfoDetail from '../components/InfoDetail';
import {useSingleCrypto} from '../hooks';

interface Props extends StackScreenProps<RootStackMainParams, 'Details'> {}

/**
 * Screen component to display detailed information about a single cryptocurrency.
 *
 * @param route - Navigation route object containing parameters, including the crypto id.
 * @param navigation - Navigation object to handle navigation actions.
 * @returns JSX.Element rendering the details screen.
 */
export const DetailsScreen = ({route, navigation}: Props) => {
  const {
    container,
    textGoBack,
    btnGoBack,
    wrapperGoBack,
    circleMainImg,
    textName,
    textDescription,
  } = styles;

  // Extract the cryptocurrency ID from route parameters
  const {id} = route.params;

  // Hook to fetch and manage the single crypto state and actions
  const {
    // State variables
    isLoading,
    singleCrypto,
    infoDetailsConfig,
    // Methods (none currently)
    // Actions
    clearSingleCrypto,
  } = useSingleCrypto({id});

  return (
    <BrandWrapper isDetails>
      {/* Show loading indicator while data is being fetched */}
      {isLoading && (
        <View style={{...container}}>
          <ActivityIndicator
            size="large"
            color="#2196F3"
            style={{margin: 'auto'}}
          />
        </View>
      )}

      {/* Show crypto details once loaded */}
      {singleCrypto && (
        <View style={{...container}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            <View style={{paddingHorizontal: widthFullScreen * (0.025 * 2)}}>
              <ButtonGeneric
                buttonStyle={btnGoBack}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.goBack();
                  clearSingleCrypto();
                }}
                firstIcon={
                  <Icon
                    iconStyle="solid"
                    name="arrow-left"
                    size={widthFullScreen * 0.06}
                    color={'#000000'}
                  />
                }
                textContent={
                  <View style={{...wrapperGoBack}}>
                    <Text style={{...textGoBack}}>go back</Text>
                  </View>
                }
              />

              <CustomImage
                isLocalUrl={false}
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/768px-Bitcoin.svg.png'
                }
                style={{...circleMainImg}}
              />

              <Text style={{...textName}}>{singleCrypto?.name}</Text>
              <Text style={{...textDescription}}>Informations</Text>

              {/* Map over crypto info details configuration and render each detail */}
              {infoDetailsConfig.map(({title, key, format}) => (
                <InfoDetail
                  key={key}
                  title={title}
                  subTitle={
                    format
                      ? String(format(singleCrypto[key] ?? ''))
                      : String(singleCrypto[key] ?? '')
                  }
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </BrandWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: widthFullScreen * (0.025 * 2),

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btnGoBack: {
    width: widthFullScreen * 0.35,
    height: heightFullScreen * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperGoBack: {
    flex: 1,
  },
  textGoBack: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: widthFullScreen * 0.02,
    textTransform: 'uppercase',
  },
  circleMainImg: {
    marginVertical: widthFullScreen * 0.03,
    marginHorizontal: 'auto',
    width: widthFullScreen * 0.5,
    height: widthFullScreen * 0.5,
    borderRadius: (widthFullScreen * 0.5) / 2,
    borderColor: '#F2F2F7',
    borderWidth: 5,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    color: '#081F32',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0,
    marginTop: widthFullScreen * 0.03,
    marginHorizontal: 'auto',
  },
  textDescription: {
    color: '#8E8E93',
    fontWeight: '500',
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlignVertical: 'center',
    marginTop: widthFullScreen * 0.08,
    marginBottom: widthFullScreen * 0.06,
    includeFontPadding: false,
  },
});
