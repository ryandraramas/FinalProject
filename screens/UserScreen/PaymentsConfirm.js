import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { assets, COLORS } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaymentsConfirm = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.Title}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Payment Succesful!</Text>
        </View>
        <LottieView
          source={assets.lottie}
          autoPlay
          loop
          style={styles.animation}/>
          <View style={styles.Title1}>
            <Text style={{fontSize: 14, fontWeight: '400'}}>Yeay! You completed your payment</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TabNavigator")}>
            <Text style={{color: 'white'}}>Kembali Ke home</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

export default PaymentsConfirm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
      },
      Title: {
        marginTop: 100,
        marginBottom: 20
      },
      animation: {
        width: 250, 
        height: 250, 
        marginBottom: 20
      },
      Title1: {
        marginBottom: 20
      },
      button: {
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        height: 40,
        width: 200,
        borderRadius: 10,
        marginTop: 80
      }
})