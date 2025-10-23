import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"

export default function CadastrarProduto() {

  const router = useRouter()
  const [activeTab, setActiveTab] = useState("produto")
  const [productName, setProductName] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [category, setCategory] = useState("")
  const [internalCode, setInternalCode] = useState("")
  const [barcode, setBarcode] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!productName || !salePrice || !costPrice) {
      alert("Por favor, preencha os campos obrigatórios")
      return
    }

    console.log("Produto:", {
      productName,
      salePrice,
      costPrice,
      category,
      internalCode,
      barcode,
      description,
    })

    alert("Produto criado com sucesso!")
    router.back()
  }

  return (

    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Produto</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "produto" && styles.tabActive]}
          onPress={() => setActiveTab("produto")}
        >
          <Text style={[styles.tabText, activeTab === "produto" && styles.tabTextActive]}>Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "estoque" && styles.tabActive]}
          onPress={() => setActiveTab("estoque")}
        >
          <Text style={[styles.tabText, activeTab === "estoque" && styles.tabTextActive]}>Estoque</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        
        {/* Image Upload */}
        <View style={styles.imageUpload}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📷</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Bolsa Térmica Cooler"
            value={productName}
            onChangeText={setProductName}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Preço de Venda</Text>
              <TextInput
                style={styles.input}
                placeholder="R$ 250,00"
                value={salePrice}
                onChangeText={setSalePrice}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Preço de Custo</Text>
              <TextInput
                style={styles.input}
                placeholder="R$ 100,00"
                value={costPrice}
                onChangeText={setCostPrice}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Categoria</Text>
          <TextInput style={styles.input} placeholder="Bolsas Térmicas" value={category} onChangeText={setCategory} />

          <Text style={styles.label}>Código Interno</Text>
          <TextInput style={styles.input} placeholder="BTC" value={internalCode} onChangeText={setInternalCode} />

          <Text style={styles.label}>Código de Barras</Text>
          <View style={styles.barcodeContainer}>
            <TextInput
              style={[styles.input, styles.barcodeInput]}
              value={barcode}
              onChangeText={setBarcode}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanIcon}>📷</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do produto..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Variants Section */}
          <View style={styles.variantsSection}>
            <Text style={styles.variantsTitle}>Variantes</Text>
            <TouchableOpacity>
              <Text style={styles.addVariant}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Criar Produto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1a2b5c",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    fontSize: 28,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#1a2b5c",
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#ffd700",
  },
  tabText: {
    fontSize: 16,
    color: "#ccc",
  },
  tabTextActive: {
    color: "#ffd700",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  imageUpload: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 40,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  barcodeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barcodeInput: {
    flex: 1,
    marginRight: 8,
  },
  scanButton: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  scanIcon: {
    fontSize: 24,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  variantsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  variantsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  addVariant: {
    fontSize: 32,
    color: "#1a2b5c",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  submitButton: {
    backgroundColor: "#8b9dc3",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
