import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { iccamera } from '../../asset/images'
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import Geolocation from '@react-native-community/geolocation';
import { PoppinsText } from '../../asset/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getDefaultConfig } from '@react-native/metro-config';
import { getDistance } from 'geolib';
import CircleFad from '../../component/atoms/CircleFad';
import { BASE_URL } from '../../config';
import {BASE_URL_STAG} from '@env';



const PresensiGuru = ( {navigation} : {navigation:any}) => {

  const [userInfo, SetuserInfo] = useState<any>(null);
  const [distance, SetDistance] = useState<any>('');
  const [textvalue, SetTextValue] = useState<any>('');
  const [initialRegion, setInitialRegion] = useState<any>(null)
  

  const check = (() => {
       distance > parseFloat(userInfo?.radius) ? SetTextValue("di luar") : SetTextValue("di dalam")
  })

  useEffect(() => { 
    Geolocation.getCurrentPosition(
      (pos) => {
      setInitialRegion(pos.coords);
    })
  }, []);

  useEffect (()=> {
    getlokasi()
  }, [])

  const getlokasi = async () => {

    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      let token = JSON.stringify(AccesToken);

      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 

      axios.get(`${BASE_URL_STAG}/kidsgbigama_api.api.attendance.api.valid_location`, config)

        .then(response => {
          // Handle response
          // console.log("aa"+ JSON.stringify(response.data.data));
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
            let userInfo = response.data.data;  
            SetuserInfo(userInfo);
          }
          else
          {
            ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
          }
       
        })
        .catch(error => {
          // Handle error
          console.log(error);
          ToastAndroid.show(''+ error, ToastAndroid.SHORT);
          // Alert.alert("Login Failed", "Please check your credentials");
        })
        .finally
        {};

    } catch(e){
      throw e;
    }

  }
  
  useEffect(() => {
    test();
  },[distance, userInfo])

  const test = () => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (userInfo?.latitude * Math.PI) / 180;
    const φ2 = (initialRegion?.latitude * Math.PI) / 180;
    const Δφ = ((initialRegion?.latitude - userInfo?.latitude) * Math.PI) / 180;
    const Δλ = ((initialRegion?.longitude - userInfo?.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let aa = (R*c)

    SetDistance(Math.floor(aa))
    
    console.log("distance test =?", Math.floor(aa))
    return R * c; // Distance in meters
  };

  
  useEffect(()=>{
    check()
  },[distance]
  );

  const handleLanjut = () => {
    if(textvalue === 'di luar')
    {
      ToastAndroid.show('Anda berada di luar radius', ToastAndroid.SHORT);
    }
    else
    {
      var lokasi = initialRegion

      navigation.navigate('Pilih Ibadah', {
        lokasi
      });
    }
  }
 

  return (

    <View style={styles.container}>

    {!initialRegion ? (<CircleFad/>) : (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      zoomEnabled={true}
      zoomTapEnabled={true}
      zoomControlEnabled={true}
      initialRegion={{
        latitude: initialRegion?.latitude ,
        longitude: initialRegion?.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}
    >

      {!userInfo ? (<View></View>) : (
        <Circle
          center={{latitude:userInfo.latitude, longitude:userInfo.longitude}}
          radius={parseFloat(userInfo.radius)} // Radius in meters
          fillColor="rgba(255, 0, 0, 0.5)" // Fill color with opacity
          strokeColor="rgba(0, 0, 0, 1)" // Stroke color with opacity
          strokeWidth={1} // Stroke width
      
      />)}

    </MapView>

  )}

  <View style={styles.viewstylefooter}>

    {!userInfo ? (<View style={{marginVertical:15}} ><CircleFad></CircleFad></View>) : (
      <View style={{justifyContent:'center',  marginTop:5}}>
               <Text style={styles.textfooter}>Anda berada {textvalue} radius presensi, </Text>
               <Text style={styles.textfooter}>Lanjut untuk presensi </Text>
      </View>
    )}

      <TouchableOpacity style={styles.buttonstyle} 
        disabled={!userInfo ? true : false}
        onPress={()=> handleLanjut()}>
        <PoppinsText 
          style={styles.textstylebutton} >LANJUT</PoppinsText>
      </TouchableOpacity>

    </View>

  </View>


  )
}

export default PresensiGuru

const styles = StyleSheet.create({
    container: {
      flex:1
    },
    map: {
      width: '100%',
      height: '78%',
    },
    buttonstyle:{
      backgroundColor:'#df1e4d',
      paddingTop:10,
      paddingBottom:10,
      paddingVertical:10,
      paddingHorizontal:10,
      marginTop:35,
      borderRadius:15, 
      elevation:2,
      width:'90%'
    }, 
    textstylebutton:{
      fontFamily: 'Poppins-Bold', 
      color:'#fff', 
      alignContent:'center', 
      textAlign:'center',
      fontWeight:'bold',
      fontSize:20
    }, 
    viewstylefooter:{
      backgroundColor:'#fff', 
      flex:1, gap:10, 
      justifyContent:'center', 
      alignItems:'center'
    }, 
    textfooter:{
      fontWeight:'bold', 
      alignSelf:'center', 
      justifyContent:'center'
    }
})