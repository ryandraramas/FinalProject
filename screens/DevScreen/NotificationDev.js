import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS } from '../../constants';
import { URL_API } from '@env';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios'; 

const NotificationDev = () => {
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
    <TouchableOpacity style={styles.notificationItem} onPress={() => { navigation.navigate('NotifScreen', { selectedItem: item });
    }}>
      <Image source={{ uri: URL_API + item.gambar }} style={styles.image} resizeMode='cover'/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     <View>
     <View style={styles.header}>
        <Text style={styles.textHeader}>Notifikasi</Text>
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
     <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={34} style={styles.plusIcon} />
        </TouchableOpacity>
     </View>
    </View>
  );
}

export default NotificationDev

const styles = StyleSheet.create({
  container:{    
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
    height: 50,
  },
  textHeader: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000'
  },
  addButtonContainer: {
    marginTop: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light
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
