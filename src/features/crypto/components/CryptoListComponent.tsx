import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {heightFullScreen, isIOS, ITEM_SIZE} from '../../../shared';
import {FC, useId, useRef} from 'react';
import {useCryptos} from '../hooks';
import {CryptoCard} from './CryptoCard';

interface Props {
  clearFilterByName: () => void;
}

export const CryptoListComponent: FC<Props> = ({clearFilterByName}) => {
  const flatListId = useId();
  const scrollY = useRef(new Animated.Value(0)).current;
  const {flatListWrapper} = styles;

  const {
    cryptoListWithFilter,
    isLoading,
    shouldFetchMore,
    filterByName,
    //methods
    //actions
    getCryptoList,
    handleAutoFetch,
  } = useCryptos();

  return (
    <Animated.FlatList
      testID="home-screen"
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: isIOS(),
      })}
      contentContainerStyle={{alignItems: 'center'}}
      style={{...flatListWrapper}}
      data={cryptoListWithFilter}
      renderItem={({item, index}) => {
        if (!isIOS()) {
          return <CryptoCard item={item} />;
        }
        const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1),
        ];

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0.5],
          extrapolate: 'clamp',
        });
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0],
          extrapolate: 'clamp',
        });

        return <CryptoCard scale={scale} opacity={opacity} item={item} />;
      }}
      key={flatListId}
      keyExtractor={item => item.id.toString()}
      numColumns={1}
      refreshing={isLoading}
      onRefresh={() => {
        clearFilterByName();
        getCryptoList({});
      }}
      onEndReached={handleAutoFetch}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      ListFooterComponent={
        shouldFetchMore && filterByName.length !== 0 ? (
          <View style={{padding: 20}}>
            <ActivityIndicator size="large" color="#2196F3" />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  flatListWrapper: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: heightFullScreen * 0.045,
  },
});
