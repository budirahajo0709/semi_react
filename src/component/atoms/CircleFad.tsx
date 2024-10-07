import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Circle, CircleFade } from 'react-native-animated-spinkit';

const CircleFad = () => {

    return (
      <View style={{ position:'absolute', top:'50%', flex:1, alignSelf:'center'}}>
        <CircleFade
        size={50} 
        color="#f00" >

      </CircleFade>
      </View>
    )
  
}

export default CircleFad;