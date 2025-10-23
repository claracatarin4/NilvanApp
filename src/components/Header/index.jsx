import { View, Text, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export const Header = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a3a5c",
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 60,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  spacer: {
    width: 32,
  },
})
