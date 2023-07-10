import React, { useState } from "react";
import { View, Text } from "react-native";

import { Salary, ARTTitle } from "./SubInfo";
import { COLORS, SIZES,  } from "../constants";

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
          marginTop: -28,
          marginBottom: 10
        }}
      >
        <ARTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />

        <Salary salary={data.salary} />
      </View>

      <View style={{ marginVertical: SIZES.extraLarge * 1.5, marginTop: 5 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: SIZES.font,
            color: 'black',
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
              color: COLORS.darkLight,
              fontSize: SIZES.small,
              lineHeight: SIZES.large,
              textAlign: 'justify'
            }}
          >
            {text}
            {!readMore && "..."}
            <Text
              style={{
                color: COLORS.dark,
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
  );
};

export default DetailsDesc;