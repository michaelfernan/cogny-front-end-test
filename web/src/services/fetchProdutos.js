import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const fetchProdutos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'produtos'));
    const produtos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return [];
  }
};

export default fetchProdutos;
