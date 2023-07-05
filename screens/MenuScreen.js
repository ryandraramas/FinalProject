import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants';

const MenuScreen = ({ navigation }) => {
  const handleNavigation = (menu) => {
    // Handle navigation based on the selected menu
    switch (menu) {
      case 'LoginART':
        // Navigate to the menu for "Login Sebagai LoginART"
        navigation.navigate('LoginART');
        break;
      case 'Login':
        // Navigate to the menu for "Login Sebagai Pelanggan"
        navigation.navigate('Login');
        break;
      default:
        break;
    }
  };

  const handleDeveloperLogin = () => {
    // Navigate to the LoginDev
    navigation.navigate('LoginDev');
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg1.jpg')}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleNavigation('LoginART')}>
        <Text style={styles.cardText}>Login Mitra</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleNavigation('Login')}>
        <Text style={styles.cardText}>Login Pelanggan</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.developerLoginButton} onPress={handleDeveloperLogin}>
          <Text style={styles.developerLoginText}>
            Login as a <Text style={styles.developerText}>Developer</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: "100%",
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  card: {
    flexDirection: 'row',
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'medium',
    textAlign: 'center',
    flex: 1,
    marginRight: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  developerLoginButton: {
    alignItems: 'flex-start',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: 20,
  },
  developerLoginText: {
    fontSize: 12,
    textAlign: 'left',
    color: COLORS.white,
  },
  developerText: {
    color: '#F9F871',
  },
});

export default MenuScreen;
