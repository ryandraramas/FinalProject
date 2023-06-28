import {Text, View, SafeAreaView, Image, StatusBar, FlatList} from 'react-native'
import {COLORS, SIZES, SHADOWS, assets} from '../constants'
import {CircleButton, RectButton, SubInfo, FocusedStatusBar, DetailsDesc, DetailsBid} from '../components'
import React from 'react'

const DetailsHeader = ({ data, navigation }) => (
    <View style={{ width: '100%', height: 373 }}>

      <Image       // Render Dari DataBase Foto Asisten RUmah Tangga
        source={data.image}
        resizeMode='center'
        style={{ 
          width: '100%',
          height: '90%',
          justifyContent: 'center'
          }}/>     

      <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}/>

      <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={StatusBar.currentHeight + 10}
      />

    </View>
)

const Details = ({ route, navigation }) => {
  const { data } = route.params
  return (
    <SafeAreaView style={{ flex:1 }}>
      <FocusedStatusBar
      barStyle='dark-content'
      backgroundColor='transparent'
      transLucent={true}
      />
    <View style={{
      width: '100%',
      position: 'absolute',
      bottom: 0,
      paddingVertical: SIZES.font,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,}}>
      <RectButton minWidth={170} {...SHADOWS.dark}
        handlePress={() => navigation.navigate('Payments')}
      />
    </View> 

    <FlatList     // Render Deskripsi From Database JobPost.js
      data={data.bids}
      renderItem={({ item }) => <DetailsBid bid={item}/> }
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ paddingBottom: SIZES.extraLarge }}
      ListHeaderComponent={() => (
        <React.Fragment>
          <DetailsHeader data={data} navigation={navigation}/>
          <SubInfo/>
          <View style={{ padding: SIZES.font}}>

            <DetailsDesc data={data}/>

            {data.bids.length > 0 &&(
              <Text style={{
                fontSize: SIZES.font,
                color:COLORS.primary
              }}>
                Review
              </Text>
            )}
          </View>
        </React.Fragment>
      )}
    />

    </SafeAreaView>
  )
}

export default Details