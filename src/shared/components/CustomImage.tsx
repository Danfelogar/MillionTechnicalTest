import {FC, useState} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {CustomImageProps} from '../interfaces/customImageProps';
import {AppImages} from '../assets';

/**
 * CustomImage component
 *
 * Displays an image with support for:
 * - Local or remote image sources
 * - Fallback image on loading error
 * - Custom styles and additional Image props
 *
 * @param src - The image source, either a local resource or remote URI string
 * @param isLocalUrl - Flag indicating if `src` is a local resource (default: false)
 * @param defaultErrorImage - Image to show if loading fails (default: AppImages.notFound)
 * @param style - Style object for the image component
 * @param props - Additional Image props
 * @returns JSX.Element rendering the image with error handling
 */
export const CustomImage: FC<CustomImageProps> = ({
  src,
  isLocalUrl = false,
  defaultErrorImage = AppImages.notFound,
  style,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  const getImageSource = (): ImageSourcePropType => {
    if (hasError) {
      return defaultErrorImage;
    }

    if (isLocalUrl) {
      return (src as ImageSourcePropType) || AppImages.loading;
    }

    // Properly format remote URI source
    return typeof src === 'string' ? {uri: src} : defaultErrorImage;
  };

  return (
    <Image
      resizeMethod="none"
      onLoad={() => setHasError(false)}
      source={getImageSource()}
      onError={handleError}
      style={[style]}
      {...props}
    />
  );
};
