import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Tag = ({ title, color = '#fff', vSpace = 2, hSpace = 10, fontSize = 13, bgcolor = '#fff', space = 2 }) => {
  return (
    <Text
      style={[
        styles.container,
        {
          backgroundColor: bgcolor,
          color: color,
          paddingVertical: vSpace,
          paddingHorizontal: hSpace,
          fontSize: fontSize,
          marginRight: space,
        },
      ]}
    >
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
});

export default Tag;
