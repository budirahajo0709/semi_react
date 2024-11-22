import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PoppinsText } from '../../../asset/font';
import { icradioincheck, icradiouncheck } from '../../../asset/images';
import CircleFad from '../../../component/atoms/CircleFad';
import { BASE_URL } from '../../../config';
import {BASE_URL_STAG} from '@env';
import Toast from 'react-native-simple-toast';


const PilihIbadah = ({route , navigation, } : any) => {
  // const {lokasi} = route.params;

  const [checked, setChecked] = useState(0);
  const [usedata, setdata] = useState<any>([]);
  const [useId, setUse] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getdata();
    },[])

    const getdata = async () => {
      try{
        let AccesToken = await AsyncStorage.getItem('AccesToken');

        setLoading(true)

        const config = {
          headers: {
             "Authorization" : `Basic ${AccesToken}`
          }
        } 
    
        axios.get(`${BASE_URL_STAG}/kidsgbigama_api.api.event.api.list?page=1&per_page=10`, config)
          .then(response => {
            // Handle response
            // console.log(response.data);
            // Alert.alert("Login Successful", "Welcome back!");
            if(response.data.meta.status_code == 200)
            {   
              setLoading(false)
              setdata(response.data.data.item)
              setUse(response.data.data.item[0].id)

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
      
    }

  const handlesubmit = () =>{
      let event = useId;
      // let lokasi_lat = lokasi.latitude;
      // let lokasi_long = lokasi.longitude;

      navigation.navigate('Ambil Foto', {
        event: event,
        // lokasi_lat: lokasi_lat,
        // lokasi_long: lokasi_long
      });
    }


  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.viewstyle}>
  

    <Text style={styles.textBold}>Pilih Ibadah</Text>

    {loading ? ( <CircleFad/> ) : (<View></View>)}

    <ScrollView>

    <View>
    {usedata.map((usedata : any, key : any) => {
      return (
        
        <View key={usedata.id}>
          {checked == key ? (

            <View style = {styles.border}>
            <TouchableOpacity style={styles.viewbutton}>

              <View>
              <Text style={styles.textBold}>{usedata.event_name}</Text>
              <Text style={styles.textBold}>{usedata.event_day}</Text>
              <Text style={styles.textlight}>{usedata.start_time} - {usedata.end_time} WIB</Text>
              </View>

          
            <Text style={{flex:1}}></Text>
            <Image
                style={styles.img}
                source={icradioincheck}
            />
          
            </TouchableOpacity>
            </View>


          ) : (
            <View style = {styles.border}>

            <TouchableOpacity
              onPress={() => {
                setChecked(key);
                setUse(usedata.id)
              }}
              style={styles.viewbutton}>

              <View>

              <Text style={styles.textBold}>{usedata.event_name}</Text>
              <Text style={styles.textBold}>{usedata.event_day}</Text>
              <Text style={styles.textlight}>{usedata.start_time} - {usedata.end_time} WIB</Text>
              </View>

              <Text style={{flex:1}}></Text>
              <Image
                style={styles.img}
                source={icradiouncheck}
              />
            </TouchableOpacity>
            </View>
          )}
        </View>

    
      );
    })}
    </View>

    </ScrollView>
    <View style={{height:70}}></View>

    <View style ={{backgroundColor:'#FFF'}}>

    <TouchableOpacity 
      style={{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#df1e4d',
        paddingTop:10,
        position:'absolute',
        bottom:5,
        paddingBottom:10,
        borderRadius:15,
        width:'100%',
        elevation:2,
      }}  
      onPress={()=> handlesubmit() }>
      <PoppinsText 
        style={styles.textTouchableOpacity}>LANJUT
      </PoppinsText>
    </TouchableOpacity>

    </View>


  </View>

   



    </SafeAreaView>
  )
}

export default PilihIbadah

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#fff'
  },
  viewstyle:{
    margin:16, 
    flex:1
  },
  radio: {
    flexDirection: 'row',
  },
  img: {
    justifyContent:'center',
    alignItems:'center',
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    marginTop:10, 
    alignItems: 'center',
  },
  border:{
    padding:10,
    marginTop:20,
    backgroundColor:'#fff',
    borderRadius:15,
    borderColor:'#000',
    elevation:2,
    borderWidth:1
  }, 
  textBold:{
    fontWeight: 'bold', 
    color:'#000'
  },
  textlight:{
    fontWeight: 'light', 
    fontSize:12
  }, 
  viewbutton:{
    flexDirection:'row', 
    alignItems:'center'
  }, 
  viewbuttonfooter:{
    paddingTop:10, 
    paddingBottom:10,
    paddingHorizontal: 16, 
    width:'100%', 
    position:'absolute', 
    bottom:10
  }, 
  styleTouchableOpacity:{
    backgroundColor:'#df1e4d',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    flex:1,
    width:'100%'
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