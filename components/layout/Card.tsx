import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CardProps {
  image?: string;
  title: string;
  subtitle?: string;
  content?: string;
}

const Card: React.FC<CardProps> = ({ image, title, subtitle, content }) => {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {content && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
});

export default Card;