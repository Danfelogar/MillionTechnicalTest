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

// Type for navigation prop using the main root stack
type NavigationProp = StackScreenProps<RootStackMainParams, 'Details'>;

/**
 * Base animation props to control card animation on scroll or other transitions.
 */
interface BaseProps {
  scale?: Animated.AnimatedInterpolation<string | number>;
  opacity?: Animated.AnimatedInterpolation<string | number>;
}

/**
 * Props for the CryptoCard component.
 */
interface Props extends BaseProps {
  /** Item representing a cryptocurrency and its data */
  item: CryptoUi;
}

/**
 * CryptoCard Component
 *
 * Displays a summary card for a cryptocurrency including name, symbol, price change and more.
 * Includes animation support and navigates to the detail screen on press.
 *
 * @param {Props} props - Component props
 * @returns React component
 */
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
        style={wrapperCard}>
        {/* Cryptocurrency Icon */}
        <CustomImage
          isLocalUrl={false}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/768px-Bitcoin.svg.png"
          style={imgCard}
        />

        {/* Textual information */}
        <View style={{flex: 1}}>
          {/* Name and 7d percent change */}
          <View style={wrapperText}>
            <Text numberOfLines={1} style={title}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={subtitle}>
              {item.formattedPercentChange7d}
            </Text>
          </View>

          {/* Symbol and 24h percent change */}
          <View style={wrapperText}>
            <Text numberOfLines={1} style={subtitle}>
              {item.symbol}
            </Text>
            <Text numberOfLines={1} style={subtitle}>
              {item.formattedPercentChange24h}
            </Text>
          </View>

          {/* Price change colored indicator and 1h percent change */}
          <View style={wrapperText}>
            <Text
              numberOfLines={1}
              style={{
                ...link,
                color: item.getIsPercentChange24hIsNegative
                  ? '#ff6464' // Red if negative
                  : '#50C878', // Green if positive
              }}>
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

// StyleSheet for the card UI
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
