import { JSX, useState, FC } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleProp,
    ViewStyle,
    TextStyle,
    Image,
    Alert 
} from 'react-native';
import { User, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 
import { CustomInput } from '../../shared/components/CustomInput';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/constants';
import axios, { isAxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.0.2.2:8410";

const NillvanLogo = require('../../../assets/images/nilvan 1.png');


type IconComponentType = FC<{ color: string; size: number; style?: StyleProp<ViewStyle> }>;


export const LoginScreen = (): JSX.Element => {

    const router = useRouter(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const handleForgotPassword = (): void => {
        console.log('Esqueceu a senha');
        Alert.alert("Esqueceu a Senha", "Funcionalidade a ser implementada.");
    };


    const handleLogin = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError("");

        if (!email || !password) {
            setError("Por favor, preencha o e-mail e a palavra-passe.");
            setIsLoading(false);
            return;
        }

        try {
            
            const response = await axios.post(`${API_BASE_URL}/api/usuario/login`, {
                email: email,
                password: password,
            });

            const { token, userId } = response.data;

            console.log("Login realizado! Token:", token, "ID:", userId);

          
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userId', String(userId));

          
            router.replace("/(tabs)/home"); 

        } catch (err) {
            let errorMsg = "E-mail ou palavra-passe inválidos.";

            if (isAxiosError(err)) {
                if (err.response) {
                    console.error("Erro no login (dados da API):", err.response.data);
                } else if (err.request) {
                    console.error("Erro no login (sem resposta da API):", err.request);
                    errorMsg = "Erro de rede. Verifique a conexão com o servidor.";
                } else {
                    console.error("Erro no login (Axios):", err.message);
                    errorMsg = "Ocorreu um erro ao tentar o login.";
                }
            } else if (err instanceof Error) {
                console.error("Erro no login (Geral):", err.message);
                errorMsg = "Ocorreu um erro inesperado.";
            } else {
                console.error("Erro desconhecido:", err);
                errorMsg = "Ocorreu um erro desconhecido.";
            }

            setError(errorMsg);
            Alert.alert("Erro de Login", errorMsg);
            setIsLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent as StyleProp<ViewStyle>}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logoBox}>
                        <Image
                            source={NillvanLogo}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.formContainer}>
                    
                    <CustomInput
                        icon={User as IconComponentType}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    
                    <CustomInput
                        icon={Lock as IconComponentType}
                        placeholder="Palavra-passe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.rememberContainer}>
                            <View style={styles.checkbox} />
                            <Text style={styles.rememberText}>Lembrar-me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={styles.forgotText}>Esqueceu a Senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomButton
                        title={isLoading ? "Entrando..." : "Entrar"}
                        onPress={handleLogin}
                        style={styles.loginButton}
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


// ... (Stylesheets - Mantidos inalterados)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, } as ViewStyle,
    scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: SPACING.lg, } as ViewStyle,
    logoContainer: { alignItems: 'center', marginBottom: SPACING.xxl, } as ViewStyle,
    logoImage: { width: 250, height: 250, },
    logoBox: { alignItems: 'center', paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl, } as ViewStyle,
    formContainer: { width: '100%', } as ViewStyle,
    optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl, marginTop: SPACING.sm, } as ViewStyle,
    rememberContainer: { flexDirection: 'row', alignItems: 'center', } as ViewStyle,
    checkbox: { width: 18, height: 18, borderWidth: 2, borderColor: COLORS.darkGray, borderRadius: 4, marginRight: SPACING.xs, } as ViewStyle,
    rememberText: { fontSize: FONT_SIZES.small, color: COLORS.text, } as TextStyle,
    forgotText: { fontSize: FONT_SIZES.small, color: COLORS.primary, fontWeight: '500', } as TextStyle,
    loginButton: { width: '100%', } as ViewStyle,
    errorText: { color: COLORS.warning || 'red', fontSize: FONT_SIZES.medium, textAlign: 'center', marginBottom: SPACING.md, marginTop: SPACING.md, } as TextStyle,
});