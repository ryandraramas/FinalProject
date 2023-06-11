import { useState, useEffect } from 'react'
import { View, SafeAreaView, FlatList } from 'react-native'
import axios from 'axios'

import { COLORS } from '../constants'
import { NFTCard, HomeHeader, FocusedStatusBar } from '../components'

const HomeScreen = () => {
    const [nftData, setNftData] = useState([])

    useEffect(() => {
        fetchNFTData()
    }, [])

    const fetchNFTData = async () => {
        try {
            const response = await axios.get('https://example-api.com/nft-data')
            setNftData(response.data)
        } catch (error) {
            console.log('Error fetching NFT data:', error)
        }
    }

    const handleSearch = (value) => {
        if (!value.length) return setNftData(NFTData)

        const filteredData = nftData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        )

        if (filteredData.length) {
            setNftData(filteredData)
        } else {
            setNftData(NFTData)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar background={COLORS.primary} />

            <View style={{ flex: 1 }}>
                <View style={{ zIndex: 0 }}>
                    <FlatList
                        data={nftData}
                        renderItem={({ item }) => <NFTCard data={item} />}
                        keyExtractor={(item) => item.id}
                        showVerticalScrollIndicator={false}
                        ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
                    />
                </View>

                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        zIndex: -1
                    }}
                >
                    <View style={{ height: 300, backgroundColor: COLORS.primary }} />
                    <View style={{ flex: 1, backgroundColor: COLORS.white }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
