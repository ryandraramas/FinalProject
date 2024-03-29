import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { COLORS, SIZES, SHADOWS, assets } from '../../constants';
import { addMonths } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import { URL_API } from "@env";

const PaymentsScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const [subtotal, setSubtotal] = useState(0);
  const [appFee, setAppFee] = useState(10000);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState(new Date());
  const [tanggalSelesai, setTanggalSelesai] = useState();
  const [imageURL, setImageURL] = useState('');
  const [userData, setUserData] = useState(null);
  const [foto, setFoto] = useState(null);
  const [salary, setSalary] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [date, setDate] = useState([
    { label: '1 Bulan (30 Hari)', value: '1 Bulan (30 Hari)' },
    { label: '3 Bulan (90 Hari)', value: '3 Bulan (90 Hari)' },
    { label: '6 Bulan (180 Hari)', value: '6 Bulan (180 Hari)' },
    { label: '1 Tahun (365 Hari)', value: '1 Tahun (365 Hari)' },
  ]);

  useEffect(() => {
    fetch(URL_API + 'api/mitra')
      .then((response) => response.json())
      .then((data) => {
        const deliveryLocation = data[0]?.address?.street;
        setDeliveryLocation(deliveryLocation);
        const item = data[0];
        setSalary(item?.salary);
        if (item?.foto) {
          setImageURL(URL_API + item?.foto);
        } else {
          setImageURL('default-image-url');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setSubtotal(salary);
  }, [salary]);

  useEffect(() => {
    const calculatedTotal = subtotal + appFee - discount;
    setTotal(calculatedTotal);
  }, [subtotal, appFee, discount]);

  const handleImagePicker = async () => {
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

      const selectedImage = {
        uri: imagePickerResult.uri,
        type: 'image/jpeg',
        name: imagePickerResult.uri.split('/').pop(),
      };

      setSelectedFileName(selectedImage.name);
      setFoto(selectedImage);
      console.log('Image picked:', selectedImage.uri);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handlePayment = () => {
    if (value && foto) {
      const formData = new FormData();
      formData.append('namaPelanggan', userData?.name );
      formData.append('namaMitra', data?.name );

      formData.append('alamatPelanggan', userData?.address );
      formData.append('alamatMitra', data?.address );

      formData.append('startedAt', );

      formData.append('durasi', value);
      formData.append('totalHarga', data?.salary + appFee);

      formData.append('fotoMitra', {
        uri: URL_API + data?.foto,
        type: 'image/jpeg',
        name: URL_API + data?.foto.split('/').pop()
      });
      formData.append('buktiTransfer', {
        uri: foto.uri,
        type: 'image/jpeg',
        name: foto.uri.split('/').pop(),
      });

      axios
        .post(URL_API + 'api/payments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          navigation.navigate('PaymentsConfirm');
        })
        .catch((error) => {
          console.error(error);
          alert('Payment failed. Please try again.');
        });
    } else {
      alert('Please select duration and upload payment proof.');
    }
  };

  const formatSalary = (value) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied to Clipboard', 'The BCA Virtual Account number has been copied to the clipboard.');
  };

  const handleCategoryChange = (item) => {
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalMulai;
    setShowDatePicker(false);
    setTanggalMulai(currentDate);
  
    // Calculate the "tanggalSelesai" based on the selected duration
    if (value && selectedDate) { // Check if "selectedDate" is not null
      const durationInMonths = parseInt(value); // Convert "value" to an integer
      const endDateTime = addMonths(currentDate, durationInMonths);
      setTanggalSelesai(endDateTime);
    }
  };
  

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container1}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginLeft: 10
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={20} color='black' />
        </TouchableOpacity>
        <Text style={styles.titleScreen}>Checkout</Text>
      </View>

      <View style={styles.container2}>
      <ScrollView style={{  }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>Asisten Rumah Tangga</Text>
          <View style={{
            flexDirection: 'row',
            marginTop: 13,
          }}>
            <Image source={{ uri: URL_API + data?.foto }} style={styles.images} />
            <View style={{
              marginLeft: 10,
              marginBottom: 1,
            }}>
              <Text style={{
                fontSize: 13,
                fontWeight: 'bold',
              }}>{data?.name}</Text>
              <Text style={{
                fontSize: 12,
                color: COLORS.darkLight,
              }}>{data?.category}</Text>
              <Text style={{
                fontSize: 12,
                color: COLORS.darkLight,
              }}>{data?.address}</Text>
              <Text style={{
                marginLeft: 193,
                fontWeight: '500',
                bottom: 18
              }}>{formatSalary(data?.salary)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>Home Address</Text>
          <View style={{ flexDirection: 'row', marginTop: 13, marginBottom: 10 }}>
            <View
              style={{
                backgroundColor: COLORS.tertiary,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}
            >
              <Ionicons name="location-outline" size={24} color={COLORS.white} />
            </View>
            <View style={{ marginLeft: 10, marginTop: 2, justifyContent: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '500' }}>{userData?.address || 'Anda Belum Login'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>Upload Pembayaran</Text>
          <View style={{
            flexDirection: 'row',
            marginTop: 13,
            marginBottom: 10,
          }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F0F0F0',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}
              onPress={handleImagePicker}
            >
              <Ionicons name="image-outline" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
            <View style={{
              marginLeft: 10,
              marginTop: 2,
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
              }}>Upload Bukti Transfer:</Text>
              <Text style={{
                fontSize: 12,
                color: COLORS.darkLight,
              }}>{selectedFileName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>BCA Account</Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: 56,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}
            >
              <Image source={assets.bca} style={styles.bca} />
            </View>
            <View style={{ marginLeft: 10, marginTop: 2, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '500' }}>3901{data?.phoneNumber || 'Anda Belum Login'}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.itemWrapper, {borderBottomWidth: 0}]}>
        <Text style={styles.Tittle}>Tanggal Mulai Bekerja</Text>
          <View style={styles.datePickerStartContainer}>
            <TouchableOpacity onPress={showDatePickerModal} style={styles.inputWrapper}>
              <Ionicons name="calendar" size={20} color="#9E9E9E" style={styles.inputIcon} />
              <Text style={{}}>
                {tanggalMulai ? tanggalMulai.toDateString() : 'Select a start date'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker value={tanggalMulai} mode="date" display="default" onChange={handleDateChange} />
            )}
          </View>
        </View>


        <View style={[styles.itemWrapper, 
        { 
          zIndex: 1,
          marginTop: 44,
          marginBottom: 10,
          height: 30,
          width: '74%',
          justifyContent: 'center',
        }]}>
        <Text style={[styles.Tittle, {marginBottom: 10}]}>Durasi Bekerja</Text>
          <DropDownPicker
            placeholder='Pilih Durasi'
            dropDownDirection="AUTO"
            open={open}
            value={value}
            items={date}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setDate}
            style={styles.picker}
            containerStyle={styles.pickerContainer}
            onChangeValue={handleCategoryChange}
          />
        </View>

        <View style={{ marginTop: 40, marginBottom: 30 }}>
          <Text style={styles.Tittle}>Order Summary:</Text>
          <View style={{ marginTop: 10 }}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{formatSalary(data?.salary)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>App Fee:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{appFee}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Durasi:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{value}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>Total:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right', fontWeight: 'bold', color: '#000' }]}>{formatSalary(data?.salary + appFee)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button1} onPress={handlePayment}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Pay </Text>
            <Text style={styles.buttonText}>{formatSalary(data?.salary + appFee)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#fff',
    width: '100%',
    ...SHADOWS.light,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
  },
  itemWrapper: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkLight,
  },
  textSummary: {
    color: COLORS.darkLight
  },
  Tittle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: -25,
  },
  titleScreen: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.dark,
    textAlign: 'center',
    marginLeft: 112
  },
  input: {
    height: 40,
    marginBottom: 12,
  },
  button1: {
    backgroundColor: '#0E8995',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30,
    width: '70%',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerWrapper: {
    zIndex: 1,
    marginTop: 20,
    marginBottom: 20,
    height: 30,
    width: '74%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.gray,
    marginRight: 112
  },
  images: {
    height: 45,
    width: 45,
    borderRadius: 10
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#fff',
    width: '100%',
    ...SHADOWS.light,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
  },
  bca: {
    height: 30,
    width: 60
  },
  picker: {
    borderColor: COLORS.darkLight
  },
  textInputContainer: {
    justifyContent: 'center'
  },
  datePickerStartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '24%',
    marginTop: 12
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.darkLight,
    height: 50,
    width: '97.5%',
    borderRadius: 10
  },
  inputIcon: {
    marginRight: 4
  }
});
