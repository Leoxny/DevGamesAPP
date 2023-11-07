import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../pages/HomeScreen";
import { DetailGameScreen } from "../pages/DetailGameScreen";
import { CategoryGameScreen } from "../pages/CategoryGameScreen";
import { FavoritesGamesScreen } from "../pages/FavoritesGamesScreen";
import { SearchScreen } from "../pages/SearchScreen";

const Stack = createStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailGameScreen" component={DetailGameScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryGameScreen" component={CategoryGameScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FavoritesGamesScreen" component={FavoritesGamesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}