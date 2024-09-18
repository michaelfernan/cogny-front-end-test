import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './service/firebaseConfig';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Carrinho from './components/Carrinho';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage

const Stack = createStackNavigator();

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  // Função para buscar produtos do Firebase
  const fetchProdutos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const produtosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProdutos(produtosList);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

  // Função para carregar os itens do carrinho do AsyncStorage
  const loadCarrinho = async () => {
    try {
      const savedCarrinho = await AsyncStorage.getItem('carrinho');
      if (savedCarrinho !== null) {
        setCarrinho(JSON.parse(savedCarrinho));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho: ", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    loadCarrinho();
  }, []);

  useEffect(() => {
    // Atualiza o AsyncStorage sempre que o carrinho for alterado
    const salvarCarrinho = async () => {
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
    };
    salvarCarrinho();
  }, [carrinho]);

  // Função para adicionar item ao carrinho e salvar no AsyncStorage
  const adicionarAoCarrinho = async (produto) => {
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
      alert('Produto já está no carrinho');
    } else {
      const novoProduto = { ...produto, quantidade: 1 }; // Adiciona quantidade inicial de 1
      const novoCarrinho = [...carrinho, novoProduto];
      setCarrinho(novoCarrinho);
    }
  };

  // Função para alterar a quantidade de um item no carrinho
  const alterarQuantidade = async (id, quantidade) => {
    const novoCarrinho = carrinho.map(item => {
      if (item.id === id) {
        return { ...item, quantidade: Math.max(quantidade, 1) }; // Garante que a quantidade seja no mínimo 1
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  };

  // Função para esvaziar o carrinho e limpar o AsyncStorage
  const esvaziarCarrinho = async () => {
    setCarrinho([]);
    await AsyncStorage.removeItem('carrinho'); // Remove o carrinho do AsyncStorage
  };



  // Função para finalizar o pedido e exibir mensagem
const finalizarPedido = async () => {
  alert('🎉 Pedido finalizado com sucesso! 🎉\nObrigado por comprar conosco!');
  setCarrinho([]); // Esvazia o carrinho
  await AsyncStorage.removeItem('carrinho'); // Limpa o AsyncStorage
};


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Remover a barra de navegação da tela Home */}
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <SafeAreaView style={styles.container}>
              <Header carrinhoLength={carrinho.length} />
              <ProductList produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
            </SafeAreaView>
          )}
        </Stack.Screen>
        
        {/* Tela de Carrinho */}
        <Stack.Screen name="Carrinho" options={{ headerShown: false }}>
  {() => (
    <Carrinho
      carrinho={carrinho}
      esvaziarCarrinho={esvaziarCarrinho} // Passando a função como prop
      alterarQuantidade={alterarQuantidade} // Passa a função para alterar a quantidade
    />
  )}
</Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A21',
  },
});
