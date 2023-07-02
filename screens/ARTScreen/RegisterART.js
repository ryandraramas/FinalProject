import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';

import axios from 'axios';

const RegisterART = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const submit = () => {
    if (
      !name ||
      !email ||
      !address ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Data must be inputted');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password and confirmation password do not match.');
      return;
    }

    const data = {
      date,
      name,
      email,
      address,
      phoneNumber,
      password,
    };

    axios
      .post('http://192.168.1.7/api/pelanggan/', data)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'Registration successful!');
        // Navigate to another screen
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Registration failed.');
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="fixed">
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#2C2C2C" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="person" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail" size={19} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="location" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="call" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordIcon}>
            <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordIcon}>
            <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={showDatePickerModal} style={styles.inputWrapper}>
          <Ionicons name="calendar" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <Text style={styles.input}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  inputContainer: {
    width: '80%',
  },
  title: {
    fontSize: SIZES.extraLarge,
    color: COLORS.dark,
    textAlign: 'center',
    height: '20%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 2,
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    marginTop: 55,
    minWidth: '79%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default RegisterART;
