import { Alert, Button, Image, Linking, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icflashwhite, icrightwhite } from '../../../asset/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CircleFad from '../../../component/atoms/CircleFad';
import { BASE_URL } from '../../../config';

const Scan = ({route , navigation, } : any) => {
    const {useId} = route.params;

    const [isFlash, setFlash] = useState(false);
    const [loading, setLoading] = useState(false);

    // console.log("Scan" + useId)

    const check =() => {
        setFlash(flash => !flash )
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (

            <TouchableOpacity onPress={check}>
                <Image source={icflashwhite} />
            </TouchableOpacity>
          
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        });
      }, [navigation]);

    const onSuccess = async e => {

        // console.log(e.data)

        try{
            let AccesToken = await AsyncStorage.getItem('AccesToken');
    
            const config = {
              headers: {
                 "Authorization" : `Basic ${AccesToken}`
              }
            } 

            setLoading(true)
    
            const params = {
                student: e.data,
                event: useId ,
            };
    
    
            axios.post(`${BASE_URL}/kidsgbigama_api.api.attendance.api.present_student`, params, config)
            .then(response => {
              // Handle response
              console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");
              if(response.data.meta.status_code == 200)
              {   
                setLoading(false)
                ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
                navigation.navigate('Home');
              }
              else
              {
                setLoading(false)
                ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
              }
           
            })
            .catch(error => {
              // Handle error
              setLoading(false)
              console.log(error);
              ToastAndroid.show(''+ error, ToastAndroid.SHORT);
              // Alert.alert("Login Failed", "Please check your credentials");
            });
    
          } catch(e){
            throw e;
          }



      };

  return (
  
          <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>

            {loading ? ( <CircleFad/> ) : (<View></View>)}

            <QRCodeScanner
            //   onRead={({data}) => console.log("DATA " + data)}
            onRead={onSuccess}
            flashMode={ isFlash ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off}
            
             
              reactivate={true}
              reactivateTimeout={100}
              showMarker={true}

              

              />

            </View>
          </SafeAreaView>


      
     

  )
}

export default Scan

const styles = StyleSheet.create({
    centerText: {
  
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        marginTop:40,
        padding: 16,
        backgroundColor:'#ff0'
      }
})