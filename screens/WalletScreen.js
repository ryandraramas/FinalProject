import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const WalletScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          source={require("../assets/images/card_visa_bg.png")} // Replace with the path to your image
          style={styles.backgroundImage}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}>
            
          <View style={styles.cardContent}>
            <Text style={styles.cardBalance}>Balance</Text>
            <Text style={styles.cardBalance1}>Rp. 1,400,000,-</Text>
            <Text style={styles.cardAccNum}>Account Number</Text>
            <Text style={styles.cardNumber}>•••• •••• 9012 3456</Text>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  card: {
    width: 350,
    height: 220,
    marginHorizontal: '6%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: -80,
    padding: 16,
  },
  cardBalance: {
    fontSize: 16,
    color: 'white',
    marginTop:3,
  },
  cardBalance1: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -30,
  },
  cardAccNum: {
    fontSize: 16,
    color: 'white',
    marginTop:20,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop:-35,
  },
});

export default WalletScreen;
