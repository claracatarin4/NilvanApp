import { JSX, useState, FC } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Bell } from 'lucide-react-native'; 
import { Header } from '../../shared/components/Header';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';


type TabId = 'home' | 'products';

interface StatItem {
    label: string;
    value: string;
}

type IconComponentType = FC<{ 
    color: string; 
    size: number;
    style?: StyleProp<ViewStyle>; 
}>;


export const HomeScreen = (): JSX.Element => {
    
    const router = useRouter(); 

    const [activeTab, setActiveTab] = useState<TabId>('home');

    const handleAddProduct = (): void => {
    router.push('/addprodutos/index'); 
};

    const stats: StatItem[] = [
        { label: 'Produtos', value: '4.000.000' },
        { label: 'Vendas', value: '50.000' },
        { label: 'Lucro', value: 'R$ 1000000' },
    ];

    return (
        <View style={styles.container}>
            <Header
                showProfile
                userName="Clara Catarina"
                userRole="UX/UI Designer"
                userImage="https://via.placeholder.com/40"

                rightIcon={Bell as IconComponentType} 
                onRightIconPress={() => console.log('Notificações')}
            />

            <ScrollView style={styles.content as StyleProp<ViewStyle>} showsVerticalScrollIndicator={false}>
                {stats.map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomSection}>
                
                <CustomButton
                    title="Adicionar Produto"
                    onPress={handleAddProduct}
                    
                    icon={((props: { color: string, size: number }) => <Text style={styles.plusIcon as StyleProp<TextStyle>}>+</Text>) as IconComponentType}
                    style={styles.addButton}
                />
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,
    content: {
        flex: 1,
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.lg,
    } as ViewStyle,
    statCard: {
        backgroundColor: COLORS.white,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    } as ViewStyle,
    statLabel: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        marginBottom: SPACING.xs,
    } as TextStyle,
    statValue: {
        fontSize: FONT_SIZES.xxlarge,
        fontWeight: 'bold',
        color: COLORS.text,
    } as TextStyle,
    bottomSection: {
        backgroundColor: COLORS.white,
    } as ViewStyle,
    addButton: {
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.md,
    } as ViewStyle,
    plusIcon: {
        fontSize: 20,
        color: COLORS.white,
        fontWeight: 'bold',
        marginRight: SPACING.xs,
    } as TextStyle,
});