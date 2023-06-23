import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants';

const CreatePostART = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
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
    // Handle submit button press
    // For example, submit the selected image and its data
  };

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '50%',
    }}>
      <TouchableOpacity style={{
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
      }} onPress={handleBackButtonPress}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 3,
      }}>
        <DropDownPicker
          multiple={true}
          min={1}
          max={3}
          containerStyle={{
            height: 40,
            justifyContent: 'center',
            width:'88%',
            bottom: '40%',
          }}
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#9E9E9E',
            borderColor: 'transparent',
            backgroundColor: 'white',
          }}
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
          onChangeValue={(value) => setValue(value)}
        />

      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        top: -10,
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.small - 2,
      }}>
        <TextInput style={{
           marginTop: 5,
           borderWidth: 1,
           width: '96%',
           height: '100%',
           borderStyle: 'solid',
           borderColor: COLORS.darkLight,
           borderRadius: 8,
           padding: 16,
           alignItems: 'center'
        }} placeholder="Description" />
      </View>

      <TouchableOpacity style={{
        marginTop: 5,
        borderWidth: 2,
        width: '88%',
        height: '50%',
        borderStyle: 'dashed',
        borderColor: COLORS.darkLight,
        borderRadius: 8,
        padding: 16,
        position: 'fixed',
        alignItems: 'center',
      }} onPress={pickImage}>
        {selectedImage ? (
          <View style={{
            width: '100%',
            height: 205,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <Image source={{ uri: selectedImage }} style={{
              flex: 1,
              width: '100%',
              height: '100%',
              borderRadius: 8,
              height: undefined,
              aspectRatio: 1,
            }} resizeMode="contain" />
          </View>
        ) : (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Ionicons name="image-outline" size={64} style={{
              textAlign: 'center',
              top: 70,
              color: COLORS.darkLight,
            }} />
            <Text style={{
              marginLeft: 8,
              top: 70,
              fontSize: 16,
              color: COLORS.darkLight,
            }}>Add Your Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={{
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        padding: SIZES.small,
        minWidth: '88%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
    }} onPress={handleSubmitButtonPress}>
        <Text style={{
          color: 'white',
          fontSize: 16,
        }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostART;
