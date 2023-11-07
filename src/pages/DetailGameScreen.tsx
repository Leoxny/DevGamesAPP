import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { colors, theme } from '../theme/Theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ApiGames } from '../api/ApiGames';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { message, success } from '../utils/Toasts';
import AsyncStorage from '@react-native-async-storage/async-storage';


type PropsDetail = {
  route: {
    params: {
      name: string;
    };
  };
};

export const DetailGameScreen: FC<PropsDetail> = ({ route }) => {

  const { name } = route.params;
  const isFocused = useIsFocused()
  const [detail, setDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [visibleModal, setVisibleModal] = useState(false)

  const genres = detail?.genres;
  const rating = detail?.rating?.toFixed(1)
  const platform = detail?.platforms
  const stores = detail?.stores

  useEffect(() => {
    if (isFocused) {
      loadDetailGame();
    }
  }, [isFocused])

  const loadDetailGame = async () => {
    try {

      setLoading(true)

      const response = await ApiGames.getGameDetail(name)
      setDetail(response)

      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const salvarGame = async () => {

    const minhLista = await AsyncStorage.getItem("game");
    let gameSalvos = JSON.parse(minhLista) || [];

    const hasGame = gameSalvos.some((gamesSalvos) => gamesSalvos.id === detail.id)

    if (hasGame) {
      message('Atenção', "Esse filme já está na sua lista!")
      return
    }

    gameSalvos.push(detail)
    await AsyncStorage.setItem("game", JSON.stringify(gameSalvos))
    success('Sucesso', "Filme salvo com sucesso!")
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

      <StatusBar style="light" translucent />

      <Modal
        visible={visibleModal}
        transparent={true}
      >
        <View style={theme.containerModal}>
          <StatusBar style="light" backgroundColor={colors.black} />
          <View style={styles.iconContainer2}>
            <TouchableOpacity style={styles.iconModal} onPress={() => setVisibleModal(false)}>
              <AntDesign name="arrowleft" size={28} color={colors.white} />
            </TouchableOpacity>
            <Text style={{ flex: 0.8, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: colors.white }}>Description</Text>
          </View>
          <ScrollView>
            <View style={{ marginHorizontal: 14 }}>
              <Text style={{ color: colors.white, lineHeight: 22, fontSize: 16 }}>{detail?.description_raw}</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View style={styles.cardImage}>
        <Image source={{ uri: detail?.background_image }} style={styles.image} />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => salvarGame()}>
            <FontAwesome name="bookmark-o" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.circle}>
        <FontAwesome name="link" size={30} color={colors.white} />
      </View>

      <ScrollView>

        <View style={{ marginHorizontal: 14 }}>

          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginBottom: 5 }}>
            <FontAwesome name="star" size={20} color={colors.start} />
            <Text style={styles.textGame}>{rating}/10</Text>
          </View>
          <Text style={{ fontSize: 20, color: colors.white, fontWeight: 'bold' }}>{detail?.name}</Text>

          <View style={{ marginTop: 20 }}>

            <Text style={{ fontSize: 22, color: colors.white, fontWeight: 'bold' }}>Genres</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              {genres?.map((genre, index) => (
                <View key={index}>
                  <View style={styles.category}>
                    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 13 }}>{genre.name}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 22 }}>Description</Text>
              <Text numberOfLines={10} style={{ color: colors.white, fontSize: 15, opacity: 0.8, marginTop: 8, lineHeight: 20 }}>{detail?.description_raw}</Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => setVisibleModal(true)}>
              <Text style={styles.textBtn}>Read full description</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 22, color: colors.white, fontWeight: 'bold' }}>Platforms</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  {platform?.map((platform, index) => (
                    <View key={index}>
                      <View style={styles.category}>
                        <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 13 }}>{platform.platform.name}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 22, color: colors.white, fontWeight: 'bold' }}>Stores</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  {stores?.map((stores, index) => (
                    <View key={index}>
                      <View style={styles.category}>
                        <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 13 }}>{stores.store.name}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

          </View>

        </View>

      </ScrollView>

    </View >
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.cinca,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  iconModal: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardImage: {
    position: 'relative',
    width: '100%',
    height: '40%',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 99,
  },
  iconContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    top: -30
  },
  textGame: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    width: 100,
    height: 35,
    backgroundColor: colors.lilas,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 8
  },
  btn: {
    width: '100%',
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.blue,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 15,
    color: colors.white
  }
})