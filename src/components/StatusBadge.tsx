import { StyleSheet, Text, View } from 'react-native';

import type { OrderStatus } from '../types/order';
import { statusColors, statusLabels } from '../utils/orderStatus';

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const palette = statusColors[status];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]}>
      <View style={[styles.dot, { backgroundColor: palette.foreground }]} />
      <Text style={[styles.label, { color: palette.foreground }]}>
        {statusLabels[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dot: {
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
