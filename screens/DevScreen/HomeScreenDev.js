import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS, SHADOWS } from '../../constants';
import { URL_API } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreenDev = () => {
  const navigation = useNavigation();
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
    return (
      value?.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }) || ''
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Mitra' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Mitra')}>
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Mitra' && styles.selectedButtonText,
            ]}>
            Mitra
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Pelanggan' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Pelanggan')}>
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Pelanggan' && styles.selectedButtonText,
            ]}>
            Pelanggan
          </Text>
        </TouchableOpacity>
      </View>
      {selectedButton === 'Mitra' && (
        <ScrollView style={styles.scrollView}>
          {data &&
            data.map((item) => (
              <View
                key={item.id}
                style={styles.dataItem}>
                <Image
                  source={{ uri: URL_API + item.foto }}
                  style={styles.image}
                  resizeMode='cover'
                />
                <View style={{ marginLeft: 14, marginRight: 14 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 12,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[styles.dataTextName, { fontSize: 20 }]}>
                      {item.name}
                    </Text>
                    <View style={styles.statusCard}>
                      <Text
                        style={{
                          color: '#05AC0C',
                          fontWeight: '400',
                        }}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.dataText}>{item.category}</Text>
                  <Text style={styles.dataText}>{item.email}</Text>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.dataSalary}>
                      {formatSalary(item.salary)}
                    </Text>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => {
                        navigation.navigate('Validation', { selectedItem: item });
                      }}>
                      <Text style={styles.nextButtonText}>
                        Validasi
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      )}

      {selectedButton === 'Pelanggan' && (
        <ScrollView style={styles.scrollView}>
          <View style={[styles.dataContainerPel, {}]}>
            {data &&
              data.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.dataItemPel}
                  onPress={() => {
                    navigation.navigate('DetailsScreen', { item });
                  }}>
                  <Text style={styles.dataTextName}>{item.name}</Text>
                  <Text style={styles.dataText}>{item.email}</Text>
                  <Text style={styles.dataText}>{item.phoneNumber}</Text>
                  <Text style={styles.dataText}>{item.address}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
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
    marginBottom: 4,
  },
  scrollView: {
    flex: 1,
    padding: 12,
  },
  dataContainer: {
    margin: 10,
  },
  dataItem: {
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
    borderRadius: 14,
    marginBottom: 20,
    height: 320,
  },
  dataItemPel: {
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
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  statusCard: {
    backgroundColor: '#D6FFDD',
    height: 30,
    borderRadius: 6,
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    ...SHADOWS.light,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  dataDesc: {
    textAlign: 'justify',
  },
  dataSalary: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 80,
    marginTop: -8
  },
  nextButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreenDev;
