import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomTheme from '../../../../theme';
import ReusableIcon from '../Reusable/Icon';

interface FavoriteProps {
  id: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
}

const Favorite: React.FC<FavoriteProps> = ({ id, isFavorite, onToggle }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.tile,
          {
            backgroundColor: isFavorite
              ? CustomTheme.colors.brightSun
              : CustomTheme.colors.mineShaft,
          },
        ]}
        onPress={() => onToggle(id)}
        activeOpacity={0.7}
      >
        <ReusableIcon
          iconName="heart"
          iconSize={18}
          iconColor={
            isFavorite ? CustomTheme.colors.mineShaft : 'white'
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 318,
    top: 11.41,
    height: 36,
    width: 36,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  tile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default Favorite;
