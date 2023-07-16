import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, assets } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatusBookART = () => {
  const navigation = useNavigation();
  const [mitraData, setMitraData] = useState(null);

  useEffect(() => {
    const fetchMitraData = async () => {
      try {
        const storedMitraData = await AsyncStorage.getItem('mitraData');
        if (storedMitraData) {
          setMitraData(JSON.parse(storedMitraData));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMitraData();
  }, []);

  const handleAddButtonPress = () => {
    navigation.navigate('CreatePostART');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ height: 200 }}
        source={assets.cardBg}
        resizeMode="cover"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
      >
        <View style={styles.textStyle}>
          <Text style={styles.Name}>Hi {mitraData ? mitraData.name : 'User'}!</Text>
          <Text style={styles.Name1}>Welcome to Maid Match</Text>
          <View style={styles.inform}>
            <Text style={styles.saldo}>Saldo Anda :</Text>
            <Text style={styles.saldo1}>Rp650.000</Text>
          </View>
        </View>

        <View style={styles.card2}>
          <View style={styles.iconCard}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
              <Ionicons name="add" size={28} style={styles.plusIcon} />
              <Text style={styles.title}>Buat Post</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="download-outline" size={26} style={styles.plusIcon} />
              <Text style={styles.title1}>Tarik Tunai</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="time-outline" size={25} style={styles.plusIcon} />
              <Text style={styles.title2}>History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusBook}>
          <Text style={styles.textStatus}>Status Postingan Anda </Text>
        </View>

        <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate("Info")}>
          <View style={styles.card3}>
            <Text style={styles.cardName}>Melisa Cahyani</Text>
          </View>
          <View style={styles.cardCat}>
            <Ionicons name='ellipse' color={'#fff'} />
            <Text style={styles.textCategory}>Cooking</Text>
          </View>
          <View style={styles.salaryContainer}>
            <Text style={styles.textSalary}>Rp250.000</Text>
            <Text style={styles.Bulan}>/Bln</Text>
          </View>
          <Image source={assets.person} style={styles.ImgCard} />
          <View style={styles.statusContainer}>
            <Text style={{ fontWeight: '500' }}>Status :</Text>
            <Text style={{ marginLeft: 4, color: COLORS.gray }}>Pending</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default StatusBookART;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textStyle: {
    marginTop: 35,
    marginLeft: 20,
  },
  Name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 7
  },
  Name1: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  inform: {
    flexDirection: 'row',
    marginTop: 20
  },
  saldo: {
    color: COLORS.white,
    fontWeight: '400',
    fontSize: 16
  },
  saldo1: {
    fontWeight: '400',
    fontSize: 16,
    color: '#e6d02e'
  },
  card2: {
    height: 80,
    width: '90%',
    backgroundColor: '#fff',
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  iconCard: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  addButton: {
    marginHorizontal: 40,
    marginTop: 20,
  },
  plusIcon: {
    color: COLORS.primary
  },
  title: {
    fontSize: 10,
    marginLeft: -9,
    color: COLORS.primary
  },
  title1: {
    fontSize: 10,
    marginLeft: -13,
    marginTop: 3,
    color: COLORS.primary
  },
  title2: {
    fontSize: 10,
    marginLeft: -4,
    color: COLORS.primary,
    marginTop: 3
  },
  statusBook: {
    marginLeft: 16,
    marginTop: 14
  },
  textStatus: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#525252'
  },
  cardItem: {
    height: 140,
    width: '90%',
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 15,
    marginLeft: 20,
    padding: 10
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 4
  },
  cardCat: {
    backgroundColor: '#00C685',
    marginLeft: 4,
    width: 90,
    height: 25,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textCategory: {
    color: '#fff',
    textAlign: 'center',
  },
  salaryContainer: {
    marginLeft: 4,
    marginTop: 40,
    flexDirection: 'row'
  },
  textSalary: {
    fontWeight: '500'
  },
  Bulan: {
    fontSize: 10,
    marginLeft: 4
  },
  statusContainer: {
    flexDirection: 'row',
    marginLeft: 205,
    marginTop: 14
  },
  ImgCard: {
    height: 80,
    width: 80,
    marginLeft: 220,
    borderRadius: 10,
    marginTop: -110
  },
});
