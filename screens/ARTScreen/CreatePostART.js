import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';

const CreatePostART = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access the camera roll is required!');
      }
    };

    requestPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const handleSubmitButtonPress = () => {
    // Handle submit button press
    // For example, submit the selected image and its data
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <View style={styles.imagePickerContent}>
          <Ionicons name="image-outline" size={64} style={styles.imagePickerIcon} />
          <Text style={styles.imagePickerText}>Add Your Image</Text>
        </View>
      </TouchableOpacity>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButtonPress}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  imagePickerButton: {
    marginBottom: -75,
    marginTop: 450,
    borderWidth: 2,
    width: '80%',
    borderStyle: 'dashed',
    borderColor: COLORS.darkLight,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  imagePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePickerIcon: {
    textAlign: 'center',
    color: COLORS.darkLight,
  },
  imagePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.darkLight,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    minWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 100,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreatePostART;
