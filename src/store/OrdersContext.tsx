import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import seedData from '../data/orders.json';
import type { CreateOrderInput, Order } from '../types/order';
import { getNextStatus } from '../utils/orderStatus';

interface OrdersState {
  orders: Order[];
}

type OrdersAction =
  | { type: 'order/created'; payload: Order }
  | { type: 'order/statusAdvanced'; payload: { orderId: string } };

interface OrdersContextValue {
  orders: readonly Order[];
  addOrder: (input: CreateOrderInput) => Order;
  advanceOrderStatus: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const initialState: OrdersState = {
  orders: seedData as Order[],
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'order/created':
      return { orders: [action.payload, ...state.orders] };
    case 'order/statusAdvanced':
      return {
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: getNextStatus(order.status) }
            : order,
        ),
      };
    default:
      return state;
  }
}

function getNextOrderNumber(orders: readonly Order[]): string {
  const largestNumber = orders.reduce((currentLargest, order) => {
    const parsedNumber = Number(order.orderNumber.replace(/\D/g, ''));
    return Number.isFinite(parsedNumber)
      ? Math.max(currentLargest, parsedNumber)
      : currentLargest;
  }, 1000);

  return `WIN-${largestNumber + 1}`;
}

export function OrdersProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  const addOrder = useCallback(
    (input: CreateOrderInput): Order => {
      const order: Order = {
        ...input,
        id: `order-${Date.now()}`,
        orderNumber: getNextOrderNumber(state.orders),
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: 'order/created', payload: order });
      return order;
    },
    [state.orders],
  );

  const advanceOrderStatus = useCallback((orderId: string) => {
    dispatch({ type: 'order/statusAdvanced', payload: { orderId } });
  }, []);

  const getOrderById = useCallback(
    (orderId: string) => state.orders.find((order) => order.id === orderId),
    [state.orders],
  );

  const value = useMemo<OrdersContextValue>(
    () => ({
      orders: state.orders,
      addOrder,
      advanceOrderStatus,
      getOrderById,
    }),
    [addOrder, advanceOrderStatus, getOrderById, state.orders],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextValue {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }

  return context;
}
