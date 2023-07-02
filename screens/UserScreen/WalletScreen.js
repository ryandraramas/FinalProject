import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, assets } from '../../constants';

const WalletScreen = ({ navigation }) => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    fetchCustomerData().then((data) => {
      setCustomerData(data);
    });
  }, []);

  const goToTopUpScreen = () => {
    navigation.navigate('TopUp');
  };

  const fetchCustomerData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = {
          name: 'John Doe',
          accountNumber: Math.floor(Math.random() * 900000000000) + 100000,
          balance: 1400000,
        };
        resolve(customer);
      }, 1000);
    });
  };

  if (!customerData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          source={assets.card}
          style={styles.backgroundImage}
          resizeMode="cover"
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardBalance}>Balance</Text>
            <Text style={styles.cardBalance1}>Rp. {customerData.balance.toLocaleString()},-</Text>
          </View>

          <View style={styles.cardContent1}>
            <Text style={styles.cardAccNum}>Account Number</Text>
            <Text style={styles.cardNumber}>{customerData.accountNumber}</Text>
          </View>

          <TouchableOpacity style={styles.transferButton} onPress={goToTopUpScreen}>
            <Ionicons name="push-outline" size={24} color={COLORS.white} />
            <Text style={styles.transferButtonText}>TopUp</Text>
          </TouchableOpacity>

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
    marginTop: 35,
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
    marginRight: 80,
  },
  cardBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: '8%',
  },
  cardBalance1: {
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: -30,
    color: COLORS.white,
  },
  cardAccNum: {
    fontSize: 16,
    marginTop: 65,
    color: COLORS.white,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: COLORS.white,
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '80%',
    marginBottom: 20,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowOffset: { width: -1, height: 0 },
  },
  transferButtonText: {
    fontSize: 10,
    color: COLORS.white,
    top: 18,
    right: 29,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: 20,
  },
  historyTextContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  history: {
    fontWeight: 'bold',
    color: COLORS.dark,
    fontSize: 16,
  },
  time: {
    marginLeft: 180,
    bottom: 5,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 16,
    marginLeft: 16,
  },
  historyCard: {
    marginTop: 16,
    width: 350,
    height: 57,
    borderRadius: 10,
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
    textAlign: 'right',
    marginRight: 16,
    marginTop: -20,
  },
  cardContent1: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: '56%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WalletScreen;
