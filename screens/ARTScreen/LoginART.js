import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { COLORS, SIZES, assets } from '../../constants';

import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try{
      const response = await axios.post('https://ea7b-36-73-173-90.ngrok-free.app/api/Mitra/login', {
        email,
        password
      });

      Alert.alert('Success', 'Login Success');
      console.log(response.data);
      return navigation.navigate('ARTViewScreen');
    } catch (err){
      return Alert.alert('Error', `Login failed: ${err.message}`);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#2C2C2C" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text
          style={{
            fontSize: SIZES.extraLarge,
            color: COLORS.dark,
            textAlign: 'center',
            height: 100
          }}
        >
          Login Mitra 
        </Text>

        <View style={styles.inputWrapper}>
          <Image source={assets.user} resizeMode="contain" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={assets.lock} resizeMode="contain" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.passwordToggle} onPress={toggleShowPassword}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color='#000'
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin} >
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ARTViewScreen')} > */}
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterART')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1
  },
  inputContainer: {
    width: '80%'
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.small - 2,
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 2
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: -10
  },
  input: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: 'transparent'
  },
  passwordToggle: {
    position: 'absolute',
    right: 0,
    marginRight: 10
  },
  forgetPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  forgetPasswordButtonText: {
    fontSize: 14,
    color: '#000'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    marginBottom: -150
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    minWidth: '79%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white
  },
  registerButton: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderColor: COLORS.primary,
    borderWidth: 2,
    padding: SIZES.base,
    minWidth: '79%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerButtonText: {
    fontSize: 16,
    color: COLORS.primary
  }
});

export default LoginScreen;
