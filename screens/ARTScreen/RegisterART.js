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
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { URL_API } from "@env";
import axios from 'axios';

const RegisterART = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [foto, setFoto] = useState(null); 
  const [selectedFileName, setSelectedFileName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategorySalary, setSelectedCategorySalary] = useState('');
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Cleaning', value: 'Cleaning', salary: '1.000.000/bulan' },
    { label: 'Cooking', value: 'Cooking', salary: '1.200.000/bulan' },
    { label: 'Baby Sitting', value: 'Baby Sitting', salary: '2.000.000/bulan' },
    { label: 'Gardening', value: 'Gardening', salary: '1.100.000/bulan' },
    { label: 'Personal Assistant', value: 'Personal Assistant', salary: '1.200.000/bulan' },
  ]);

  const handleCategoryChange = (item) => {
    setSelectedCategory(item.value);
    setSelectedCategorySalary(item.salary);
  };  
  useEffect(() => {
    setSalary(selectedCategorySalary);
  }, [selectedCategorySalary]);

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

  const submit = async () => {
    if (
      !name ||
      !email ||
      !address ||
      !phoneNumber ||
      !password
    ) {
      Alert.alert('Error', 'Data must be inputted');
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

    try{
      const response = await axios.post(URL_API + 'api/mitra/register', {...data});
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('LoginART');
      console.log(response);
    } catch (err){
      console.log(err.message);
    }
  };

  const openImagePickerAsync = async () => {
    try {
      const mediaLibraryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!mediaLibraryPermissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (imagePickerResult.cancelled) {
        return;
      }

      const randomString = Math.floor(Math.random() * 900000) + 100000;
      const fileName = `Image - ${randomString}`;
      setSelectedFileName(fileName);
      setFoto(imagePickerResult);
      console.log('Image picked:', imagePickerResult.uri);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: '-50%', marginBottom: 30}}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={19} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordIcon}>
            <Ionicons name={hidePassword ? 'eye-off-outline' : 'eye'} size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={showDatePickerModal} style={styles.inputWrapper}>
          <Ionicons name="calendar-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <Text style={[styles.input, { color: '#9E9E9E' }]}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
        )}
        {foto ? (
          <TouchableOpacity onPress={openImagePickerAsync} style={styles.inputWrapper}>
            <Ionicons name="image-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
            <Text style={styles.input}>{selectedFileName}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openImagePickerAsync} style={styles.inputWrapper}>
            <Ionicons name="image-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
            <Text style={[styles.input, { color: '#9E9E9E', }]} >Select Image</Text>
          </TouchableOpacity>
        )}

        <View style={styles.pickerWrapper}>
        <Ionicons name="grid-outline" size={20} color="#9E9E9E" style={styles.inputIconDrop} />
          <DropDownPicker
            placeholder='Category Anda'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={handleCategoryChange}
            style={styles.picker}
            containerStyle={styles.pickerContainer}
            placeholderStyle={{ color: '#9E9E9E' }}
            disableBorderRadius={true}/>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="cash-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
          <TextInput
            placeholder="Salary"
            value={salary}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  inputContainer: {
    width: '80%',
    flex: 1,
  },
  title: {
    fontSize: SIZES.extraLarge,
    color: COLORS.dark,
    marginLeft: 16,
    fontWeight: '700'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 10
  },
  inputIconDrop: {
    marginRight: 10,
    marginTop: 16
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginTop: 10,
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 1,
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    marginTop: 36,
    minWidth: '79%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  pickerWrapper: {
    flexDirection: 'row',
  },
  picker: {
    borderColor: '#fff',
    borderBottomColor: '#9E9E9E',
    backgroundColor: 'transparent',
  },
  pickerContainer: {
    width: '90%',
    zIndex: 1,
  },
});

export default RegisterART;
