import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API } from "@env";
import 'react-native-gesture-handler'

const InfoOrderMitra = () => {
  const navigation = useNavigation();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [mitraData, setMitraData] = useState(null);
  const [appFee, setAppFee] = useState('Rp10.000');
  const totalOrder = mitraData?.salary + parseFloat(appFee.replace('Rp', '').replace('.', ''));
  const generateInvoiceNumber = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');

    const invoiceNumber = `INV/${year}${month}${date}/MPL${randomNumber}`;
    setInvoiceNumber(invoiceNumber);
  };

  useEffect(() => {
    generateInvoiceNumber();
  }, []);

  useEffect(() => {
    const fetchMitraData = async () => {
      try {
        const storedMitraData = await AsyncStorage.getItem('mitraData');
        if (storedMitraData) {
          setMitraData(JSON.parse(storedMitraData));
        }
      } catch (error) {
        console.log('Error fetching mitra data:', error);
      }
    };

    fetchMitraData();
  }, []);

  const handleCancelContract = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin membatalkan Kontrak Anda?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya',
          style: 'destructive',
          onPress: () => {
            // Perform the cancellation logic here
            console.log('Kontrak dibatalkan');

            // Show confirmation message
            Alert.alert(
              'Pembatalan diterima',
              'Pembatalan Anda telah diterima oleh Admin. Selanjutnya akan diproses oleh Admin.',
              [
                { text: 'OK' }
              ]
            );
          },
        },
      ],
      { cancelable: false }
    );
  }
  const formatSalary = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }
    return '';
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} >
          <Ionicons name="chevron-back-outline" size={24} color="#2C2C2C" />
        </TouchableOpacity>
        <Text style={styles.textHeader}>
          Detail Order
        </Text>
      </View>
      <ScrollView style={{ height: '200%' }}>
        <View style={styles.invoiceContainer}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 18 }}>
            Invoice
          </Text>
          <View style={styles.invoiceS}>
            <Text style={{ fontSize: 12, color: COLORS.darkLight, }}>
              {invoiceNumber}
            </Text>
            <Ionicons name="newspaper-outline" color={COLORS.darkLight} marginLeft={10} size={16} />
          </View>
          <View style={styles.tanggalOrder}>
            <Text style={{ fontSize: 12, color: COLORS.darkLight, }}>
              Tanggal Order
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.black, marginLeft: 120 }}>
              24 Mei 2023, 14:42 WIB
            </Text>
          </View>
        </View>

        <View style={styles.detailProduk}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 18 }}>Detail Mitra</Text>
          <TouchableOpacity style={styles.cardDetail}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: URL_API + mitraData?.foto }} style={styles.Image} />
              <Text style={styles.textName}>{mitraData?.name}</Text>
            </View>
            <View style={styles.CategoryCard}>
              <Ionicons name='ellipse' color={'#fff'} size={10} />
              <Text style={styles.textCategory}>
                {mitraData?.category}
              </Text>
            </View>
            <Text style={{ marginTop: 40 }}>
              Total Harga:
            </Text>
            <Text style={{ fontWeight: 'bold', marginTop: 2 }}>
              Rp{formatSalary(mitraData?.salary)}
            </Text>
            {/* <View style={styles.statusContainer}>
                    <Text style={{fontWeight: '500'}}>Status :</Text>
                    <Text style={{marginLeft: 4, color: COLORS.gray}}>Pending</Text>
                </View> */}
          </TouchableOpacity>
        </View>
        <View style={styles.detailProduk}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 18 }}>Rincian Pembayaran</Text>

          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E1E1E1' }}>
            <Text>Metode Pembayaran</Text>
            <Text style={{ marginLeft: '27%', marginBottom: 10 }}>BCA Virtual Account</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
            <Text>Total Booking</Text>
            <Text style={{ marginLeft: '52.5%' }}>{formatSalary(mitraData?.salary)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Aplication Fee</Text>
            <Text style={{ marginLeft: '59%', marginBottom: 10 }}>{appFee}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Total Order</Text>
            <Text style={{ marginLeft: '56%', marginBottom: 10, fontWeight: 'bold' }}>{formatSalary(totalOrder)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.Cancellisation} onPress={handleCancelContract}>
          <Text style={{ color: COLORS.white }}>Batalkan Kontrak</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InfoOrderMitra

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF3F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    ...SHADOWS.light,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
  },
  backButton: {
    marginLeft: 10,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 16
  },
  invoiceContainer: {
    backgroundColor: '#fff',
    width: '100%',
    ...SHADOWS.light,
    padding: 20
  },
  invoiceS: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tanggalOrder: {
    marginTop: 12,
    flexDirection: 'row'
  },
  detailProduk: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10
  },
  cardDetail: {
    height: 165,
    width: '100%',
    backgroundColor: '#fff',
    ...SHADOWS.light,
    borderRadius: 10,
    padding: 16
  },
  Image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    borderRadius: 6,
  },
  cardContainer: {
    flexDirection: 'row'
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 6
  },
  CategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C685',
    width: 90,
    height: 25,
    borderRadius: 6,
    marginLeft: 87,
    marginTop: -50
  },
  textCategory: {
    color: '#fff',
    padding: 2,
    fontSize: 12
  },
  ButtonUlas: {
    height: 30,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginLeft: '64%',
    marginTop: -28
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
  Cancellisation: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  statusContainer: {
    flexDirection: 'row',
    marginLeft: 190,
    marginTop: -16
  },
})