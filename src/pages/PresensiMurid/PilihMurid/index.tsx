import { Alert, FlatList, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import { iccalender, iccamera, icchevrondown, icchevronup } from '../../../asset/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircleFad from '../../../component/atoms/CircleFad';
import Colors from '../../../component/atoms/Colors';



interface nama_title {
  id : string ; 

}

 export default function PilihMurid ({route , navigation, } : any) {
  const {useId} = route.params;

  const [useee, setUseee] = useState<nama_title>({'id': ''});
  const [data, setData] = useState<any>('');
  const [kelas, setKelas] = useState<any>('');

  const [input, setInput] = useState('');
  const [edit, SetEdit] = useState('');

  const [alldata, setAllData] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(false);

  console.log("PilihMurid : " + useId)

  // console.log("Data"+ JSON.stringify(data))
  // console.log("Data"+ JSON.stringify(useee))
  // console.log("input"+ input)
  // console.log("edit"+ edit)

  useEffect (() => {
    getdata();
  }, [useee])

  const getdata = async () => {

    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 

      setLoading(true)

  
      axios.get(`https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.students.api.list_student?page=1&per_page=50&class=${useee.id}&search=`, config)
        .then(response => {
          // Handle response
          // console.log(response.data);
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
            setLoading(false)
            setData(response.data.data.item)
            setAllData(response.data.data.item)
       
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

  useEffect (() => {
    getkelas()
  }, [])

  const getkelas = async () => {

    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 

        axios.get('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.class.api.list', config)
        .then(response => {
          // Handle response
          // console.log(response.data);
          // Alert.alert("Login Successful", "Welcome back!");
          if(response.data.meta.status_code == 200)
          {   
           
            setKelas(response.data.data)

          }
          else
          {
            
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

  function handleChange(query:any) {
    setSearchQuery(query);
    const filtered = alldata.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) 

    );
    setFilteredData(filtered);
  }

  const handlepost = async (item_id) =>{
    try{
      let AccesToken = await AsyncStorage.getItem('AccesToken');

      const config = {
        headers: {
           "Authorization" : `Basic ${AccesToken}`
        }
      } 

      setLoading(true)

      const params = {
        student: item_id,
        event: useId,
      };

      console.log("log params" + JSON.stringify(params))

      axios.post('https://icc-kidsgbigama.nyuuk.my.id/api/method/kidsgbigama_api.api.attendance.api.present_student', params, config)
      .then(response => {
        // Handle response
        console.log(response.data);
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

  // console.log("useee"+ JSON.stringify(useee))


  return (

    <SafeAreaView style={styles.container}>

    <View style={styles.styleview}>

     <SelectDropdown
        data={kelas}
        onSelect={(selectedItem, index) => {
    
        setUseee(selectedItem)
        // console.log(selectedItem, index);

        }}
        renderButton={(selectedItem, isOpened) => {
        return (
            <View style={styles.dropdownButtonStyle}>
 
            <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.id) || 'Pilih Kelas'}
            </Text>
            
            <Image source={isOpened ? icchevronup : icchevrondown} style={styles.dropdownButtonArrowStyle} />
          
            
            </View>
        );
        }}
        renderItem={(item, index, isSelected) => {
        return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
            {/* <Image source={item.icon} style={styles.dropdownItemIconStyle} /> */}
            <Text style={styles.dropdownItemTxtStyle}>{item.id}</Text>
            </View>
        );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
     />

      <TextInput 
        style={styles.styleinputtext}
        placeholder='cari'
        onChangeText={handleChange}
        value={searchQuery}
        >

      </TextInput>

      {/* <Text >
         {searchQuery.length>0?`${filteredData.length} records found`:`Total Records ${alldata.length} `}
        </Text> */}

    <FlatList 
    
    data={searchQuery.length > 0 ? filteredData : data}
    keyExtractor={item => item.id}
    renderItem={({item}) => (

      <View style={{marginTop:10}} >
          <Text onPress={()=>  
          
          Alert.alert(
            'Konfirmasi', 
            `Presensi atas nama ${item.name}`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              //ngirim api
              // {text: 'OK', onPress: () => console.log('OK Pressed')},
              {
                text: 'OK', 
                onPress: () => handlepost(item.id)

              },
            ]
          
          )} 
          style={{fontWeight:'bold'}}> {item.name}</Text>

          <View style ={styles.viewline}></View>
      </View>
      
    )}
    />
  {loading ? ( <CircleFad/> ) : (<View></View>)}


  </View>

    </SafeAreaView>
  )
}





const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:Colors.white
    },
    styleview:{
      flex:1,
      margin:16
    },
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation:2,
        paddingHorizontal: 12,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
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
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      styleinputtext:{
        marginTop:10,
        backgroundColor:'#ffffff', 
        marginVertical: 5,
        borderRadius: 10, 
        elevation: 2, 
        borderWidth: 1,
        borderColor:'#c9c9c9',               
        paddingLeft:10,
      }, 
      viewline:{
        height:1, 
        backgroundColor:'#c9c9c9', 
        marginTop:5
      }
})