import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {ButtonGenericProps} from '../interfaces';

/**
 * ButtonGeneric component
 *
 * A customizable button component that supports:
 * - Custom styling
 * - Loading state with an activity spinner
 * - Optional icons before and after the text content
 *
 * @param buttonStyle - Style object for the button container
 * @param activeOpacity - Opacity of the button when pressed (default: 0.5)
 * @param onPress - Callback function to handle button press
 * @param firstIcon - Optional React element to render before the text
 * @param textContent - Text or React element content displayed inside the button
 * @param lastIcon - Optional React element to render after the text
 * @param isLoading - Boolean to show loading spinner instead of content (default: false)
 * @param colorSpinierLoading - Color of the loading spinner (default: '#6A5691')
 * @returns JSX.Element rendering the button
 */
export function ButtonGeneric({
  buttonStyle,
  activeOpacity,
  onPress,
  firstIcon,
  textContent,
  lastIcon,
  isLoading = false,
  colorSpinierLoading,
}: ButtonGenericProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={activeOpacity || 0.5}
      onPress={onPress}
      style={{...buttonStyle}}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colorSpinierLoading ? colorSpinierLoading : '#6A5691'}
        />
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {firstIcon && firstIcon}
          {textContent && textContent}
          {lastIcon && lastIcon}
        </View>
      )}
    </TouchableOpacity>
  );
}
