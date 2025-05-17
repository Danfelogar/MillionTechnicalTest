import {ActivityIndicator, Animated, StyleSheet, View} from 'react-native';
import {heightFullScreen, isIOS, ITEM_SIZE} from '../../../shared';
import {FC, useId, useRef} from 'react';
import {useCryptos} from '../hooks';
import {CryptoCard} from './CryptoCard';

interface Props {
  // Callback to clear the search filter by name
  clearFilterByName: () => void;
}

/**
 * CryptoListComponent displays a list of cryptocurrencies with scroll animations.
 * It fetches and renders the filtered list using the `useCryptos` hook.
 */
export const CryptoListComponent: FC<Props> = ({clearFilterByName}) => {
  const flatListId = useId(); // Unique key for the FlatList
  const scrollY = useRef(new Animated.Value(0)).current; // Ref to track scroll position
  const {flatListWrapper} = styles;

  // Custom hook to manage crypto list state and actions
  const {
    cryptoListWithFilter, // Filtered list of cryptocurrencies
    isLoading, // Loading indicator state
    shouldFetchMore, // Indicates if more data should be fetched
    filterByName, // Current filter text
    getCryptoList, // Fetch list of cryptos
    handleAutoFetch, // Fetch more on scroll end
  } = useCryptos();

  return (
    <Animated.FlatList
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: isIOS(), // Use native driver on iOS
      })}
      contentContainerStyle={{alignItems: 'center'}} // Center items horizontally
      style={{...flatListWrapper}} // Apply styles
      data={cryptoListWithFilter} // Data source for the list
      renderItem={({item, index}) => {
        if (!isIOS()) {
          // On Android: no animations
          return <CryptoCard item={item} />;
        }

        // Input range for scale and opacity animations
        const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1),
        ];

        // Scale animation based on scroll
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0.5],
          extrapolate: 'clamp',
        });

        // Opacity animation based on scroll
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0],
          extrapolate: 'clamp',
        });

        return <CryptoCard scale={scale} opacity={opacity} item={item} />;
      }}
      key={flatListId} // Unique key
      keyExtractor={item => item.id.toString()} // Key extractor for each item
      numColumns={1} // Single column layout
      refreshing={isLoading} // Pull-to-refresh loading state
      onRefresh={() => {
        clearFilterByName(); // Clear the current name filter
        getCryptoList({}); // Refresh crypto list
      }}
      onEndReached={handleAutoFetch} // Load more items when reaching the bottom
      showsVerticalScrollIndicator={false} // Hide scroll bar
      scrollEnabled={true}
      ListFooterComponent={
        // Show loading indicator at the bottom when more items are being fetched
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
