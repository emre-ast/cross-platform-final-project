/* eslint-disable react-native/no-inline-styles */
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import AntIcons from 'react-native-vector-icons/AntDesign';

export type OrderType = {
  id: number;
  customerId: string;
  employeeId: number;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  shipVia: number;
  freight: number;
  shipName: string;
  shipAddress: {
    street: string;
    city: string;
    region: string;
    postalCode: number;
    country: string;
  };
  details: {
    productId: number;
    unitPrice: number;
    quantity: number;
    discount: number;
  }[];
};

export function OrderScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'OrderList'>) {
  const theme = useTheme();
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch('https://northwind.vercel.app/api/orders');

      const data = await response.json();
      setOrders(data);
    };

    getOrders();
  }, []);

  console.log(orders);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text variant="titleLarge">Categories</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

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
});
