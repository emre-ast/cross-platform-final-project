/* eslint-disable react-native/no-inline-styles */
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import AntIcons from 'react-native-vector-icons/AntDesign';

export type CategoryType = {
  id: number;
  name: string;
  description: string;
};

export function CategoryScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase, 'CategoryList'>) {
  const theme = useTheme();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [forceRefresh, setForceRefresh] = React.useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        'https://northwind.vercel.app/api/categories',
      );

      const data = await response.json();
      setCategories(data);
    };

    getCategories();
  }, [forceRefresh]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text variant="titleLarge">Categories</Text>

        <View style={style.row}>
          <View style={{flex: 3}}>
            <Text variant="bodyLarge">Name</Text>
          </View>
          <View style={{flex: 5}}>
            <Text variant="bodyLarge">Description</Text>
          </View>
          <View style={{flex: 1}}>
            <Text variant="bodyLarge">Del</Text>
          </View>
          <View style={{flex: 1}}>
            <Text variant="bodyLarge">Edit</Text>
          </View>
        </View>
        {categories.map(({id, name, description}, index) => (
          <View
            key={id}
            style={[
              style.row,
              {
                backgroundColor:
                  index % 2 === 1
                    ? theme.colors.backdrop
                    : theme.colors.tertiary,
              },
            ]}>
            <View style={{flex: 3}}>
              <Text>{name}</Text>
            </View>
            <View style={{flex: 5}}>
              <Text>{description}</Text>
            </View>
            <View style={{flex: 1}}>
              <AntIcons
                onPress={_e => {
                  fetch(`https://northwind.vercel.app/api/categories/${id}`, {
                    method: 'DELETE',
                  }).then(() => setForceRefresh(prev => !prev));
                }}
                name="delete"
                size={20}
              />
            </View>
            <View style={{flex: 1}}>
              <AntIcons
                onPress={_e => {
                  navigation.navigate('CategoryDetail', {
                    categoryId: id,
                    otherParam: {
                      name,
                      description,
                    },
                  });
                }}
                name="edit"
                size={20}
              />
            </View>
          </View>
        ))}
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
