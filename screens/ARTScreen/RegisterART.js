import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from '../../constants';
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
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategorySalary, setSelectedCategorySalary] = useState('');
  const [items, setItems] = useState([
    { label: 'Asisten Rumah Tangga', value: 'Asisten Rumah Tangga', salary: '10000000'},
    { label: 'Memasak', value: 'Memasak', salary: '12000000'},
    { label: 'Mengasuh Anak', value: 'Mengasuh Anak', salary: '15000000'},
    { label: 'Tukang Kebun', value: 'Tukang Kebun', salary: '9000000'},
    { label: 'Mencuci Baju', value: 'Mencuci Baju', salary: '8000000'},
  ]);

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
      !date ||
      !name ||
      !email ||
      !address ||
      !phoneNumber ||
      !password ||
      !selectedCategory ||
      !deskripsi ||
      !foto
    ) {
      Alert.alert('Error', 'All fields must be filled');
      return;
    }
  
    try {
      const formData = new FormData();
      const formattedDate = date.toISOString();
      formData.append('date', formattedDate);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('deskripsi', deskripsi);
      formData.append('category', selectedCategory);
      formData.append('salary', salary);
      formData.append('foto', {
        uri: foto.uri,
        type: 'image/jpeg',
        name: selectedFileName, 
      });
  
      const response = await axios.post(`${URL_API}api/mitra/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('LoginART');
      console.log(response);
    } catch (err) {
      console.log(err.message);
      Alert.alert('Error', 'Registration failed.');
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
  
      console.log('imagePickerResult:', imagePickerResult); // Add this log to check the selected image data
  
      if (imagePickerResult.cancelled) {
        return;
      }
  
      const selectedImage = {
        uri: imagePickerResult.uri,
        type: 'image/jpeg',
        name: imagePickerResult.uri.split('/').pop(),
      };
  
      setSelectedFileName(selectedImage.name);
      setFoto(selectedImage); // Set the foto state with the selected image
      console.log('Image picked:', selectedImage.uri);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
    

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '-56%',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <ScrollView style={{height: '100%'}} 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={19}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="location-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(value) => setAddress(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="call-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={styles.input}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.passwordIcon}
          >
            <Ionicons
              name={hidePassword ? 'eye-off-outline' : 'eye'}
              size={18}
              color="#9E9E9E"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={showDatePickerModal}
          style={[styles.inputWrapper, { marginTop: 10 }]}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <Text style={[styles.input, { color: '#9E9E9E' }]}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {foto ? (
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={[styles.inputWrapper, { marginTop: 10 }]}
          >
            <Ionicons
              name="image-outline"
              size={20}
              color="#9E9E9E"
              style={styles.inputIcon}
            />
            <Text style={styles.input}>{selectedFileName}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={[styles.inputWrapper, { marginTop: 10 }]}
          >
            <Ionicons
              name="image-outline"
              size={20}
              color="#9E9E9E"
              style={styles.inputIcon}
            />
            <Text style={[styles.input, { color: '#9E9E9E' }]}>
              Select Image
            </Text>
          </TouchableOpacity>
        )}

        <View style={[styles.pickerWrapper, { marginTop: 10 }]}>
          <Ionicons
            name="grid-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIconDrop}
          />
          <DropDownPicker
            placeholder="Category"
            open={open}
            value={selectedCategory}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedCategory}
            setItems={setItems}
            onChangeValue={(item) => setSelectedCategorySalary(item.salary)}
            style={styles.picker}
            dropDownDirection="TOP"
            containerStyle={styles.pickerContainer}
            placeholderStyle={{ color: '#9E9E9E' }}
            disableBorderRadius={true}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="cash-outline"
            size={20}
            color="#9E9E9E"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Harga penawaran Anda"
            value={salary}
            onChangeText={(value) => setSalary(value)}
            style={styles.input}
          />
        </View>

        <View
          style={[styles.inputWrapper, { marginTop: 20, marginBottom: 16 }]}
        >
          <TextInput
            style={[styles.inputDesc, { height: 140 }]}
            placeholder="Pengalaman Kerja Anda....."
            editable={true}
            multiline={true}
            numberOfLines={10}
            value={deskripsi}
            onChangeText={(value) => setDeskripsi(value)} 
          />
        </View>
      </View>
      </ScrollView>
      <View style={styles.footer}>
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
    marginTop: 46,
  },
  inputContainer: {
    width: '90%',
    flex: 1,
    bottom: 20,
    justifyContent: 'center',
    marginLeft: 14,
    top: 4,
  },
  title: {
    fontSize: SIZES.extraLarge,
    color: COLORS.dark,
    marginLeft: 16,
    fontWeight: '700',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 10,
  },
  inputIconDrop: {
    marginRight: 10,
    marginTop: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
    borderBottomColor: '#9E9E9E',
    borderBottomWidth: 1,
  },
  inputDesc: {
    height: 70,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    borderStyle: 'solid',
    borderColor: '#9E9E9E',
    alignItems: 'center',
    textAlignVertical: 'top',
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
    bottom: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    minWidth: '76%',
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
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    ...SHADOWS.dark,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default RegisterART;
