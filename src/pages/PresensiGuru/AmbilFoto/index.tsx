import { Image, PermissionsAndroid, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCamera } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PoppinsText } from '../../../asset/font';
import { ic_profile, iccamera } from '../../../asset/images';
import { Circle } from 'react-native-maps';
import CircleFad from '../../../component/atoms/CircleFad';
import { BASE_URL } from '../../../config';
import {BASE_URL_STAG} from '@env';

const AmbilFoto = ({route , navigation } : any) => {
    const {event} = route.params;
    const {lokasi_lat} = route.params;
    const {lokasi_long} = route.params;

    const [fileData, setFileData] = useState(null);
    const [value, setValue] = useState('Open Camera');

    const [loading, setLoading] = useState(false);

    useEffect (() => {
      requestCameraPermission()
    }, [])


    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

   const handlepost = async() => {
        try{
            let AccesToken = await AsyncStorage.getItem('AccesToken');

            setLoading(true)

            const config = {
              headers: {
                 "Authorization" : `Basic ${AccesToken}`
              }
            } 
        
            const params = {
                event: event,
                image: 'data:image/jpeg;base64,' + fileData,
                latitude: lokasi_lat,
                longitude: lokasi_long,
                type: 'masuk',
            };  
    
            axios.post(`${BASE_URL_STAG}/kidsgbigama_api.api.attendance.api.present_instructor`, params, config)
            .then(response => {
              // Handle response
              // console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");
              if(response.data.meta.status_code == 200)
              {   
                setLoading(false)
                ToastAndroid.show('Berhasil presensi', ToastAndroid.SHORT);
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
              // Alert.alert("Login Failed", "Please check your credentials");
              ToastAndroid.show(error, ToastAndroid.SHORT);
            });
    
          } catch(e){
            throw e;
          }
      }

     const launchNativeCamera = async () => {
        let options = {
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, (response) => {
        //   console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            
            // const source = { uri: response.uri };
            // // console.log('response', JSON.stringify(response));
            setFileData(response.assets[0].base64);
            // setImage(response.assets[0].uri)
            // console.log('response AA', response.assets[0].base64);

            //post data

            setValue("Kirim")
 
          }
        });
    
      }
  
  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.viewstyle}>

      <Image 
        source=
        {
           !fileData ? ic_profile : {uri :'data:image/jpeg;base64,' + fileData,}
        }
        style={styles.styleimage}>
      </Image>

      {/* <CircleFad/> */}
      {loading ? ( <CircleFad/> ) : (<View></View>)}
      <TouchableOpacity 
          style={styles.styleTouchableOpacity}  
          onPress={()=>  value === 'Open Camera'? launchNativeCamera() : handlepost()  }>

          <PoppinsText 
            style={styles.textTouchableOpacity} > {value}
          </PoppinsText>
    
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  )
}

export default AmbilFoto

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#fff'
  }, 
  viewstyle:{
    margin:16, 
    flex:1
  }, 
  styleimage:{
    width: '100%',
    height: '70%',
    alignSelf: 'center',
    resizeMode: 'cover',
    borderRadius: 20,
    borderColor:"#c9c9c9",
    elevation:3,
    borderWidth:1
  }, 
  styleTouchableOpacity:{
    backgroundColor:'#df1e4d',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    marginTop:120, 
    position:'absolute',
    bottom:10, 
    width:'100%',
  }, 
  textTouchableOpacity:{
    fontFamily: 'Poppins-Bold', 
    color:'#fff', 
    alignContent:'center', 
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  }
})