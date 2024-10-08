import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { iccalender, iccamera, icedit, iclogout, icpresensilog } from '../../asset/images'
import { PoppinsText } from '../../asset/font'
import AsyncStorage from '@react-native-async-storage/async-storage'

import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import {SwipeUp} from '../../component/atoms/SwipeUp'
import axios from 'axios'
import CircleFad from '../../component/atoms/CircleFad'
import Colors from '../../component/atoms/Colors'
import DialogButton from 'react-native-dialog/lib/Button'
import { BASE_URL } from '../../config'

const EditProfile = ({route , navigation} : any) => {

  const {userInfo, refresdata} = route.params;
  

  // console.log("useinfo", route)
  // console.log("refresdata", refresdata)

  // const[userInfo, setUserInfo] = useState(route.params);

  const[useImage, setImage] = useState('');
  const[usname, setnama] = useState('');
  const[ustelepon, setelepon] = useState('');
  const[useTtl, setanggal] = useState('');

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [fileData, setFileData] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const [isShowSettingFav, setIsShowSettingFav] = useState(false);
  const [loading, setLoading] = useState(false);


 
  useEffect(() => {
    setImage(userInfo.user_image)
    setnama(userInfo.name)
    setelepon(userInfo.phone_number)
    setanggal(userInfo.birth_date)
    
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        <TouchableOpacity onPress={()=> {AsyncStorage.removeItem('AccesToken') ; 
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });
        }} > 
       
        <Image source={iclogout} style={{width:26, height:26}} />
        </TouchableOpacity>
      
      ),
      headerStyle: {
        backgroundColor: '#df1e4d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);
  

  const renderFileData = () => {
    if (fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + fileData }}
      style={{width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3}}
      />
    } else {
      return <Image source={iccalender} style={{width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3}}
      
      />
    }
  }


  const renderFileUri = () => {
    if (useImage) {
      return <Image
        source={{ uri: useImage }}
        style={{width: 150,
          height: 150,
          borderColor: 'black',
          borderWidth: 1,
          marginHorizontal: 3}}
      
      />
    } else {
      return <Image
        source={iccamera} style={{width: 150,
          height: 150,
          borderColor: 'black',
          borderWidth: 1,
          marginHorizontal: 3}}
       
      />
    }
  }


  const launchNativeCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.uri };
        // console.log('response', JSON.stringify(response));
        setFileData(response.assets[0].base64);
        setImage(response.assets[0].uri)
      }
    });

  }


  const launchNativeImageLibrary = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        // console.log('response', JSON.stringify(response));
        setFileData(response.assets[0].base64);
        setImage(response.assets[0].uri)
      }
    });

  }


  const HadleUpdate = async () => {

    if (!usname) {
      // Toast('Please fill Email');
      ToastAndroid.show('Please fill Name !', ToastAndroid.SHORT);
      return;
    }

    if (!ustelepon) {
      // Toast('Please fill Email');
      ToastAndroid.show('Please fill Phone Number !', ToastAndroid.SHORT);
      return;
    }

    if(!fileData) {
      //update tanpa ganti file 

      try{
        let AccesToken = await AsyncStorage.getItem('AccesToken');

        const config = {
          headers: {
             "Authorization" : `Basic ${AccesToken}`
          }
        } 

        setLoading(true)

        const userData = {
          name: usname,
          image: '',
          phone_number: ustelepon,
          birth_date: useTtl,
        };

        axios.post(`${BASE_URL}/kidsgbigama_api.api.profile.api.update_profile`, userData, config)
        .then(response => {
          // Handle response
          // console.log("update",response.data);
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
            setLoading(false)
            ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);

            // setUserInfo(response.data.data)

            let boo = true;

            // navigation.navigate('Home');

            refresdata()
            navigation.goBack('Home');
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

      // return;

    }
    else
    {
       //update tanpa ganti file base 64

      try{
        let AccesToken = await AsyncStorage.getItem('AccesToken');

        const config = {
          headers: {
             "Authorization" : `Basic ${AccesToken}`
          }
        } 

        setLoading(true)

        const userData = {
          name: usname,
          image: 'data:image/jpeg;base64,' + fileData,
          phone_number: ustelepon,
          birth_date: useTtl,
        };

        axios.post(`${BASE_URL}/kidsgbigama_api.api.profile.api.update_profile`, userData, config)
        .then(response => {
          // Handle response
          // console.log("update",response.data);
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
            setLoading(false)
            ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
            // navigation.replace('Home');
            refresdata()
            navigation.goBack('Home');
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

      // return;

    }
  }

 
  return (

    <SafeAreaView style={styles.container}>
    <View style={styles.viewstyle}>

    <ScrollView>
      
      <View style={{alignItems:'center'}}>
        <Image 
          source={{uri: useImage}} style={styles.imagestyle} >
        </Image>

        <TouchableOpacity style={styles.replaceimagestyle} 
          onPress={() => setIsShowSettingFav(true)}>

        <Image source={iccamera} />
        <Text style={{color:Colors.redapp}}> Ganti Foto</Text>
        </TouchableOpacity>
      
      </View>

    <PoppinsText style={styles.textstyle}>Nama</PoppinsText>
      <TextInput 
        style={styles.inputstyle}
        placeholder='Nama'
        onChangeText={text =>  setnama(text)}
        value={usname} >
       
      </TextInput>
  
      <PoppinsText style={styles.textstyle}>Telepon</PoppinsText>
      <TextInput 
        style={styles.inputstyle}
        keyboardType='numeric'
        placeholder='6281012382722'
        onChangeText={text => setelepon(text)}
        value={ustelepon} >
       

      </TextInput>

      <PoppinsText  style={{marginLeft:10, marginTop:20, fontFamily:'Poppins-Bold'}}>Tanggal Lahir</PoppinsText>

      <TouchableOpacity style={styles.SectionStyle} onPress={() => setOpen(true)}>

    <TextInput
        editable={false}
        style={{ flex: 1}}
        onChangeText={text => setanggal(text)}
        value={useTtl} 
    />

    <Image
        source={iccalender} //Change your icon image here
        style={styles.ImageStyle}
      />

    </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        maximumDate={new Date}
        onConfirm={(date) => {
          setOpen(false)
          setanggal(moment(date).format('YYYY-MM-DD'))
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

      {loading ? ( <CircleFad/> ) : (<View></View>)}

      <TouchableOpacity style={styles.styleTouchableOpacity} >
        <PoppinsText 
          style={styles.styletextTouchableOpacity} onPress={HadleUpdate}>SIMPAN
        </PoppinsText>
         
      </TouchableOpacity>

    </ScrollView>

    <SwipeUp
      isSwipeLine={true}
      visible={isShowSettingFav}
      onClose={() => {
        setIsShowSettingFav(false);
      }}
      height={500}
      children={
          <View style={styles.viewStyle}>

            <TouchableOpacity style={{margin:16}} onPress={()=> {launchNativeCamera() ; setIsShowSettingFav(false)} }>
              <PoppinsText>Select Image Photo</PoppinsText>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft:16}} onPress={() => {launchNativeImageLibrary() ;  setIsShowSettingFav(false) }}>
              <PoppinsText>Select Image Galery</PoppinsText>
            </TouchableOpacity>
    
          </View> 
      }
    />

  </View>
  </SafeAreaView>

  )
  
}

export default EditProfile

const styles = StyleSheet.create({

  container:{
    flex:1, 
    backgroundColor:'#ff'
  },
  viewstyle:{
    margin:16
  },
  imagestyle:{
    width:150, 
    height:150, 
    marginRight:5, 
    borderRadius:10
  },
  replaceimagestyle:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center', 
    marginTop:10
  },
  textstyle:{
    marginLeft:10, 
    marginTop:20
  },
  inputstyle:{
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
    paddingLeft:10,
    marginHorizontal: 10, 
  },
  viewStyle:{
    display: 'flex',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom:30,
    justifyContent: 'center'
  },          
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  styleTouchableOpacity:{
    backgroundColor:'#df1e4d',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    marginTop:120, 
    flex:1
  }, 
  styletextTouchableOpacity:{
    fontFamily: 'Poppins-Bold', 
    color:'#fff', 
    alignContent:'center', 
    textAlign:'center',
    fontSize:20
  }
})