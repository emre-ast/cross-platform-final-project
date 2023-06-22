// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {PaperProvider} from 'react-native-paper';

function HomeScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'Home'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Products"
        onPress={() => navigation.navigate('Products')}
      />

      <Button
        title="Go to Category"
        onPress={() => navigation.navigate('Category')}
      />
    </View>
  );
}

function ProductScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'Products'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Product Screen</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function CategoryScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'Categories'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Category Screen</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          shifting
          labeled
          sceneAnimationEnabled={false}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: 'home-account',
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductScreen}
            options={{
              tabBarIcon: 'bell-outline',
            }}
          />
          <Tab.Screen
            name="Categories"
            component={CategoryScreen}
            options={{
              tabBarIcon: 'message-text-outline',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
