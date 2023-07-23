import { View, Image, Text } from "react-native";

import { SIZES, assets } from "../constants";

export const ARTTitle   = ({ title, subTitle, titleSize, subTitleSize }) => {
 return(
    <View>
        <Text 
        style= {{  
            fontSize: titleSize, 
            color: '#000000',
            marginTop:30,
            }}>
            {title}
        </Text>

        <Text 
        style= {{  
            fontSize: subTitleSize, 
            color: '#000000', 
            }}>
            {subTitle}
        </Text>
    </View>
 )
}

export const NFTTitle  = ({ title, subTitle, titleSize, subTitleSize }) => {
    return(
       <View>
           <Text 
           style= {{  
               fontSize: titleSize, 
               color: '#000000',
               marginTop:30,
               }}>
               {title}
           </Text>
   
           <Text 
           style= {{  
               fontSize: subTitleSize, 
               color: '#000000', 
               }}>
               {subTitle}
           </Text>
       </View>
    )
   }

export const Salary   = ({ salary }) => {
 return(
    <View style= {{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{
            fontSize: SIZES.font,
            color: '#000000',
        }}>{salary}
        </Text>
        <Text style={{fontSize: 10, marginLeft: 4}}>/Bln</Text>
    </View>
 )
}

export const Reviewed   = ({ review }) => {
    return(
       <View style= {{ flexDirection: 'row', alignItems: 'center' }}>
           <Image
           source={assets.star}
           resizeMode='contain'
           style={{ width: 15, height: 15, marginRight: 2 }}
           />
           <Text style={{
               fontSize: SIZES.font,
               color: '#000000',
           }}>{review}
           </Text>
       </View>
    )
   }

export const ImageCmp   = ({imgUrl, index}) => {
    return(
        <Image 
        source={imgUrl}
        resizeMode='contain'
        style={{
            width:48,
            height:48,
            marginLeft: index == 0 ? 0 : -SIZES.font
         }}
        />
    )

}

export const People     = () => {
    return(
        <View style = {{ flexDirection: 'row' }}>
            {/* {[assets.person02, assets.person03, assets.person04].map((imgUrl, index) => (
                <ImageCmp imgUrl={imgUrl} index={index} key={`People-${index}`}/>
            ))} */}
        </View>
        )

}

export const EndDate    = () => {
    return(
      <View
        /* style={{
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.base,
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            alignItems: 'Center',
            ...SHADOWS.light,
            elevation: 1,
            maxWidth: '50%'
        }} */
        >
            {/* <Text style={{ 
                fontFamily: FONTS.regular, 
                fontSize: SIZES.small, 
                color: COLORS.primary }}
                >Ending in</Text>

            <Text style={{ 
                fontFamily: FONTS.semiBold, 
                fontSize: SIZES.medium, 
                color: COLORS.primary }}
                >12h 30m</Text> */}
        </View>
        )

}

export const SubInfo    = () => {
    return (
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          marginTop: -SIZES.extraLarge,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <People/>
        <EndDate/>
    </View>
    )
}