import TextField from '@/components/form/TextField';
import Box from '@/components/layout/Box';
import ScrollContainer from '@/components/layout/ScrollContainer';
import Text from '@/components/Reusable/Text';
import colors from '@/components/theme/colors';
import IconButton from '@/components/ui/IconButton';
import AuthService from '@/services/AuthService';
import { generateMobileNumber } from "@/utils";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal } from 'react-native';
import CountryDialCodes from '../../utils/CountriesDialInfo';


const SignUp = () => {

  const router = useRouter();

  const {role} = useLocalSearchParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCountry] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { width } = Dimensions.get('window');

  useEffect(() => {
    setCountries(CountryDialCodes);
    const sa = CountryDialCodes.find(c => c.name === 'South Africa');
    setCountry(sa || {});
  }, []);

  const selectCountry = (name: string) => {
    const selected = countries.find(c => c.name === name);
    if (selected) {
      setCountry(selected);
      setShowModal(false);
    }
  };

  const submitDetails = async () => {
    try {
      setError("");
      setLoading(true);
      const phoneNumber = generateMobileNumber(currentCountry.dial_code, mobileNumber);
      console.log('Logging in with:', phoneNumber);

      await AuthService.signUp({name: fullName, email, cellphone: phoneNumber, role})
      setLoading(false);

      router.push({
        pathname: '/auth/verify-otp',
        params: { phoneNumber, fromRoute: 'sign-up' }
      })
    }
    catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const showHideModal = () => setShowModal(prev => !prev);

  return (
    <ScrollContainer>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>
        Sign Up
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 24 }}>
        Just your basic details
      </Text>

      <Box style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, marginBottom: 4 }}>Your Name</Text>
        <TextField
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />
      </Box>

      <Box style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, marginBottom: 4 }}>Your Email</Text>
        <TextField
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </Box>

      <Box style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, marginBottom: 4 }}>Mobile Number</Text>
        <Box style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ marginRight: 8 }}>{currentCountry.flag} {currentCountry.dial_code}</Text>
          <IconButton icon="arrow-drop-down" onPress={showHideModal} />
        </Box>
        <TextField
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          style={{ marginTop: 8 }}
        />
      </Box>

      <Box>
        <Text
          style={{
            backgroundColor: colors.primary,
            color: 'white',
            textAlign: 'center',
            padding: 14,
            borderRadius: 8,
            fontWeight: '700',
            marginTop: 12,
          }}
          onPress ={submitDetails}
        >
          Next
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

export default SignUp;