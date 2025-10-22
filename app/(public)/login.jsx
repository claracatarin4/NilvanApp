import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import { UserRound ,KeyRound } from 'lucide-react-native'

export default function Login() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = () => {

    if (!username || !password) {
      alert("Por favor, preencha todos os campos")
      return
    }

    router.replace("/app/(private)/(tabs)")
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

        <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/nilvan 1.png')} style={{ width: 200, height: 200 }}/>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <UserRound color="#F59B23" size={32}/>
            <TextInput
              style={styles.input}
              placeholder="Nome de Usuário"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <KeyRound color="#F59B23" size={32} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.rememberRow}>
            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Lembrar-me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Esqueceu a Senha?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoBox: {
    borderWidth: 3,
    borderColor: "#1a2b5c",
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1a2b5c",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  stars: {
    marginTop: 8,
  },
  star: {
    fontSize: 16,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 25,
    paddingBottom: 8,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
    color: "#999",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#1a2b5c",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#1a2b5c",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  rememberText: {
    fontSize: 14,
    color: "#666",
  },
  forgotText: {
    fontSize: 14,
    color: "#1a2b5c",
  },
  button: {
    backgroundColor: "#1a2b5c",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
