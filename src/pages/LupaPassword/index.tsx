import { SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { PoppinsText } from '../../asset/font'
import axios from 'axios';
import CircleFad from '../../component/atoms/CircleFad';
import { BASE_URL } from '../../config';
import {BASE_URL_STAG} from '@env';

const LupaPassword = ({navigation} : any) => {
    const[ustelepon, setelepon] = useState('');
    const [loading, setLoading] = useState(false)

    const handleOtp =() => {
        // console.log("Telepon"+ ustelepon)
        if (!ustelepon) {
            ToastAndroid.show('Please fill Phone Number !', ToastAndroid.SHORT);
            return;
          }

          setLoading(true)

          const userData = {
            phone_number: ustelepon,
          };
      
          axios.post(`${BASE_URL_STAG}/kidsgbigama_api.api.auth.api.request_otp`, userData)
            .then(response => {
              // Handle response
              // console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");

              if(response.data.meta.status_code == 200)
              {   
                setLoading(false)
                  navigation.navigate('Ganti Password', {
                  phone_number: ustelepon,
                  date_expired: response.data.data.next_request_at,
                })
                  
              }
              else
              {
                setLoading(false)
                ToastAndroid.show(''+ response.data.data.message, ToastAndroid.SHORT);
              }
           
            })
            .catch(error => {
              setLoading(false)
              // Handle error
              console.log(error);
              ToastAndroid.show(''+ error, ToastAndroid.SHORT);
              // Alert.alert("Login Failed", "Please check your credentials");
            });
    }
  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.styleview}>

      {loading ? (<CircleFad/>) : (<View></View>)}
    
      <Text style={styles.textstyle}>Masukkan nomor telepon</Text>
      <TextInput 
        style={styles.styletextinput}
        keyboardType='numeric'
        placeholder='6281012382722'
        onChangeText={text => setelepon(text)}
        value={ustelepon} 
        >
      
      </TextInput>

      <TouchableOpacity style={styles.styleTouchableOpacity}  
          onPress={() => handleOtp()}
        // onPress={()=>  navigation.navigate('Ganti Password', {
        // phone_number: '62815637391',
        // date_expired: '2024-09-25 12:16:00',
        // })}
        >
          <PoppinsText 
          style={styles.styleTextTouchableOpacity} >Lanjut
          </PoppinsText>
   
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  )
}

export default LupaPassword

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#fff'
  }, 
  styleview:{
    margin:16, 
    flex:1
  },
  textstyle:{
    fontWeight:'bold', 
    marginLeft:10, 
    marginTop:20
  }, 
  styletextinput:{
    backgroundColor:'#ffffff', 
    marginHorizontal: 10, 
    marginVertical: 5,
    borderRadius: 10, 
    elevation: 2, 
    borderWidth: 1,
    borderColor:'#c9c9c9',               
    paddingLeft:10,
    paddingVertical:10
  }, 
  styleTouchableOpacity:{
    backgroundColor:'#df1e4d',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    marginTop:120, 
    position:'absolute',
    bottom:20, 
    width:'100%',
  },
  styleTextTouchableOpacity:{
    fontFamily: 'Poppins-Bold', 
    color:'#fff', 
    alignContent:'center', 
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  }
})