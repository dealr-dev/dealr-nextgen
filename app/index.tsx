import { useRouter } from 'expo-router';
import { useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WelcomeBg from '../assets/img/welcome.png';
import ReusableImage from '../components/ReusableImage';
import WelcomeCard from '../components/WelcomeCard';
import { useAuth } from './context/AuthContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { width } = Dimensions.get('window');

  //const handleBuyer = () => signIn('buyer');

  const handleBuyer = () => {
    router.push({
      pathname: '/auth/sign-up',
      params: {
        role: 'buyer'
      },
    });
  }

  const handleSeller = () => {
    router.push({
      pathname: '/vehicle/67ef0ea4d856690008542c8e',
      params: {
        role: 'seller'
      },
    });
  }
  
  const handleExec = () => router.push('/auth/exec-link');
  const handleLogin = () => router.push('/auth/sign-in');

  useEffect(() => {
    //router.push('/auth/sign-in');
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <ReusableImage ImgSrc={WelcomeBg} style={{ width, height: '100%' }} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Welcome to Dealr</Text>
          </View>
        </View>

        <View style={styles.cardWrapper}>
          <WelcomeCard
            onLogin={handleLogin}
            onExecLink={handleExec}
            onBuyerStart={handleBuyer}
            onSellerStart={handleSeller}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    width: '100%',
  },
  overlayText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  cardWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
