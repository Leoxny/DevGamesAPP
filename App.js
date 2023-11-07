import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme/Theme';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { MainStack } from './src/routes/MainStack';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <MainStack />
    </NavigationContainer>
  );
}
