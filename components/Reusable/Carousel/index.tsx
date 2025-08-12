import CustomTheme from '@/theme';
import React from 'react';
import {
    Animated,
    Dimensions, FlatList, StyleSheet, View, ViewStyle
} from 'react-native';
import ReusableTile from '../Reusable/Tile';

const { width } = Dimensions.get('window');

interface CarouselItemProps {
  tile: any;
  style?: ViewStyle;
}

const CarouselItem = ({ tile, style }: CarouselItemProps) => {
  const handleBrandSelection = (i: { id: string; cat: string }) => {
    // handle selection here
  };

  return (
    <ReusableTile
      style={style}
      shadowless
      handleTileSelection={() => handleBrandSelection({ id: tile.id, cat: tile.cat })}
    >
      {tile.img}
      {tile.name}
    </ReusableTile>
  );
};

interface ReusableCarouselProps {
  data: any[];
  style?: ViewStyle;
  showNav?: boolean;
  carouselItemStyle?: ViewStyle;
  shadowless?: boolean;
}

export default function ReusableCarousel({
  data,
  style,
  showNav,
  carouselItemStyle,
  shadowless,
}: ReusableCarouselProps) {
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);

  return (
    <View style={[styles.carousel, style]}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CarouselItem
            shadowless={shadowless}
            style={carouselItemStyle}
            tile={item}
          />
        )}
        horizontal
        keyExtractor={(_, index) => 'key' + index}
        pagingEnabled
        scrollEnabled
        numColumns={1}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />

      {showNav && (
        <View style={styles.navigation}>
          {data.map((_, i) => {
            const backgroundColor = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [
                CustomTheme.colors.athensGray,
                CustomTheme.colors.cornflowerBlue,
                CustomTheme.colors.athensGray,
              ],
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor,
                  },
                ]}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    paddingVertical: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    margin: 8,
  },
});
