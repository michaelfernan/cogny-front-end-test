import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './service/firebaseConfig';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Carrinho from './components/Carrinho';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const fetchProdutos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const produtosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProdutos(produtosList);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

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

    const salvarCarrinho = async () => {
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
    };
    salvarCarrinho();
  }, [carrinho]);


  const adicionarAoCarrinho = async (produto) => {
    const produtoExistente = carrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
      alert('Produto já está no carrinho');
    } else {
      const novoProduto = { ...produto, quantidade: 1 };
      setCarrinho(novoCarrinho);
    }
  };


  const alterarQuantidade = async (id, quantidade) => {
    const novoCarrinho = carrinho.map(item => {
      if (item.id === id) {
        return { ...item, quantidade: Math.max(quantidade, 1) };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  };

  
  const esvaziarCarrinho = async () => {
    setCarrinho([]);
    await AsyncStorage.removeItem('carrinho');
  };

const finalizarPedido = async () => {
  alert('🎉 Pedido finalizado com sucesso! 🎉\nObrigado por comprar conosco!');
  setCarrinho([]);
  await AsyncStorage.removeItem('carrinho');
};


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <SafeAreaView style={styles.container}>
              <Header carrinhoLength={carrinho.length} />
              <ProductList produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
            </SafeAreaView>
          )}
        </Stack.Screen>
        
    
        <Stack.Screen name="Carrinho" options={{ headerShown: false }}>
  {() => (
    <Carrinho
      carrinho={carrinho}
      esvaziarCarrinho={esvaziarCarrinho}
      alterarQuantidade={alterarQuantidade}
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
