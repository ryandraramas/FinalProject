import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Title, Text, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

const UserScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the user data from AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      navigation.navigate('Started');
    } catch (error) {
      console.log('Error while logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15,  }}>
            <Avatar.Image
              source={{
                uri: userData?.avatar || 'https://xsgames.co/randomusers/avatar.php?g=male',
              }}
              size={80}
            />
            <View style={{ marginLeft: 16, marginTop: 10 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                {userData?.name || 'Anda Belum Login'}
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="location-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {userData?.address || 'Anda Belum Login'}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="call-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
            {userData?.phoneNumber ? '+62 ' + userData.phoneNumber : '+62 821 4260 4907'}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {userData?.email || 'Anda Belum Login'}
            </Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="card-outline" color="#777777" size={20} />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={handleLogout}>
            <View style={[styles.menuItem, { }]}>
              <Ionicons name="log-out-outline" color="#f73131" size={20} />
              <Text style={[styles.menuItemText, { color: 'red', fontWeight: '600' }]}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
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
    marginTop: -28,
    marginLeft: -10
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
});
