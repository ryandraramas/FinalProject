import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('API_ENDPOINT_URL');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user data, navigate to login screen, etc.
    setUserData(null);
    navigation.navigate('Started');
    // Additional logout actions if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: userData?.avatar || 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                {userData?.name || 'John Doe'}
              </Title>
              {/* <Caption style={styles.caption}>{userData?.username}</Caption> */}
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="location-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {userData?.location || 'Surabaya, Rungkut'}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="call-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {userData?.phone || '+62 821 4260 4907'}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="mail-outline" color="#777777" size={20} />
            <Text style={{ color: '#777777', marginLeft: 20 }}>
              {userData?.email || 'john_doe@email.com'}
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

          {/* <TouchableRipple onPress={handleLogout} > */}
            <TouchableRipple  onPress={() => navigation.navigate("Started")} >
            <View style={[styles.menuItem, {  }] }>
              <Ionicons name="log-out-outline" color="#f73131" size={20} />
              <Text style={[styles.menuItemText, { color: 'red', fontWeight: '600', }]}>Logout</Text>
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
});
