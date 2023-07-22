import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

const NotificationItem = ({ title, message }) => {
  return (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationMessage}>{message}</Text>
    </View>
  );
};

const NotificationART = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching notifications from the backend API
    const fetchNotifications = async () => {
      try {
        // Simulate an API request delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Dummy notifications data
        const dummyNotifications = [
          {
            id: 1,
            title: 'Login Success',
            message: 'You have successfully logged in.',
          },
          {
            id: 2,
            title: 'New Message',
            message: 'You have a new message from a user.',
          },
          {
            id: 3,
            title: 'Reminder',
            message: 'Don\'t forget to complete your profile.',
          },
        ];

        setNotifications(dummyNotifications);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationItem title={item.title} message={item.message} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 18
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555555',
  },
});

export default NotificationART;
