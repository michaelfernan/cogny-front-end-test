import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Carrinho = ({ carrinho, esvaziarCarrinho, alterarQuantidade }) => {
  const [quantidades, setQuantidades] = useState({});
  const navigation = useNavigation();

  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => {
      const quantidade = quantidades[item.id] || 1;
      return acc + item.preço * quantidade;
    }, 0);
  };
 const finalizarPedido = () => {
  console.log('Função finalizarPedido foi chamada!');
  alert('Pedido finalizado!');
  esvaziarCarrinho();
  navigation.navigate('Home'); 
};
  const renderItem = ({ item }) => {
    const quantidade = quantidades[item.id] || 1;
    const totalItem = item.preço * quantidade;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemCard}>
          <Image source={{ uri: item.imagemUrl }} style={styles.imagemProduto} />
          <View style={styles.infoContainer}>
            <Text style={styles.descricao}>{item.descrição}</Text>
            <Text style={styles.preco}>R$ {item.preço.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.linhaInferior}>
          <View style={styles.quantidadeContainer}>
            <TouchableOpacity onPress={() => alterarQuantidade(item.id, Math.max(quantidade - 1, 1))}>
              <Text style={styles.quantidadeTexto}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantidade}>{quantidade}</Text>
            <TouchableOpacity onPress={() => alterarQuantidade(item.id, quantidade + 1)}>
              <Text style={styles.quantidadeTexto}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.precoTotalItem}>R$ {totalItem.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>COGNYSHOES</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.lixeiraEsvaziar} onPress={esvaziarCarrinho}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>

        {carrinho.length > 0 ? (
          <>
            <FlatList
              data={carrinho}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalTexto}>TOTAL</Text>
              <Text style={styles.valorTotal}>R$ {calcularTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarPedido}>
              <Text style={styles.textoBotao}>FINALIZAR PEDIDO</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.carrinhoVazio}>
            <Text style={styles.carrinhoVazioTexto}>Seu carrinho está vazio</Text>
            <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.textoBotaoVoltar}>Voltar aos Produtos</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#141419',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#141419',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logo: {
    width: 34,
    height: 23,
    marginLeft: -90,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
  },
  imagemProduto: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  infoContainer: {
    marginBottom: 10,
    justifyContent: 'center',
  },
  descricao: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  linhaInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 50,
    justifyContent: 'space-around',
  },
  quantidadeTexto: {
    fontSize: 18,
    color: '#666',
  },
  quantidade: {
    fontSize: 14,
    color: '#666',
  },
  precoTotalItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  lixeiraEsvaziar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  totalTexto: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  valorTotal: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoFinalizar: {
    backgroundColor: '#F8375D',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carrinhoVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinhoVazioTexto: {
    fontSize: 20,
    color: '#999',
    marginBottom: 20,
  },
  botaoVoltar: {
    backgroundColor: '#F8375D',
    padding: 12,
    borderRadius: 4,
  },
  textoBotaoVoltar: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Carrinho;
