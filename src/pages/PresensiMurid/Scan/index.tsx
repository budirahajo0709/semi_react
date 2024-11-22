import { Alert, Button, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icflashwhite, icrightwhite } from '../../../asset/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CircleFad from '../../../component/atoms/CircleFad';
import { BASE_URL } from '../../../config';
import {BASE_URL_STAG} from '@env';
import Colors from '../../../component/atoms/Colors';
import Toast from 'react-native-simple-toast';

const Scan = ({route , navigation, } : any) => {
    const {useId} = route.params;
    const {TanggalAbsen} = route.params;
    
    const [isFlash, setFlash] = useState(false);
    const [loading, setLoading] = useState(false);

    
    // console.log("Scan" + useId)

    if(TanggalAbsen === '')
      {
    
      }
      else
      {
        var date = TanggalAbsen.split(' ')[0];
        var time = TanggalAbsen.split(' ')[1].split('.')[0];
    
        // console.log("date  : " + date)
        // console.log("time  : " + time)
      }

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
            backgroundColor: Colors.redapp,
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

            let params 

            if(TanggalAbsen === '')
              {
                 params = {
                  student: e.data,
                  event: useId ,
                }
              }
              else
              {
                 params = {
                  student: e.data,
                  event: useId ,
                  date : date,
                  time : time
                };
         
              }

            // const params = {
            //     student: e.data,
            //     event: useId ,
            // };
    
            // console.log("log params" + JSON.stringify(params))

            axios.post(`${BASE_URL_STAG}/kidsgbigama_api.api.attendance.api.present_student`, params, config)
            .then(response => {
              // Handle response
              console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");
              if(response.data.meta.status_code == 200)
              {   
                setLoading(false)

                let aa = response.data.data
         
             
                // ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
                // navigation.navigate('Home');

                navigation.navigate('Succces',{
                  aa, 
                  useId : useId,
                  TanggalAbsen : TanggalAbsen
                });
              }
              else
              {
                setLoading(false)
                Toast.show(''+ response.data.meta.message, Toast.SHORT);
              }
           
            })
            .catch(error => {
              // Handle error
              setLoading(false)
              console.log(error);
              Toast.show(''+ error, Toast.SHORT);
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
              reactivateTimeout={5000}
              showMarker={true}
              cameraProps={{
                autoFocus:'on'
              }}

              

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