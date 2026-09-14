import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './src/navigation/RootNavigator';
import { OrdersProvider } from './src/store/OrdersContext';
import { navigationTheme } from './src/theme/navigationTheme';

export default function App() {
  return (
    <OrdersProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </OrdersProvider>
  );
}
