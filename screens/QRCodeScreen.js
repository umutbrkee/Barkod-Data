import React,{useState,useEffect}from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth } from '../FirebaseConfig';

const QRCodeScreen = () => {
 
 
  const [userId, setUserId] = useState(null);
 
   //Get user id from Firebase Real Database (uid)
  useEffect(() => {
    const fetchUserId = async () => {
      try {
       
        const user = auth.currentUser;

        if (user) {
          setUserId(user.uid);
        } else {
          
        }
      } catch (error) {
        console.error('Error fetching userId:', error.message);
      }
    };

    fetchUserId(); //assign it to userId
  }, []);
  //the assigned ORCode will contain the userId of every user who signed up and logged in
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>QR Kod Sayfası</Text> 
      {userId && <QRCode value={userId} size={200} />} 
    </View>
  );
};

export default QRCodeScreen;
