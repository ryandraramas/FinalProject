import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { URL_API } from '@env';
import axios from 'axios';

const ValidationScreen = ({ route }) => {
    const { selectedItem } = route.params;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [status, setStatus] = useState(selectedItem.status);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const formatSalary = (value) => {
    return (
      value?.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }) || ''
    );
  };

  const sliceDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const words = description.split(' ');
      let slicedDescription = '';
      let wordCount = 0;

      for (const word of words) {
        if ((slicedDescription + word).length <= maxLength) {
          slicedDescription += word + ' ';
          wordCount++;
        } else {
          break;
        }
      }

      if (wordCount < words.length) {
        slicedDescription += '...';
      }

      return slicedDescription;
    }
  };

  const toggleDescription = () => {
    setShowFullDescription((prevShowFullDescription) => !prevShowFullDescription);
  };

  const renderDescription = () => {
    const maxLength = 100;
    const slicedDescription = sliceDescription(selectedItem.deskripsi, maxLength);

    if (showFullDescription || selectedItem.deskripsi.length <= maxLength) {
      return (
        <>
          <Text style={styles.description}>{selectedItem.deskripsi}</Text>
          {selectedItem.deskripsi.length > maxLength && (
            <Text style={styles.readMoreLink} onPress={toggleDescription}>
              Show Less
            </Text>
          )}
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.description}>{slicedDescription}</Text>
          <Text style={styles.readMoreLink} onPress={toggleDescription}>
            Read More
          </Text>
        </>
      );
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.patch(`${URL_API}api/mitra/${selectedItem._id}/status`, {
        status: 'Unavailable',
      });

      if (response.status === 200) {
        setStatus('Unavailable');
        Alert.alert('Status Updated', 'Status has been updated successfully.');
      } else {
        console.error('Failed to update status');
        Alert.alert('Error', 'Failed to update status. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'An error occurred while updating status. Please try again later.');
    }
  };

  const handleHideData = async () => {
    try {
      const response = await axios.patch(`${URL_API}api/mitra/${selectedItem._id}/hide`, {
        status: 'Hidden',
      });

      if (response.status === 200) {
        // Handle successful hiding of data, e.g., navigate back to the previous screen or show a success message
      } else {
        console.error('Failed to hide data');
      }
    } catch (error) {
      console.error('Error hiding data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: URL_API + selectedItem.foto }}
        style={styles.image}
        resizeMode='cover'
      />

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{selectedItem.name}</Text>
          <View style={styles.statusCard}>
            <Text style={{ color: '#05AC0C', fontWeight: '400' }}>
              {selectedItem.status}
            </Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.textTitle}>Tanggal Lahir</Text>
            <Text style={styles.textContent}>{formatDate(selectedItem.date)}</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.textTitle}>Email</Text>
            <Text style={styles.textContent}>{selectedItem.email}</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.textTitle}>Alamat</Text>
            <Text style={styles.textContent}>{selectedItem.address}</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.textTitle}>Nomor Hp</Text>
            <Text style={styles.textContent}>{selectedItem.phoneNumber}</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.textTitle}>Harga</Text>
            <Text style={styles.harga}>{formatSalary(selectedItem.salary)}</Text>
          </View>
        </View>

        <Text style={[styles.textTitle, { marginTop: 12 }]}>Deskripsi</Text>
        <Text style={styles.description}>{renderDescription()}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <TouchableOpacity
            style={styles.button}
            onPress={handleUpdateStatus}
            >
            <Text style={styles.buttonText}>Update Status</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={handleHideData}
            >
            <Text style={styles.buttonText}>Hide Data</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ValidationScreen;

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    padding: 10,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '40%',
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  statusCard: {
    backgroundColor: '#D6FFDD',
    height: 30,
    borderRadius: 6,
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 10,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  textTitle: {
    fontWeight: '700',
  },
  description: {
    textAlign: 'justify',
    color: 'gray',
  },
  harga: {
    fontSize: 16,
  },
  textContent: {
    color: 'gray',
  },
  readMoreLink: {
    color: '#000',
  },
  button: {
    flex: 1,
    backgroundColor: '#05AC0C',
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
  }
});
