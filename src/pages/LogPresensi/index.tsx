import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PoppinsText } from '../../asset/font'
import { iccalender, icrightwhite } from '../../asset/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { SwipeUp } from '../../component/atoms/SwipeUp'
import { CircleFade, Plane } from 'react-native-animated-spinkit'
import { Circle } from 'react-native-maps'
import CircleFad from '../../component/atoms/CircleFad'
import Colors from '../../component/atoms/Colors'
import {BASE_URL_STAG} from '@env';

const LogPresensi = ({navigation} : {navigation:any}) => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1);

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [isShowSettingFav, setIsShowSettingFav] = useState(false);

    const[usestart, setStart] = useState(moment(date).format('YYYY-MM-DD'));
    const[useend, setEnd] = useState(moment(new Date()).format('YYYY-MM-DD'));

    const [count, SetCount] = useState('');
    const [dataDetail, setDataDetail] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
      getdata();
    },[])


    const getdata = async () => {
        setLoading(true)
        try{
          let AccesToken = await AsyncStorage.getItem('AccesToken');
    
          const config = {
            headers: {
               "Authorization" : `Basic ${AccesToken}`
            }
          } 

          axios.get(`${BASE_URL_STAG}/kidsgbigama_api.api.attendance.api.log_attendance?start_date=${usestart}&end_date=${useend}`, config)
            .then(response => {
              // Handle response
              // console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");
              if(response.data.meta.status_code == 200)
              {   
                setLoading(false)
                let count = response.data.data.count_logs;
                SetCount(count);
                setDataDetail(response.data.data.item)
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
    <SafeAreaView style={styles.container}>

      {loading ? ( <CircleFad/>) : (
        
        <View style={styles.view}>
          
        <Text style={styles.styleText}>Filter Tanggal</Text>
      
        <TouchableOpacity style={styles.SectionStyle} onPress={() => setIsShowSettingFav(true)}>
    
        <View style={styles.styleviewfilter}>
    
        <Text style={styles.styletextfilter}>{usestart} - {useend}</Text>
        
        </View>
        <Image
            source={iccalender} //Change your icon image here
            style={styles.ImageStyle}
        />
    
        </TouchableOpacity>
    
        <View style={styles.styleviewlog}>
    
        
        <PoppinsText style={{color:Colors.white}}>Total Masuk</PoppinsText>
    
        <PoppinsText style={styles.styleTextCount}>{count}</PoppinsText>
    
        <TouchableOpacity style={styles.styleToucbDetail} 
            onPress={() => 
              navigation.navigate('Masuk ', {
              data:dataDetail
            })}>
    
            <PoppinsText style={{color:Colors.white, marginRight:10}}>Detail</PoppinsText>
    
            <Image source={icrightwhite}style={{marginRight:16}} />
    
        </TouchableOpacity>
    
        <DatePicker
              modal
              mode="date"
              open={open}
              date={new Date}
              maximumDate={new Date}
              onConfirm={(date) => {
                setOpen(false)
                setStart(moment(date).format('YYYY-MM-DD'))
              }}
              onCancel={() => {
                setOpen(false)
              }}
        />
    
        <DatePicker
              modal
              mode="date"
              open={open1}
              date={new Date}
              maximumDate={new Date}
              onConfirm={(date) => {
                setOpen1(false)
                setEnd(moment(date).format('YYYY-MM-DD'))
              }}
              onCancel={() => {
                setOpen1(false)
              }}
    
        />
        
    
        </View>
    
        <SwipeUp
          isSwipeLine={true}
          visible={isShowSettingFav}
          onClose={() => {
            setIsShowSettingFav(false);
          }}
          height={500}
          children={
                <View style={styles.viewSwipup}>
    
                    <View style={{flexDirection:'row'}}>
    
                    <View style={styles.styleviewswipupfilter}>
    
                
                    <TouchableOpacity style={styles.SectionStyle} onPress={()=> setOpen(true)}>
    
                    <View style={styles.styleviewfilterswipup}>
    
                    <TextInput
                        editable={false}
                        style={{ flex: 1}}
                        placeholder='start date'
                        onChangeText={text => setStart(text)}
                        value={usestart}
                        
                    />
    
                    </View>
                    <Image
                        source={iccalender} //Change your icon image here
                        style={styles.ImageStyle}
                    />
    
                    </TouchableOpacity>
                    </View>
    
                    <View style={styles.styleviewswipupfilter}>
    
                    <TouchableOpacity style={styles.SectionStyle} onPress={()=> setOpen1(true)}>
    
                    <View style={styles.styleviewfilterswipup}>
    
                    <TextInput
                        editable={false}
                        style={{ flex: 1}}
                        placeholder='end date'
                        onChangeText={text => setEnd(text)}
                        value={useend}
                    />
    
    
                    </View>
                    <Image
                        source={iccalender} //Change your icon image here
                        style={styles.ImageStyle}
                    />
    
                    </TouchableOpacity>
                    </View>
                    
                    </View>
    
              
    
                  <TouchableOpacity style={styles.styleTouchableOpacityswipup} >
                    <PoppinsText 
                    style={styles.textTouchableOpacityswipup} 
                    onPress={ () =>  { getdata() ; setIsShowSettingFav(false)}}>SIMPAN</PoppinsText>
                
                    </TouchableOpacity>
        
                </View> 
      
          }
    
          />
    
        </View>

      )}

    </SafeAreaView>

  )
}

export default LogPresensi

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  view:{
    margin:16,
    flex:1
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
    marginTop:10,
    paddingLeft:10,
    },   
  ImageStyle: {
    margin: 10,
    height: 20,
    width: 20,
    paddingTop:10,
    paddingBottom:10,
    marginRight:10,
    resizeMode: 'stretch',
    alignItems: 'center',
    }, 
  viewSwipup :{
    display:'flex',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom:30,
    justifyContent: 'center'
    }, 
  styleText:
  {
    fontWeight:'regular', 
    color:'#000'
  }, 
  styleviewfilter:
  {
    flex: 1, 
    alignItems:'center'
  }, 
  styletextfilter:
  {
    alignItems:'center', 
    fontWeight:'semibold', 
    color:'#000'
  }, 
  styleviewlog:{
    backgroundColor:'#df1e4d', 
    borderRadius: 10, 
    elevation: 2, 
    borderWidth: 1,
    borderColor:'#c9c9c9',               
    paddingLeft:10,
    paddingVertical:10, 
    marginTop:20
  }, 
  styleTextCount:{
    color:Colors.white, 
    fontSize:24, 
    fontStyle:'normal', 
    marginTop:7
  }, 
  styleToucbDetail:{
    flexDirection:'row', 
    justifyContent:'flex-end', 
    alignItems:'center', 
    alignContent:'center'
  }, 
  styleviewswipupfilter:{
    flex:1, 
    marginRight:5, 
    marginLeft:5
  }, 
  styleviewfilterswipup:{
    flex: 1, 
    alignItems:'center'
  }, 
  styleTouchableOpacityswipup:{
    backgroundColor:'#df1e4d',
    paddingTop:10, 
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    marginTop:40, 
  }, 
  textTouchableOpacityswipup:{
    fontFamily: 'Poppins-Bold', 
    color:'#fff', 
    alignContent:'center', 
    textAlign:'center',
    fontSize:20
  }
})