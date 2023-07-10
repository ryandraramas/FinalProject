import React from "react";
import { View, Text, Image } from "react-native";

import { Reviewed } from "./SubInfo";
import { COLORS, SIZES } from "../constants";

const DetailsBid = ({ reviews }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={reviews.id}
    >
      <Image
        source={reviews.image}
        resizeMode="contain"
        style={{ width: 48, height: 48 }}
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: SIZES.base,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.small,
            color: COLORS.dark,
          }}
        >
          Bid placed by {reviews.name}
        </Text>
        <Text
          style={{
            fontSize: SIZES.small - 2,
            color: COLORS.darkLight,
            marginTop: 3,
          }}
        >
          {reviews.date}
        </Text>
      </View>

      <Reviewed price={reviews.review} />
    </View>
  );
};

export default DetailsBid;