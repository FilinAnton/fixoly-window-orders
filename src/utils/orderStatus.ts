import { ORDER_STATUSES, type OrderStatus } from '../types/order';
import { colors } from '../theme/colors';

export const statusLabels: Record<OrderStatus, string> = {
  new: 'Новый',
  inProgress: 'В работе',
  completed: 'Завершён',
};

export const statusColors: Record<
  OrderStatus,
  { background: string; foreground: string }
> = {
  new: { background: colors.newSoft, foreground: colors.new },
  inProgress: {
    background: colors.inProgressSoft,
    foreground: colors.inProgress,
  },
  completed: {
    background: colors.completedSoft,
    foreground: colors.completed,
  },
};

export function getNextStatus(current: OrderStatus): OrderStatus {
  const currentIndex = ORDER_STATUSES.indexOf(current);
  return ORDER_STATUSES[(currentIndex + 1) % ORDER_STATUSES.length] ?? 'new';
}
