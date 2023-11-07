import React, { FC, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, FlatList } from 'react-native';
import { colors, theme } from '../theme/Theme';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ApiGames } from '../api/ApiGames';

type PropsDetail = {
    route: {
        params: {
            name: string;
        };
    };
};

export const SearchScreen: FC<PropsDetail> = ({ route }) => {

    const { name } = route.params
    const navigation = useNavigation()
    const [gamesSearch, setGamesSearch] = useState()
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            searchGame();
        }
    }, [isFocused])

    const searchGame = async () => {
        try {

            setLoading(true)

            const response = await ApiGames.getGameName(name)
            setGamesSearch(response.results)

            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const renderSearch = ({ item }) => {

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
            </TouchableOpacity>
        )
    }

    return (
        <View style={theme.container}>
            <View style={styles.iconContainer2}>
                <TouchableOpacity style={styles.iconModal} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={40} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>Search</Text>
            </View>

            {gamesSearch && <View style={styles.containerSemGame}><Text style={styles.semGame}>Não encontramos um jogo com esse nome... :(</Text></View>}

            <FlatList
                data={gamesSearch}
                keyExtractor={item => item.id}
                renderItem={renderSearch}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
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