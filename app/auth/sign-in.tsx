import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal } from 'react-native';
import TextField from '../../components/form/TextField';
import Box from '../../components/layout/Box';
import ScrollContainer from '../../components/layout/ScrollContainer';
import colors from '../../components/theme/colors';
import IconButton from '../../components/ui/IconButton';
import Text from '../../components/ui/Text';
import CountryDialCodes from '../../utils/CountriesDialInfo';


const SignIn = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCountry] = useState<any>({});
  const [mobileNumber, setMobileNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { width } = Dimensions.get('window');

  useEffect(() => {
    setCountries(CountryDialCodes);
    const defaultCountry = CountryDialCodes.find(c => c.name === 'South Africa');
    setCountry(defaultCountry || {});
  }, []);

  const showHideModal = () => setShowModal(prev => !prev);

  const selectCountry = (countryName: string) => {
    const found = countries.find(c => c.name === countryName);
    if (found) {
      setCountry(found);
      setShowModal(false);
    }
  };

  return (
    <ScrollContainer>
      <Box style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: '700' }}>Sign In</Text>
        <Text style={{ fontSize: 16, marginTop: 4 }}>Just your login details</Text>
      </Box>

      <Box style={{ marginBottom: 16, flexDirection: 'row' }}>
        <Text style={{ marginBottom: 8 }}>
          {currentCountry?.flag} {currentCountry?.dial_code}
        </Text>

        <TextField
          placeholder="Mobile number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <Box style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <IconButton icon="arrow-drop-down" onPress={showHideModal} />
        </Box>
      </Box>

      <Box>
        <Text
          style={{
            backgroundColor: colors.primary,
            color: 'white',
            textAlign: 'center',
            padding: 12,
            borderRadius: 8,
            fontWeight: '700',
          }}
        >
          Sign In
        </Text>
      </Box>

      <Modal visible={showModal} animationType="slide">
        <ScrollContainer>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
            Select Country
          </Text>
          <FlatList
            data={countries}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => (
              <Text
                onPress={() => selectCountry(item.name)}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                {item.flag} {item.name} ({item.dial_code})
              </Text>
            )}
          />
          <Text
            onPress={showHideModal}
            style={{
              color: colors.primary,
              textAlign: 'center',
              paddingVertical: 20,
              fontWeight: '600',
            }}
          >
            Cancel
          </Text>
        </ScrollContainer>
      </Modal>
    </ScrollContainer>
  );
};

export default SignIn;
