import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { auth, db } from '../FirebaseConfig';
import { ref, get, onValue, set } from 'firebase/database';

const MyForm = ({ navigation }) => { //to edit datas in app
  const [formValues, setFormValues] = useState({
    personName: '',
    personSurname: '',
    phoneNumber: '',
    twitterUsername: '',
    youtubeUsername: '',
    instagramUsername: '',
    linkedinUsername: '',
    address: '',
  });

  // Fetching user datas from Firebase Real Time Database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('Kullanıcı oturum açmamış.');
          return;
        }

        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);

        // If user data exists, update the formValues state
        if (userSnapshot.exists()) {
          setFormValues(userSnapshot.val());
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, []); 

  

  // Handling change for any input field
  const handleInputChange = (field, text) => {
    setFormValues((values) => ({ ...values, [field]: text }));
  };

  // Submit ('Gönder') button actions
  const handleSubmit = () => {
    // Check if the user is logged in
    const user = auth.currentUser;
    if (!user) {
      console.error('Kullanıcı oturum açmamış.');
      return;
    }

    // Writing the datas to console for checking
    console.log('Form verileri:', formValues);

    // Saving the  form values to Firebase Realtime Database
    const userRef = ref(db, `users/${user.uid}`);
    set(userRef, formValues);

    // Aler message to user after editing infos
    Alert.alert('Profil Bilgileri', 'Bilgileriniz Kaydedildi', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

    //After edit is done navigate to main screen again
    navigation.navigate('HomeTabs', { screen: 'Profilim' });
  };
  //Screen view
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ad: </Text>
        <TextInput
          style={styles.input}
          placeholder="Ad"
          onChangeText={(text) => handleInputChange('personName', text)}
          value={formValues.personName}
        />
      </View>

     
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Soyad: </Text>
        <TextInput
          style={styles.input}
          placeholder="Soyad"
          onChangeText={(text) => handleInputChange('personSurname', text)}
          value={formValues.personSurname}
        />
      </View>

     
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tel. No: </Text>
        <TextInput
          style={styles.input}
          placeholder="Telefon"
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          value={formValues.phoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Twitter: </Text>
        <TextInput
          style={styles.input}
          placeholder="Twitter Kullanıcı Adı"
          onChangeText={(text) => handleInputChange('twitterUsername', text)}
          value={formValues.twitterUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Youtbe: </Text>
        <TextInput
          style={styles.input}
          placeholder="Youtube URL"
          onChangeText={(text) => handleInputChange('youtubeUsername', text)}
          value={formValues.youtubeUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Instagram: </Text>
        <TextInput
          style={styles.input}
          placeholder="Instagram Kullanıcı adı"
          onChangeText={(text) => handleInputChange('instagramUsername', text)}
          value={formValues.instagramUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>LinkedIn: </Text>
        <TextInput
          style={styles.input}
          placeholder="LinkedIn URL"
          onChangeText={(text) => handleInputChange('linkedinUsername', text)}
          value={formValues.linkedinUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Adres: </Text>
        <TextInput
          style={styles.input}
          placeholder="Adres"
          onChangeText={(text) => handleInputChange('address', text)}
          value={formValues.address}
        />
      </View>

      {/* Add other input fields similarly... */}

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gönder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
    width: '25%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyForm;
