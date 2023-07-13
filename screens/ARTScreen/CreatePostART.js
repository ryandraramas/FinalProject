import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Keyboard, Text, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, SIZES } from '../../constants';

const CreatePostART = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryPrice, setSelectedCategoryPrice] = useState('');
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [text, onChangeText] = useState('');
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Cleaning', value: 'Cleaning', price: '1.000.000/bulan' },
    { label: 'Cooking', value: 'Cooking', price: '1.200.000/bulan' },
    { label: 'Baby Sitting', value: 'Baby Sitting', price: '2.000.000/bulan' },
    { label: 'Gardening', value: 'Gardening', price: '1.100.000/bulan' },
    { label: 'Personal Assistant', value: 'Personal Assistant', price: '1.200.000/bulan' },
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
      setSelectedCategory(null); // Reset kategori yang dipilih
      setSelectedCategoryPrice(''); // Reset harga yang terkait
    }
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const handleSubmitButtonPress = () => {
    // Send data to the server
    const postData = {
      category: selectedCategory,
      description: text,
      image: selectedImage,
      price: selectedCategoryPrice
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
  const handleCategoryChange = (item) => {
    setSelectedCategory(item.value); // Simpan kategori yang dipilih
    setSelectedCategoryPrice(item.price);
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.headers}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={styles.textHeader}>Buat Postingan Anda</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        
      <View style={styles.pickerWrapper}>
        <DropDownPicker
          multiple={true}
          min={1}
          placeholder='Category Anda'
          max={3}
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
          onChangeValue={handleCategoryChange}
          style={styles.picker}
          containerStyle={styles.pickerContainer}
        />
        <TextInput
          placeholder="Harga yang Tersedia"
          style={styles.TextInput}
          editable={false}
          selectTextOnFocus={false}
          value={selectedCategoryPrice} // Update prop value
          // onChangeText={setTopUpAmount}
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

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          {selectedImage ? (
            <View style={styles.selectedImageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
                resizeMode="cover"
              />
            </View>
          ) : (
            <View style={styles.imagePickerContent}>
              <Ionicons name="image-outline" size={64} style={styles.imagePickerIcon} />
              <Text style={styles.imagePickerText}>Upload Foto Anda</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
    <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButtonPress}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF3F7',
  },
  headers: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70, 
    backgroundColor: '#fff', 
    width: '100%',
    ...SHADOWS.light,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 14,
},
  backButton: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  pickerWrapper: {
    zIndex: 1,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#9E9E9E',
    borderColor: 'transparent',
  },
  pickerContainer: {
    height: 40,
    width: '88%',
    zIndex: 1,
  },
  TextInput: {
    backgroundColor: '#fff',
    height: 40,
    width: '90%',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  inputDescWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  imageContainer : {
    alignItems: 'center',
    position: 'fixed',
  },
  imagePickerButton: {
    borderWidth: 2,
    width: '88%',
    height: '76%',
    borderStyle: 'dashed',
    borderColor: COLORS.darkLight,
    borderRadius: 8,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  selectedImageContainer: {
    height: '130%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedImage: {
    flex: 1,
    borderRadius: 8,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
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
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60, 
    marginBottom: 0, 
    backgroundColor: '#fff', 
    width: '100%',
    ...SHADOWS.dark,
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: SIZES.small,
    alignItems: 'center',
    width: '80%'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CreatePostART;
