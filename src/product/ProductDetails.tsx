/* eslint-disable react-native/no-inline-styles */
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {ProductType} from './ProductsScreen';

type ProductDetailParams = {
  productId: number;
};

export function ProductDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<ParamListBase, 'ProductDetail'>) {
  const {productId} = route.params as ProductDetailParams;

  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `https://northwind.vercel.app/api/products/${productId}`,
      );

      const data = await response.json();
      setProduct(data);
    };

    getProduct();
  }, [productId]);

  console.log(product);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <Text variant="titleLarge">Product Details</Text>

      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Product Id</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.id}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Name</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.name}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Price</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.unitPrice}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Stock</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.unitsInStock}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Supplier Id</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.supplierId}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Category Id</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.categoryId}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Quantity per Unit</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.quantityPerUnit}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Units in Order</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.unitsOnOrder}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Reorder Level</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.reorderLevel}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Discontinued</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{product?.discontinued ? 'True' : 'False'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  row: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },
  cellLabel: {
    flex: 2,
  },
  cellValue: {
    flex: 5,
  },
});
