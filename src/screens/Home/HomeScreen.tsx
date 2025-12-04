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
import { LucideIcon, Plus, ScanBarcode, Search } from 'lucide-react-native';
import { Header } from '../../shared/components/Header';
import { CustomButton } from '../../shared/components/CustomButton';
import { COLORS } from '../../shared/constants/colors';
import { SPACING } from '../../shared/constants/spacing';
import { FONT_SIZES } from '../../shared/constants/fonts';
import api from '../../core/api';


type TabId = 'home' | 'products';

export interface HomeScreenProps {}

export interface DashboardResponse {
  numeroProdutos: number | null
  totalProdutosEstoque: number | null
  valorEstoque: number | null
}

export const HomeScreen: FC<HomeScreenProps> = (): JSX.Element => {

    const [data,setData] = useState({numeroProdutos:{label:"Total Produtos", value: 0}, valorEstoque:{label:"Valor Estoque", value: 0} , totalProdutosEstoque:{label:"Total Produtos no Estoque", value: 0}})
    
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<TabId>('home');

    api.get<DashboardResponse>("/api/dashboard/admin").then((res) => {
     if(res?.data){
        setData({numeroProdutos:{label:"Total Produtos", value: res.data.numeroProdutos}, valorEstoque:{label:"Valor Estoque", value: res.data.valorEstoque} , totalProdutosEstoque:{label:"Total Produtos no Estoque", value: res.data.totalProdutosEstoque}});
        }
     })

    
    const handleAddProduct = (): void => {
        router.push('/addprodutos');
    };

    return (
        <View style={styles.container}>
            <Header
                    showProfile
                    userName="Clara Catarina"
                    userRole="UX/UI Designer"
                    userImage="https://via.placeholder.com/40"
                    rightIcon={Search} 
                    onRightIconPress={() => console.log('Notificações')}
            />

            <ScrollView style={styles.content as StyleProp<ViewStyle>} showsVerticalScrollIndicator={false}>
                {Object.keys(data).map((key, index) => (
                    <View key={index} style={styles.statCard}>
                        <Text style={styles.statLabel}>{data[key].label}</Text>
                        <Text style={styles.statValue}>{data[key].value}</Text>
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