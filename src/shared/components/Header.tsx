import React, { FC } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';

import { ArrowLeft, Bell, ChevronLeft, Icon,  } from 'lucide-react-native'; 
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';


type RightIconComponent = FC< & { color: string; size: number }>;

interface HeaderProps {
    title?: string;
    
    showBack?: boolean; 
    onBackPress?: () => void; 
    
   
    showProfile?: boolean; 
    userName?: string;      
    userRole?: string;       
    userImage?: string;      
    

    rightIcon?: RightIconComponent; 
    onRightIconPress?: () => void; 
}



export const Header: FC<HeaderProps> = ({
    title,
    showBack = false,
    onBackPress, 
    showProfile = false,
    userName,
    userRole,
    userImage,
    rightIcon: RightIcon, 
    onRightIconPress,
}) => {
    

    return (
        <View style={styles.header}>
            <View style={styles.leftSection}>
                {showBack ? (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <ChevronLeft size={24} color={COLORS.white} />
                    </TouchableOpacity>
                ) : showProfile ? (
                    <TouchableOpacity style={styles.profileSection}>
                        <Image
                            source={{ uri: userImage || 'https://via.placeholder.com/40' }}
                            style={styles.avatar}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userName || 'Usuário'}</Text>
                            <Text style={styles.userRole}>{userRole || 'Função'}</Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
                {title && <Text style={styles.title}>{title}</Text>}
            </View>
            {RightIcon && (
                
                <TouchableOpacity onPress={onRightIconPress} style={styles.rightButton}>
                    <RightIcon size={24} color={COLORS.white} /> 
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingTop: 70, 
        paddingBottom: 20
    } as ViewStyle,
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    } as ViewStyle,
    backButton: {
        marginRight: SPACING.md,
    } as ViewStyle,
    title: {
        fontSize: FONT_SIZES.xlarge,
        fontWeight: '600',
        color: COLORS.white,
    } as TextStyle,
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: SPACING.sm,
    },
    userInfo: {
        justifyContent: 'center',
    } as ViewStyle,
    userName: {
        fontSize: FONT_SIZES.medium,
        fontWeight: '600',
        color: COLORS.white,
    } as TextStyle,
    userRole: {
        fontSize: FONT_SIZES.small,
        color: COLORS.white,
        opacity: 0.8,
    } as TextStyle,
    rightButton: {
        padding: SPACING.xs,
    } as ViewStyle,
});