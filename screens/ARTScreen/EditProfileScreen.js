import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { URL_API } from "@env";

const EditProfileScreen = ({ route, navigation }) => {
  const { mitraData } = route.params;
  const [name, setName] = useState(mitraData.name || '');
  const [address, setAddress] = useState(mitraData.address || '');
  const [phoneNumber, setPhoneNumber] = useState(mitraData.phoneNumber || '');
  const [email, setEmail] = useState(mitraData.email || '');
  const [deskripsi, setDeskripsi] = useState(mitraData.deskripsi || '');
  
  const handleSaveChanges = async () => {
    try {
      const mitraId = mitraData.id;
  
      // Send updated data to the server using Axios patch request
      const updatedData = {
        name,
        address,
        phoneNumber,
        email,
        deskripsi,
      };
  
      // Use template string to include the actual value of mitraId in the URL
      await axios.patch(`${URL_API}api/mitra/${mitraId}`, updatedData);
  
      // If the update is successful, navigate back to the profile screen
      navigation.goBack();
    } catch (error) {
      console.log('Error updating profile:', error);
      // Show an error message to the user if the update fails
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, {height: 140, }]}
        placeholder="Deskripsi"
        value={deskripsi}
        editable={true}
        multiline={true}
        numberOfLines={10}
        onChangeText={setDeskripsi}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default EditProfileScreen;
