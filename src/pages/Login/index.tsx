import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, TextInput, DevSettings } from 'react-native'
import React, {useState } from 'react'
import { ichiddeneye, icseminew, icshoweye } from '../../asset/images'
import { PoppinsText } from '../../asset/font'
import TextInputLogin from '../../component/TextInputLogin'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import CircleFad from '../../component/atoms/CircleFad'
import {BASE_URL_STAG} from '@env';
import DeviceInfo from 'react-native-device-info'
import Toast from 'react-native-simple-toast';

const Login = ({navigation} : {navigation:any}) => {
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  // const version = DeviceInfo.getVersion();

  const originalString = DeviceInfo.getVersion();
  const trimmedString = originalString.replace(/\.0+$/, '');

// console.log(trimmedString);

//   console.log("versi " +trimmedString.toString)



 
  const HandleLogin = () => {
    if (!phone_number) {
      Toast.show('Please fill Phone Number !', Toast.SHORT);
      return;
    }
    
    if (!password) {
      Toast.show('Please fill Password !', Toast.SHORT);
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

            navigation.replace('Home');

            
          }catch(error)
          {
            console.log(error)
          }

           
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

  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        keyboardType='number-pad' 
        placeholder='Masukkan nomor telepon' 
        isPassword={false}/>

      <PoppinsText style={style.textstyle}>Password</PoppinsText>


        <View style={style.viewPassword}>

          <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={style.input}
              placeholder="Masukkan Password"
              />

          <TouchableOpacity onPress={toggleShowPassword}>

              {showPassword ? (
                <Image source={ichiddeneye} style={{width:24, height:24} } />
              ) : <Image source={icshoweye} style={{width:24, height:24}} />
              }

          </TouchableOpacity>
        </View>
  

      {/* <TextInputLogin 
        state={password} 
        set={setPassword} 
        keyboardType='default'
        placeholder='Masukkan Password' 
        isPassword={true} /> */}

  


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
  }, 
  viewPassword:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    paddingRight:10,
    paddingLeft: 10,
  }, 
  input:{
    flex:1
  }
})

export default Login;
