import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, SHADOWS, assets } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textHeader}>History Transaksi</Text>
        </View>

        <ScrollView>
            <TouchableOpacity style={styles.cardHistory} onPress={() => navigation.navigate('DetailOrder')}>
                <View style={styles.cardContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="receipt-outline" size={24} color="#212121" />
                  </View>
                  <View style={styles.textWrapper}>
                    <Text style={{fontWeight: 'bold', color: '#212121'}}>Order Anda</Text>
                    <Text style={{color: 'grey'}}>16 Mei 2023</Text>
                  </View>
                  <View style={styles.textStatus}>
                    <Text style={{color: '#05AC0C', fontWeight:'bold'}}>Selesai</Text>
                  </View>
                  <View style={styles.iconEllips}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#212121" />
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image source={assets.person} style={styles.Image}/>
                    <Text style={{marginTop: 10}}>
                      Total Belanja:
                    </Text>
                    <Text style={{fontWeight: 'bold', marginTop: 2}}>
                      Rp1.107.500
                    </Text>
                  </View>
                  <Text style={{marginTop: 14, fontWeight:'bold', fontSize: 20}}>
                    Melisa Cahyani
                  </Text>

                  <View style={styles.CategoryCard}>
                    <Ionicons name='ellipse' color={'#fff'} size={10}/>
                    <Text style={styles.textCategory}>
                      Cooking
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
            </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    height: '100%'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 64,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 14
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
    padding: 14
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#00C685',
    width: 70,
    height: 25,
    borderRadius: 6,
    marginTop: 44,
    marginLeft: -141,
    padding: 1
  },
  textCategory: {
    color: '#fff',
    padding: 2,
    fontSize: 12
  },
  ButtonContainer: {
    flexDirection: 'row',
    marginTop: 110,
    marginLeft: -10
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