import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import ReusableIcon from '../Reusable/Icon';

interface Props {
  rating: number;
  inverse?: boolean;
  size?: number;
  iconSpacing?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

const ReusableStarsRating: React.FC<Props> = ({
  rating,
  inverse = false,
  size = 12,
  iconSpacing = 1,
  backgroundColor = 'transparent',
  style
}) => {
  const stars = [1, 2, 3, 4, 5].map((rate, i) => {
    let iconName: string;

    if (Math.ceil(rating) === rate && rating % 1 !== 0) {
      iconName = 'star-half-full';
    } else if (rating >= rate) {
      iconName = 'star';
    } else {
      iconName = 'star-o';
    }

    return (
      <View
        key={i}
        style={[
          styles.iconWrapper,
          { marginLeft: i === 0 ? 0 : iconSpacing, backgroundColor }
        ]}
      >
        <ReusableIcon
          iconName={iconName}
          fontAwesome
          iconSize={size}
          iconColor={inverse ? 'white' : 'cornflowerBlue'}
        />
      </View>
    );
  });

  return <View style={[styles.container, style]}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconWrapper: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ReusableStarsRating;
