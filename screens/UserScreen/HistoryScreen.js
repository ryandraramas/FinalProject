import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, SHADOWS, assets } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { URL_API } from '@env';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL_API + 'api/mitra');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatSalary = (value) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>History Transaksi</Text>
      </View>

      <ScrollView style={{marginBtom: 10}} 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          // Check if the index is not 1 to hide the second data item (index 1)
          index !== 0 && index !== 1 && (
          <TouchableOpacity
            key={item.id}
            style={styles.cardHistory}
            onPress={() => navigation.navigate('DetailOrder', { data: item })}
          >
            <View style={styles.cardContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="receipt-outline" size={24} color="#212121" />
              </View>
              <View style={styles.textWrapper}>
                <Text style={{ fontWeight: 'bold', color: '#212121' }}>Order Anda</Text>
                <Text style={{ color: 'grey' }}>16 Mei 2023</Text>
              </View>
              <View style={styles.textStatus}>
                <Text style={{ color: '#05AC0C', fontWeight: 'bold' }}>Selesai</Text>
              </View>
              <View style={styles.iconEllips}>
                <Ionicons name="ellipsis-vertical" size={24} color="#212121" />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={{ uri: URL_API + item?.foto }} style={styles.Image} />
                <Text style={{ marginTop: 10 }}>Total Belanja:</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 2 }}>{formatSalary(item.salary)}</Text>
              </View>
              
              <View>
              <View style={styles.CategoryCard}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {item.name}
                </Text>
                <Text style={styles.textCategory}>
                  {item.category}
                  </Text>
              </View>

              <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.ButtonUlas}>
                  <Text style={{color: COLORS.white, fontWeight: 'bold'}}>Ulas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonBooking}>
                  <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Book Lagi</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
          </TouchableOpacity>
          )
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    height: '100%'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    ...SHADOWS.light,
    height: 50,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  cardContainer: {
    flexDirection: 'row',
    borderBottomColor: "#d7d7d7",
    borderBottomWidth: 1,
  },
  cardHistory: {
    backgroundColor: '#fff',
    height: 226,
    width: '90%',
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 21,
    ...SHADOWS.light,
    padding: 14,
    marginBottom: 12
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    marginTop: 3,
    marginLeft: 8,
    marginBottom: 12
  },
  textStatus:{
    backgroundColor: '#D6FFDD',
    height: 30,
    borderRadius: 6,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
    marginTop: 6
  },
  iconEllips: {
    marginTop: 8,
    marginLeft: 10
  },
  Image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginTop: 14,
    borderRadius: 6,
  },
  CategoryCard: {
    marginLeft: 8,
    marginTop: 10
  },
  textCategory: {
    color: COLORS.dark,
    fontSize: 12,
    marginTop: 2
  },
  ButtonContainer: {
    flexDirection: 'row',
    marginLeft: 56,
    marginTop: 60
  },
  ButtonUlas: {
    height: 30, 
    width: 60, 
    backgroundColor: COLORS.primary, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  ButtonBooking: {
    height: 30, 
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginLeft: 10
  }
})