import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { User, Lock } from 'lucide-react-native';
import { CustomInput } from '../../shared/components/CustomInput';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS, SPACING } from '../constants/colors';
import { FONT_SIZES } from '../constants/fonts';

export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };
a
  const handleForgotPassword = () => {
    console.log('Esqueceu a senha');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>NilvaN</Text>
            <View style={styles.logoUnderline} />
            <Text style={styles.logoSubtitle}>Bolsas Térmicas & Promocionais</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            icon={User}
            placeholder="Nome de Usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <CustomInput
            icon={Lock}
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logoBox: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderWidth: 3,
    borderColor: COLORS.primary,
    borderRadius: 12,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  logoUnderline: {
    width: '100%',
    height: 3,
    backgroundColor: COLORS.secondary,
    marginTop: 4,
    marginBottom: SPACING.xs,
  },
  logoSubtitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  rememberText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
  },
  forgotText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
  },
});
