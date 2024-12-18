import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { iccalender, iccamera, icradioincheck, icradiouncheck, icsemi } from '../../asset/images';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinsText } from '../../asset/font';
import { PopUp } from '../../component/atoms/PopUp';
import { SwipeUp } from '../../component/atoms/SwipeUp';
import CircleFad from '../../component/atoms/CircleFad';
import Colors from '../../component/atoms/Colors';
import { BASE_URL } from '../../config';
import {BASE_URL_STAG} from '@env';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

const PresensiMurid = ({navigation} : {navigation:any}) => {
    const [checked, setChecked] = useState(0);
    const [usedata, setdata] = useState<any>([]);
    var gender = ['Male', 'Female'];
    const [useId, setUse] = useState('');
    const [isPopup, setIsPopup] = useState(false);
    const [loading, setLoading] = useState(false);


    const [selected, setSelected] = useState('DARI SISTEM');
    const options = ['DARI SISTEM', 'TENTUKAN SENDIRI'];
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const[TanggalAbsen, setanggal] = useState('');
    

    // console.log(checked)
    // console.log(useId)

    useEffect (() =>{
      if (selected === 'DARI SISTEM') 
      {
        setanggal('')
      }
      else
      {
        setanggal(moment(date).format('YYYY-MM-DD hh:mm:ss'))
      }
     
    },[selected])

    
     console.log("Tanggal ", TanggalAbsen)

    useEffect(() => {

      getdata();
      
      }, [])

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
                Toast.show(''+ response.data.meta.message, Toast.SHORT);
                setLoading(false)
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

  return (

    <SafeAreaView style={styles.container}>
    <View style={styles.view}>

    <Text style={styles.stylePilihIbdah}>Pilih Ibadah</Text>
    {loading ? ( <CircleFad/> ) : (<View></View>)}
    <ScrollView>
    
        <View>
        
          {usedata.map((usedata, key) => {
            return (
              
              <View key={usedata.id}>
                {checked == key ? (
    
                
                  <View style = {styles.border}>

                  <TouchableOpacity style={styles.styleTouchableOpacityselect}>
                    <View>
                    <Text style={styles.styleTextEvent}>{usedata.event_name}</Text>
                    <Text style={styles.styleTextEvent}>{usedata.event_day}</Text>
                    <Text style={styles.styleTextDate}>{usedata.start_time} - {usedata.end_time} WIB</Text>
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
                    style={styles.styleTouchableOpacityselect}>

                    <View>
                    <Text style={styles.styleTextEvent}>{usedata.event_name}</Text>
                    <Text style={styles.styleTextEvent}>{usedata.event_day}</Text>
                    <Text style={styles.styleTextDate}>{usedata.start_time} - {usedata.end_time} WIB</Text>
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

    <DatePicker
        modal
        mode='datetime'
        open={open}
        date={date}

        onConfirm={(date) => {
          setOpen(false)
          setanggal(moment(date).format('YYYY-MM-DD hh:mm:ss'))
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />


      <View style={{height:70}}></View>

      <SwipeUp
          isSwipeLine={true}
          visible={isPopup}
          onClose={() => {
            setIsPopup(false);
          }}
          height={500}
          children={
              <View style={styles.styleViewSwipup}>

                <Text style={styles.textpilihcara}>Pilih Cara Presensi</Text>

                <View style={styles.styleviewline}>
                </View>

                {options.map(option => {
                          return (
                            <TouchableOpacity
                              key={option}
                              style={styles.singleOptionContainer}
                              onPress={() => setSelected(option)}>
                              <View style={styles.outerCircle}>
                                {selected === option ? (
                                  <View style={styles.innerCircle} />
                                ) : null}
                              </View>
                              <Text style={{fontWeight:'light'}}>{option}</Text>
                            </TouchableOpacity>
                          );
                        })}

              {/* <Text>{selected}</Text> */}

              {selected==='DARI SISTEM' ? 
                (
                  <Text></Text>
              
                ) 
                : 
                (
                  <View style={{
                    marginTop:10,
                    marginHorizontal:10,
                    padding:10,
                    backgroundColor:Colors.white,
                    borderRadius:15,
                    borderColor:Colors.black,
                    elevation:2,
                    borderWidth:1
                    }}>

                    <TouchableOpacity style={{flexDirection:'row'}} onPress={() => setOpen(true)}>
    
                    <Text style={{marginRight:20, flex:1}}>{TanggalAbsen}</Text>
    
                    <Image
                      source={iccalender} //Change your icon image here
                    />
    
                    </TouchableOpacity>

                  </View>
                  
                )
              }

                  <View style={styles.styleviewrow}>

                  <TouchableOpacity style={styles.styleSwipupTouchableOpacity} 
                    onPress={()=> { navigation.navigate('Pilih Murid', {
                      useId, 
                      TanggalAbsen
                    }) ; setIsPopup(false)} }>

                  <Text style={{fontWeight:'bold', color:'#fff'}}>TANPA SCAN</Text>

                  </TouchableOpacity>

                  <TouchableOpacity style={styles.styleSwipupTouchableOpacity} 
                    onPress={() => { navigation.navigate('Scan QR Code Murid', {
                    useId, 
                    TanggalAbsen
                    }) ; setIsPopup(false) }}>

                  <Text style={{fontWeight:'bold', color:'#fff'}} >SCAN</Text>

                  </TouchableOpacity>

                  </View>
        
                </View> 
      
          }

      />

      <View style ={{backgroundColor:'#FFF'}}>

      <TouchableOpacity style={{                
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
                    elevation:2,}}  onPress={()=> setIsPopup(true) }>
            <PoppinsText 
            style={styles.styleTextTouchableOpacity} >LANJUT</PoppinsText>
          
      </TouchableOpacity>

      </View>


  



    </View>

  </SafeAreaView>
  )
}

export default PresensiMurid

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:Colors.white
  },
  view:{
    flex:1,
    margin:16,
    backgroundColor:Colors.white
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
    backgroundColor:Colors.white,
    borderRadius:15,
    borderColor:Colors.black,
    elevation:2,
    borderWidth:1
  }, 
  stylePilihIbdah:{
    fontWeight:'bold', 
    color:Colors.black
  }, 
  styleTouchableOpacityselect:{
    flexDirection:'row', 
    alignItems:'center'
  }, 
  styleTextEvent:{
    fontWeight: 'bold', 
    color:Colors.black
  }, 
  styleTextDate:{
    fontWeight: 'light', 
    fontSize:12, 
    color:Colors.black
  }, 
  styleviewbutton:{
    width:'100%', 
    paddingTop:10, 
    paddingBottom:10,
    position:'absolute', 
    bottom:10
  }, 
  styleTouchableOpacity:{
    backgroundColor:Colors.redapp,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
    marginLeft:16,
    marginRight:16
  }, 
  styleTextTouchableOpacity:{
    fontFamily: 'Poppins-Bold', 
    color:Colors.white, 
    alignContent:'center', 
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  }, 
  styleViewSwipup:{
    display: 'flex',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom:30,
    justifyContent: 'center'
  }, 
  textpilihcara:{
    fontWeight:'bold', 
    color:Colors.redapp, 
    marginLeft:16
  }, 
  styleviewline:{
    backgroundColor:Colors.redapp, 
    height:1, 
    marginLeft:16, 
    marginRight:16, 
    marginTop:10
  }, 
  styleviewrow:{
    flexDirection:'row', 
    marginTop:10
  },
  styleSwipupTouchableOpacity:{
    margin:16, 
    flex:1, 
    alignItems:'center',
    backgroundColor:Colors.redapp,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15, 
    elevation:2,
  }, 

  singleOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    margin: 5,
    marginTop:8
  },
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
})