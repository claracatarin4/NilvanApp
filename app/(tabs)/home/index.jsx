import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>IS</Text>
            </View>
            <View>
              <Text style={styles.userName}>Ivan Santana Jr.</Text>
              <Text style={styles.userRole}>Diretor</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics Cards */}
        <View style={styles.content}>
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
        </View>

        {/* Add Product Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#1a2b5c",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a2b5c",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  userRole: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 2,
  },
  menuIcon: {
    fontSize: 28,
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a2b5c",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: "#1a2b5c",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
