import { Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { iclocation } from '../../../asset/images';
import CircleFad from '../../../component/atoms/CircleFad';
import Colors from '../../../component/atoms/Colors';
import {BASE_URL_STAG} from '@env';

const DetailLokasi = ({route , navigation } : any) => {
  const {id_log} = route.params;

  const [data, setData] = useState<any>('');
  const [name, setname] = useState<any>('');

  const [loading, setLoading] = useState(false);

  // console.log("id : " + id_log)

  useEffect (() => {
    getdata()
  }, [])

  const getdata = async () => {

    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 

      setLoading(true)

      axios.get(`${BASE_URL_STAG}/kidsgbigama_api.api.attendance.api.detail?id=`+ id_log, config)
        .then(response => {
          // Handle response
          // console.log(response.data);
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
            setLoading(false)
            setname(response.data.data.event)
            setData(response.data.data)
          }
          else
          {
            setLoading(false)
            ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
          }
       
        })
        .catch(error => {
          // Handle error
          console.log(error);
          setLoading(false)
          ToastAndroid.show(''+ error, ToastAndroid.SHORT);
          // Alert.alert("Login Failed", "Please check your credentials");
        });

    } catch(e){
      throw e;
    }
    
  }


  return (
    <SafeAreaView style ={styles.container}>
  
    <View style={styles.view}>

    {loading ? ( <CircleFad/> ) : (<View></View>)}

      <Image 
        style={styles.styleImage} 
        source={{uri:data.image}}>
      </Image>

      <Text style={styles.styleTextEvent}>{name.name}</Text>
      <Text style={styles.styleTextTime}>{data.date} - {data.time}</Text>

      {/* <TouchableOpacity style={styles.styleTouchableOpacity}
          onPress={() => 
      
          navigation.navigate('Lokasi', {
            data_latitude: data.latitude,
            data_longitude: data.longitude,
          })
      }>
        <Image source={iclocation} style={{
          width:24,
          height:24
        }}>    
        </Image>
        <Text style={styles.texttextlokasi}>Lihat Lokasi</Text>
      </TouchableOpacity> */}

    </View>
    </SafeAreaView>
  )
}

export default DetailLokasi

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  }, 
  view:{
    margin:16,
    flex:1
  }, 
  styleImage:{
    width:'100%',
    height:'75%', 
    borderRadius:30
  },
  styleTextEvent:{
    fontWeight:'bold', 
    alignSelf:'center', 
    marginTop:15,
    color:Colors.black
  }, 
  styleTextTime:{
    fontWeight:'bold', 
    alignSelf:'center', 
    marginTop:5,
    color:Colors.black
  },  
  styleTouchableOpacity:{
    alignSelf:'center', 
    marginTop:10, 
    flexDirection:'row', 
    justifyContent:'center', 
    alignContent:'center', 
    alignItems:'center'
  }, 
  texttextlokasi:{
    fontWeight:'bold', 
    alignSelf:'center', 
    color:Colors.redapp, 
    marginLeft:10
  }
  
})