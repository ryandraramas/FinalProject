import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, assets } from '../../constants';
import { BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import { URL_API } from "@env";
import { AirbnbRating } from 'react-native-ratings';
import 'react-native-gesture-handler'

const DetailOrderScreen = ({ route }) => {
    const navigation = useNavigation();
    const { data } = route.params;
    const bottomSheetModalRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    const snapPoints = ["75%"]

    function handlePresentModal() {
        bottomSheetModalRef.current?.present()
        setIsOpen(true)
    }
    const handleReviewChange = (text) => {
        setReview(text)
    }
    
  return (
    <BottomSheetModalProvider>
    <View style={[styles.container]}>
        <View style={styles.header}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} >
            <Ionicons name="chevron-back-outline" size={24} color="#2C2C2C" marginTop={10} />
            </TouchableOpacity>           
            <Text style={styles.textHeader}>
                Detail Order
            </Text>
        </View>
        <ScrollView style={{ }}>
            <View style={styles.invoiceContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 18}}>
                    Invoice
                </Text>
                    <View style={styles.invoiceS}>
                    <Text style={{fontSize: 12, color: COLORS.darkLight,}}>
                        INV/20230718/MPL3240294623
                    </Text>
                    <Ionicons name="newspaper-outline" color={COLORS.darkLight} marginLeft={10} size={16}/>
                    </View>
                <View style={styles.tanggalOrder}>
                    <Text style={{fontSize: 12, color: COLORS.darkLight,}}>
                        Tanggal Order
                    </Text>
                    <Text style={{fontSize: 12, color: COLORS.black, marginLeft: 120}}>
                       18 Mei 2023, 20:42 WIB
                    </Text>
                </View>
            </View>

            <View style={styles.detailProduk}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 18}}>Detail Mitra</Text>
                <TouchableOpacity style={styles.cardDetail}>
                    <View style={styles.cardContainer}>
                        <Image source={{ uri: URL_API + data?.foto }} style={styles.Image}/>
                        <Text style={styles.textName}>{data?.name}</Text>
                    </View>
                    <View style={styles.CategoryCard}>
                        <Text style={styles.textCategory}>
                        {data?.category}
                        </Text>
                    </View>
                    <Text style={{marginTop: 40}}>
                      Total Harga:
                    </Text>
                    <Text style={{fontWeight: 'bold', marginTop: 2}}>
                      Rp1.107.500
                    </Text>
                    <TouchableOpacity style={styles.ButtonUlas}>
                      <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Booking Lagi</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={styles.detailProduk}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 18}}>Rincian Pembayaran</Text>

                <View style={{flexDirection:'row', borderBottomWidth: 1, borderBottomColor:'#E1E1E1'}}>
                    <Text>Metode Pembayaran</Text>
                    <Text style={{ marginLeft: '26%', marginBottom: 10, fontWeight: 'bold' }}>BCA Virtual Account</Text>
                </View>
                <View style={{flexDirection:'row', marginBottom: 10, marginTop: 10 }}>
                    <Text>Total Booking</Text>
                    <Text style={{ marginLeft: '52%' }}>Rp1.107.500</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Aplication Fee</Text>
                    <Text style={{ marginLeft: '59%', marginBottom: 10 }}>Rp7.500</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ fontWeight: 'bold' }}>Total Order</Text>
                    <Text style={{ marginLeft: '56%', marginBottom: 10, fontWeight: 'bold' }}>Rp1.107.500</Text>
                </View>                
            </View>
        </ScrollView>

        <View style={styles.footer}>
        <TouchableOpacity style={styles.Ulasan} onPress={handlePresentModal}>
            <Text style={{color: COLORS.white}}>Beri Ulasan</Text>
        </TouchableOpacity>
        
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                onDismiss={() => setIsOpen(false)}
                style={styles.BottomSheetModal}
                backgroundStyle={{ borderRadius: 30, }}
                >
                <View style= {styles.containerModal}>
                <AirbnbRating 
                count={5}
                selectedColor='#FFC400'
                />
                <TextInput
                    style={styles.reviewInput}
                    value={review}
                    onChangeText={handleReviewChange}
                    placeholder="Enter your review..."
                    placeholderTextColor={COLORS.darkLight}
                    editable={true}
                    multiline={true}/>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                </View>

            </BottomSheetModal>
        
        </View>
    </View>
    </BottomSheetModalProvider>
  )
}

export default DetailOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF3F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60, 
        backgroundColor: '#fff', 
        width: '100%',
        ...SHADOWS.light,
        borderBottomColor: '#d7d7d7',
        borderBottomWidth: 1,
    },
    backButton: {
        marginLeft: 10,
    },
    textHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 16,
        marginTop: 10
    },
    invoiceContainer: {
        backgroundColor: '#fff',
        width: '100%',
        ...SHADOWS.light,
        padding: 20
    },
    invoiceS: {
        flexDirection: 'row',
        marginTop: 10,
    },
    tanggalOrder: {
        marginTop: 12,
        flexDirection: 'row'
    },
    detailProduk: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 10
    },
    cardDetail: {
        height: 165,
        width: '100%',
        backgroundColor: '#fff',
        ...SHADOWS.light,
        borderRadius: 10,
        padding: 16
    },
    Image: {
        height: 80,
        width: 80,
        borderRadius: 10,
        borderRadius: 6,
    },
    cardContainer: {
        flexDirection: 'row'
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 6
    }, 
    CategoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -36,
        marginTop: -50
    },
    textCategory: {
        color: '#000',
        padding: 2,
        fontSize: 12
    },
    ButtonUlas: {
        height: 30, 
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        marginLeft: '64%',
        marginTop: -28
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60, 
        backgroundColor: '#fff', 
        width: '100%',
        ...SHADOWS.dark,
        borderBottomColor: '#d7d7d7',
        borderBottomWidth: 1,
    },
    Ulasan: {
        backgroundColor: COLORS.primary,
        height: 40,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    containerModal: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    reviewInput: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.darkLight,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    submitButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
})