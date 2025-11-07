import React, { FC } from 'react';
import { 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    View,
    StyleProp,
    ViewStyle,
    TextStyle,

} from 'react-native';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';
type ButtonVariant = 'primary' | 'secondary' | 'outline';

type IconComponentType = FC<{ 
    color: string; 
    size: number; 
    style?: StyleProp<ViewStyle>; // <-- Adicionei isso!
}>;

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant; 
    icon?: IconComponentType;
    style?: StyleProp<ViewStyle>; 
    textStyle?: StyleProp<TextStyle>; 
    disabled?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({
    title,
    onPress,
    variant = 'primary', // Valor padrão tipado
    icon: Icon, 
    style,
    textStyle,
    disabled = false,
}) => {

  const buttonStyle: ViewStyle = variant === 'secondary'
        ? (styles.buttonSecondary as ViewStyle)
        : variant === 'outline'
        ? (styles.buttonOutline as ViewStyle)
        : (styles.buttonPrimary as ViewStyle);

    const textStyleVariant: TextStyle = variant === 'secondary' || variant === 'outline'
        ? (styles.textSecondary as TextStyle)
        : (styles.textPrimary as TextStyle);

    const iconColor: string = variant === 'primary' ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={[buttonStyle, style, disabled && (styles.buttonDisabled as ViewStyle)]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                {Icon && (
                    <Icon 
                        size={20} 
                        color={iconColor} 
                        style={styles.icon as ViewStyle} 
                    />
                )}
                <Text style={[textStyleVariant, textStyle]}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    buttonPrimary: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    buttonSecondary: {
        backgroundColor: COLORS.mediumGray,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    buttonOutline: {
        backgroundColor: 'transparent',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    buttonDisabled: {
        opacity: 0.5,
    } as ViewStyle,
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    icon: {
        marginRight: SPACING.sm,
    } as ViewStyle,
    textPrimary: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
    } as TextStyle,
    textSecondary: {
        color: COLORS.white,
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
    } as TextStyle,
});