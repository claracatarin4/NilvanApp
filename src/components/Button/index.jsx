import { Pressable, StyleSheet, Text } from "react-native"

export const Button = ({ title, onPress, variant = "primary" }) => {
  return (
    <Pressable style={variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: "#1a3a5c",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: "#9ca3af",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
