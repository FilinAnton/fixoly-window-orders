export const ORDER_STATUSES = ['new', 'inProgress', 'completed'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const WINDOW_TYPES = [
  'Поворотное',
  'Откидное',
  'Поворотно-откидное',
  'Раздвижное',
] as const;
export type WindowType = (typeof WINDOW_TYPES)[number];

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  address: string;
  windowType: WindowType;
  width: number;
  height: number;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderInput {
  customerName: string;
  address: string;
  windowType: WindowType;
  width: number;
  height: number;
}
