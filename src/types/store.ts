export type ProductCategory = 
  | 'all'
  | 'cardio'
  | 'weights'
  | 'benches'
  | 'combat'
  | 'accessories';

export interface ProductSpec {
  [key: string]: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameEn: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  description: string;
  features: string[];
  specs: ProductSpec;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  warranty: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 
  | 'mada'
  | 'card'
  | 'apple_pay'
  | 'stc_pay'
  | 'tabby'
  | 'tamara'
  | 'cod';

export type OrderStatus = 
  | 'new'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  timestamp: string;
  note: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  address: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  trackingNumber: string;
  courier: string;
  estimatedDelivery: string;
  driverName?: string;
  driverPhone?: string;
  timeline: OrderTimelineStep[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'order' | 'new_arrival' | 'promo' | 'stock';
  read: boolean;
  productId?: string;
  orderId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  text: string;
  time: string;
}
