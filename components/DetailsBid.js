import { View, Text, Image } from 'react-native'
import { EthPrice } from './SubInfo'
import { COLORS, SIZES, FONTS } from '../constants'


const DetailsBid = ({ bid }) => {
  return (
    <View style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical:SIZES.base,
        paddingHorizontal:SIZES.base * 2,
    }}>
      <Image
        source={bid.image}
        resizeMode='contain'
        style={{ width: 48, height: 48 }}
      />
      <View>
        <Text style={{
            fontFamily: FONTS.Bold,
            fontSize: SIZES.small,
            color: COLORS.dark
        }}>
            Reviewed By {bid.name}
        </Text>

        <Text style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.darkLight,
            marginTop: 3,
        }}>
            {bid.date}
        </Text>
      </View>

      <EthPrice price={bid.price}/>
    </View>
  )
}

export default DetailsBid