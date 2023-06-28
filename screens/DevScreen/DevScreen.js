import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const DevScreen = ({navigation}) => {
    
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
  )
}

export default DevScreen

const styles = StyleSheet.create({
    backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
})