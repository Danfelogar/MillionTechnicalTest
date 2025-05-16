import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {ButtonGenericProps} from '../interfaces';

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
