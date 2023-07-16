import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountDev = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      // Menghapus data dari AsyncStorage
      await AsyncStorage.removeItem('adminData');

      // Navigasi ke halaman login
      // Ganti 'LoginScreen' dengan nama halaman login Anda
      navigation.navigate('Started');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderColor: '#f73131',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  logoutButtonText: {
    color: '#f73131',
    fontWeight: 'bold',
  },
});

export default AccountDev;
