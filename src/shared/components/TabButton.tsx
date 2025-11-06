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


interface TabButtonProps {
    title: string;
    active: boolean; 
    onPress: () => void;
    style?: StyleProp<ViewStyle>; 
}

export const TabButton: FC<TabButtonProps> = ({ title, active, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[styles.tab, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.tabText, active && (styles.tabTextActive as TextStyle)]}>
                {title}
            </Text>
            {active && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        position: 'relative',
    } as ViewStyle,
    tabText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.white,
        fontWeight: '400',
        opacity: 0.7,
    } as TextStyle,
    tabTextActive: {
        fontWeight: '600',
        opacity: 1,
        color: '#FFD700'
    } as TextStyle,
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#FFD700',
    } as ViewStyle,
});