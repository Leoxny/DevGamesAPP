import React, { FC, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useIsFocused, useNavigation, } from '@react-navigation/native';
import { ApiGames } from '../api/ApiGames';
import { colors, theme } from '../theme/Theme';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

type PropsCategory = {
    route: {
        params: {
            id: number;
            name: string
        };

    };
};

export const CategoryGameScreen: FC<PropsCategory> = ({ route }) => {

    const { id, name } = route.params
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const [gamesGategory, setGamesGategory] = useState([])

    useEffect(() => {
        if (isFocused) {
            loadCategory()
        }
    }, [isFocused])

    const loadCategory = async () => {
        try {

            setLoading(true)

            const response = await ApiGames.getGameCategory(id)
            setGamesGategory(response.results)

            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const renderGameCategory = ({ item }) => {

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

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary }}>
                <Text style={{ fontSize: 25, color: colors.white }}>Carregando....</Text>
            </View>
        )
    }
    
    return (
        <View style={theme.container}>
            <View style={styles.iconContainer2}>
                <TouchableOpacity style={styles.iconModal} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={40} color={colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
            </View>

            <FlatList
                data={gamesGategory}
                keyExtractor={item => item.id.toString()}
                renderItem={renderGameCategory}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

const styles = StyleSheet.create({
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
})
