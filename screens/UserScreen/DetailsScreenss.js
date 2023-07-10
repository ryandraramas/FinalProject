import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { assets, SHADOWS, COLORS } from '../../constants';

const DetailsScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('Payments');
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image
          source={assets.person}
          resizeMode='cover'
          style={{ width: '100%', height: '100%', justifyContent: 'center' }} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={26} color="black" marginRight={2} />
        </TouchableOpacity>
      </View>


      <View style={styles.cardItem}>
        <View style={styles.card3}>
          <Text style={styles.cardName}>
            Melisa Cahyani
          </Text>
          <Text style={styles.textCategory}>
            Cooking
          </Text>
        </View>

        <View style={styles.salaryContainer}>
        <Image
        source={assets.rp}
        resizeMode='contain'
        style={{ width: 20, height: 20, marginRight: 2 }}
        />
          <Text style={styles.textSalary}>
            250.000
          </Text>
          <Text style={styles.Bulan}>
            /Bln
          </Text>
        </View>
      </View>

      <View style={styles.ContainerDesc}>
        <Text style={styles.titleDesc}>
          Description
        </Text>
        <Text style={styles.description}>
        Saya, Melisa Cahyani, adalah seorang individu yang memiliki motivasi tinggi untuk mencari peluang baru dan mengembangkan karir saya. Saya memiliki keterampilan dan pengetahuan yang relevan di bidang minat saya, serta mampu bekerja secara efektif baik secara mandiri maupun dalam tim. Selain itu, saya memiliki kemampuan komunikasi yang baik dan mudah beradaptasi dengan lingkungan kerja yang beragam. Dengan dedikasi dan komitmen yang kuat, saya siap menghadapi tantangan baru dan memberikan kontribusi yang berharga bagi perusahaan yang saya lamar.
        </Text>
      </View>
    
      <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Booking Sekarang</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
  },
  containerImg: {

  },
  TitleContainer: {
    marginLeft: 20
  },
  backIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 40,
    width: 40,
    ...SHADOWS.dark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  NamaART: {
    fontWeight: 'bold',
  },
  salaryContainer: {
    marginLeft: 260,
    marginTop: -42,
    flexDirection: 'row'
  },
  textSalary: {
    fontWeight: '500',
    marginLeft: -2
  },
  textCategory: {
    marginTop: 6
  },
  Bulan: {
    fontSize: 10,
    marginLeft: 4
  },
  card3: {
    marginLeft: 20,
    marginTop: 20,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    top: '235%'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  ContainerDesc: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  description : {
    textAlign: 'justify',
    color: COLORS.gray
  },
  titleDesc: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 10
  }
})
