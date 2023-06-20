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
      aspect: [1, 1],
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
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        {selectedImage ? (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} resizeMode="contain" />
          </View>
        ) : (
          <View style={styles.imagePickerContent}>
            <Ionicons name="image-outline" size={64} style={styles.imagePickerIcon} />
            <Text style={styles.imagePickerText}>Add Your Image</Text>
          </View>
        )}
      </TouchableOpacity>
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
    paddingTop: '80%',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  imagePickerButton: {
    marginTop: 5,
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
  selectedImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  selectedImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    height: undefined,
    aspectRatio: 1,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    minWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreatePostART;
