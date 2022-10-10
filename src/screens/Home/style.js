import { StyleSheet } from "react-native";
import { COLORS } from '../../colors';
import { Dimensions } from 'react-native'

const vw = Dimensions.get('window').width / 100;

export const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,

    },
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 78.5*vw,
        width: 100*vw,
        marginTop: 'auto',
        // borderColor: 'red', borderWidth: 1,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70,
        width: 83*vw,
        height: 17*vw,
    },
    logo: {
        marginTop: 50,
        height: 41.5*vw,
    },
    title: {
        marginTop: 'auto',
        height: 33*vw,
    }
})