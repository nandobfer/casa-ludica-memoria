import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens/Home';
import { COLORS } from './src/colors';
import { OnePlayerScreen } from './src/screens/OnePlayerScreen';
import { OptionsProvider } from './src/contexts/OptionsContext'
import { Options } from './src/screens/Options';
import { AppLoading } from './src/components/AppLoading';
import { useFonts } from 'expo-font';

export default function App() {
    
    const Stack = createNativeStackNavigator();
    const navigator_options = {
        headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.background,
          headerTitleStyle: {
            fontWeight: 'bold',
        },
          headerTitleAlign: 'center',
          animation: 'slide_from_bottom',
        };
        const home_header_options = {
            title: 'Inicio',
            headerShown: false,
        };
        
    let [loaded] = useFonts({
        'KGSecondChancesSolid': require('./assets/fonts/KGSecondChancesSolid.ttf'),
        'KGSecondChancesSketch': require('./assets/fonts/KGSecondChancesSketch.ttf'),
    });

    if (!loaded) {
        return <AppLoading />
    }

    return (
        <NavigationContainer>
            <OptionsProvider>
                <StatusBar style="auto" />
                <Stack.Navigator initialRouteName='Home' screenOptions={navigator_options}>
                    <Stack.Screen 
                        name="Home" 
                        options={home_header_options}  
                        component={Home}
                    />
                    <Stack.Screen name="OnePlayerScreen" component={OnePlayerScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Options" component={Options} options={{title: 'Opções'}} />
                </Stack.Navigator>
            </OptionsProvider>
        </NavigationContainer>
    );
}


