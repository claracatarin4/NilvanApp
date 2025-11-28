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
import { User, Lock, Mail, ChevronLeft, Briefcase } from 'lucide-react-native'; // Adicionado Mail e ChevronLeft
import { useRouter } from 'expo-router'; 
import { CustomInput } from '../../shared/components/CustomInput';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/constants';
import axios, { isAxiosError } from "axios";

// 🔑 URL da API: Mantida a configuração para Emulador Android
const API_BASE_URL = "http://academico3.rj.senac.br/nilvanapp"; 

const NillvanLogo = require('../../../assets/images/nilvan 1.png');

type IconComponentType = FC<{ color: string; size: number; style?: StyleProp<ViewStyle> }>;


export const RegisterScreen = (): JSX.Element => {

    const router = useRouter(); 

    // Novos estados para o cadastro
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cargo, setCargo] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Campo de confirmação
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoBack = (): void => {
        router.back(); // Volta para a tela anterior (provavelmente o Login)
    };

    const handleRegister = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError("");

        if (!nome || !email || !password || !confirmPassword) {
            setError("Por favor, preencha todos os campos.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("A palavra-passe e a confirmação não coincidem.");
            setIsLoading(false);
            return;
        }

        // ⚠️ Nota: Adicione validações de formato de email/senha aqui se necessário

        try {
            // Chamada de API para REGISTRO (assumindo o endpoint /api/usuario/register)
            const response = await axios.post(`${API_BASE_URL}/api/usuario/criar`, {
                nome: nome,
                email: email,
                senha: password,
                cargo: cargo,
                role: "ROLE_OPERADOR"
                // O backend deve lidar com a role (ex: padrão "USER") e outros campos
            });

            // O registro bem-sucedido pode retornar o token, mas aqui, apenas alertamos
            Alert.alert("Sucesso!", "O seu registo foi concluído. Faça login para continuar.");
            
            // 🚀 Redireciona o usuário de volta para a tela de Login
            router.replace("/"); // Assumindo que a rota de login é a raiz ou /login

        } catch (err) {
            let errorMsg = "Ocorreu um erro no registo.";

            if (isAxiosError(err)) {
                if (err.response) {
                    // Erro 409 Conflict, por exemplo (usuário já existe)
                    if (err.response.status === 409) {
                        errorMsg = "O email já está registado. Tente fazer login.";
                    } else {
                        errorMsg = `Erro na API: ${err.response.data?.message || err.response.status}`;
                    }
                    console.error("Erro no registo (dados da API):", err.response.data);
                } else if (err.request) {
                    console.error("Erro no registo (sem resposta da API):", err.request);
                    errorMsg = "Erro de rede. Verifique a conexão com o servidor.";
                } else {
                    console.error("Erro no registo (Axios):", err.message);
                }
            } else {
                console.error("Erro desconhecido:", err);
            }

            setError(errorMsg);
            Alert.alert("Erro de Registo", errorMsg);
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
                {/* Botão Voltar */}
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <ChevronLeft size={24} color={COLORS.text} />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Crie sua conta</Text>
                </View>

                <View style={styles.formContainer}>
                    
                    {/* Nome Input */}
                    <CustomInput
                        icon={User as IconComponentType}
                        placeholder="Nome Completo"
                        value={nome}
                        onChangeText={setNome}
                        autoCapitalize="words"
                    />

                    {/* Cargo Input */}
                    <CustomInput
                        icon={Briefcase as IconComponentType}
                        placeholder="Cargo"
                        value={cargo}
                        onChangeText={setCargo}
                        autoCapitalize="words"
                    />

                    {/* E-mail Input */}
                    <CustomInput
                        icon={Mail as IconComponentType}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Senha Input */}
                    <CustomInput
                        icon={Lock as IconComponentType}
                        placeholder="Palavra-passe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {/* Confirmação de Senha Input */}
                    <CustomInput
                        icon={Lock as IconComponentType}
                        placeholder="Confirmar Palavra-passe"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    
                    <CustomButton
                        title={isLoading ? "Registrando..." : "Registrar"}
                        onPress={handleRegister}
                        style={styles.loginButton}
                        disabled={isLoading}
                    />

                    {/* Opção para Voltar ao Login */}
                    <TouchableOpacity onPress={handleGoBack} style={styles.registerOption}>
                        <Text style={styles.registerOptionText}>Já tem uma conta? <Text style={styles.forgotText}>Faça Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, } as ViewStyle,
    scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: SPACING.lg, } as ViewStyle,
    backButton: { position: 'absolute', top: Platform.OS === 'ios' ? 60 : 30, left: SPACING.lg, zIndex: 10, padding: SPACING.sm, } as ViewStyle,
    logoContainer: { alignItems: 'center', marginBottom: SPACING.md, marginTop: SPACING.xxl, } as ViewStyle,
    title: { fontSize: FONT_SIZES.large, fontWeight: 'bold', color: COLORS.primary, },
    logoBox: { alignItems: 'center', paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl, } as ViewStyle,
    formContainer: { width: '100%', } as ViewStyle,
    optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl, marginTop: SPACING.sm, } as ViewStyle,
    rememberContainer: { flexDirection: 'row', alignItems: 'center', } as ViewStyle,
    checkbox: { width: 18, height: 18, borderWidth: 2, borderColor: COLORS.darkGray, borderRadius: 4, marginRight: SPACING.xs, } as ViewStyle,
    rememberText: { fontSize: FONT_SIZES.small, color: COLORS.text, } as TextStyle,
    forgotText: { fontSize: FONT_SIZES.small, color: COLORS.primary, fontWeight: '600', } as TextStyle,
    loginButton: { width: '100%', marginTop: SPACING.xl, } as ViewStyle,
    errorText: { color: COLORS.warning || 'red', fontSize: FONT_SIZES.medium, textAlign: 'center', marginBottom: SPACING.md, marginTop: SPACING.md, } as TextStyle,
    registerOption: { marginTop: SPACING.md, alignItems: 'center', },
    registerOptionText: { fontSize: FONT_SIZES.small, color: COLORS.text, },
});