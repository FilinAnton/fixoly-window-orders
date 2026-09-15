import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import type { Order } from '../types/order';
import { formatDate } from '../utils/format';
import { StatusBadge } from './StatusBadge';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  return (
    <Pressable
      accessibilityHint="Открывает полную информацию о заказе"
      accessibilityLabel={`Открыть заказ ${order.orderNumber}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <StatusBadge status={order.status} />
      </View>
      <Text style={styles.customer}>{order.customerName}</Text>
      <View style={styles.footerRow}>
        <Text numberOfLines={1} style={styles.address}>
          {order.address}
        </Text>
        <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.995 }],
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  customer: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 14,
  },
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  address: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 14,
  },
  date: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
