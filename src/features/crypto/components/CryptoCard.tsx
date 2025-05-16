import {FC} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  AVATAR_SIZE,
  CustomImage,
  RootStackMainParams,
  SPACING,
  widthFullScreen,
} from '../../../shared';
import {CryptoUi} from '../model';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

type NavigationProp = StackScreenProps<RootStackMainParams, 'Details'>;

interface BaseProps {
  scale?: Animated.AnimatedInterpolation<string | number>;
  opacity?: Animated.AnimatedInterpolation<string | number>;
}

interface Props extends BaseProps {
  item: CryptoUi;
}

export const CryptoCard: FC<Props> = ({opacity, scale, item}) => {
  const {wrapperCard, link, subtitle, title, imgCard, wrapperText} = styles;
  const navigation = useNavigation<NavigationProp['navigation']>();

  return (
    <Animated.View
      testID="stock-item"
      style={{
        opacity: opacity ?? 1,
        transform: [{scale: scale ?? 1}],
      }}
      renderToHardwareTextureAndroid={true}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Details', {id: item.id.toString()})}
        style={{...wrapperCard}}>
        <CustomImage
          isLocalUrl={false}
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/768px-Bitcoin.svg.png'
          }
          style={{...imgCard}}
        />
        <View style={{flex: 1}}>
          <View style={{...wrapperText}}>
            <Text numberOfLines={1} style={title}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={subtitle}>
              {item.formattedPercentChange7d}
            </Text>
          </View>
          <View style={{...wrapperText}}>
            <Text numberOfLines={1} style={subtitle}>
              {item.symbol}
            </Text>
            <Text numberOfLines={1} style={subtitle}>
              {item.formattedPercentChange24h}
            </Text>
          </View>
          <View style={{...wrapperText}}>
            <Text
              numberOfLines={1}
              style={{
                ...link,
                color: item.getIsPercentChange24hIsNegative
                  ? '#ff6464'
                  : '#50C878',
              }}>
              {/* {item.formattedPriceUSD} */}
              {item.formattedPercentChange24h}
            </Text>
            <Text numberOfLines={1} style={subtitle}>
              {item.formattedPercentChange1h}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imgCard: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  wrapperCard: {
    width: widthFullScreen * 0.9,
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'rgba(232, 237, 237, 0.8)',
    borderRadius: 12,
  },
  wrapperText: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  link: {
    fontWeight: '700',
    fontSize: 14,
    opacity: 0.8,
  },
});
