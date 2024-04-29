import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../FirebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

const MyAccount = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

   //fetching all user datas in Firebase Real Database to show the user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
          const userSnapshot = await get(userRef);

          if (userSnapshot.exists()) {
                        
            setUserData(userSnapshot.val());
          } else {
            console.warn('User data not found');
          }
        } else {
          console.warn('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userData]); 
    //navigation to MyForm page if user need to edit any info
  const handleNavigateToMyForm = () => {
    navigation.navigate('Profil Düzenle'); // MyForm ekranını aç
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontWeight: 'bold', marginBottom: 30, fontSize: 20 }}>Profil Bilgilerim</Text>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Ad: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.personName}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Soyad: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.personSurname}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Telefon Numarası: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.phoneNumber}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Twitter Kullanıcı adı: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.twitterUsername}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Instagram Kullanıcı adı: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.instagramUsername}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Youtube URL: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.youtubeUsername}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>LinkedIn URL: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.linkedinUsername}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <View style={styles.inputContain}>
        <Text style={styles.label}>Adres: </Text>
        {userData ? (
          <>
            <Text style={styles.border}> {userData.address}</Text>
          </>) : (
          <Text></Text>
        )}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleNavigateToMyForm}>
        <Text style={styles.editButtonText}>Düzenle</Text>
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
  border: {
    borderColor: '#3498db',
    borderWidth: 0.5,
    position: 'absolute',
    width: 300,
    height: 40,
    top: '100%',
  },
  inputContain: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 12,
    marginTop: 25,
    alignItems: 'center',
    borderRadius: 8,
    width: '30%',
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
   
  },
  borderText: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
});

export default MyAccount;
