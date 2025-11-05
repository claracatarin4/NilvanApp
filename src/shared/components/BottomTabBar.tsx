import React, { ComponentProps, FC } from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Home, Package, ShoppingBag, Grid } from 'lucide-react-native';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 

type LucideIconComponent = FC<ComponentProps<typeof Home>>;

type TabId = 'home' | 'products' | 'shopping' | 'categories';

interface TabItem {
    id: TabId;
    icon: LucideIconComponent; 
}

interface BottomTabBarProps {
    activeTab: TabId;
    onTabPress: (tabId: TabId) => void;
}

export const BottomTabBar: FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {

    const tabs: TabItem[] = [
        { id: 'home', icon: Home },
        { id: 'products', icon: Package },
        { id: 'shopping', icon: ShoppingBag },
        { id: 'categories', icon: Grid },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                
                const IconComponent = tab.icon; 
                const isActive: boolean = activeTab === tab.id;
                
                const iconColor: string = isActive ? COLORS.primary : COLORS.darkGray;

                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tab}
                        onPress={() => onTabPress(tab.id)}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            styles.iconContainer, 
                            isActive && (styles.iconContainerActive as ViewStyle)
                        ]}>
                            <IconComponent 
                                size={24}
                                color={iconColor}
                            />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        justifyContent: 'space-around',
    } as ViewStyle,
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    iconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    } as ViewStyle,
    iconContainerActive: {
        backgroundColor: COLORS.lightGray,
    } as ViewStyle,
});