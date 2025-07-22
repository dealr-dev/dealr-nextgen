import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from '../assets/img/DealrLogo.png';
import ReusableImage from './ReusableImage';
import SlideShow from './Slideshow';

interface Props {
  onLogin: () => void;
  onExecLink: () => void;
  onBuyerStart: () => void;
  onSellerStart: () => void;
}

export default function WelcomeCard({
  onLogin,
  onExecLink,
  onBuyerStart,
  onSellerStart,
}: Props) {
  return (
    <>
      <SlideShow style={{ zIndex: 5, height: 80, marginBottom: 40 }} />

      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <ReusableImage ImgSrc={Logo} style={styles.logo} />
        </View>

        <Text style={styles.title}>What do you want to do?</Text>
        <Text style={styles.subtitle}>Lorem ipsum dolor sit amet.</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.primary]} onPress={onBuyerStart}>
            <Text style={styles.buttonTextWhite}>Buy a car</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onSellerStart}>
            <Text style={styles.buttonText}>Sell a car</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onExecLink}>
            <Text style={styles.footerText}>I am a sales executive</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.footerText}>I have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 40,
    zIndex: 10,
  },
  logoContainer: {
    width: 60,
    height: 60,
    top: -30,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 13,
    color: '#5B5B5B',
    fontFamily: 'Poppins-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5A89EA',
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#5A89EA',
  },
  buttonText: {
    color: '#5A89EA',
    fontFamily: 'Poppins-Bold',
  },
  buttonTextWhite: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  footerText: {
    fontSize: 14,
    color: '#5991FF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
});
