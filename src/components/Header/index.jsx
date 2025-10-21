import { StyleSheet, Text , TouchableOpacity, Image, View} from "react-native";
import { ScanBarcode } from 'lucide-react-native';

export const Header = () => {
  return (
   <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ivan Santana Jr.</Text>
            <Text style={styles.userRole}>Diretor</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
             <ScanBarcode size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0F2553',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userRole: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
})
