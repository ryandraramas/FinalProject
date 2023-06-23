import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, VirtualizedList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, assets } from '../../constants';

const StatusBookART = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/AsistenRumahTangga');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddButtonPress = () => {
    navigation.navigate('CreatePostART');
  };

  const renderCardItem = ({ item }) => {
    const profileImageUrl = `https://randomuser.me/api/portraits/men/${item.id}.jpg`;

    let statusColor;
    let statusText;
    if (item.status === 'accepted') {
      statusColor = '#018E5F';
      statusText = 'Accepted';
    } else if (item.status === 'rejected') {
      statusColor = '#D73737';
      statusText = 'Rejected';
    } else {
      // statusColor = '#F9C851';
      statusColor = COLORS.gray;
      statusText = 'Pending';
    }

    return (
      <View style={styles.cardItem}>
        <View style={styles.cardContent}>
          <Image source={{ uri: profileImageUrl }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardEmail}>{item.email}</Text>
            <Text style={styles.cardAddress}>{`${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`}</Text>
          </View>

          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
          </View>
        </View>
      </View>
    );
  };

  const getItemCount = () => data.length;

  const getItem = (data, index) => data[index];

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data available</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={data}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
        contentContainerStyle={styles.cardView}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <Ionicons name="add" size={34} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    marginTop: 20,
    width: 350,
  },
  cardItem: {
    height: 150,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.dark,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardEmail: {
    marginBottom: 4,
  },
  cardAddress: {
    marginBottom: 4,
  },
  statusContainer: {
    position: 'absolute',
    bottom: -14,
    right: 15,
  },
  statusText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusIcon: {
    color: COLORS.primary,
  },
});

export default StatusBookART;
