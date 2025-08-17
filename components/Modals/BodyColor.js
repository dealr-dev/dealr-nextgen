import ReusableInputText from '@/components/Reusable/InputText';
import ReusableText from '@/components/Reusable/Text';
import ReusableTile from '@/components/Reusable/Tile';
import ReusableInnerWrapper from '@/components/Reusable/Wrapper/Inner';
import { metadataAPI } from '@/services';
import CustomTheme from '@/theme';
import { sortItemsByAsc } from '@/utils';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function BodyColor({ bodyColorModal, showHideBodyColorModal, handleBodyColor }) {
  const [colorsCodes, setColors] = useState([]);

  useEffect(() => {
    async function fetchColorsData() {
      const { colors } = await metadataAPI.searchColors();
      const sortColors = sortItemsByAsc(colors, 'name');
      setColors(sortColors);
    }
    fetchColorsData();
  }, []);

  const handleColorSelection = ({ name }) => {
    handleBodyColor(name);
    showHideBodyColorModal(!bodyColorModal);
  };

  const handleKeywords = async (text) => {
    const { colors } = text
      ? await metadataAPI.searchColors(text)
      : await metadataAPI.searchColors();
    const sortColors = sortItemsByAsc(colors, 'name');
    setColors(sortColors);
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={bodyColorModal}
    >
      <ReusableInnerWrapper
        style={{ marginTop: Constants.statusBarHeight, flexDirection: 'column' }}
      >
        <ReusableInnerWrapper
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '90%',
            marginTop: Constants.statusBarHeight,
          }}
        >
          <ReusableText
            style={styles.title}
          >
            body color
          </ReusableText>
        </ReusableInnerWrapper>

        <ReusableInnerWrapper
          style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
        >
          <ReusableInputText
            style={styles.searchInput}
            borderless={true}
            color={CustomTheme.colors.raven}
            placeholder="Type in your color"
            handleTextChange={handleKeywords}
            placeholderTextColor={CustomTheme.colors.mineShaft}
          />

          <FlatList
            data={colorsCodes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ReusableTile shadowless={true} handleTileSelection={() => handleColorSelection(item)}>
                <View style={styles.listItem}>
                  <View style={[styles.colorSwatch, { backgroundColor: item.hex }]} />
                  <ReusableText style={styles.itemText}>{item.name}</ReusableText>
                </View>
              </ReusableTile>
            )}
          />
        </ReusableInnerWrapper>
      </ReusableInnerWrapper>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    fontFamily: 'BebasNeue-Regular',
    color: 'black',
    fontSize: 34,
    marginTop: 16,
    lineHeight: 40,
  },
  searchInput: {
    width: '90%',
    height: 52,
    color: 'raven',
    fontSize: 13,
    borderBottomColor: 'alto',
    borderBottomWidth: 1,
    marginLeft: 15,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  listItem: {
    width: width - 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 20,
    alignItems: 'center',
  },
  colorSwatch: {
    width: 20,
    height: 20,
    marginRight: 16,
    borderRadius: 10,
  },
  itemText: {
    textAlign: 'left',
    height: 25,
    lineHeight: 25,
  },
});
