import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { icsemi } from './asset/images'
import { PoppinsText } from './asset/font'
import TextInputLogin from './component/TextInputLogin'
import { AuthContext } from './context/AuthContext'
import axios , { AxiosResponse } from 'axios';
import { BASE_URL } from './config'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Router from './router'
import Home from './pages/Home'





const App = () => {

  const Stack = createNativeStackNavigator();

  return (


  
   
  
    <NavigationContainer>

      <Router>
        
      </Router>

    {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator> */}

    </NavigationContainer>

   
    

  
  )

}



export default App;
