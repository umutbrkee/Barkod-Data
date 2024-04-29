import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet,View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons'; 


import LoginForm from './screens/Login';
import MyForm from './screens/MyForm';
import QRCodeScreen from './screens/QRCodeScreen';

import BarcodeScanner from './screens/BarcodeScanner';
import DisplayData from './screens/DisplayData';
import LogoutButton from './components/LogoutButton';
import MyAccount from './screens/MyAccount';
import SignUp from './screens/SignUp';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const HomeStack = () => (
  
  <Stack.Navigator
  screenOptions={{
    initialRouteName:'Login',
    headerShown: true,
    headerTitle: (props) => <LogoTitle {...props} />,
    headerStyle: {
      backgroundColor: '#3498db',
     
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <LogoutButton screenName={'Login'}/>
    ),
  }}
  >
    <Stack.Screen name="QR kodum" component={QRCodeScreen} />
   
  </Stack.Navigator>
);

const LoginFormStack = () => (
  <Stack.Navigator
    //initialRouteName="Login"
    screenOptions={{
      headerShown: true,
      headerTitle: (props) => <LogoLogin {...props} />,
      headerStyle: {
        backgroundColor: '#3498db',
       
      },
      headerTintColor: '#fff',
      
    }}
  >
    <Stack.Screen name="Log in" component={LoginForm} />
  </Stack.Navigator>
);

const SignUpStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerTitle: (props) => <LogoTitle {...props} />,
      headerStyle: {
        backgroundColor: '#3498db',
       
      },
      headerTintColor: '#fff',
    
    }}
  >
    <Stack.Screen name="Sign up" component={SignUp} />
  </Stack.Navigator>
);
const ScannerStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#3498db',
      
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <LogoutButton screenName={'Login'}/>
      ),
    }}
  >
    <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
   
  </Stack.Navigator>
);

const FormStack = () => (
  <Stack.Navigator
    screenOptions={{
    headerShown: true,
    headerTitle: (props) => <LogoTitle {...props} />,
    headerStyle: {
      backgroundColor: '#3498db',
 
    },
    headerTintColor: '#fff',
    headerRight: () => (
   <LogoutButton screenName={'Login'}/>
    ),
  
   
  }}
  >
    <Stack.Screen name="Profili Düzenle" component={MyForm} />
  </Stack.Navigator>
);
const MyAccountStack = () => (
  <Stack.Navigator
  screenOptions={{
    headerShown: true,
    headerTitle: (props) => <LogoTitle {...props} />,
    headerStyle: {
      backgroundColor: '#3498db',
     
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <LogoutButton screenName={'Login'}/>
    ),
  }}
  >
    <Stack.Screen name="Profil" component={MyAccount} />
  </Stack.Navigator>
);
const DisplayDataStack = () => (

  <Stack.Navigator
  
  screenOptions={{
    headerShown: true,
    headerTitle: (props) => <LogoTitle {...props} />,
    headerStyle: {
      backgroundColor: '#3498db',
     
    },
    headerTintColor: '#fff',
    headerRight: () => (
      <LogoutButton screenName={'Login'}/>
    ),
  }}
  >
    <Stack.Screen name="Display Data" component={DisplayData} />
  </Stack.Navigator>
);

const MyFormStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerTitle: (props) => <LogoTitle {...props} />,
      headerStyle: {
        backgroundColor: '#3498db',
       
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <LogoutButton screenName={'Login'}/>
      ),
    }}
  >
    <Stack.Screen name="MyForm" component={MyForm} />
  </Stack.Navigator>
);
function LogoTitle() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',position:'relative',left:'100%', width: '100%'}}>
    <Image
      style={{ width: 45, height: 45,borderRadius:30 }}
      source={require('./assets/applogo.png')}
      resizeMode='contain'
    />
   </View>
  );
}
  function LogoLogin() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',position:'relative',left:'150%', width: '100%'}}>
      <Image
        style={{ width: 45, height: 45,borderRadius:30 }}
        source={require('./assets/applogo.png')}
        //resizeMode='contain'
      />
     </View>
    );
}

function HomeTabs() {
  return (
    
    <Tab.Navigator
   
      screenOptions={({ route }) => ({
       
          tabBarActiveTintColor: '#A0E3F5',
          tabBarInactiveTintColor: '#333333',
        
        headerShown:false,
        tabBarIcon: ({ focused,color, size }) => {
          let iconName;

          if (route.name === 'Profil Düzenle') {
            iconName = 'user-edit';
            
          } else if (route.name === 'Barkodum') {
            iconName = 'info-circle';
          }
          else if (route.name === 'QR Oku') {
            iconName = 'qrcode';
          }
          else if (route.name === 'Profilim') {
            iconName = 'user-alt';
          }

        

          return<FontAwesome5 name={iconName} size={24} color={focused?"#A0E3F5":"#3498db"}/>  ;
        },
      })}
      
    > 
      
      
      <Tab.Screen name="Barkodum" component={HomeStack} />
      <Tab.Screen name="QR Oku" component={ScannerStack} />
      <Tab.Screen name="Profilim" component={MyAccountStack} />
     
     
    </Tab.Navigator>
  );
}



export default function App() {
 
  return (
    <NavigationContainer>
   
   
     <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          headerTitle: (props) => <LogoTitle {...props} />,
        
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <LogoutButton screenName={'Login'}/>
          ),}}
          
      > 
        <Stack.Screen name="Signup" component={SignUpStack} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="BarcodeScanner" component={ScannerStack} />
        <Stack.Screen name="DisplayData" component={DisplayData}  />
        <Stack.Screen name="Login" component={LoginFormStack} />
        <Stack.Screen name="Profil Düzenle" component={MyFormStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

