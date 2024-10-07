import { Alert, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import { PoppinsText } from '../../../asset/font';
import TextInputLogin from '../../../component/TextInputLogin';
import axios from 'axios';
import CircleFad from '../../../component/atoms/CircleFad';

const GantiPassword = ({route , navigation } : any) => {
  const {phone_number} = route.params;
  const {date_expired} = route.params;

  const [totalDuration, setTotalDuration] = useState(null); 
  const [useText, setUseText] = useState<boolean>(true); 

  const[useOTP, setOTP] = useState('');
  const [password, setPassword] = useState('');

  const[dataExpires, setDataExpired] = useState(date_expired);

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    // This effect runs when the component mounts
    const calculateDuration = () => {
      const date = moment(); // Current date and time
      const expirydate = dataExpires; // Set your own date-time

      const diffr = moment.duration(moment(expirydate).diff(date)); // Calculate the difference
      const d = Math.floor(diffr.asSeconds()); // Get the difference in seconds

      setTotalDuration(d > 0 ? d : 0); // Ensure duration is non-negative
    };

    calculateDuration();
    setUseText(true) // Call the function to calculate duration
  }, [dataExpires]); // Empty dependency array to ensure it runs only once after mounting

  if (totalDuration === null) return <Text>Loading...</Text>; // Show loading while calculating

  const handlekirimulang = () => {

    setLoading(true)


    const userData = {
      phone_number: phone_number,
     
    };

    axios.post('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.auth.api.request_otp', userData)
      .then(response => {
        // Handle response
        console.log(response.data);
        // Alert.alert("Login Successful", "Welcome back!");

        if(response.data.meta.status_code == 200)
        {   
          setLoading(false)
        
  
          setDataExpired(response.data.data.next_request_at)
            
        }
        else
        {
          setLoading(false)
          ToastAndroid.show(''+ response.data.data.message, ToastAndroid.SHORT);
        }
     
      })
      .catch(error => {
        // Handle error
        console.log(error);
        setLoading(false)
        ToastAndroid.show(''+ error, ToastAndroid.SHORT);
        // Alert.alert("Login Failed", "Please check your credentials");
      });
  }

  const handlekirimAPI = ()=>{
    // console.log("phone_number" + phone_number)
    // console.log("useOTP" + useOTP)
    // console.log("password" + password)

    if (!useOTP) {
      ToastAndroid.show('Please fill Code Otp !', ToastAndroid.SHORT);
      return;
    }
    
    if (!password) {
      ToastAndroid.show('Please fill Password !', ToastAndroid.SHORT);
      return;
    }

    setLoading(true)

    const userData = {
      phone_number: phone_number,
      otp: useOTP,
      new_password: password,
     
    };

    axios.post('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.auth.api.reset_password', userData)
      .then(response => {
        // Handle response
        console.log(response.data);
        // Alert.alert("Login Successful", "Welcome back!");

        if(response.data.meta.status_code == 200)
        {   
          setLoading(false)
          navigation.replace('Home');
          ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
        }
        else
        {
          setLoading(false)
          ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
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

  console.log(dataExpires)

  return (

    <SafeAreaView style={styles.container}>
    <View style={styles.styleview}>


    {loading ? (<CircleFad/>) : (<View></View>)}

      <Text style={{fontWeight:'semibold', color:'#000'}}>- Kami telah mengirimkan Kode OTP WhatsApp ke nomor telepon {phone_number}
       ,Jika belum menerima Kode OTP, klik 'Kirim ulang Kode OTP'</Text>

  
      <TextInput 
        style={styles.styleInputOtp}
        keyboardType='numeric'
        placeholder='Kode OTP'
        onChangeText={text => setOTP(text)}
        value={useOTP} 
        >
      </TextInput>


      <CountDown
        until={totalDuration} // Set countdown duration
        timetoShow={['H', 'M', 'S']} // Format to show
        onFinish={() => setUseText(prev => !prev)} // On finish callback
        // onPress={() => Alert.alert('hello')} // On press callback
        size={20}
       
      />

      <TouchableOpacity  disabled={useText} onPress={()=> handlekirimulang()}>

      <Text style={{color:'#000'}}> Kirim ulang Kode OTP
      </Text>
      </TouchableOpacity>


      <TextInputLogin 
      state={password} 
      set={setPassword} 
      keyboardType='text' 
      placeholder='Masukkan Password' 
      isPassword={true} />
      
      <TouchableOpacity style={styles.styleTouchableOpacity}  
          onPress={()=>  handlekirimAPI()}>
        <PoppinsText 
          style={styles.styleTextTouchableOpacity} >KIRIM
        </PoppinsText>
         
      </TouchableOpacity>
     
    </View>
    </SafeAreaView>
  );
};

export default GantiPassword;

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#fff'
  }, 
  styleview:{
    margin:16, 
    flex:1
  }, 
  styleInputOtp:{
    backgroundColor:'#ffffff', 
    marginHorizontal: 10, 
    marginVertical: 5,
    borderRadius: 10, 
    elevation: 2, 
    borderWidth: 1,
    borderColor:'#c9c9c9',               
    paddingLeft:10,
    paddingVertical:10, 
    marginBottom:20, 
    marginTop:20
  }, 
  styleTouchableOpacity:{
    backgroundColor:'#df1e4d',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
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
});