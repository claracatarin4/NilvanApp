import React, { FC } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';
import { ProdutoResponse } from '../../core/types/produtos';

interface Product {

    id: number | string; 
    name: string;
    code: string;
    price: string;
    imageUrl: string | null; 
}

interface ProductCardProps {
    product: ProdutoResponse;
    onPress: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card} 
            onPress={onPress} 
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: product.imagem || 'https://via.placeholder.com/60' }}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {product.nome}
                </Text>
                <Text style={styles.code} numberOfLines={1}>
                    {product.codigoInterno}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderBottomWidth:1,
        borderBottomColor:COLORS.border
       
    } as ViewStyle,
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
        marginRight: SPACING.md,
    }, 
    info: {
        flex: 1,
    } as ViewStyle,
    name: {
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    } as TextStyle,
    code: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
    } as TextStyle,
    price: {
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
        color: COLORS.text,
    } as TextStyle,
});