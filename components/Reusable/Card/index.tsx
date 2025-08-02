import React from 'react';
import {
    Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle
} from 'react-native';

interface ReusableCardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  title?: string;
  caption?: string;
  location?: string;
  image?: ImageSourcePropType;
}

export default function ReusableCard({
  style,
  children,
  title,
  caption,
  location,
  image,
}: ReusableCardProps) {
  return (
    <View style={[styles.card, style]}>
      {image && <Image source={image} style={styles.image} resizeMode="cover" />}
      {(title || caption || location) && (
        <View style={styles.textWrapper}>
          {title && <Text style={styles.title}>{title}</Text>}
          {caption && <Text style={styles.caption}>{caption}</Text>}
          {location && <Text style={styles.location}>{location}</Text>}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  textWrapper: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#161616',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6F7889',
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999999',
    marginTop: 2,
  },
});
