import { Pressable, StyleSheet, Text } from "react-native"

export const ActionButton = ({ active, onPress, display }) => {
    return (
        <Pressable
            style={active ? styles.addButton : null}
            onPress={onPress}
        >
            <Text style={styles.addButtonText}>
                {display}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({

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
})