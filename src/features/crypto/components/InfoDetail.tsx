import {StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import {widthFullScreen} from '../../../shared';

interface Props {
  // Main title text
  title: string;

  // First subtitle text (required)
  subTitle: string;

  // Optional second subtitle text
  secondSubTitle?: string;
}

/**
 * InfoDetail is a simple informational component that displays
 * a title, a subtitle, an optional second subtitle, and a horizontal line.
 */
const InfoDetail: FC<Props> = ({subTitle, title, secondSubTitle}) => {
  const {container, firstText, secondText, thirdText, line} = styles;

  return (
    <View style={{...container}}>
      {/* Title text */}
      <Text style={{...firstText}} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      {/* Subtitle text */}
      <Text style={{...secondText}} numberOfLines={1} ellipsizeMode="tail">
        {subTitle}
      </Text>

      {/* Optional second subtitle text */}
      {secondSubTitle && (
        <Text style={{...thirdText}} numberOfLines={1} ellipsizeMode="tail">
          {secondSubTitle}
        </Text>
      )}

      {/* Horizontal line separator */}
      <View style={{...line}} />
    </View>
  );
};

export default InfoDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: widthFullScreen * 0.025,
  },
  firstText: {
    color: '#081F32',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: widthFullScreen * 0.008,
  },
  secondText: {
    color: '#6E798C',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginBottom: widthFullScreen * 0.009,
  },
  thirdText: {
    color: '#8E8E93',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  line: {
    marginTop: widthFullScreen * 0.03,
    marginBottom: widthFullScreen * 0.05,
    width: '95%',
    height: 1,
    backgroundColor: '#F2F2F7',
  },
});
