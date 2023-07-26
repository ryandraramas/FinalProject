import { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import axios from 'axios';
import { URL_API } from "@env";

import { COLORS } from '../../constants';
import { HomeHeader, FocusedStatusBar, ArtCard } from '../../components';

const HomeScreen = () => {
  const [mitraData, setMitraData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchMitraData();
  }, []);

  const fetchMitraData = async () => {
    try {
      const timestamp = new Date().getTime(); // Get the current timestamp
      const response = await axios.get(`${URL_API}api/mitra?timestamp=${timestamp}`);
      setMitraData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error if there's an issue fetching the data
    }
  };

  const handleSearch = (value) => {
    if (!value.length) {
      setFilteredData(mitraData);
      return;
    }
  
    const filtered = mitraData.filter((item) => {
      const nameMatches = item.name.toLowerCase().includes(value.toLowerCase());
      const categoryMatches = item.category.toLowerCase().includes(value.toLowerCase());
      const salaryMatches = item.salary.toString().includes(value);
  
      const isAvailable = item.status !== 'Unavailable';
  
      return (nameMatches || categoryMatches || salaryMatches) && isAvailable;
    });
  
    setFilteredData(filtered);
  };

  const keyExtractor = (item) => item._id.toString();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchMitraData();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => <ArtCard data={item} />}
            keyExtractor={keyExtractor}
            showVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{
              height: 300,
              backgroundColor: COLORS.primary,
              borderBottomEndRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
