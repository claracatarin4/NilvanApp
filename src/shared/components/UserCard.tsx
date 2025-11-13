import { FC } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ViewStyle, TextStyle, Image, ImageSourcePropType } from "react-native";
import { Users } from "../../core/types/users";
import { COLORS, FONT_SIZES, SPACING } from "../constants";
import { Eye, Pencil, Trash2 } from 'lucide-react-native'; 

interface UserCardProps {
    user: Users;
    onPress: () => void;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const UserCard: FC<UserCardProps> = ({ user, onPress, onView, onEdit, onDelete }) => {
    
    const imageSource: ImageSourcePropType = user.imagem 
        ? { uri: user.imagem } 
        : { uri: 'https://via.placeholder.com/60' }; 

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={onPress} 
        >
            <Image
                source={imageSource} 
                style={styles.image}
            />
            
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {user.name}
                </Text>
                <Text style={styles.role} numberOfLines={1}>
                    {user.role}
                </Text>
                <Text style={styles.email} numberOfLines={1}>
                    {user.email}
                </Text>
            </View>

            <View style={styles.actionContainer}>

                <TouchableOpacity style={styles.actionButton} onPress={onView || onPress}>
                    <Eye size={20} color={COLORS.warning} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={onEdit || onPress}>
                    <Pencil size={20} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={onDelete || onPress}>
                    <Trash2 size={20} color={COLORS.secondary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        backgroundColor: COLORS.white, 
        padding: SPACING.md,
        borderWidth:1,
        borderBottomColor: COLORS.border,
        borderColor: COLORS.white

    } as ViewStyle,
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth:2,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.lightGray,
        marginRight: SPACING.md,
    }, 
    info: {
        flex: 1, 
        marginRight: SPACING.md, 
        justifyContent: 'center',
    } as ViewStyle,
    name: {
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 2,
    } as TextStyle,
    role: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textLight,
        marginBottom: 2,
    } as TextStyle,
    email: {
        fontSize: FONT_SIZES.small,
        color: COLORS.darkGray,
    } as TextStyle,

    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,

    actionButton: {
        padding: SPACING.xs, 
        marginLeft: SPACING.sm,
    } as ViewStyle,
});