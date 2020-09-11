import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Theme} from './Theme';
import {NavigationContainer, DefaultTheme as NavigationTheme} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

const navigationTheme = {
  ...NavigationTheme,
  colors: {
    ...NavigationTheme.colors,
    background: 'white'
  }
}

const Tab = createMaterialBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaView style={Theme.centerCenter}>
        <NavigationContainer theme={navigationTheme} style={Theme.centerCenter} >
          <Tab.Navigator style={[Theme.fullSize, {backgroundColor: 'white'}]} initialRouteName="Accueil" barStyle={{backgroundColor: 'black'}} >
            <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Accueil', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />)}} />
            <Tab.Screen name="Favorites" component={FavoriteScreen} options={{tabBarLabel: 'Favoris', tabBarIcon: ({ color }) => (<Icon name="heart" color={color} size={26} />)}}/>
            <Tab.Screen name="History" component={HistoryScreen} options={{tabBarLabel: 'Historique', tabBarIcon: ({ color }) => (<Icon name="history" color={color} size={26} />)}}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarLabel: 'Paramètres', tabBarIcon: ({ color }) => (<Icon name="cog" color={color} size={26} />)}}/>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  icon: {
    margin: 20,
  },
});

export default App;
