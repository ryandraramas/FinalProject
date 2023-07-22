import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, assets } from '../constants';

const HomeHeader = ({ onSearch }) => {
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    fetchCustomerName();
  }, []);

  const fetchCustomerName = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.name) {
          setCustomerName(parsedUserData.name);
        } else {
          console.log('Name not found in userData:', parsedUserData);
        }
      } else {
        console.log('userData not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving userData:', error);
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.primary, padding: SIZES.font }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 50, height: 50, marginLeft: 5, marginBottom: 10 }}
        />

        <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{ position: 'absolute', width: 15, height: 15, bottom: 0, right: 0 }}
          />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text style={{ fontSize: SIZES.small, color: COLORS.white }}>
          {`Hello, ${customerName} 👋`}
        </Text>
        <Text style={{ fontSize: SIZES.large, color: COLORS.white, marginTop: SIZES.base / 2 }}>
          Let's find a Home Assistant!
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: '100%',
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Cari Mitra Kesayangan Anda"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
