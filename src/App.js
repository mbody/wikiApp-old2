import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Theme} from './Theme';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

const Tab = createMaterialBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaView style={Theme.centerCenter}>
        <NavigationContainer style={Theme.centerCenter} options={{}}>
          <Tab.Navigator style={Theme.fullSize} initialRouteName="Accueil" >
            <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel: 'Accueil', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />)}} />
            <Tab.Screen name="Favorites" component={FavoriteScreen} options={{tabBarLabel: 'Favoris', tabBarIcon: ({ color }) => (<Icon name="heart" color={color} size={26} />)}}/>
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
