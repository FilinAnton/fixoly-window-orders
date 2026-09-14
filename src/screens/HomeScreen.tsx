import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FilterChip } from '../components/FilterChip';
import { OrderCard } from '../components/OrderCard';
import type { RootStackParamList } from '../navigation/types';
import { useOrders } from '../store/OrdersContext';
import { colors } from '../theme/colors';
import type { OrderStatus } from '../types/order';
import { statusLabels } from '../utils/orderStatus';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type StatusFilter = 'all' | OrderStatus;

const filters: readonly StatusFilter[] = [
  'all',
  'new',
  'inProgress',
  'completed',
];

function getFilterLabel(filter: StatusFilter): string {
  return filter === 'all' ? 'Все' : statusLabels[filter];
}

export function HomeScreen({ navigation }: Props) {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<StatusFilter>('all');

  const visibleOrders = useMemo(
    () =>
      filter === 'all'
        ? orders
        : orders.filter((order) => order.status === filter),
    [filter, orders],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.summary}>
          <View>
            <Text style={styles.eyebrow}>АКТИВНЫЕ ЗАЯВКИ</Text>
            <Text style={styles.summaryValue}>{orders.length} заказов</Text>
          </View>
          <View style={styles.summaryIcon}>
            <Text style={styles.summaryIconText}>▦</Text>
          </View>
        </View>

        <View style={styles.filters}>
          {filters.map((item) => (
            <FilterChip
              key={item}
              label={getFilterLabel(item)}
              onPress={() => setFilter(item)}
              selected={filter === item}
            />
          ))}
        </View>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={visibleOrders}
          keyExtractor={(order) => order.id}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Заказов пока нет</Text>
              <Text style={styles.emptyText}>
                Измените фильтр или создайте новый заказ.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() =>
                navigation.navigate('OrderDetails', { orderId: item.id })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />

        <Pressable
          accessibilityLabel="Создать заказ"
          accessibilityRole="button"
          onPress={() => navigation.navigate('CreateOrder')}
          style={({ pressed }) => [
            styles.floatingButton,
            pressed && styles.floatingButtonPressed,
          ]}
        >
          <Text style={styles.floatingButtonText}>＋</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  summary: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 5,
  },
  summaryIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 15,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  summaryIconText: {
    color: colors.primary,
    fontSize: 25,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  listContent: {
    gap: 12,
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
  floatingButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 29,
    bottom: 22,
    height: 58,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    width: 58,
    elevation: 7,
  },
  floatingButtonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.96 }],
  },
  floatingButtonText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '400',
    marginTop: -2,
  },
});
