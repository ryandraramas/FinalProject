import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SubInfo, Salary, ARTTitle } from './SubInfo';
import { COLORS, SIZES, SHADOWS, assets } from '../constants';
import { CircleButton, RectButton } from './Button';

const ArtCard = ({ data }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        // const response = await fetch('https:');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const imageUrl = json.results[0].picture.large;
        setImage(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark, }}>

        <View style={{ width: '100%', height: 250 }}>
          {image && (
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: SIZES.font,
                borderTopRightRadius: SIZES.font,
              }}
            />
          )}
          <CircleButton imgUrl={assets.heart} right={10} top={10} />
        </View>

      <SubInfo />

      <View style={{ width: '100%', padding: SIZES.font }}>
        {/* Nama */}
        <ARTTitle
          title={data.name}
          subTitle={data.category}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Salary salary={data.salary} /> 
            {/* Salary Mengambil data dari jobpost */}

          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate('Details', { data })}/>
        </View>
      </View>
    </View>
  );
};

export default ArtCard;
