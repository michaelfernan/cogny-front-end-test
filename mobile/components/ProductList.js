import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Produto from './Produto';

const ProductList = ({ produtos, adicionarAoCarrinho }) => {
  return (
    <View>
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          renderItem={({ item }) => (
            <Produto item={item} adicionarAoCarrinho={adicionarAoCarrinho} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Nenhum produto disponível</Text>
      )}
    </View>
  );
};

export default ProductList;
