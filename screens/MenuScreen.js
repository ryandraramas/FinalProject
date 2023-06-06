import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { COLORS, SIZES, FONTS, assets } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

export const MenuScreen = () => {

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <TouchableOpacity style={styles.backButton} 
          onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Login</Text>
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
    top: 16,
    left: 16,
    zIndex: 1
  },uttonContainer: {
    marginTop: 70
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    marginTop: 55,
    minWidth: '79%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: FONTS.bold,
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
    alignItems: 'center',
    marginTop: 20
  },
  registerButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.primary
  }
});

export default MenuScreen;
