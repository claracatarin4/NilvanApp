import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export const BarcodeInput = ({ label, value, onChange, onScan }) => {
  const handleScan = () => {
    if (onScan) {
      onScan()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChange}
        />
        <Pressable onPress={handleScan} style={styles.scanButton}>
          <Ionicons name="barcode-outline" size={24} color="#374151" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
  },
  scanButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
})
