import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SubInfo, Salary, ARTTitle } from './SubInfo';
import { COLORS, SIZES, SHADOWS, assets } from '../constants';
import { CircleButton, RectButton } from './Button';
import { URL_API } from "@env";

const ArtCard = ({ data }) => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setName(data?.name); 
    setCategory(data?.category); 
    setSalary(data?.salary); 
    setStatus(data?.status);
  };
  
  const getStatusDisplayText = (status) => {
    return status === 'available' ? 'Available' : 'Unavailable';
  };

  const formatSalary = (value) => {
    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View style={{ width: '100%', height: 250 }}>
        <Image
          source={{ uri: URL_API + data?.foto }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
        <CircleButton imgUrl={assets.heart} right={10} top={10} />
      </View>

      <SubInfo />

      <View style={{ width: '100%', padding: SIZES.font, }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
           
          <ARTTitle
            title={name}
            subTitle={category}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
          />
          <View style={{
            backgroundColor: '#D6FFDD',
            height: 30, 
            borderRadius: 6, 
            width: 78, 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: 18
            }}>

            <Text style={{ color: '#05AC0C', fontWeight:'400'}}>{status}</Text>
          </View>
          
        </View>

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Salary salary={formatSalary(salary)}/>
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate('Details', { data })}
          />
        </View>
      </View>
    </View>
  );
};

export default ArtCard;
