import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, {useState } from 'react'
import { icsemi, icseminew } from '../../asset/images'
import { PoppinsText } from '../../asset/font'
import TextInputLogin from '../../component/TextInputLogin'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CircleFad from '../../component/atoms/CircleFad'
import { BASE_URL } from '../../config'
import {BASE_URL_STAG} from '@env';

const Login = ({navigation} : {navigation:any}) => {
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const HandleLogin = () => {
    if (!phone_number) {
      ToastAndroid.show('Please fill Phone Number !', ToastAndroid.SHORT);
      return;
    }
    
    if (!password) {
      ToastAndroid.show('Please fill Password !', ToastAndroid.SHORT);
      return;
    }
   
    setLoading(true)

    const userData = {
      phone_number: phone_number,
      password: password,
    };

    axios.post(`${BASE_URL_STAG}/kidsgbigama_api.api.auth.api.login`, userData)
      .then(response => {
 
        if(response.data.meta.status_code == 200)
        {   
          try{
            setLoading(false)
            AsyncStorage.setItem('AccesToken', response.data.data.token)
  
            // console.log(response.data.data)
            navigation.replace('Home');
            // navigation.navigate('Home') 
            // navigation.clear('Login');

          }catch(error)
          {
            console.log(error)
          }

           
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

  };

  return (

    <SafeAreaView style={style.container} >
    <ScrollView>
    <View style={style.viewstyle} >

      {loading ? (<CircleFad/>) : (<View></View>)}

      <View style ={style.image}>
        <Image source={icseminew} style={{width:130, height:130}}/>
      </View>

      <PoppinsText style={style.textstyle}>Telepon</PoppinsText>

      <TextInputLogin 
        state={phone_number} 
        set={setPhone_number} 
        keyboardType='numeric' 
        placeholder='Masukkan nomor telepon' 
        isPassword={false}/>

      <PoppinsText style={style.textstyle}>Password</PoppinsText>

      <TextInputLogin 
        state={password} 
        set={setPassword} 
        keyboardType='text' 
        placeholder='Masukkan Password' 
        isPassword={true} />

      <TouchableOpacity style={{marginHorizontal:10}}>
        <PoppinsText style={style.textlupastyle}
          onPress={() => navigation.navigate('Lupa Password')}
        >Lupa Kata Sandi</PoppinsText>
      </TouchableOpacity>

      <TouchableOpacity style={style.buttonstyle} onPress={HandleLogin}>
        <PoppinsText style={style.textbuttonstyle}>Masuk</PoppinsText>
      </TouchableOpacity>

    </View>
    </ScrollView>
    </SafeAreaView>
  )

}

const style = StyleSheet.create({
  container: {
    flex : 1, 
    backgroundColor : '#fff',
  }, 
  viewstyle:{
    margin:16
  },
  image:{
    alignSelf : 'center',
    marginTop : 100,
    marginBottom:100, 
  },
  buttonstyle:{
    backgroundColor:'#df1e4d',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    marginTop:70
  }, 
  textbuttonstyle:{
    fontFamily: 'Poppins-Bold', 
    color:'#fff', 
    alignContent:'center', 
    textAlign:'center',
    fontSize:20
  }, 
  textlupastyle:{
    fontFamily: 'Poppins-SemiBold', 
    color:'#df1e4d', 
    alignSelf:'flex-end'
  }, 
  textstyle:{
    fontFamily: 'Poppins-Bold' , 
    color:'#000', 
    marginHorizontal:10
  }
})

export default Login;
