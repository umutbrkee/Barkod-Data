import * as React from 'react';
import { Button, Alert,StyleSheet,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';

function LogoutButton({ screenName }) {
  const navigation = useNavigation();

  const createTwoButtonAlert = () => {
    Alert.alert(
      'Çıkış Onayı',
      'Hesaptan çıkmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Çıkış',
          onPress: () => {
            // Navigate to the specified screen if OK is pressed
            navigation.navigate(screenName);
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.logoutBut}  onPress={createTwoButtonAlert} >
        <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Çıkış</Text>
    </TouchableOpacity>
  );
  
}
const styles =StyleSheet.create({
logoutBut: {
  
    padding: 12,
    marginTop: 4,
    marginLeft: 20,
    alignItems: 'center',
   
  },
});

export default LogoutButton;