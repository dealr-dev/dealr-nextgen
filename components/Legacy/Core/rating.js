import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReusableStarsRating from '../Reusable/Rating';

const Rating = ({ vehicle, size, iconSpacing, space = 12, hideValue }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.ratingContainer, { paddingRight: space }]}>
        <ReusableStarsRating
          style={styles.starStyle}
          size={size}
          iconSpacing={iconSpacing}
          rating={vehicle?.rating}
        />
      </View>
      {!hideValue && <Text style={styles.ratingValue}>{vehicle?.rating}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  ratingValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#6F7889',
    paddingTop: 3,
  },
  starStyle: {
    backgroundColor: 'transparent',
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Rating;
