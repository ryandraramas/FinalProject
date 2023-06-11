import React from "react";
import { ImageBackground, TouchableOpacity, Text, View, Image } from "react-native";
import { COLORS, SIZES, FONTS, assets } from '../constants';

export const Started = ({ minWidth, fontSize, navigation, ...props }) => (
  <View style={{ flex: 1 }}>
    <ImageBackground
      // source={assets.image1}
      source={require("../assets/images/image1.jpg")}
      resizeMode="cover"
      style={{ flex: 2 }}>


      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          borderRadius: SIZES.large,
          padding: SIZES.large,
          minWidth: minWidth,
          top: '80%',
          height: 50,
          marginLeft: '6%',
          marginRight: '6%',
          justifyContent: 'center',
          alignItems: 'center',
          ...props,
        }}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={{
          fontFamily: FONTS.bold,
          fontSize: fontSize,
          color: COLORS.primary,
        }}>
          Get Started
        </Text>
      </TouchableOpacity>

      
      <View>
        <Text style={{
          fontFamily: FONTS.semiBold,
          marginTop: 300,
          marginLeft: 17,
          fontSize: 20,
          marginLeft: '6%',
          marginRight: '6%',
          color: COLORS.white,
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 0.5,
        }}>
          Expert cleaners will make your home sparkle. Single and recurring cleanings available!
        </Text>
      </View>

      <View style={{ 
        alignItems: 'left', 
        marginTop: 200,  
        marginLeft: '6%',
        marginRight: '6%',}}>
        <Text style={{
          fontFamily: FONTS.regular,
          fontSize: 12,
          textAlign: 'left',
          color: COLORS.white,
        }}>
          By logging in or registering, you agree to our{" "}
          <Text style={{ color: '#F9F871' }}>Terms of Service</Text>{" "}
          and{" "}
          <Text style={{ color: '#F9F871' }}>Privacy Policy</Text>
        </Text>
      </View>
    </ImageBackground>
  </View>
);

export default Started;
