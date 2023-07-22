import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, SHADOWS } from '../../constants';
import { URL_API } from "@env";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const HomeScreenDev = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const [selectedButton, setSelectedButton] = useState(null);
  const [data, setData] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const storedAdminData = await AsyncStorage.getItem('adminData');
        if (storedAdminData) {
          setAdminData(JSON.parse(storedAdminData));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminData();
  }, []);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    fetchData();
  }, [selectedButton]);

  const fetchData = async () => {
    let url = '';
    if (selectedButton === 'Mitra') {
      url = URL_API + 'api/mitra';
    } else if (selectedButton === 'Pelanggan') {
      url = URL_API + 'api/pelanggan';
    } else {
      return;
    }

    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatSalary = (value) => {
    return value?.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }) || ''; 
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Mitra' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Mitra')}
        >
          <Text style={[styles.buttonText, selectedButton === 'Mitra' && styles.selectedButtonText]}>
            Mitra
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Pelanggan' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Pelanggan')}
        >
          <Text style={[styles.buttonText, selectedButton === 'Pelanggan' && styles.selectedButtonText]}>
            Pelanggan
          </Text>
        </TouchableOpacity>
      </View>
        {selectedButton === 'Mitra' && (
          <ScrollView style={styles.ScrollView}>
            {data &&
              data.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.dataItem}
                  onPress={() => {
                    navigation.navigate('DetailsScreen', { item });
                  }}
                >
                  <Image source={{ uri: URL_API + item.foto }} style={styles.image} resizeMode='cover'/>
                  <Text style={styles.dataTextName}>{item.name}</Text>
                  <Text style={styles.dataText}>{item.email}</Text>
                  <Text style={styles.dataText}>{item.status}</Text>
                  <Text style={styles.dataText}>{item.category}</Text>
                  <Text style={styles.dataSalary}>{formatSalary(item.salary)}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
        
        {selectedButton === 'Pelanggan' && (
          <View style={styles.dataContainer}>
            {data &&
              data.map((item) => (
                <TouchableOpacity
                  key={item.id} 
                  style={styles.dataItem}
                  onPress={() => {
                    navigation.navigate('DetailsScreen', { item });
                  }}
                >
                  <Text style={styles.dataTextName}>{item.name}</Text>
                  <Text style={styles.dataText}>{item.email}</Text>
                  <Text style={styles.dataText}>{item.phoneNumber}</Text>
                  <Text style={styles.dataText}>{item.address}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    height: '100%'
  },
  button: {
    margin: 10,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4
  },
  ScrollView: {
  },
  dataContainer: {
    margin: 10,
  },
  dataItem: {
    marginBottom: 10,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
    padding: 10,
    borderRadius: 14,
  },
  dataTextName: {
    fontWeight: 'bold',
  },
  dataText: {
    fontWeight: '400',
    marginBottom: 6
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 14,
  },
  image: {
    width: '100%',
    height: '60%',
    ...SHADOWS.light
  },
  dataDesc: {
    textAlign: 'justify'
  },
  dataSalary: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default HomeScreenDev;
