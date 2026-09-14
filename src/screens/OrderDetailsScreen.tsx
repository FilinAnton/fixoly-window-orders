import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBadge } from '../components/StatusBadge';
import type { RootStackParamList } from '../navigation/types';
import { useOrders } from '../store/OrdersContext';
import { colors } from '../theme/colors';
import { formatDate, formatDimensions } from '../utils/format';
import { getNextStatus, statusLabels } from '../utils/orderStatus';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export function OrderDetailsScreen({ route, navigation }: Props) {
  const { advanceOrderStatus, getOrderById } = useOrders();
  const order = getOrderById(route.params.orderId);

  if (!order) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Заказ не найден</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>Вернуться к списку</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const nextStatus = getNextStatus(order.status);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <StatusBadge status={order.status} />
          <Text style={styles.customer}>{order.customerName}</Text>
          <Text style={styles.address}>{order.address}</Text>
        </View>

        <View style={styles.detailsCard}>
          <DetailRow label="Тип окна" value={order.windowType} />
          <View style={styles.divider} />
          <DetailRow
            label="Размеры"
            value={formatDimensions(order.width, order.height)}
          />
          <View style={styles.divider} />
          <DetailRow label="Дата создания" value={formatDate(order.createdAt)} />
          <View style={styles.divider} />
          <DetailRow label="Текущий статус" value={statusLabels[order.status]} />
        </View>

        <Pressable
          accessibilityHint={`Следующий статус: ${statusLabels[nextStatus]}`}
          accessibilityRole="button"
          onPress={() => advanceOrderStatus(order.id)}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Изменить статус</Text>
          <Text style={styles.primaryButtonHint}>
            Далее: {statusLabels[nextStatus]}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 16,
  },
  hero: {
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  orderNumber: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  customer: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 18,
  },
  address: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 8,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
  },
  detailRow: {
    gap: 6,
    paddingVertical: 16,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryPressed,
    opacity: 0.9,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  primaryButtonHint: {
    color: '#DCE8FF',
    fontSize: 12,
    marginTop: 3,
  },
  notFound: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  notFoundTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  backLink: {
    color: colors.primary,
    fontWeight: '700',
    marginTop: 12,
  },
});
