import defaultImage from '@/assets/user_default.png';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReuseableImage from '../Reusable/Image';

const commonStyle = { height: '100%', width: '100%' };

const CarMiniCard = ({ data: { status, description, image, name }, width }) => {
  const [expand, setExpand] = useState(false);

  return (
    <View style={[styles.cardContainer, { width: width - 50, backgroundColor: expand ? '#5A89EA' : 'white' }]}>
      <TouchableOpacity style={styles.cardHeading} onPress={() => console.log("OPEN")}>
        <View style={styles.avatarContainer}>
          <View style={styles.twinAvatar}>
            <View style={[styles.status, { backgroundColor: status === 'online' ? '#2ECC71' : '#C60000' }]} />
            <View style={styles.avatar}>
              <ReuseableImage style={commonStyle} remote ImgSrc={image || defaultImage} />
            </View>
          </View>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.cardTitles}>
            <Text style={[styles.title, { color: expand ? '#fff' : '#000', textAlign: 'right' }]}>
              {name}
            </Text>
          </View>
          <Text
            style={[
              styles.subTitle,
              { color: expand ? '#fff' : '#000' }
            ]}
            numberOfLines={1}
          >
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  cardHeading: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  twinAvatar: {
    position: 'relative',
  },
  status: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,
    height: 11,
    width: 11,
    borderRadius: 100,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
});

export default CarMiniCard;