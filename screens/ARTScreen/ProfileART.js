import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Avatar, Title, Text, TouchableRipple } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API } from "@env";

const ProfileART = () => {
  const navigation = useNavigation();
  const [mitraData, setMitraData] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('mitraData');
      setMitraData(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Started' }],
      });
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };
  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', { mitraData });
  };


  return (
    <View style={styles.container}>
      <View>
        <View style={styles.contaierEdit}>
          <TouchableRipple style={styles.editButton} onPress={handleEditProfile}>
            <View style={styles.editContainer}>
              <Text>Edit Profile</Text>
              <Ionicons name="create-outline" color="#777777" size={18} marginLeft={4}/>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: URL_API + mitraData?.foto,
              }}
              size={80}/>
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, { marginTop: 26, marginBottom: 5 }]}>
                {mitraData?.name || 'Melisa Cahyani'}
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="location-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {mitraData?.address || 'Surabaya, Rungkut'}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="call-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {mitraData?.phoneNumber || '+62 821 4260 4907'}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {mitraData?.email || 'Melisa_Cahyani@gmail.com'}
            </Text>
          </View>          
        </View>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={handleLogout}>
            <View style={[styles.menuItem, {  }] }>
              <Ionicons name="log-out-outline" color="#f73131" size={20} />
              <Text style={[styles.menuItemText, { color: 'red', fontWeight: '600', }]}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default ProfileART;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuWrapper: {
    marginTop: -28
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 1,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontSize: 14,
    lineHeight: 26,
  },
  editContainer: {
    flexDirection: 'row'
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  contaierEdit: {
    marginTop: 16,
    marginBottom:16
  }
});
