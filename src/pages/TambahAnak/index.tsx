import { Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { iccalender, iccamera, icchevrondown, icchevronup, icradioincheck, icradiouncheck } from '../../asset/images'
import Colors from '../../component/atoms/Colors'
import { PoppinsText } from '../../asset/font'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { SwipeUp } from '../../component/atoms/SwipeUp'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import CircleFad from '../../component/atoms/CircleFad'
import {BASE_URL_STAG} from '@env';


const TambahAnak = ({navigation} : any) => {
    const[UseName, SetName] = useState('');
    const [date, setDate] = useState(new Date())
    const[useTtl, setanggal] = useState('');
    const [open, setOpen] = useState(false)

    const [checked, setChecked] = useState(0);
    var gender = ['Laki-Laki', 'Perempuan'];
    var kelas_sd = ['LULUS','1', '2', '3', '4', '5', '6'];

    const[UseTTL, SetTTL] = useState('');
    const [checkedStatus, setCheckedStatus] = useState(0);
    var status = ['inactive', 'active'];

    const[useAlamat, SetAlamat] = useState('');

    const [dataEducation, setDataEducation] = useState<any>('');
    const [dataIdEducation, setIdEducation] = useState<any>('');
    
    const [isenable, setEnable] = useState(true)
    const [dataKelas, setDataKelas] = useState('');
    const [formal_class, setformal_class] = useState<any>('');

    const [isShowSettingFav, setIsShowSettingFav] = useState(false);
    const [fileData, setFileData] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect (() => {
      requestCameraPermission()
    }, [])


    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission given");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    

    useEffect (() => {
        getEducation()
      }, [])

      const getEducation = async () => {

        try{
          let AccesToken = await AsyncStorage.getItem('AccesToken');
    
      
          const config = {
            headers: {
               "Authorization" : `Basic ${AccesToken}`
            }
          } 
    
      
            axios.get(`${BASE_URL_STAG}/kidsgbigama_api.api.formal_education.api.list`, config)
            .then(response => {
              // Handle response
            //   console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");
              if(response.data.meta.status_code == 200)
              {   
               
                setDataEducation(response.data.data)
    
           
              }
           
            })
            .catch(error => {
              // Handle error
              console.log(error);
              // Alert.alert("Login Failed", "Please check your credentials");
            });
    
    
        } catch(e){
          throw e;
        }
        
      }

      const handleQuis = ((selectedItem : any) => {
        setDataKelas(selectedItem)
      
        if(selectedItem.education_level != 'SD')
        {
            setEnable(true)
            setformal_class('0')

            // console.log("AAA")
            // console.log("selectedItem AAASSAS", + selectedItem.education_level)
            
        }
        else
        {
            setEnable(false)
            setformal_class('LULUS')
            // console.log("BBB")
        }

      })

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
            // setImage(response.assets[0].uri)
          }
        });
    
      }
    
      // const launchNativeImageLibrary = () => {
      //   let options = {
      //     includeBase64: true,
      //     storageOptions: {
      //       skipBackup: true,
      //       path: 'images',
      //     },
      //   };
      //   launchImageLibrary(options, (response) => {
      //     // console.log('Response = ', response);
    
      //     if (response.didCancel) {
      //       console.log('User cancelled image picker');
      //     } else if (response.errorCode) {
      //       console.log('ImagePicker Error: ', response.error);
      //     } else {
      //       const source = { uri: response.assets.uri };
      //       // console.log('response', JSON.stringify(response));
      //       setFileData(response.assets[0].base64);
      //       // setImage(response.assets[0].uri)
      //     }
      //   });
    
      // }

      console.log("formal_class :  ", formal_class)

    const handlepost = async () => {
        // console.log("nama : ", UseName)
        // console.log("useTtl :  ", useTtl)
        // console.log("jenis kelamain : ", JSON.stringify(gender[checked]))
        // console.log("dataIdEducation :  ", dataIdEducation)
        // console.log("formal_class :  ", formal_class)
        // console.log("Tempat lahir :  ", UseTTL)
        // console.log("status :  ", checkedStatus)
        // console.log("alamat :  ", useAlamat)

        if(!fileData) {
            ToastAndroid.show('Please fill picture !', ToastAndroid.SHORT);
            return;
        }

        if(!UseName) {
            ToastAndroid.show('Please fill name !', ToastAndroid.SHORT);
            return;
        }

        if(!useTtl) {
            ToastAndroid.show('Please fill date of birth !', ToastAndroid.SHORT);
            return;
        }

        if(!dataIdEducation) {
            ToastAndroid.show('Please fill education !', ToastAndroid.SHORT);
            return;
        }

        if(!formal_class) {
            ToastAndroid.show('Please fill class !', ToastAndroid.SHORT);
            return;
        }


        try{
            let AccesToken = await AsyncStorage.getItem('AccesToken');
    
            const config = {
              headers: {
                 "Authorization" : `Basic ${AccesToken}`
              }
            } 
    
            setLoading(true)
    
            const userData = {
                name: UseName,
                birthdate: useTtl,
                gender: gender[checked],
                education: dataIdEducation,
                formal_class: formal_class,
                birthPlace: UseTTL,
                status: JSON.stringify(checkedStatus),
                address: useAlamat,
                profile_image: 'data:image/jpeg;base64,' + fileData,
            };
    
            
    
            axios.post(`${BASE_URL_STAG}/kidsgbigama_api.api.students.api.add_kids`, userData, config)
            .then(response => {
              // Handle response
            //   console.log(response.data);
              // Alert.alert("Login Successful", "Welcome back!");
              if(response.data.meta.status_code == 200)
              {   
                setLoading(false)
                ToastAndroid.show(''+ response.data.meta.message, ToastAndroid.SHORT);
                navigation.navigate('Home');
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



    }

   

  return (

    <SafeAreaView style={styles.container}>
        <View style={styles.viewStyle}>
 
        {loading ? ( <CircleFad/> ) : (<View></View>)}
            <ScrollView>

            <View style={{alignItems:'center'}}>
                <View style={{
                    width:150,
                    height:150,
                    marginTop: 20,
                    alignItems:'center',
                    justifyContent:'center',
                    elevation:3,
                    backgroundColor:'#fff', 
                    flexDirection:'row', 
                    borderRadius:10,}}>

                {!fileData ? (
                <Image style={{ 
                    width:150,
                    height:150,
                    borderRadius:10,}} 
                >
                </Image>) : (  <Image style={{ 
                    width:150,
                    height:150,
                    borderRadius:10,}} 
                    source={{uri:'data:image/jpeg;base64,' + fileData}}
                >
                </Image>)}


                <TouchableOpacity style={{position:'absolute'}} onPress={() => setIsShowSettingFav(true)}>
                    <Image 
                    source={iccamera} style={styles.imagestyle} >
                    </Image>
                </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.textstyle}>Nama</Text>
            <TextInput 
                 editable={!loading}
                style={styles.inputstyle}
                placeholder='Nama'
                onChangeText={text =>  SetName(text)}
                value={UseName} >

            </TextInput>

            <Text  style={styles.textstyle}>Tanggal Lahir</Text>

            <TouchableOpacity style={styles.SectionStyle} onPress={() => setOpen(true)}>
            <TextInput
                editable={false}
                style={{ flex: 1, color:'#000000'}}
                onChangeText={text => setanggal(text)}
                value={useTtl} 
            />

            <Image
                source={iccalender} //Change your icon image here
                style={styles.ImageStyle}
            />

            </TouchableOpacity>

            <Text style={styles.textstyle}>Jenis Kelamin</Text>

            <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:10, marginBottom:10}}>

                {gender.map((gender, key) => {
                   return(
                    <View key={gender}>
                    {checked == key ? (
                        <View style={{flex:1, flexDirection:'row',}}>
                            <Image
                            style={styles.img}
                            source={icradioincheck}/>
                            <Text>{gender}</Text>

                        </View>
                    ) 
                    : 
                    (
                        <View >
                            <TouchableOpacity style={{flex:1, flexDirection:'row'}}
                                onPress={() => {
                                setChecked(key)
                                    }}>
                                <Image
                                style={styles.img}
                                source={icradiouncheck}
                                />
                                 <Text>{gender}</Text>

                                </TouchableOpacity>

                        </View>
                    )

                    }

                    </View>
            
                   )
                })}


            </View>

            <Text style={styles.textstyle}>Pendidikan</Text>

            <SelectDropdown
                data={dataEducation}
                onSelect={(selectedItem, index) => {

                    handleQuis(selectedItem)
    
                    setDataKelas(JSON.stringify(selectedItem.education_level))
                    setIdEducation(selectedItem.id)
          

                }}
                renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
        
                    <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.education_level) || 'Pilih Pendidikan'}
                    </Text>
                    
                    <Image source={isOpened ? icchevronup : icchevrondown} style={styles.dropdownButtonArrowStyle} />
                
                    
                    </View>
                );
                }}
                renderItem={(item, index, isSelected) => {
                return (
                    <ScrollView>
                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    {/* <Image source={item.icon} style={styles.dropdownItemIconStyle} /> */}
                    <Text style={styles.dropdownItemTxtStyle}>{item.education_level}</Text>
                    </View>
                    </ScrollView>
                );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />

            <Text style={styles.textstyle}>Kelas</Text>

            <SelectDropdown

                data={kelas_sd}
                disabled={isenable}
                
                onSelect={(selectedItem, index) => {
                setformal_class(selectedItem)

                }}
                renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
        
                    <Text style={styles.dropdownButtonTxtStyle}>
                        {(formal_class && formal_class) || 'Pilih Kelas'}
                    </Text>
                    
                    <Image source={isOpened ? icchevronup : icchevrondown} style={styles.dropdownButtonArrowStyle} />
                
                    
                    </View>
                );
                }}
                renderItem={(item, index, isSelected) => {
                return (
                    <ScrollView>
                    <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    {/* <Image source={item.icon} style={styles.dropdownItemIconStyle} /> */}
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                    </View>
                    </ScrollView>
                );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />


            <Text style={styles.textstyle}>Tempat Lahir</Text>
            <TextInput 
                editable={!loading}
                style={styles.inputstyle}
                placeholder=''
                onChangeText={text =>  SetTTL(text)}
                value={UseTTL} >

            </TextInput>

            <Text style={styles.textstyle}>Status</Text>

            <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:10, marginBottom:10}}>

                {status.map((status, key) => {
                return(
                    <View key={status}>
                    {checkedStatus == key ? (
                        <View style={{flex:1, flexDirection:'row',}}>
                            <Image
                            style={styles.img}
                            source={icradioincheck}/>
                            <Text>{status}</Text>

                        </View>
                    ) 
                    : 
                    (
                        <View >
                            <TouchableOpacity style={{flex:1, flexDirection:'row'}}
                                onPress={() => {
                                setCheckedStatus(key)
                                    }}>
                                <Image
                                style={styles.img}
                                source={icradiouncheck}
                                />
                                <Text>{status}</Text>

                                </TouchableOpacity>

                        </View>
                    )

                    }

                    </View>

                )
                })}


            </View>

            <Text style={styles.textstyle}>Alamat</Text>
            <TextInput 
                style={{
                    textAlignVertical:'top',
                    textAlign:'left',
                    backgroundColor:'#ffffff', 
                    marginHorizontal: 10, 
                    marginVertical: 5,
                    borderRadius: 10, 
                    elevation: 2,
                    height:100,
                    borderWidth: 1,
                    borderColor:'#c9c9c9',               
                    paddingLeft:10,
                    paddingVertical:10}}
                editable={!loading}
                placeholder=''
                multiline={true}
                onChangeText={text =>  SetAlamat(text)}
                value={useAlamat} >

            </TextInput>

           
            </ScrollView>

            <View style={{height:70}}></View>


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

            <SwipeUp
                isSwipeLine={true}
                visible={isShowSettingFav}
                onClose={() => {
                    setIsShowSettingFav(false);
                }}
                height={500}
                children={

                    <View style={styles.viewSwipupstyle}>
                    

                        <TouchableOpacity style={{margin:16}} onPress={()=> {launchNativeCamera() ; setIsShowSettingFav(false)} }>
                        <PoppinsText>Select Image Photo</PoppinsText>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{marginLeft:16}} onPress={() => {launchNativeImageLibrary() ;  setIsShowSettingFav(false) }}>
                        <PoppinsText>Select Image Galery</PoppinsText>
                        </TouchableOpacity> */}
                
                    </View> 
                }
            />

            <View style={{backgroundColor:'#fff', }}>

      
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
                    
                }} onPress={() => handlepost()} >
                    <Text 
                    style={{
                    fontFamily: 'Poppins-Bold', 
                    color:'#fff', 
                    alignContent:'center', 
                    textAlign:'center',
                    fontSize:20}}>KIRIM</Text>
                    {/*  fontSize:20}} onPress={()=> console.log(useTtl)}>SIMPAN</PoppinsText> */}
            </TouchableOpacity>

            </View>

     
        </View>



      
    </SafeAreaView>

   
     
  )
}

export default TambahAnak

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }, 
    viewStyle:{
        flex:1,
        margin:16,
        backgroundColor:'#fff'
    },
    imagestyle:{
        width:45, 
        height:45, 
    },
    replaceimagestyle:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:10
    },
    textstyle:{
        marginLeft:10, 
        marginTop:5, 
        marginBottom:5,
        fontWeight:'semibold',
        color:Colors.black
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
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }, 
    img: {
        justifyContent:'center',
        alignItems:'center',
        height: 20,
        width: 20,
        marginHorizontal: 5,
    },
    border:{
        padding:10,
        marginTop:20,
        backgroundColor:'#fff',
        borderRadius:15,
        borderColor:'#000',
        elevation:2,
        borderWidth:1, 
        flexDirection:'row'
        
    }, 
    dropdownButtonStyle: {
        flex:1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation:2,
        marginBottom:5,
        marginRight:5,
        marginLeft:5,
        paddingHorizontal: 12,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'regular',
        color: '#000',
      },
      dropdownButtonArrowStyle: {
        fontSize: 24,
        width:20,
        height:20
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        height:180, 
        overflow:'scroll'
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center', 
        paddingVertical: 8,
      },
      viewSwipupstyle:{
        display: 'flex',
        paddingHorizontal: 8,
        paddingVertical: 8,
        paddingBottom:30,
        justifyContent: 'center'
      }, 

})