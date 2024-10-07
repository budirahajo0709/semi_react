import {  FlatList, Image, ImageBackground, StyleSheet, Text, View , Dimensions, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useEffect , useRef, useState} from 'react'
import { icbackground, iclogout, icsemi, icedit, icpresensimurid, icpresensiguru, icpresensilog, icaddkelas, icseminew } from '../../asset/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PoppinsText } from '../../asset/font';
import { ImageSlider } from 'react-native-image-slider-banner'
import { SliderHeader } from 'react-native-image-slider-banner/src/sliderHeader'
import axios from 'axios';
import { CircleFade } from 'react-native-animated-spinkit'
import CircleFad from '../../component/atoms/CircleFad'


const { width, height } = Dimensions.get('window');

const Home = ({navigation} : {navigation:any}) => {
  const [userInfo, SetuserInfo] = useState<any>('');
  const [userName, SetuserName] = useState('');
  const [userPhone_number, SetPhone_number] = useState('');

  const [useSlider, SetSlider] = useState<any>([]);
  const [token, Settoken] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollOffset = useRef(0);

  useEffect(() => {
    getdata()
  }, [])

  useEffect(() => {
    getslider()
  },[])

  const getdata = async () => {

    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      let token = JSON.stringify(AccesToken);
      Settoken(token);
      // console.log(AccesToken)

      setLoading(true)

      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 
  
      axios.get('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.auth.api.profile', config)
        .then(response => {
          // Handle response
          // console.log(response.data);
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   

            setLoading(false)
            let userInfo = response.data.data;
            SetuserInfo(userInfo);

            // console.log(userInfo)
  
            let userName = response.data.data.name;
            SetuserName(userName);
  
            let userPhone_number = response.data.data.phone_number;
            SetPhone_number(userPhone_number);

            // console.log( response.data.data.phone_number);
  

            AsyncStorage.setItem('LoginData', JSON.stringify(response.data.data), (err)=> {
              if(err){
                  console.log("an error s");
                  throw err;
              }
              // console.log("success");
            }).catch((err)=> {
                console.log("error is: " + err);
            });
             
          }
          else
          {
            ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
            setLoading(false)
          }
       
        })
        .catch(error => {
          setLoading(false)
          // Handle error
          console.log(error);
          ToastAndroid.show(''+ error, ToastAndroid.SHORT);
          // Alert.alert("Login Failed", "Please check your credentials");
        });


    } catch(e){
      throw e;
    }
    
  }



  const getslider = async () => {

    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      let token = JSON.stringify(AccesToken);
      Settoken(token);
      // console.log(AccesToken)
      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 
  
      axios.get('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.slider.api.list?page=1&per_page=10', config)
        .then(response => {
          // Handle response
          // console.log("aa"+ JSON.stringify(response.data.data.items));
       
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
            
            const DATA1 = response.data.data.items
            DATA1.map( number => number.slider_image)

            SetSlider(DATA1)


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
        });

    } catch(e){
      throw e;
    }
    

  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollOffset.current += width; // Increment scroll offset
    
      // Reset scroll when reaching the end
      if (scrollOffset.current >= useSlider.length * width) {
        scrollOffset.current = 0;
      }
      flatListRef.current.scrollToOffset({ offset: scrollOffset.current, animated: true });
    }, 3000); // Adjust the interval time as needed
    console.log(scrollOffset.current)
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [useSlider]);



  const renderItema = ({item} : any ) => {
    return(
      <View style={{flex:1, elevation:6, width:'100%'}}>
        <Image source={{uri: item.slider_image}} style={styles.images} />
      </View>
    )
  }




  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>

    <View style={{flex:1}}>


    <ImageBackground
      source={icbackground}
      style={styles.backgrond}>
    </ImageBackground>

    <SafeAreaView style={{flex:1,margin:16}}>

    {userInfo.role === 'Teacher' ? 
      (    
      <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
        <TouchableOpacity disabled={false}
          onPress={() => {navigation.navigate('Tambah Murid')} } >
        <Image 
          source={icaddkelas} 
          style={{width:24, height:24}} >
        </Image>

        </TouchableOpacity>
      </View>
      ) 
      : 
      (
      <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
        <TouchableOpacity disabled={true}
          onPress={() => {} } >
        <Image 
          style={{width:24, height:24}} >
        </Image>

        </TouchableOpacity>
      </View>
      )
      }


    <View style={{ alignItems:'center', marginTop:20, }}>

      <View style={{borderRadius:10, elevation:6,}}>
        <Image 
        source={icseminew} style={{width:96, height:96,}} >
      </Image>
      </View>

    </View>
    

    <View style={{elevation:6, marginTop: 50, padding:10, backgroundColor:'#fadde4', flexDirection:'row', borderRadius:10, marginBottom:35}}>

    <Image 
      source={{uri: userInfo.user_image}} style={{ width:60, height:60, marginRight:5, borderRadius:10}} >
    </Image>

    <View style={{flex: 1, marginLeft: 5, marginRight: 5, justifyContent:'center'}}>

    <PoppinsText style={{fontFamily:'Poppins-Bold', color:'#000'}}> {userName}</PoppinsText>
    <PoppinsText style={{fontFamily:'Poppins-Bold', color:'#000', fontSize:12}}> {userInfo.role}</PoppinsText>
    <PoppinsText style={{fontFamily:'Poppins-Bold', color:'#000'}}> {userPhone_number}</PoppinsText>

    </View>

    <View style={{ justifyContent:'center', alignContent:'flex-end'}}>

      <TouchableOpacity onPress={() => navigation.navigate('Edit Profile', {
        userInfo
      })}>
      <Image 
      source={icedit} >
      </Image>

      </TouchableOpacity>

    </View>

    </View>


    <View style={{flex:1}}>

    <FlatList 
      ref={flatListRef}
      data={useSlider}
      renderItem={renderItema}
      keyExtractor={(item)=>item.title}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}


      initialScrollIndex={index}

      onScroll={(event) => {
        const { x } = event.nativeEvent.contentOffset;
        const newIndex = Math.round(x / width);
        if (newIndex !== index) {
          setIndex(newIndex);
        }
      }}

    />

    <View style={{flexDirection:'row', justifyContent:'center'}}>
    {/* {renderDotIndicate()} */}
    </View>

    </View>

      {loading ? ( <CircleFad/> ) : (<View></View>)}

    <View style = {{ flex:1,flexDirection:'row', position:'absolute', bottom:0}}>

      <View style={{ flex:1, alignItems:'center'}}>

        <TouchableOpacity onPress={() => navigation.navigate('Presensi Murid')}>
          <Image 
            source={icpresensimurid} >
          </Image>
        </TouchableOpacity>

        <PoppinsText style={{color:'#fff',  marginTop:5}}>Presensi </PoppinsText>
        <PoppinsText style={{color:'#fff'}}>Murid</PoppinsText>
      </View>

      <View style={{ flex:1, alignItems:'center'}}>

        <TouchableOpacity onPress={() => navigation.navigate('Masuk')}>
          <Image 
            source={icpresensiguru} >
          </Image>
        </TouchableOpacity >

        <PoppinsText style={{color:'#fff', marginTop:5}}>Presensi </PoppinsText>
        <PoppinsText style={{color:'#fff'}}>Guru</PoppinsText>

      </View>

      <View style={{ flex:1, alignItems:'center'}}>

        <TouchableOpacity onPress={() => navigation.navigate('Log Presensi')}>
          <Image 
            source={icpresensilog} >
          </Image>
        </TouchableOpacity>

        <PoppinsText style={{color:'#fff', marginTop:5}}>LOG </PoppinsText>
        <PoppinsText style={{color:'#fff'}}>Presensi</PoppinsText>
      </View>


    </View>

    </SafeAreaView>
  
  
    </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  backgrond: {
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  images:{ 
    borderRadius:20,
    marginLeft:5,
    marginRight:5,
    height:150,
    width:310, 
  }, 
  item: {
    flex: 1,
  },
})