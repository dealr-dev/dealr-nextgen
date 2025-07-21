import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CarouselCardProps {
  image: string;
  title: string;
  description?: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ image, title, description }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 240,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
});

export default CarouselCard;