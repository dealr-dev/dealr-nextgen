import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FavoriteButton: React.FC = () => {
  const [favorited, setFavorited] = useState(false);

  return (
    <TouchableOpacity style={styles.button} onPress={() => setFavorited(!favorited)}>
      <MaterialIcons
        name={favorited ? 'favorite' : 'favorite-border'}
        size={24}
        color={favorited ? 'red' : '#888'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default FavoriteButton;