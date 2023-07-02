import { useState } from 'react'
import { View, SafeAreaView, FlatList } from 'react-native'

import { COLORS, NFTData } from '../../constants'
import { HomeHeader, FocusedStatusBar, ArtCard } from '../../components'

const HomeScreen = () => {
    const [nftData, setNftData] = useState(NFTData)

    const handleSearch = (value) => {
        if(!value.length) return setNftData

        const filteredData = NFTData.filter((item) => 
          item.name.toLowerCase().includes(value.toLowerCase())
        )

        if(filteredData.length){
            setNftData(filteredData)
        } else { 
            setNftData(NFTData)
        }
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar background={COLORS.primary} />

        <View style={{ flex: 1 }}>
            <View style={{ zIndex:0 }}>
                <FlatList
                data={nftData}
                renderItem={({ item }) => <ArtCard data={item}/>}
                keyExtractor={(item) => item.id}
                showVerticalScrollIndicator={false}
                ListHeaderComponent={<HomeHeader onSearch={handleSearch}/>}
                />
            </View>

            <View style={{
                position: 'absolute',
                top     : 0,
                bottom  : 0,
                right   : 0,
                left    : 0,
                zIndex  : -1
            }}>
                <View style={{ height: 300, backgroundColor: COLORS.primary, borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}/>
                <View style={{ flex: 1, backgroundColor: COLORS.white}}/>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen