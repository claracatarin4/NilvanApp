import { View, StyleSheet } from "react-native"

export const InputRow = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
})
