import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ImageBackground, ScrollView } from 'react-native';
import { assets, SHADOWS, COLORS, SIZES } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const BCATopUp = ({ minWidth, fontSize, navigation }) => {
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);

  const handleAmountPress = (amount) => {
    setTopUpAmount(amount);
  };

  const handleButtonPressIn = () => {
    setSelectedButton('primary');
  };

  const handleButtonPressOut = () => {
    setSelectedButton(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ backgroundColor: '#fff', height: '29%' }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Bank Central Asia (BCA)</Text>
        </View>

        <Text style={styles.TopUp}>Top Up Ke</Text>

        <View style={styles.cardCash}>
          <Image source={assets.LogoBg} style={styles.LogoBg} />
          <View style={styles.cardContainer}>
            <Text style={styles.WalletCash}>Wallet Cash</Text>
            <Text style={styles.saldo}>Saldo Rp1.400.000</Text>
          </View>
        </View>
      </View>

      <View style={styles.nominalTopUp}>
        <Text style={styles.TopUpTitle}>Pilih Nominal Top Up</Text>

        <TextInput
          placeholder="Dikenakan biaya top up Rp1.000"
          style={styles.TextInput}
          value={topUpAmount}
          onChangeText={setTopUpAmount}
        />

        <Text style={styles.MinimTopUp}>Minimal TopUp Rp100.000*</Text>

        <View style={styles.numWrapper}>
          <TouchableOpacity
            style={[
              styles.cardView,
              selectedButton === 'Rp100.000' && { borderColor: COLORS.primary, borderWidth: 1 },
            ]}
            onPress={() => handleAmountPress('Rp100.000')}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={styles.textView}>Rp100.000</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardView,
              selectedButton === 'Rp200.000' && { borderColor: COLORS.primary, borderWidth: 1 },
            ]}
            onPress={() => handleAmountPress('Rp200.000')}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={styles.textView}>Rp200.000</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardView,
              selectedButton === 'Rp500.000' && { borderColor: COLORS.primary, borderWidth: 1 },
            ]}
            onPress={() => handleAmountPress('Rp500.000')}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={styles.textView}>Rp500.000</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.debitCard}>
        <Text style={styles.DebitTitle}>Kartu Debit</Text>
        <ImageBackground source={assets.bcaCard} style={styles.BCATopUp} imageStyle={styles.ImageBg}>
          <Image source={assets.bca_putih} style={styles.bcaLogo} />
          <Text style={styles.CardText}>**** **** **** 7562</Text>
          <Text style={styles.CardText}>BCA TopUP</Text>
          <Text style={styles.CardText}>Limit Rp600.000</Text>
        </ImageBackground>
      </View>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Top Up Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BCATopUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    height: '110%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top: 35,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  TopUp: {
    marginLeft: 20,
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardCash: {
    backgroundColor: '#fff',
    height: 80,
    width: '94%',
    marginLeft: 13,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  LogoBg: {
    height: 80,
    width: 80,
  },
  cardContainer: {
    marginLeft: 20,
  },
  WalletCash: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  saldo: {
    fontSize: 14,
    color: COLORS.gray,
  },
  nominalTopUp: {
    height: '28%',
    width: '100%',
    marginTop: 12,
    backgroundColor: '#fff',
  },
  TopUpTitle: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  TextInput: {
    backgroundColor: '#E5F8FF',
    height: 40,
    width: '90%',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
    padding: 10,
  },
  numWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  cardView: {
    ...SHADOWS.light,
    height: 46,
    width: 110,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
  },
  textView: {
    textAlign: 'center',
    marginTop: 16,
  },
  MinimTopUp: {
    color: '#D73737',
    fontSize: 10,
    marginLeft: 22,
    marginTop: 4,
  },
  debitCard: {
    backgroundColor: '#fff',
    height: '28%',
    marginTop: 12,
  },
  BCATopUp: {
    height: 120,
    width: '84%',
    marginLeft: 20,
    marginTop: 14,
    padding: 10,
  },
  DebitTitle: {
    marginLeft: 20,
    marginTop: 14,
    fontWeight: 'bold',
    fontSize: 16,
  },
  ImageBg: {
    borderRadius: 20,
  },
  CardText: {
    color: '#fff',
    marginLeft: 6,
    marginBottom: 4,
  },
  bcaLogo: {
    height: 50,
    width: 80,
    marginTop: -14,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    padding: SIZES.large,
    marginHorizontal: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
