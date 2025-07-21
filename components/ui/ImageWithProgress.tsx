import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  source: { uri: string };
  style?: any;
}

const ImageWithProgress: React.FC<Props> = ({ source, style }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={style}>
      {loading && <ActivityIndicator style={StyleSheet.absoluteFill} />}
      <Image
        source={source}
        style={style}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

export default ImageWithProgress;