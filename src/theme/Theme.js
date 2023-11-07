import { Dimensions, Platform, StyleSheet } from 'react-native';

export const colors = {
    primary: '#050b18',
    white: '#fff',
    red: '#ff455f',
    blue: '#0e5c88',
    black: '#0f172a',
    lilas: '#64748b',
    cinca: '#1f2430',
    start: '#f6b81c'
}

export const theme = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        paddingBottom: Platform.OS === "android" ? 0 : 20
    },
    containerModal: {
        backgroundColor: colors.black,
        flex: 1
    }
})

