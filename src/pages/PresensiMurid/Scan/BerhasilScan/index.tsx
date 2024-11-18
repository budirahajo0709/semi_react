import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ic_profile, icseminew, icSucces } from '../../../../asset/images'
import Colors from '../../../../component/atoms/Colors'
import { PoppinsText } from '../../../../asset/font'

const BerhasilScan = ({route, navigation} : any) => {
    const {aa} = route.params;
    const {useId} = route.params;
    const {TanggalAbsen} = route.params;
    

    console.log("data 1 : ", aa);
    console.log("data useId : ", useId);
    console.log("data TanggalAbsen : ", TanggalAbsen);
    

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
    <View style={{margin:16, flex:1}}>
        <Image source={icSucces} style={{width:110, height:110, alignSelf : 'center',
            marginTop : 40,
            marginBottom:10, }}/>
      <Text style={{fontWeight:'bold', color:Colors.black, alignSelf:'center'}}>PRESENSI BERHASIL</Text>

      <View style={{elevation:6, borderRadius:9, width:300, height:300, backgroundColor:'#FFF', alignSelf:'center', marginTop:20}}>

        {aa.image === 'null' ? 
        (
            <Image source={icseminew} style={{    
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'contain'}} />
        )
        :
        (
            <Image source={{uri:aa.image}} style={{    
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain'}} />
        )
        
    }

        

      </View>

      <Text style={{fontWeight:'bold', color:Colors.black, marginTop:20}}>{aa.event_name}</Text>
      <Text style={{fontWeight:'bold', color:Colors.black, marginTop:2}}>{aa.name}</Text>
      <Text style={{fontWeight:'bold', color:Colors.black, marginTop:2}}>{aa.student_id}</Text>
      <Text style={{fontWeight:'bold', color:Colors.black, marginTop:2}}>{aa.date} - {aa.time}</Text>

      </View>

      <TouchableOpacity style={styles.buttonstyle} onPress={() => navigation.navigate('Scan QR Code Murid', {
        useId, 
        TanggalAbsen
      }) }>
        <PoppinsText style={styles.textbuttonstyle}>Tutup</PoppinsText>
      </TouchableOpacity>




    </SafeAreaView>
  )
}

export default BerhasilScan

const styles = StyleSheet.create({


    buttonstyle:{
        margin:16,
        position:'relative',
        backgroundColor:'#df1e4d',
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15, 
        elevation:2,
      }, 
    textbuttonstyle:{
        fontFamily: 'Poppins-Bold', 
        color:'#fff', 
        alignContent:'center', 
        textAlign:'center',
        fontSize:20
      }, 

})