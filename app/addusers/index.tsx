import React, { JSX, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Eye, EyeOff, UserPlus } from 'lucide-react-native'; 
import { Header } from '../..//src/shared/components/Header';
import { ImagePicker } from '../../src/shared/components/ImagePicker';
import { CustomButton } from '../../src/shared/components/CustomButton';
import { COLORS } from '../..//src/shared/constants/colors'; 
import { SPACING } from '../..//src/shared/constants/spacing'; 
import { FONT_SIZES } from '../..//src/shared/constants/fonts';
import { AvatarPicker } from '../../src/shared/components/AvatarPicker';

interface UserDataState {
    image: string | null; 
    name: string;
    email: string;
    role: string; 
    password: string;
    confirmPassword: string;
    status: 'active' | 'inactive'; 
}

export interface AddUserScreenProps {}

export default function AddUserScreen(): JSX.Element {
    
    const router = useRouter(); 
    
    const [userData, setUserData] = useState<UserDataState>({
        image: null,
        name: '',
        email: '',
        role: '', 
        password: '',
        confirmPassword: '',
        status: 'active', 
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    
    const handleSave = (): void => {
        if (userData.password !== userData.confirmPassword) {
            console.log('Erro: As senhas não coincidem!');
            return; 
        }
        console.log('Salvar usuário:', userData);
        router.back(); 
    };

    const handleImagePick = (): void => {
        console.log('Selecionar imagem do usuário');
    };
    
    const updateField = <K extends keyof UserDataState>(field: K, value: UserDataState[K]): void => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const renderPasswordToggle = (field: 'password' | 'confirmPassword') => {
        const isShown = field === 'password' ? showPassword : showConfirmPassword;
        const Icon = isShown ? Eye : EyeOff;
        const toggleFunc = field === 'password' ? setShowPassword : setShowConfirmPassword;

        return (
            <TouchableOpacity onPress={() => toggleFunc(!isShown)} style={styles.passwordToggle}>
                <Icon size={20} color={COLORS.textLight} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                title="Cadastrar Usuário"
                showBack
                onBackPress={() => router.back()}
            />

            <ScrollView
                style={styles.content as StyleProp<ViewStyle>}
                contentContainerStyle={styles.scrollContent as StyleProp<ViewStyle>}
                showsVerticalScrollIndicator={false}
            >
                <AvatarPicker 
                    imageUri={userData.image} 
                    onPress={handleImagePick} 
                    style={styles.imagePicker}
                />
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Maria de Souza"
                        placeholderTextColor={COLORS.textLight}
                        value={userData.name}
                        onChangeText={(value: string) => updateField('name', value)} 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="maria@app.com"
                        placeholderTextColor={COLORS.textLight}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={userData.email}
                        onChangeText={(value: string) => updateField('email', value)} 
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Cargo/Função</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Gerente de Estoque"
                        placeholderTextColor={COLORS.textLight}
                        value={userData.role}
                        onChangeText={(value: string) => updateField('role', value)}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="******"
                                placeholderTextColor={COLORS.textLight}
                                secureTextEntry={!showPassword}
                                value={userData.password}
                                onChangeText={(value: string) => updateField('password', value)}
                            />
                            {renderPasswordToggle('password')}
                        </View>
                    </View>

                    <View style={[styles.inputGroup, styles.halfWidth]}>
                        <Text style={styles.label}>Confirmar Senha</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="******"
                                placeholderTextColor={COLORS.textLight}
                                secureTextEntry={!showConfirmPassword}
                                value={userData.confirmPassword}
                                onChangeText={(value: string) => updateField('confirmPassword', value)}
                            />
                            {renderPasswordToggle('confirmPassword')}
                        </View>
                    </View>
                </View>

                <View style={styles.statusContainer}>
                    <Text style={styles.label}>Status do Usuário:</Text>
                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            userData.status === 'active' ? styles.statusActive : styles.statusInactive,
                        ]}
                        onPress={() => updateField('status', userData.status === 'active' ? 'inactive' : 'active')}
                    >
                        <Text style={styles.statusText}>
                            {userData.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Criar Usuário"
                    onPress={handleSave}
                    variant="secondary"
                    icon={((props: { color: string, size: number }) => (
                         <UserPlus size={props.size} color={props.color} />
                    )) as React.FC<{ color: string, size: number }>}
                    style={styles.saveButton}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,
    content: {
        flex: 1,
    } as ViewStyle,
    scrollContent: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    } as ViewStyle,
    imagePicker: {
        marginBottom: SPACING.lg, // Adiciona espaço abaixo do seletor de imagem
    } as ViewStyle,
    inputGroup: {
        marginBottom: SPACING.md,
    } as ViewStyle,
    label: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        marginBottom: SPACING.xs,
        fontWeight: '500',
    } as TextStyle,
    // Removido labelRow (apenas necessário para o scanner de código de barras)
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    } as TextStyle,
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,
    halfWidth: {
        width: '48%',
    } as ViewStyle,

    // Estilos Específicos para Senha
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        paddingRight: SPACING.md,
    } as ViewStyle,
    passwordInput: {
        flex: 1,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    } as TextStyle,
    passwordToggle: {
        padding: SPACING.xs,
    } as ViewStyle,

    // Estilos Específicos para Status
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,
    statusButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: 20,
    } as ViewStyle,
    statusActive: {
        backgroundColor: COLORS.success,
    } as ViewStyle,
    statusInactive: {
        backgroundColor: COLORS.error,
    } as ViewStyle,
    statusText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: FONT_SIZES.small,
    } as TextStyle,


    footer: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        height: 100, 
    } as ViewStyle,

    saveButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingBottom: 20, 
    } as ViewStyle,
});