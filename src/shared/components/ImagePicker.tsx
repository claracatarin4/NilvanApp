import React, { FC } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Image, 
    StyleSheet, 
    ViewStyle,
    ImageStyle, 
} from 'react-native';
import { Camera } from 'lucide-react-native';
import { COLORS } from '../../shared/constants/colors'; 
import { SPACING } from '../../shared/constants/spacing'; 

interface ImagePickerProps {
    imageUri: string | null; 
    onPress: () => void; 
}

export const ImagePicker: FC<ImagePickerProps> = ({ imageUri, onPress }) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress} 
            activeOpacity={0.7}
        >
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Camera size={40} color={COLORS.darkGray} />
                </View>
            )}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: SPACING.md,
    } as ViewStyle,
    image: {
        width: '100%',
        height: '100%',
    } as ImageStyle, 
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
});