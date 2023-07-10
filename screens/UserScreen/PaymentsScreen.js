import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, assets } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const PaymentsScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [countryLocation, setCountryLocation] = useState('');
  const [subtotal, setSubtotal] = useState("Rp1.100.000");
  const [appFee, setAppFee] = useState("Rp7.500");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState("Rp1.107.500");
  const [price, setPrice] = useState("1.100.000");

  useEffect(() => {
    fetch('URL_BACKEND/art')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if there's an issue fetching the data
      });
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        const deliveryLocation = data[0]?.address?.street; // Example: Get the first user's street address
        setDeliveryLocation(deliveryLocation);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if there's an issue fetching the data
      });
  }, []);

  const handlePayment = () => {
    const calculatedTotal = subtotal + appFee - discount;

    fetch('URL_BACKEND/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        deliveryLocation,
        subtotal,
        appFee,
        discount,
        total: calculatedTotal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('PaymentsConfirm');
      })
      .catch((error) => {
        console.error(error);
        alert('Payment failed. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: '2%' }}>
          <TouchableOpacity
              style={{
                position: 'absolute',
                zIndex: 1
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={24} color='black'  />
          </TouchableOpacity>
            <Text style={styles.titleScreen}>Checkout</Text>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>Asisten Rumah Tangga</Text>
              <View style={{
                  flexDirection: 'row',
                  marginTop:13,
               }}>
                  <Image source={assets.person} style={styles.images}/>
                  <View style={{ 
                    marginLeft: 10,
                    marginBottom: 1,
                  }}>
                  <Text style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>Mitchell Russell </Text>
                      <Text style={{
                        fontSize: 12,
                        color: COLORS.darkLight,
                      }}>Cleaning Services</Text>

                      <Text style={{
                        fontSize: 12,
                        color: COLORS.darkLight,
                      }}>3070 Blossom Hill Rd</Text>

                        <Text style={{
                          marginLeft: 193,
                          fontWeight: '500',
                          bottom: 18
                        }}>Rp{price}</Text>
                        
                  </View>
              </View>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>Home Address</Text>
              <View style={{
                flexDirection: 'row',
                marginTop:13,
                marginBottom: 10,
              }}>
                <View style={{
                  backgroundColor: COLORS.tertiary,
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                  <Ionicons name="location-outline" size={24} color={COLORS.white}  />
                </View>
                <View style={{ 
                  marginLeft: 10,
                  marginTop: 2,
                  justifyContent: 'center',
                }}>
                <Text style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>{deliveryLocation}</Text>
                </View>
              </View>
        </View>

        <View style={styles.itemWrapper}>
          <Text style={styles.Tittle}>Payment Method</Text>
            <View style={{
                  flexDirection: 'row',
                  marginTop:13,
                  marginBottom: 10,
                }}>
                  <View style={{
                    backgroundColor: '#F0F0F0',
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                  }}>
                    <Ionicons name="wallet-outline" size={24} color={COLORS.tertiary}  />
                  </View>
                  <View style={{ 
                    marginLeft: 10,
                    marginTop: 2,
                    justifyContent: 'center',
                  }}>
                  <Text style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>Wallet</Text>
                      <Text style={{
                        fontSize: 12,
                        color: COLORS.darkLight,
                      }}>*** 876 </Text>
                  </View>
              </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <Text style={styles.Tittle}>Order Summary:</Text>
          <View style={{marginTop: 10}}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{subtotal}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>App Fee:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{appFee}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Discount:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{discount}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total:</Text>
              <Text style={[styles.summaryValue, { textAlign: 'right' }]}>{total}</Text>
            </View>
          </View>
      </View>

      {/* <TouchableOpacity style={styles.button1} onPress={handlePayment}> */}
      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("PaymentsConfirm")}>
        <Text style={styles.buttonText}>Pay - {total} </Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
  },
  itemWrapper: {
    marginTop: 45,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkLight,
  },
  textSummary: {
    color: COLORS.darkLight
  },
  Tittle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: -25,
  },
  titleScreen: {
    fontSize: SIZES.extraLarge,
    fontWeight: '500',
    color: COLORS.dark,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 12,
  },
  button1: {
    backgroundColor: '#0E8995',
    borderRadius: 15,
    padding: SIZES.small,
    marginTop: 45,
    minWidth: '79%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.gray
  },
  images:{
    height: 45,
    width: 45,
    borderRadius: 10
  }
});
