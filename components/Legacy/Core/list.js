import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FetauresList = ({
  leftContent,
  rightContent,
  leftContentBold,
  circleColor,
  show,
}) => {
  if (!show) return <View />;

  return (
    <View style={styles.container}>
      <View style={styles.leftWrapper}>
        <Text style={styles.featureTitle}>
          {leftContent}{" "}
          <Text style={styles.featureTitleBold}>{leftContentBold}</Text>
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        {rightContent?.map((item, i) => (
          <View key={i} style={styles.contentWrapper}>
            <View style={[styles.circle, { backgroundColor: circleColor }]} />
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  featureTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#6F7889',
  },
  featureTitleBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#6F7889',
  },
  circle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginTop: 7,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  },
  leftWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  rightWrapper: {
    flex: 2,
  },
  featureText: {
    marginLeft: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#6F7889',
  },
});

export default FetauresList;