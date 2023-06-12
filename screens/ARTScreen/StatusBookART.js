import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';

const StatusBookART = () => {
  return (
    <View style={styles.container}>
      <Text>StatusBookART</Text>
      <View style={styles.cardView} />
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={34} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    height: 200,
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plusIcon: {
    color: COLORS.primary,
  },
});

export default StatusBookART;
