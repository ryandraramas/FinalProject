import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const MenuScreen = ({ navigation }) => {
  const handleNavigation = (menu) => {
    // Handle navigation based on the selected menu
    switch (menu) {
      case 'LoginART':
        // Navigate to the menu for "Login Sebagai LoginART"
        navigation.navigate('LoginART');
        break;
      case 'Developer':
        // Navigate to the menu for "Login Sebagai Developer"
        navigation.navigate('LoginDeveloper');
        break;
      case 'Login':
        // Navigate to the menu for "Login Sebagai Pelanggan"
        navigation.navigate('Login');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigation('LoginART')}
      >
        <Text style={styles.cardText}>Login LoginART</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigation('Developer')}
      >
        <Text style={styles.cardText}>Login Developer</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigation('Login')}
      >
        <Text style={styles.cardText}>Login Pelanggan</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F6F8'
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  card: {
    flexDirection: 'row',
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 20,
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
});
