import { Ionicons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Header } from '../components/Header';


export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header></Header>
      
      {/* Content */}
      <View style={styles.content}>
        {/* Metric Cards */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Produtos</Text>
          <Text style={styles.cardValue}>4.000.000</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Vendas</Text>
          <Text style={styles.cardValue}>50.000</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Lucro</Text>
          <Text style={styles.cardValue}>R$ 1000000</Text>
        </View>

        {/* Add Product Button */}
        <ActionButton></ActionButton>
        
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cube-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bag-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="clipboard-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="git-network-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2553',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  cardLabel: {
    fontSize: 14,
    color: '#0F2553',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F2553',
  },
  addButton: {
    backgroundColor: '#0F2553',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    padding: 8,
  },
});