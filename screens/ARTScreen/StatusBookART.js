import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { COLORS } from '../../constants';

const StatusBookART = () => {
    const navigation = useNavigation();
    const handleAddButtonPress = () => {
        navigation.navigate('CreatePostART');
      };
  return (
    <View style={styles.container}>

        <View style={styles.card1}>
            <View style={styles.textStyle}>
                <Text style={styles.Name}>Hi Melisa!</Text>
                <Text style={styles.Name1}>Welcome to Maid Match</Text>
             <View style={styles.inform}>
                <Text style={styles.saldo}>Saldo Anda : </Text>
                <Text style={styles.saldo1}>Rp650.000</Text>
             </View>
            </View>
            
            <View style={styles.card2}>

                <View style={styles.iconCard}>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                        <Ionicons name="add" size={28} style={styles.plusIcon} />
                        <Text style={styles.title}>Buat Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton} >
                        <Ionicons name="download-outline" size={26} style={styles.plusIcon} />
                        <Text style={styles.title1}>Tarik Tunai</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton}  >
                        <Ionicons name="time-outline" size={25} style={styles.plusIcon} />
                        <Text style={styles.title2}>History</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.statusBook}>
                <Text style={styles.textStatus}>Status Postingan Anda </Text>
            </View>

            <View style={styles.cardItem}>
                <View style={styles.card3}>
                    <Text>
                        Nama
                    </Text>
                </View>
            </View>

        </View>
    </View>
  )
}

export default StatusBookART

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5F5F5',
        backgroundColor:'#e1e1e1'
    },
    card1: {
        backgroundColor: COLORS.primary,
        height: 200,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    textStyle: {
        marginTop: 35,
        marginLeft: 20,
    },
    Name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 7
    },
    Name1: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 20,
    },
    inform: {
        rowGap: 0,
        flexDirection: 'row',
        marginTop: 20
    },
    saldo: {
        color: COLORS.white,
        fontWeight: '400',
        fontSize: 16
    },
    saldo1: {
        fontWeight: '400',
        fontSize: 16,
        color: '#e6d02e'
    },
    card2: {
        height: 80,
        width: '90%',
        backgroundColor: '#fff',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 20,
    },
    iconCard : {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    addButton: {
        marginHorizontal: 40,
        marginTop: 20,
    },
    plusIcon: {
        color: COLORS.primary
    },
    title : {
        fontSize: 10,
        marginLeft: -9,
        color: COLORS.primary
    },
    title1 : {
        fontSize: 10,
        marginLeft: -13,
        marginTop: 3,
        color: COLORS.primary
    },
    title2: {
        fontSize: 10,
        marginLeft: -4,
        color: COLORS.primary,
        marginTop: 3
    },
    statusBook: {
        marginLeft: 16,
        marginTop: 14
    },
    textStatus: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#525252'
    },
    cardItem:{
        height: 110,
        width:'90%',
        backgroundColor: COLORS.white,
        marginTop: 20,
        borderRadius: 15,
        marginLeft: 20
    },
    card3: {  
    }
})