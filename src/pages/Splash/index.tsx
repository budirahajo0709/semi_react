import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icsemi, icseminew } from '../../asset/images'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation} : {navigation:any}) => {

    useEffect(() => {
        setTimeout( () => {
            // navigation.replace('Login');
            handleGetToken()
        
        }, 3000)
    }, []);

    const handleGetToken = async () => {

      try{
        let AccesToken = await AsyncStorage.getItem('AccesToken');
        console.log("AccesToken :"+ AccesToken)

        if(!AccesToken)
          {
            navigation.replace('Login')
          } 
          else 
          {
            navigation.replace('Home')
          }

      } catch(e){
        console.log('errororrr');
        console.log(e);
      }
 
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style ={styles.image}>
        <Image source={icseminew} style={{width:150, height:150}} />
      </View>
    </SafeAreaView>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex : 1, 
        backgroundColor : '#fff',
      }, 
    image:{
        flex:1,
        justifyContent : 'center',
        alignContent:'center', 
        alignItems:'center'
    
      }
})