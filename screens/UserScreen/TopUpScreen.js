import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { assets } from '../../constants';

const Card = ({ bank, onPress }) => {
  const renderCardImage = () => {
    if (bank.localAsset === 'bca') {
      return <Image source={assets.bca} style={{height: 30, width: 50, resizeMode: 'contain', marginHorizontal: 6}} />;
    } else if (bank.localAsset === 'alfamart') {
      return <Image source={assets.alfamart} style={{height: 20, width: 45, resizeMode: 'contain', marginHorizontal: 10}} />;
    } else if (bank.localAsset === 'indomart') {
      return <Image source={assets.indomart} style={{height: 20, width: 45, resizeMode: 'contain', marginHorizontal: 10}} />;
    } else {
      return <Ionicons name={bank.iconName} size={24} color="black" marginLeft={20} />;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {renderCardImage()}
      <Text style={styles.TopupName}>{bank.label}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

const TopUpScreen = () => {
  const navigation = useNavigation();
  const data = require('./bank_data.json');

  const handleCardPress = (index) => {
    // Handle card press logic
    switch (index) {
      case 0:
        navigation.navigate('ScreenA');
        break;
      case 1:
        navigation.navigate('ScreenB');
        break;
      case 2:
        navigation.navigate('ScreenC');
        break;
      case 3:
        navigation.navigate('ScreenD');
        break;
      case 4:
        navigation.navigate('ScreenE');
        break;
      case 5:
        navigation.navigate('ScreenF');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={assets.spectrum}
        resizeMode='cover'
        imageStyle={styles.backgroundImageStyle}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Top Up</Text>

          <View style={styles.textWrapper}>
            <Text>Saldo Wallet Cash: Rp1.2452</Text>
            <Text style={styles.textMaks}>Maks. Saldo Wallet Cash Rp 20.000.000</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.methodContainer}>
        <Text style={styles.method}>Pilih Metode</Text>
      </View>

      <ScrollView style={styles.bankContainer}>
        {data.slice(0, 6).map((bank, index) => (
          <Card key={index} bank={bank} onPress={handleCardPress} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center'
  },
  backgroundImageStyle: {
    opacity: 0.3
  },
  backgroundImage: {
    width: '100%',
    backgroundColor: '#DFF8F2',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textWrapper: {
    fontWeight: '400',
    top: 15,
    alignItems: 'center',
  },
  textMaks: {
    color: '#999999'
  }, 
  methodContainer: {
    marginTop: 20,
    marginBottom: -40,
    marginLeft: -235
  },
  method: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bankContainer: {
    flex: 1,
    marginTop: 50, // Adjust this value based on the desired spacing
    paddingTop: -50, // Adjust this value based on the desired spacing
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    width: 335,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: 24,
    height: 24,
  },
  TopupName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bankValue: {
    fontSize: 16,
    marginBottom: 4,
    marginRight: 5,
  },
});

export default TopUpScreen;
