import React, { FC } from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    TextInputProps, 
    StyleProp, 
    ViewStyle, 
    TextStyle 
} from 'react-native';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';


type IconComponentType = FC<{ 
    color: string; 
    size: number; 
    style?: StyleProp<ViewStyle>; // <-- Adicionei isso!
}>;

interface CustomInputProps extends Omit<TextInputProps, 'style' | 'secureTextEntry'> {
    icon?: IconComponentType; 
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: StyleProp<ViewStyle>; 
}

export const CustomInput: FC<CustomInputProps> = ({
    icon: Icon, 
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    style, 
    ...props 
}) => {
    return (
        <View style={[styles.container, style]}>
            {Icon && (
                <Icon 
                    size={20} 
                    color={COLORS.darkGray} 
                    style={styles.icon as ViewStyle} 
                />
            )}
            <TextInput
                style={styles.input as StyleProp<TextStyle>}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textLight}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                {...props} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: SPACING.sm,
        marginBottom: SPACING.md,
    } as ViewStyle,
    icon: {
        marginRight: SPACING.sm,
    } as ViewStyle,
    input: {
        flex: 1,
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
        paddingVertical: SPACING.xs,
    } as TextStyle,
});