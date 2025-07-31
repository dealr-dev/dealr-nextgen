import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardBanner from '../Core/cardBanner';
import ExpandCard from '../Core/expandCard';
import Rating from '../Core/rating';
import Tag from '../Core/tag';

const Card = ({
  logo,
  vehicle,
  width,
  onCardSelect,
  isCurrentUser,
  onFav,
  isFav,
  renderType,
  showRating,
  showDealrRating,
  showNextAppointment,
  showMoreInfo,
  isSuperDealer,
}) => {
  return (
    <View style={[styles.cardContainer, { width: width - 50 }]}>
      <CardBanner
        logo={logo}
        vehicle={vehicle}
        onCardSelect={onCardSelect}
        isCurrentUser={isCurrentUser}
        onFav={onFav}
        isFav={isFav}
      />
      <View style={styles.carInfoContainer}>
        <View style={styles.priceInfo}>
          <Text style={styles.askedPriceTitleText}>asked price</Text>
          <Text style={styles.askedPriceText}>{`R${vehicle?.price}`}</Text>
        </View>
        <View style={styles.carInfo}>
          <Text style={styles.carName} numberOfLines={1}>
            {vehicle?.name}
          </Text>
          <Text style={styles.carTip} numberOfLines={2}>
            {vehicle?.year && `${vehicle?.year} - `} 
            {vehicle?.milage && `${vehicle?.milage} - `} 
            {vehicle?.model}
          </Text>
        </View>
      </View>

      {showRating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle} numberOfLines={1}>
            {renderType === 'sell-car' ? 'Test drive rating' : 'Your overall rating'}
          </Text>
          <Rating size={14} iconSpacing={4} vehicle={vehicle} />
        </View>
      )}

      {showDealrRating && (
        <View style={styles.ratingContainer}>
          {isSuperDealer && (
            <Tag bgcolor="#C6A96A" space={5} vSpace={5} title="SuperDealr" />
          )}
          <Text style={styles.ratingTitle} numberOfLines={1}>
            {vehicle?.address}
          </Text>
          <Rating space={4} size={10} iconSpacing={1} vehicle={vehicle} />
        </View>
      )}

      {showNextAppointment && (
        <View style={styles.appointmentContainer}>
          <Text style={styles.appointmentTitle}>Next test drive: </Text>
          <Text style={styles.appointmentBold}></Text>
        </View>
      )}

      {showMoreInfo && (
        <ExpandCard handleOnPress={onCardSelect} vehicle={vehicle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D7DD',
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 2,
  },
  carInfoContainer: {
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 11,
    marginTop: 22,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceInfo: {
    height: 64,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  askedPriceTitleText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 14,
    color: '#6F7889',
    textAlign: 'center',
  },
  askedPriceText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  carInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 5,
    overflow: 'hidden',
  },
  carName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#000',
    textAlign: 'left',
  },
  carTip: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D4D7DD',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D7DD',
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  ratingTitle: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#030303',
    overflow: 'hidden',
  },
  appointmentContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#EEF4FF',
  },
  appointmentTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#6F7889',
  },
  appointmentBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#6F7889',
  },
});

export default Card;
