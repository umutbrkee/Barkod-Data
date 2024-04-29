import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { useIsFocused } from '@react-navigation/native';

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
       
  //Firstly ask for user permission tu use camera
  useEffect(() => {
   
    (async () => {
      setScanned(false);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  },[]);
 
     //After scanning a barcode handle actions
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    // get user datas from Firebase
    const db = getDatabase();
    const userRef = ref(db, `users/${data}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      // İf User datas found, navigate to DisplayData page with the parameter userData
      navigation.navigate('DisplayData',{userData:userSnapshot.val()});
    
      setScanned(false);
    } else {
      // if User not found alert message is shown
      Alert.alert("Uyarı","Kullanıcı bulunamadı");
      console.warn('User not found');
    }
  };

  if (hasPermission === null) {
    return 
  }
  if (hasPermission === false) {//if user does not allow using the camera show message
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
    {isFocused ? (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} 
      />
      ) : null}
      
      {scanned && (
         setScanned(false) //after scanning a barcode setScanned=false to be able tot scan again 
      )}

      <View style={styles.borderOverlay}>
     
      </View>

        </View>
  );
};

const styles = StyleSheet.create({
  container:{
      flex: 1,
    borderColor: '#009DE0', 
    borderWidth: 2, 
    position: 'absolute',
    top: '10%', 
    left: '10%', 
    right: '10%', 
    bottom: '10%',
  },
 
  borderOverlay: {
    flex: 1,
    borderColor: '#009DE0', 
    borderWidth: 2, 
    position: 'absolute',
    top: '20%', 
    left: '10%',
    right: '10%', 
    bottom: '20%', 
  },
});


export default BarcodeScanner;
