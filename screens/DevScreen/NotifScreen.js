import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { URL_API } from '@env';
import { COLORS, SHADOWS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const NotifScreen = ({ route }) => {
  const { selectedItem } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.dark}/>
        </TouchableOpacity>
        <Text style={[styles.textHeader, {marginLeft: 110}]}>Detail Promo</Text>
      </View>
      <View style={styles.notificationItem}>
        <Image source={{ uri: URL_API + selectedItem.gambar }} style={styles.image} resizeMode='cover'/>
      </View>
      <ScrollView>
      <View style={styles.syaratKetentuanContainer}>
        <Text style={styles.syaratKetentuan}>{selectedItem.deskripsiPromo}</Text>
      </View>
      <View style={styles.syaratKetentuanContainer}>
        <Text style={[styles.syaratKetentuan, {color: '#000', fontWeight: 'bold', fontSize: 16, marginBottom: 16}]}>Syarat dan Ketentuan Promo</Text>
        <Text style={styles.syaratKetentuan}>{selectedItem.syaratKetentuan}</Text>
      </View>
      </ScrollView>
    </View>
  )
}

export default NotifScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
    height: 50,
    flexDirection: 'row',
    marginTop: 20
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000'
  },
  syaratKetentuanContainer: {
    padding: 10,
    backgroundColor: '#fff'
  },
  syaratKetentuan: {
    color: COLORS.gray
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 14,
    marginTop: 18
  }, 
  image: {
    width: '100%',
    height: 100,
  },
})