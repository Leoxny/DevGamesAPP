import Toast from 'react-native-toast-message'

export const message = (title: string, subtitle: string, top = false) => {
    try {
        Toast.show({
            type: 'error',
            position: top ? 'top' : 'bottom',
            text1: title,
            text2: subtitle,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 30,

            onShow: () => { },
            onHide: () => { }
        })
    } catch (err) {
        console.log('error no message toast', err)
    }
}

export const success = (title: string, subtitle: string) => {
    Toast.show({
        type: 'success',
        position: 'bottom',
        text1: title,
        text2: subtitle,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 30,
        onShow: () => { },
        onHide: () => { }
    })
}

export const info = (title: string, subtitle: string) => {
    Toast.show({
        type: 'info',
        position: 'bottom',
        text1: title,
        text2: subtitle,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 30,
        onShow: () => { },
        onHide: () => { }
    })
}