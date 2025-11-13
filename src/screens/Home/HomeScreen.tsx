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
import { Bell, LucideIcon, ScanBarcode } from 'lucide-react-native'; 
import { Header } from '../../shared/components/Header';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 
import { FONT_SIZES } from '../../shared/constants/fonts';


type TabId = 'home' | 'products';

export interface HomeScreenProps {} 

interface StatItem {
    label: string;
    value: string;
}

type IconComponentType = FC<{ 
    color: string; 
    size: number;
    style?: StyleProp<ViewStyle>; 
}>;

export const HomeScreen: FC<HomeScreenProps> = (): JSX.Element => {
    
    const router = useRouter(); 

    const [activeTab, setActiveTab] = useState<TabId>('home');

    const handleAddProduct = (): void => {
        router.push('/addprodutos'); 
    };

    const stats: StatItem[] = [
        { label: 'Produtos', value: '4.000.000' },
        { label: 'Vendas', value: '50.000' },
        { label: 'Lucro', value: 'R$ 1000000' },
    ];

    return (
        <View style={styles.container}>
            <Header
                 showProfile // O seu Header customizado aceita esta prop!
                 userName="Clara Catarina"
                 userRole="UX/UI Designer"
                 userImage="https://via.placeholder.com/40"
                 rightIcon={ScanBarcode as LucideIcon} // Casting para garantir tipagem correta se o Header exigir
                 onRightIconPress={() => console.log('Notificações')}
            />

            <ScrollView style={styles.content as StyleProp<ViewStyle>} showsVerticalScrollIndicator={false}>
                {stats.map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                        <Text style={styles.statValue}>{stat.value}</Text>
                    </View>
                ))}

                <View style={styles.buttonWrapper}>
                    
                    <CustomButton
                        title="Adicionar Produto"
                        onPress={handleAddProduct}
                        
                        icon={((props: { color: string, size: number }) => (
                            <Text style={[styles.plusIcon, {color: props.color}]}>+</Text>
                        )) as IconComponentType}
                        
                        style={styles.addButton}
                    />
                    
                </View>
            </ScrollView>

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
    buttonWrapper: {
        paddingTop: SPACING.lg, 
        marginBottom: SPACING.xl, 
    } as ViewStyle,
    addButton: {
        width: '100%', 
    } as ViewStyle,
    plusIcon: {
        fontSize: FONT_SIZES.xlarge,
        lineHeight: FONT_SIZES.xlarge,
        fontWeight: 'bold',
        marginRight: SPACING.xs,
    } as TextStyle,
});