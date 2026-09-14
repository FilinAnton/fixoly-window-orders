import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateOrderScreen } from '../screens/CreateOrderScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OrderDetailsScreen } from '../screens/OrderDetailsScreen';
import { colors } from '../theme/colors';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Назад',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Заказы' }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: 'Детали заказа' }}
      />
      <Stack.Screen
        name="CreateOrder"
        component={CreateOrderScreen}
        options={{ title: 'Новый заказ', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
