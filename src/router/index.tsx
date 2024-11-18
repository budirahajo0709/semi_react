import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import EditProfile from '../pages/EditProfile';
import LogPresensi from '../pages/LogPresensi';
import PresensiMurid from '../pages/PresensiMurid';
import Scan from '../pages/PresensiMurid/Scan';
import { icbackground, iccamera, icrightwhite } from '../asset/images';
import PilihMurid from '../pages/PresensiMurid/PilihMurid';
import PresensiGuru from '../pages/PresensiGuru';
import PilihIbadah from '../pages/PresensiGuru/PilihIbadah';
import AmbilFoto from '../pages/PresensiGuru/AmbilFoto';
import DetailLogPresensi from '../pages/LogPresensi/DetailLogPresensi';
import DetailLokasi from '../pages/LogPresensi/DetailPresensi';
import Lokasi from '../pages/LogPresensi/Lokasi';
import LupaPassword from '../pages/LupaPassword';
import GantiPassword from '../pages/LupaPassword/GantiPassword';
import TambahAnak from '../pages/TambahAnak';
import BerhasilScan from '../pages/PresensiMurid/Scan/BerhasilScan';
import BerhasilPilih from '../pages/PresensiMurid/PilihMurid/BerhasilPilih';
import BerhasilAbsen from '../pages/PresensiGuru/AmbilFoto/BerhasilAbsen';


const Router = () => {

    const Stack = createNativeStackNavigator();

  return (

    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={Splash} options={{
          headerShown:false,
          orientation:'portrait'
          }} />
        <Stack.Screen name="Login" component={Login} options={{
          headerShown:false,
          orientation:'portrait'
          }} />
        <Stack.Screen name="Home" component={Home} options={{
          headerShown:false, 
          orientation:'portrait'
          }} />
        <Stack.Screen name="Edit Profile" component={EditProfile} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          }
          }} />
          <Stack.Screen name="Log Presensi" component={LogPresensi} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          }
          }} />    
          <Stack.Screen name="Presensi Murid" component={PresensiMurid} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          }
          }} />  
          <Stack.Screen name="Scan QR Code Murid" component={Scan} 
          options={{
          headerShown:true,
          orientation:'portrait', 
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#ffffff'
          },

          }} />  
          <Stack.Screen name="Pilih Murid" component={PilihMurid} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} />  

        <Stack.Screen name="Masuk" component={PresensiGuru} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} />  

        <Stack.Screen name="Pilih Ibadah" component={PilihIbadah} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} />  
        <Stack.Screen name="Ambil Foto" component={AmbilFoto} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} />  
          <Stack.Screen name="Masuk " component={DetailLogPresensi} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 

          <Stack.Screen name="Detail" component={DetailLokasi} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 

          <Stack.Screen name="Lokasi" component={Lokasi} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 
          <Stack.Screen name="Lupa Password" component={LupaPassword} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 
          <Stack.Screen name="Ganti Password" component={GantiPassword} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 
          <Stack.Screen name="Tambah Murid" component={TambahAnak} options={{
          headerShown:true, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 
          <Stack.Screen name="Succces" component={BerhasilScan} options={{
          headerShown:false, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 

         <Stack.Screen name="Succces Pilih" component={BerhasilPilih} options={{
          headerShown:false, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 

          <Stack.Screen name="Succces Absen" component={BerhasilAbsen} options={{
          headerShown:false, 
          orientation:'portrait',
          headerTintColor:'#fff', 
          headerStyle:{
            backgroundColor: '#df1e4d'
          },
          }} /> 




    </Stack.Navigator>





  )
}

export default Router

const styles = StyleSheet.create({})