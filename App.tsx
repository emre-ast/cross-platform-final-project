/* eslint-disable react-native/no-inline-styles */
// In App.js in a new project

import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {PaperProvider, Text} from 'react-native-paper';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {ProductScreen} from './src/product/ProductsScreen';
import {ProductDetailScreen} from './src/product/ProductDetails';
import {CategoryScreen} from './src/category/CategoriesScreen';
import {CategoryDetailScreen} from './src/category/CategoryDetail';

const Stack = createNativeStackNavigator();

function OrderScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'Orders'>) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant="displayLarge">Cross Platform Project</Text>
    </View>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryList"
        options={{title: 'Categories'}}
        component={CategoryScreen}
      />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    </Stack.Navigator>
  );
}

function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        options={{title: 'Products'}}
        component={ProductScreen}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{title: 'Product Details'}}
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
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
          <Tab.Screen name="Products" component={ProductStack} />
          <Tab.Screen name="Categories" component={CategoryStack} />
          <Tab.Screen name="Orders" component={OrderScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
