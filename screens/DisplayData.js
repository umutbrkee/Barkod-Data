import React, {useState,useEffect,useRoute} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking,Alert } from 'react-native';
import { auth } from '../FirebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import BarcodeScanner from './BarcodeScanner';

const DisplayData = ({ route }) => { //gets the parameter from BarcodeScanner.js which is user'sinformation obtained from FireBase Realtime Database
 
  const userData = route.params?.userData; //match the parameter to userData 

if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Kullanıcı Bilgisi Uygun Değil</Text>
      </View>
    );
  }
  else{
   
  }
   //handle the all pressable info box by getting datas from Firebase
   const handleInstagramLink = () => {
    if (!userData.instagramUsername) {
      Alert.alert("Uyarı","Instagram kullanıcı adı boş.");
      return;
    }
    const instagramURL = `https://www.instagram.com/${userData.instagramUsername}/`;

    Linking.canOpenURL(instagramURL).then((supported) => {
      if (supported) {
        Linking.openURL(instagramURL);
      } else {
        Alert.alert("Uyarı","Instagram uygulaması yüklü değil veya desteklenmiyor.");
      }
    });
  };

  const handleTwitterLink = () => {
    if (!userData.twitterUsername) {
      Alert.alert("Uyarı","Twitter kullanıcı adı boş.");
      return;
    }
    const twitterURL = `https://twitter.com/${userData.twitterUsername}`;

    Linking.canOpenURL(twitterURL).then((supported) => {
      if (supported) {
        Linking.openURL(twitterURL);
      } else {
        Alert.alert("Uyarı","Twitter uygulaması yüklü değil veya desteklenmiyor.");
      }
    });
  };

  const handlePhoneCall = () => {
    if (!userData.phoneNumber) {
      Alert.alert("Uyarı","Telefon numarası kısmı boş.");
      return;
    }
    const phoneURL = `tel:${userData.phoneNumber}`;

    Linking.canOpenURL(phoneURL).then((supported) => {
      if (supported) {
        Linking.openURL(phoneURL);
      } else {
        Alert.alert("Uyarı","Telefon arama özelliği desteklenmiyor.");
      }
    });
  };

  const handleGoogleMaps = () => {
    if (!userData.address) {
      Alert.alert("Uyarı","Adres kısmı boş.");
      return;
    }
    const mapsURL = `https://www.google.com/maps/search/?api=1&query=${userData.address}`;

    Linking.canOpenURL(mapsURL).then((supported) => {
      if (supported) {
        Linking.openURL(mapsURL);
      } else {
        Alert.alert("Uyarı","Google Maps uygulaması yüklü değil veya desteklenmiyor.");
      }
    });
  };

  const handleLinkedInLink = () => {
    if (!userData.linkedinUsername) {
      Alert.alert("Uyarı","LinkedIn kullanıcı adı boş.");
      return;
    }
    const linkedinURL = `${userData.linkedinUsername}`;

    Linking.canOpenURL(linkedinURL).then((supported) => {
      if (supported) {
        Linking.openURL(linkedinURL);
      } else {
        Alert.alert("Uyarı","LinkedIn uygulaması yüklü değil veya desteklenmiyor.");
      }
    });
  };

  const handleYoutubeLink = () => {
    if (!userData.youtubeUsername) {
      Alert.alert("Uyarı","Youtube kullanıcı adı boş.");
      return;
    }
    const youtubeURL = `${userData.youtubeUsername}`;

    Linking.canOpenURL(youtubeURL).then((supported) => {
      if (supported) {
        Linking.openURL(youtubeURL);
      } else {
        Alert.alert("Uyarı","YouTube uygulaması yüklü değil veya desteklenmiyor.");
      }
    });
  };
    //for every pressable box link to according app
  return (
    <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
    
      <Text style={{ flex: 1, fontWeight: 'bold', top: '20%' }}>{userData.personName} {userData.personSurname} adlı kullanıcı bilgileri:</Text>
      <TouchableOpacity onPress={handlePhoneCall} style={{ flex: 1, height: 45, fontWeight: 'bold', width: 350, borderColor: '#009DE0', borderRadius:8, borderWidth: 2, position: 'absolute', top: '30%' }}>
        <Text> Telefon Numarasını Ara: {userData.phoneNumber} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoogleMaps} style={{ flex: 1, height: 45, fontWeight: 'bold', width: 350, borderColor: '#009DE0', borderRadius:8,borderWidth: 2, position: 'absolute', top: '38%' }}>
        <Text> Adresi Göster:  {userData.address} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleInstagramLink} style={{ flex: 1, height: 45, fontWeight: 'bold', width: 350, borderColor: '#009DE0', borderRadius:8,borderWidth: 2, position: 'absolute', top: '46%' }}>
        <Text> Instagram Profiline Git:  {userData.instagramUsername} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTwitterLink} style={{ flex: 1, height: 45, fontWeight: 'bold', width: 350, borderColor: '#009DE0', borderRadius:8,borderWidth: 2, position: 'absolute', top: '54%' }}>
        <Text> Twitter Profiline Git: {userData.twitterUsername} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLinkedInLink} style={{ flex: 1, height: 45, fontWeight: 'bold', width: 350, borderColor: '#009DE0', borderRadius:8,borderWidth: 2, position: 'absolute', top: '62%' }}>
        <Text> LinkedIn Profiline Git:  {userData.linkedinUsername} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleYoutubeLink} style={{ flex: 1, height: 45, fontWeight: 'bold', width: 350, borderColor: '#009DE0',borderRadius:8, borderWidth: 2, position: 'absolute', top: '70%' }}>
        <Text> YouTube Kanalına Git:  {userData.youtubeUsername} </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles=StyleSheet.create({
  border:{
    flex: 1,
    borderColor: 'black', 
    borderWidth: 2,
    position: 'absolute',
    top: '20%',
  },
})


export default DisplayData;
