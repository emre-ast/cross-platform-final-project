/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import AntIcons from 'react-native-vector-icons/AntDesign';

export type ProductType = {
  id: number;
  supplierId: number;
  categoryId: number;
  quantityPerUnit: string;
  unitPrice: string;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: boolean;
  name: string;
};

export function ProductScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'ProductList'>) {
  const theme = useTheme();
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [forceRefresh, setForceRefresh] = React.useState(false);

  const style = StyleSheet.create({
    row: {
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      padding: 12,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    cell: {
      paddingHorizontal: 2,
    },
  });

  React.useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('https://northwind.vercel.app/api/products');

      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, [forceRefresh]);

  return (
    <ScrollView>
      <Text variant="titleLarge">Products</Text>

      <View style={style.row}>
        <View style={{flex: 4}}>
          <Text variant="bodyLarge">Name</Text>
        </View>
        <View style={{flex: 2}}>
          <Text variant="bodyLarge">Price</Text>
        </View>
        <View style={{flex: 2}}>
          <Text variant="bodyLarge">Stock</Text>
        </View>
        <View style={{flex: 1}}>
          <Text variant="bodyLarge">Del</Text>
        </View>
      </View>
      {products.map(({id, name, unitPrice, unitsInStock, ...rest}, index) => (
        <TouchableOpacity
          key={id}
          onPress={() => {
            navigation.navigate('ProductDetail', {
              productId: id,
              otherParam: {
                name,
                unitPrice,
                unitsInStock,
                ...rest,
              },
            });
          }}
          style={[
            style.row,
            {
              backgroundColor:
                index % 2 === 1 ? theme.colors.backdrop : theme.colors.tertiary,
            },
          ]}>
          <View style={{flex: 4}}>
            <Text>{name}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text>{unitPrice}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text>{unitsInStock}</Text>
          </View>
          <View style={{flex: 1}}>
            <AntIcons
              onPress={_e => {
                fetch(`https://northwind.vercel.app/api/products/${id}`, {
                  method: 'DELETE',
                }).then(() => setForceRefresh(prev => !prev));
              }}
              name="delete"
              size={20}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
