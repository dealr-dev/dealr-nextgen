import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ReusableIcon from '../Reusable/Icon';
import ReusableImage from '../Reusable/Image';

const commonStyle = { height: '100%', width: '100%' };

const CardBanner = ({ logo, vehicle, onCardSelect, isCurrentUser, onFav, isFav }) => {
  return (
    <TouchableOpacity style={styles.cardBannerContainer} onPress={() => onCardSelect('more')}>
      <View style={styles.carImages}>
        <ReusableImage style={commonStyle} remote ImgSrc={vehicle?.image} />
      </View>
      <View style={styles.brandLogo}>
        <ReusableImage style={commonStyle} remote ImgSrc={logo} />
      </View>
      {!isCurrentUser && (
        <TouchableOpacity style={styles.favIcon} onPress={onFav}>
          <ReusableIcon
            iconName={isFav ? 'heart' : 'heart-o'}
            fontAwesome={true}
            iconSize={20}
            iconColor={'white'}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBannerContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    position: 'relative',
  },
  carImages: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  brandLogo: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -32,
    right: 18,
    padding: 2,
    overflow: 'hidden',
  },
  favIcon: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: '#8b8c8f',
    position: 'absolute',
    top: 11,
    right: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardBanner;
