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
import { LucideIcon, Plus, ScanBarcode } from 'lucide-react-native';
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

// O tipo IconComponentType não é mais necessário, pois você usa LucideIcon diretamente.
// type IconComponentType = FC<{ 
//     color: string; 
//     size: number;
//     style?: StyleProp<ViewStyle>; 
// }>;

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
                    showProfile
                    userName="Clara Catarina"
                    userRole="UX/UI Designer"
                    userImage="https://via.placeholder.com/40"
                    rightIcon={ScanBarcode as LucideIcon}
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
                        icon={Plus}
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
        borderWidth: 1,
        borderRadius: 8,
        borderColor: COLORS.border
    } as ViewStyle,
    statLabel: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textLight,
        marginBottom: SPACING.xs,

    } as TextStyle,
    statValue: {
        fontSize: FONT_SIZES.xxlarge,
        fontWeight: 'bold',
        color: COLORS.primary,
    } as TextStyle,
    buttonWrapper: {
        paddingTop: SPACING.lg,
        marginBottom: SPACING.xl,
    } as ViewStyle,
    addButton: {
        width: '100%',
    } as ViewStyle,
    plusIcon: {
        marginRight: SPACING.xs,
    } as TextStyle,
});