import axios from "axios";
import { apiKey } from "../services/apiKey";
import { baseURL } from "../services/services";

axios.defaults.baseURL = baseURL


const getAllGames = async () => {
    try {

        return await axios.get(`/games?key=${apiKey}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error);
    }
}

const getAllCategory = async () => {
    try {

        return await axios.get(`/genres?key=${apiKey}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error);
    }
}

const getGameName = async (nome: string) => {
    try {

        return await axios.get(`/games?key=${apiKey}&search=${nome}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error);
    }
}

const getGameDetail = async (nome: string) => {
    try {

        return await axios.get(`/games/${nome}?key=${apiKey}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error);
    }
}

const getGameCategory = async (id: number) => {
    try {

        return await axios.get(`/games?key=${apiKey}&genres=${id}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (error) {
        console.log(error);
    }
}

export const ApiGames = {
    getAllGames,
    getAllCategory,
    getGameName,
    getGameDetail,
    getGameCategory
}