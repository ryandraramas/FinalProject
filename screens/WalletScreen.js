import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, assets } from '../constants';

const WalletScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          source={assets.card} // Replace with the path to your image
          style={styles.backgroundImage}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardBalance}>Balance</Text>
            <Text style={styles.cardBalance1}>Rp. 1,400,000,-</Text>
            <Text style={styles.cardAccNum}>Account Number</Text>
            <Text style={styles.cardNumber}>•••• •••• 9012 3456</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.historyContent}>
        <View style={styles.historyTextContainer}>
          <Text style={styles.history}>History Payment</Text>
        </View>
        <Ionicons name="time-outline" size={24} color={COLORS.dark} style={styles.time} />
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.cardTitle}>Pembayaran Bulan November</Text>
        <Text style={styles.cardTitleDate}>November, 05 2022</Text>
        <Text style={styles.cardTitleSaldo}>-Rp. 270,000,-</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#F7F6F8',
  },
  card: {
    width: 350,
    height: 220,
    marginHorizontal: '6%',
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
    marginTop: 20,
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
    color: COLORS.white,
    marginTop: 3,
  },
  cardBalance1: {
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: -30,
    color: COLORS.white,
  },
  cardAccNum: {
    fontSize: 16,
    marginTop: 20,
    color: COLORS.white,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -35,
    color: COLORS.white,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: 20,
  },
  historyTextContainer: {
    marginLeft: 10,
    justifyContent: 'left',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  history: {
    fontWeight: 'bold',
    color: COLORS.dark,
    fontSize: SIZES.large,
  },
  time: {
    justifyContent: 'space-between',
    marginLeft: 170,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 16,
    marginLeft: 16,
  },
  historyCard: {
    marginTop: 20,
    width: 350,
    height: 57,
    borderRadius:10,
    backgroundColor: COLORS.white,
  },
  cardTitleDate: {
    fontSize: 10,
    fontWeight: 'light',
    color: '#9E9E9E',
    marginLeft: 16,
  },
  cardTitleSaldo: {
    fontSize: 10,
    fontWeight: 'light',
    color: '#D73737',
    textAlign: 'right', // Menjajarkan teks ke kanan
    marginRight: 16, // Menambahkan margin kanan
    marginTop: -20,
  },
});

export default WalletScreen;
