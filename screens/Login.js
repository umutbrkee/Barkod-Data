import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { AntDesign } from '@expo/vector-icons'; 


const LoginForm = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleLogin = async () => {
    try {
      // Loging in via Firebase Authentication 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
      // If logging in is succesfully done write to console
      console.log('Giriş başarılı:', userCredential.user);

      // checking for email verification
      if (userCredential.user && !userCredential.user.emailVerified) {
        Alert.alert("Uyarı",'E-posta doğrulaması yapılmamış.');
        console.log('E-posta doğrulaması yapılmamış.');
        
        return;
      }
         // if email and password are valid navigate to main screen 
      if (userCredential.user) {
        
       
        navigation.navigate( 'HomeTabs', {screen: 'Barkodum'});
      }
   
      else { //if mail or password are incorrect alert the user
        Alert.alert("Uyarı",'Hesap bulunamadı veya başka bir durum var.');
        console.log('Hesap bulunamadı veya başka bir durum var.');
      }
      
    } catch (error) {
      Alert.alert("Uyarı",'Giriş hatası');
      console.error('Giriş hatası:', error.message);
    }
   
  };
    //for scanning a barcode with the bottom tab button
  const handleNavigateToBarcodeScanner = () => {
    navigation.navigate('BarcodeScanner');
  };

  //Screen view
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Log in</Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signUpLink}>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomNavBar}>
        {/* QR Code Button */}
        <TouchableOpacity style={styles.qrCodeButton} onPress={handleNavigateToBarcodeScanner}>
          <AntDesign name="qrcode" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 250,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#009DE0',
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpLink: {
    marginTop: 16,
  },
  signUpText: {
    textDecorationLine: 'underline',
    color: '#009DE0',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  qrCodeButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
});

export default LoginForm;
