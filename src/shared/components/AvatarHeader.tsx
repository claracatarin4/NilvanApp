import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Exemplo de ícone, se não houver imagem de avatar


interface AvatarHeaderProps {
  avatarUrl?: string; // URL da imagem do avatar, se houver
}

export const AvatarHeader: React.FC<AvatarHeaderProps> = ({ avatarUrl }) => {
  // 1. Hook de Navegação
  const navigation = useNavigation();

  // 2. Função de Navegação
  const handleAvatarPress = () => {
    // Certifique-se de que o nome da rota está correto
    navigation.navigate('Meu Perfil' as never);
  };

  return (
    <View style={styles.container}>
      {/* 3. Componente de Toque (TouchableOpacity) */}
      <TouchableOpacity onPress={handleAvatarPress} style={styles.touchableArea}>
        {avatarUrl ? (
          // Se houver URL do avatar, use a imagem
          <Image 
            source={{ uri: avatarUrl }} 
            style={styles.avatarImage} 
          />
        ) : (
          // Caso contrário, use um ícone de fallback (ex: Feather/user)
          <Feather name="user" size={24} color="#FFF" style={styles.avatarIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Ajuste o layout conforme a necessidade do seu Header
    paddingRight: 15,
  },
  touchableArea: {
    // Garante que a área de toque seja fácil de acertar
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333', // Cor de fundo para o ícone
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Forma circular
  },
  avatarIcon: {
    // Estilos para o ícone, se usado
  }
});