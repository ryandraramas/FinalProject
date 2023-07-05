import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Keyboard, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';

const CreatePostART = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [text, onChangeText] = useState('');
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Cooking', value: 'Cooking' },
    { label: 'Baby Sitting', value: 'Baby Sitting' },
    { label: 'Gardening', value: 'Gardening' },
    { label: 'Personal Assistant', value: 'Personal Assistant' },
  ]);

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
    // Send data to the server
    const postData = {
      category: value,
      description: text,
      image: selectedImage
    };
  
    // Perform HTTP request to the server
    fetch('your_api_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
        // Navigate to the desired page
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.pickerWrapper} zindex={2}>
        <DropDownPicker
          multiple={true}
          min={1}
          placeholder='Category Anda'
          max={3}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          mode="BADGE"
          dropDownDirection="AUTO"
          showBadgeDot={true}
          badgeDotColors={['#00C685', '#F9F871', '#30687D']}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={setValue}
        />
      </View>

      <View style={styles.inputDescWrapper}>
        <TextInput
          style={styles.inputDesc}
          placeholder="Description"
          editable={true}
          multiline={true}
          numberOfLines={10}
          onChangeText={onChangeText}
          value={text}
          onBlur={handleKeyboardDismiss}
        />
      </View>

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        {selectedImage ? (
          <View style={styles.selectedImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
              resizeMode="contain"
            />
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
    justifyContent: 'space-evenly',
    padding: 5,
    marginBottom: -20
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    height: 40,
    justifyContent: 'center',
    width: '88%',
    zIndex: 1
  },
  picker: {
    borderBottomWidth: 2,
    borderBottomColor: '#9E9E9E',
    borderColor: 'transparent',
    backgroundColor: 'white',
  },
  inputDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -50,
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.small - 2,
  },
  inputDesc: {
    height: 100,
    width: '95%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    borderStyle: 'solid',
    borderColor: COLORS.darkLight,
    alignItems: 'center',
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    borderWidth: 2,
    width: '88%',
    height: '30%',
    marginBottom: -50,
    borderStyle: 'dashed',
    borderColor: COLORS.darkLight,
    borderRadius: 8,
    position: 'fixed',
    alignItems: 'center',
  },
  selectedImageContainer: {
    width: '100%',
    height: 205,
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
    aspectRatio: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  imagePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePickerIcon: {
    textAlign: 'center',
    top: 70,
    color: COLORS.darkLight,
  },
  imagePickerText: {
    marginLeft: 8,
    top: 70,
    fontSize: 16,
    color: COLORS.darkLight,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    marginBottom: -20,
    marginTop: 10,
    padding: SIZES.small,
    minWidth: '90%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreatePostART;
