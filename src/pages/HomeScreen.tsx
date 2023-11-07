import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Keyboard, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { colors, theme } from '../theme/Theme';
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ApiGames } from '../api/ApiGames';
import { FontAwesome } from '@expo/vector-icons';

export const HomeScreen = () => {

    const isFocused = useIsFocused()
    const [filter, setFilter] = useState('')
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        if (isFocused) {
            loadCategory();
            loadGames();
        }
    }, [isFocused])

    const loadCategory = async () => {
        try {

            setLoading(true)

            const response = await ApiGames.getAllCategory()
            setCategory(response.results)

            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const loadGames = async () => {
        try {

            setLoading(true)

            const response = await ApiGames.getAllGames()
            setGames(response.results)

            setLoading(false)


        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const searchGame = async () => {
        try {

            setLoading(true)

            const response = await ApiGames.getGameName(filter)
            setFilter(response)
            navigation.navigate('SearchScreen', { name: filter })
            console.log(response)

            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const renderCategory = ({ item }) => {

        return (
            <TouchableOpacity key={item.id} style={styles.category} onPress={() => navigation.navigate('CategoryGameScreen', { id: item.id, name: item.name })}>
                <Text style={styles.textCategory}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderGames = ({ item }) => {

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
        <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>

            <View style={[theme.container]}>

                <View style={styles.content}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textDev}>Dev</Text>
                        <Text style={styles.textGames}>Games</Text>
                    </View>
                    <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('FavoritesGamesScreen')}>
                        <FontAwesome name="bookmark-o" size={28} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerInput}>
                    <View style={styles.input}>
                        <TextInput
                            value={filter}
                            onChangeText={(text) => setFilter(text)}
                            placeholder='Looking for a game'
                            placeholderTextColor={colors.white}
                            style={styles.text}
                        />
                    </View>
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => searchGame()}>
                        <AntDesign name="search1" size={32} color={colors.red} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={category}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCategory}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

                <Text style={styles.title}>Trending games</Text>

                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={renderGames}
                    showsVerticalScrollIndicator={false}
                />

            </View>

        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.cinca,
        marginTop: 15,
        width: '75%',
        height: 45,
        borderRadius: 20,
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        top: 8,
        left: 15,
        color: colors.white
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    category: {
        width: 100,
        height: 35,
        backgroundColor: colors.cinca,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        marginTop: 20,
        marginBottom: 60,
    },
    textCategory: {
        color: colors.white
    },
    title: {
        color: colors.white,
        paddingHorizontal: 14,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20
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
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 20
    },
    textDev: {
        fontSize: 30,
        color: colors.white,
    },
    textGames: {
        fontSize: 30,
        color: colors.red
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: colors.cinca,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

