import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
// import { useState } from 'react';

// const fetchFonts = () => {
//     return Font.loadAsync({
//         'KGSecondChancesSolid': require('./assets/fonts/KGSecondChancesSolid.ttf'),
//     });
// };

export const Button = ({children, onPress, style, fontSize, custom_font, disabled}) => {

    // const [loaded, setLoaded] = useState(false)
    
    // if (!loaded) {
    //     return (
    //         <AppLoading 
    //             startAsync={fetchFonts}
    //             onFinish={()=> setLoaded(true)}
    //         />
    //     )
    // }

    return (
        <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
            <ImageBackground source={require('../../../assets/button.png')} resizeMode="stretch" style={[styles.background]}>
                <Text style={[styles.button, {fontSize: fontSize}]}>{children}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}