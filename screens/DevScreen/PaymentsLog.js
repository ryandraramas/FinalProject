import { StyleSheet, Text, Image, TextInput, View, ScrollView, } from 'react-native';
import { useState, useEffect } from 'react';
import { COLORS, SIZES, SHADOWS } from '../../constants';
import { URL_API } from '@env';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'


const PaymentsLog = ({onSearch}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = (value) => {
    if (!value.length) {
      setFilteredData(mitraData);
      return;
    }
  
    const filtered = mitraData.filter((item) => {
      const nameMatches = item.name.toLowerCase().includes(value.toLowerCase());
      const categoryMatches = item.category.toLowerCase().includes(value.toLowerCase());
      const salaryMatches = item.salary.toString().includes(value);
  
      const isAvailable = item.status !== 'Unavailable';
  
      return (nameMatches || categoryMatches || salaryMatches) && isAvailable;
    });
  
    setFilteredData(filtered);
  };

  const keyExtractor = (item) => item._id.toString();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchMitraData();
    setIsRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: SIZES.font }}>
        <View style={styles.searchContainer}>
             <Ionicons name="search-outline" size={24} color={COLORS.white} marginRight={14} marginLeft={8}/>
          <TextInput
            placeholder="Cari Daftar Transaksi"
            style={{ flex: 1, height: 14 }}
            onChangeText={onSearch}/>
        </View>
        <ScrollView>
          <View style={styles.cardContainer}>

            <View>

              <View style={styles.card}>
                <View style={styles.cardText}>
                  <Text style={styles.textNama}>Ryandra Rama S</Text>
                  <Text style={styles.textTanggal}>1 July - 30 July 2023</Text>
                </View>
                <Ionicons name="arrow-forward-outline" size={24} color={COLORS.dark} marginRight={14} marginLeft={8}/>
                <View style={styles.cardText}>
                  <Text style={styles.textNama}>Letitia Porters</Text>
                  <Text style={styles.textTanggal}>1 July 2023</Text>
                </View>
                <Image/>
              </View>

              <View style={styles.timestamp}>
                <Text style={[styles.textTanggal, {fontSize: SIZES.base + 2}]}>CreatedAT</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default PaymentsLog

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.small,
    backgroundColor: '#F5F5F5',
  }, 
  searchContainer: {
    width: '100%',
    borderRadius: SIZES.base,
    backgroundColor: '#e3e1e1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.small - 2,
  },
  cardContainer: {
    height: 120,
    backgroundColor: '#fff',
    marginTop: SIZES.small,
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light
  },
  card: {
    flexDirection: 'row',
    padding: SIZES.base,
    marginTop: SIZES.font
  },
  cardText: {
  },
  textNama: {
    fontWeight: 'bold',
  },
  textTanggal: {
    color: COLORS.darkLight,
    fontSize: SIZES.small
  },
  timestamp: {
    marginTop: 14,
    marginLeft: -16
  }
})