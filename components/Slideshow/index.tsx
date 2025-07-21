import { useRef } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import SlideItem from './SlideItem';

const SLIDES = [
  'Test-driving sells cars',
  'Convenience at your fingertips',
  'Find your dream car today',
];

const { width } = Dimensions.get('window');

export default function Slideshow({ style }: { style?: any }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const position = Animated.divide(scrollX, width);

  return (
    <View style={[style, { backgroundColor: '#000' }]}>
      <FlatList
        data={SLIDES}
        renderItem={({ item }) => <SlideItem title={item} />}
        keyExtractor={(_, i) => `slide-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <View style={styles.pagination}>
        {SLIDES.map((_, i) => {
          const backgroundColor = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: ['#ddd', '#5A89EA', '#ddd'],
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { backgroundColor }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    margin: 8,
  },
});
