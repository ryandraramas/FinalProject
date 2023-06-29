import { View, Text } from 'react-native'
import { useState } from 'react'

import { Salary, ArtTitle } from './SubInfo'
import { COLORS, SIZES } from '../constants'

const DetailsDesc = ({ data }) => {
    const [text, setText] = useState(data.description.slice(0, 100));
    const [readMore, setReadMore] = useState(false);
  
    return (
      <>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ArtTitle
            title={data.name}
            subTitle={data.creator}
            titleSize={SIZES.extraLarge}
            subTitleSize={SIZES.font}
          />
              
          {/* harga salary mengambil dari data JobPost Database */}

          <Salary salary={data.salary} /> 
        </View>
  
        <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
          <Text
            style={{
              fontSize: SIZES.font,
              color: COLORS.dark,
            }}
          >
            Description
          </Text>
          <View
            style={{
              marginTop: SIZES.base,
            }}
          >
            <Text
              style={{
                color: COLORS.dark,
                fontSize: SIZES.small,
                lineHeight: SIZES.large,
              }}
            >
              {text}
              {!readMore && "..."}
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: SIZES.small,
                }}
                onPress={() => {
                  if (!readMore) {
                    setText(data.description);
                    setReadMore(true);
                  } else {
                    setText(data.description.slice(0, 100));
                    setReadMore(false);
                  }
                }}
              >
                {readMore ? " Show Less" : " Read More"}
              </Text>
            </Text>
          </View>
        </View>
      </>
    )
  }

export default DetailsDesc