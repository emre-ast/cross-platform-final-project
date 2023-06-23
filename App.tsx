/* eslint-disable react-native/no-inline-styles */
// In App.js in a new project

import * as React from 'react';
import {View, Button} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {PaperProvider, Text} from 'react-native-paper';
import AntIcons from 'react-native-vector-icons/AntDesign';

function OrderScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'Orders'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant="displayLarge">Cross Platform Project</Text>
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

      <AntIcons name="home" size={24} color="red" />

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
          initialRouteName="Products"
          backBehavior="initialRoute"
          labeled
          sceneAnimationEnabled={false}
          screenOptions={({route}) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color}) => {
              let iconName;

              if (route.name === 'Orders') {
                iconName = 'profile';
              } else if (route.name === 'Products') {
                iconName = 'shoppingcart';
              } else {
                iconName = 'tags';
              }

              return <AntIcons name={iconName} size={24} color={color} />;
            },
          })}>
          <Tab.Screen name="Products" component={ProductScreen} />
          <Tab.Screen name="Categories" component={CategoryScreen} />
          <Tab.Screen name="Orders" component={OrderScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
