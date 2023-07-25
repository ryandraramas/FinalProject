import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS } from '../../constants';
import { URL_API } from '@env';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const NotifikasiScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(URL_API + 'api/notifications')
      .then(response => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      });
  }, []);

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem} onPress={() => {
      navigation.navigate('DetilNotif', { selectedItem: item });
    }}>
      <Image source={{ uri: URL_API + item.gambar }} style={styles.image} resizeMode='cover' />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Promo Code</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles.notificationList}
          />
        )}
      </View>
    </View>
  );
}

export default NotifikasiScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    ...SHADOWS.light,
    height: 50,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  plusIcon: {
    color: COLORS.primary,
  },
  notificationList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 14,
    marginTop: 20
  },
  image: {
    width: '100%',
    height: 100,
  },
})