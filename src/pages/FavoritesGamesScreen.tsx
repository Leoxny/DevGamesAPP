import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, FlatList } from 'react-native';
import { colors, theme } from '../theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { success } from '../utils/Toasts';
import { useNavigation, } from '@react-navigation/native';
import { FontAwesome, AntDesign, Feather } from '@expo/vector-icons';

export const FavoritesGamesScreen = () => {

    const [gamesFavorites, setGamesFavorites] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        LoadFavorites()
    }, [])

    const LoadFavorites = async () => {
        const minhaLista = await AsyncStorage.getItem('game')
        setGamesFavorites(JSON.parse(minhaLista) || [])
    }

    const excluirGame = async (id) => {
        let filtroGames = gamesFavorites.filter((item) => {
            console.log(item)
            return (
                item.id !== id
            )
        })

        setGamesFavorites(filtroGames);
        await AsyncStorage.setItem('game', JSON.stringify(filtroGames))
        success('Sucesso', "Game removido com sucesso!")
    }

    const renderGameFavorito = ({ item }) => {

        let rating = item.rating.toFixed(1)
        let nameGame = item.name.toLowerCase()
        let formatGame = nameGame.replace(/[\s:]+/g, '-');

        return (
            <TouchableOpacity style={styles.CardImage} onPress={() => navigation.navigate('DetailGameScreen', { name: formatGame })}>
                <Image source={{ uri: item.background_image }} style={styles.image} />
                <View style={styles.contentImagem}>
                    <Text style={styles.textGame}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <FontAwesome name="star" size={15} color={colors.start} />
                        <Text style={styles.textGame}>{rating}/10</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.lixeira} onPress={() => excluirGame(item.id)}>
                    <Feather name="trash" size={24} color={colors.white} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }


    return (
        <View style={theme.container}>
            <View style={styles.iconContainer2}>
                <TouchableOpacity style={styles.iconModal} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={40} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>My favorites</Text>
            </View>

            {gamesFavorites.length === 0 && <View style={styles.containerSemGame}><Text style={styles.semGame}>Você não possui nenhum game salvo :(</Text></View>}

            <FlatList
                data={gamesFavorites}
                keyExtractor={item => item.id}
                renderItem={renderGameFavorito}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    CardImage: {
        width: '90%',
        height: 150,
        alignSelf: 'center',
        marginBottom: 15,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.5,
        borderRadius: 10
    },
    contentImagem: {
        position: 'absolute',
        top: 105,
        bottom: 0,
        left: 8
    },
    textGame: {
        zIndex: 1000,
        color: colors.white,
        fontWeight: 'bold',
    },
    iconContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconModal: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.primary,
        marginTop: 20
    },
    title: {
        flex: 0.8,
        fontSize: 23,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: 5
    },
    lixeira: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center',
        position: `absolute`,
        right: 10,
        top: 8,
    },
    semGame: {
        fontSize: 20,
        color: colors.white,
        fontWeight: `bold`,
    },
    containerSemGame: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})