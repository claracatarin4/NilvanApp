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
    Image
} from 'react-native';
import { User, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 
import { CustomInput } from '../../shared/components/CustomInput';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/constants';

type IconComponentType = FC<{ color: string; size: number; style?: StyleProp<ViewStyle> }>; 


export const LoginScreen = (): JSX.Element => { 
    
    const router = useRouter(); 

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const NillvanLogo = require('../../../assets/images/nilvan 1.png');


    const handleLogin = (): void => {
     
        router.replace('/(tabs)/home'); 
    };


    const handleForgotPassword = (): void => {
        console.log('Esqueceu a senha');
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
                        placeholder="Nome de Usuário"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <CustomInput
                        icon={Lock as IconComponentType}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

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
                        title="Entrar"
                        onPress={handleLogin}
                        style={styles.loginButton}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    } as ViewStyle,
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: SPACING.lg,
    } as ViewStyle,
    logoContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xxl,
    } as ViewStyle,
    logoImage: {
        width: 250, 
        height: 250, 
    },
    logoBox: {
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        
    } as ViewStyle,
    logoText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.primary,
        letterSpacing: 2,
    } as TextStyle,
  
    logoSubtitle: {
        fontSize: FONT_SIZES.small,
        color: COLORS.text,
        textAlign: 'center',
    } as TextStyle,
    formContainer: {
        width: '100%',
    } as ViewStyle,
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    } as ViewStyle,
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: COLORS.darkGray,
        borderRadius: 4,
        marginRight: SPACING.xs,
    } as ViewStyle,
    rememberText: {
        fontSize: FONT_SIZES.small,
        color: COLORS.text,
    } as TextStyle,
    forgotText: {
        fontSize: FONT_SIZES.small,
        color: COLORS.primary,
        fontWeight: '500',
    } as TextStyle,
    loginButton: {
        width: '100%',
    } as ViewStyle,
});