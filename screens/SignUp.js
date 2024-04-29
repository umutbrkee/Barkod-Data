
import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity,Alert } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

const SignUp = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passAgain, setPassAgain] = React.useState('');

  //The 'Kaydet' button handling --check for a valid email and 2 same password entered  
  const handleButtonClick = async () => {
    try {
      if (password !== passAgain) {
        Alert.alert("Uyarı",'Şifreler uyuşmuyor.');
        console.error('Şifreler uyuşmuyor.');
        return;
      }
        //After submiting the informatons send a verification link to the user's email
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log('Kullanıcı oluşturuldu:', userCredential.user);

      sendEmailVerification(userCredential.user);
         //If the verification link is clicked then navigate to Login screen
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Uyarı!",'Girdiğiniz e-posta geçerli değil veya şifreler uyuşmuyor');
      console.error('Kayıt olma hatası:', error.message);
    }
  };
    //Screen view
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Kayıt Ol</Text>
      <Text style={styles.label}>Lütfen aşağıdaki bilgileri eksiksiz doldurunuz</Text>
      <Text style={styles.label}>E-posta Adresiniz: </Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="E-posta Adresi"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Şifreniz: </Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Şifre"
        secureTextEntry
      />
      <Text style={styles.label}>Şifre Tekrar: </Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassAgain}
        value={passAgain}
        placeholder="Şifre Tekrar"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleButtonClick} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
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
});

export default SignUp;
