import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Produto = ({ item, adicionarAoCarrinho }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imagemUrl }} style={styles.imagemProduto} />
      <Text style={styles.descricao}>
        {item.descrição ? item.descrição : 'Descrição indisponível'}
      </Text>
      <Text style={styles.preco}>
        {item.preço !== undefined && item.preço !== null ? `R$ ${item.preço.toFixed(2)}` : 'Preço indisponível'}
      </Text>
      <View style={styles.adicionarArea}>
        <View style={styles.quantidadeContainer}>
          <Text style={styles.quantidade}>1</Text>
        </View>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={() => adicionarAoCarrinho(item)}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A21',
    paddingTop: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: 338,
    height: 358,

  imagemProduto: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  
  descricao: {
    fontSize: 16,
    color: '#333',
    
  },

  preco: {
    fontSize: 21,
    color: '#000',
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'left',
  },
 
  adicionarArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  quantidadeContainer: {
    position: 'absolute',
    left: 0,
    zIndex:100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    width: 81,
    height: 42,
    alignItems: 'center',
    paddingTop:10,
  },
  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
 
  botaoAdicionar: {
    backgroundColor: '#F8375D',
    width: 307,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Produto;
