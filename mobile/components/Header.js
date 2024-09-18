import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ carrinhoLength }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>COGNYSHOES</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>

      <TouchableOpacity
        style={styles.carrinhoIcon}
        onPress={() => navigation.navigate('Carrinho')} 
      >
        <Image source={require('../assets/carrinho.png')} style={styles.carrinhoImage} />
      
        {carrinhoLength > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{carrinhoLength}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#141419',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logo: {
    width: 34,
    height: 23,
    marginLeft: 8,
  },
  carrinhoIcon: {
    position: 'relative',
  },
  carrinhoImage: {
    width: 24,
    height: 26,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    padding: 3,
    minWidth: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
