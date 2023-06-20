import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Austria', value: 'Austria' },
  ]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (selectedDate !== null) {
      setShowDatePicker(true);
    }

    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleCountryChange = (item) => {
    setSelectedItems([...selectedItems, item.value]);
  };

  const submit = () => {
    if (
      !name ||
      !email ||
      !address ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      selectedItems.length === 0
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
      selectedCountry: selectedItems,
    };

    axios
      .post('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-mkyfk/endpoint/data/v1', data)
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'Registration successful!');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Registration failed.');
      });

    console.log('Data before sent!', data);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={24} color="#2C2C2C" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>Login Pelanggan</Text>

        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Nama"
            value={name}
            onChangeText={(value) => setName(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="mail" size={19} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="location" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Alamat"
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="call" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Nomor HP"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="lock-closed" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordIcon}>
            <Icon name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="lock-closed" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordIcon}>
            <Icon name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={showDatePickerModal} style={styles.inputWrapper}>
          <Icon name="calendar" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <Text style={styles.input}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
        )}

        <View style={styles.inputWrapper}>
          <Icon name="globe" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <DropDownPicker
            multiple={false}
            min={1}
            containerStyle={styles.pickerContainer}
            style={styles.picker}
            max={2}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeItem={(item) => setSelectedItems(item)}
          />
        </View>
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
    // marginBottom: 70,
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
  pickerContainer: {
    flex: 1,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#9E9E9E',
    justifyContent: 'center',
    position: 'relative',
  },
  picker: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderColor: 'white',
  },
  pickerDropdown: {
    backgroundColor: '#fafafa',
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


export default RegisterScreen;
