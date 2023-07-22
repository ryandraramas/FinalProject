import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { Salary, ARTTitle } from "./SubInfo";
import { COLORS, SIZES } from "../constants";

const DetailsDesc = ({ data }) => {
  const [text, setText] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setName(data?.name); 
    setCategory(data?.category); 
    setSalary(data?.salary);
  };

  useEffect(() => {
    setText(data?.deskripsi?.slice(0, 100));
  }, [data]);

  const handleReadMoreToggle = () => {
    if (!readMore) {
      setText(data?.deskripsi);
      setReadMore(true);
    } else {
      setText(data?.deskripsi?.slice(0, 100));
      setReadMore(false);
    }
  };
  const formatSalary = (value) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -34,
          marginBottom: 16
        }}
      >
        <ARTTitle
          title={data?.name}
          subTitle={data?.category} 
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
        />

       <Salary salary={formatSalary(salary)} />
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
              onPress={handleReadMoreToggle}
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
