/* eslint-disable react-native/no-inline-styles */
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Snackbar, Text, TextInput} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {CategoryType} from './CategoriesScreen';

type CategoryDetailParams = {
  categoryId: number;
  otherParam: Omit<CategoryType, 'id'>;
};

export function CategoryDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<ParamListBase, 'CategoryDetail'>) {
  const {
    categoryId,
    otherParam: {name, description},
  } = route.params as CategoryDetailParams;

  const [updated, setUpdated] = useState(false);
  const [category, setCategory] = useState<CategoryType>({
    id: 0,
    name: '',
    description: '',
  });

  useEffect(() => {
    setCategory({
      id: categoryId,
      name,
      description,
    });
  }, [categoryId, name, description]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <Text variant="titleLarge">Product Details</Text>

      <View style={[style.row, {flex: 1}]}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Product Id</Text>
        </View>
        <View style={style.cellValue}>
          <Text>{categoryId}</Text>
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Name</Text>
        </View>
        <View style={style.cellValue}>
          <TextInput
            value={category.name}
            onChangeText={e => setCategory(prev => ({...prev, name: e}))}
          />
        </View>
      </View>
      <View style={style.row}>
        <View style={style.cellLabel}>
          <Text variant="labelLarge">Description</Text>
        </View>
        <View style={style.cellValue}>
          <TextInput
            value={category.description}
            multiline
            numberOfLines={4}
            onChangeText={e => setCategory(prev => ({...prev, description: e}))}
          />
        </View>
      </View>
      <View>
        <Button
          mode="outlined"
          onPress={() => {
            fetch(
              `https://northwind.vercel.app/api/categories/${category.id}`,
              {
                headers: {'Content-Type': 'application/json'},
                method: 'PUT',
                body: JSON.stringify({
                  id: category.id,
                  name: category.name,
                  description: category.description,
                }),
              },
            ).then(() => setUpdated(true));
          }}>
          Save
        </Button>
      </View>
      <Snackbar visible={updated} onDismiss={() => setUpdated(false)}>
        Category has succesfully updated!
      </Snackbar>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  row: {
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
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
