import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Review, Order, NotificationItem, CartItem, OrderStatus, PaymentMethod } from '../types/store';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS, INITIAL_NOTIFICATIONS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  reviews: Review[];
  orders: Order[];
  notifications: NotificationItem[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  activeView: 'store' | 'admin' | 'tracking';
  setActiveView: (view: 'store' | 'admin' | 'tracking') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  trackingModalOpen: boolean;
  setTrackingModalOpen: (open: boolean) => void;
  activeTrackingId: string;
  setActiveTrackingId: (id: string) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Orders & Tracking
  createOrder: (orderPayload: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    city: string;
    address: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    discount?: number;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Inventory & Product Management
  updateProductStock: (productId: string, stock: number) => void;
  updateProductPrice: (productId: string, price: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'sku' | 'rating' | 'reviewCount'>) => void;
  deleteProduct: (productId: string) => void;
  
  // Reviews
  addProductReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  triggerNotification: (title: string, message: string, type: NotificationItem['type'], meta?: { productId?: string; orderId?: string }) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ironfit_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ironfit_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ironfit_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ironfit_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ironfit_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [activeView, setActiveView] = useState<'store' | 'admin' | 'tracking'>('store');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('SP-8941');
  const [chatOpen, setChatOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('ironfit_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ironfit_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ironfit_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ironfit_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ironfit_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxAllowed = item.product.stock;
          return { ...item, quantity: Math.min(quantity, maxAllowed) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Create Order
  const createOrder = (orderPayload: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    city: string;
    address: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    discount?: number;
  }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SP-${randomSuffix}`;
    const trackingNum = `SMSA-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const subtotal = cartTotal;
    const shippingFee = subtotal > 500 ? 0 : 45;
    const discount = orderPayload.discount || 0;
    const totalAmount = Math.max(0, subtotal + shippingFee - discount);

    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: orderId,
      customerName: orderPayload.customerName,
      customerPhone: orderPayload.customerPhone,
      customerEmail: orderPayload.customerEmail,
      city: orderPayload.city,
      address: orderPayload.address,
      notes: orderPayload.notes,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      subtotal,
      shippingFee,
      discount,
      totalAmount,
      paymentMethod: orderPayload.paymentMethod,
      status: 'new',
      createdAt: `${dateStr} - ${timeStr}`,
      trackingNumber: trackingNum,
      courier: 'سمسا إكسبريس (SMSA Express)',
      estimatedDelivery: 'خلال 24 إلى 48 ساعة كحد أقصى',
      driverName: 'سعد المنصور',
      driverPhone: '+966 50 112 3344',
      timeline: [
        {
          status: 'new',
          label: 'تم استلام وتأكيد الطلب',
          timestamp: `${dateStr} - ${timeStr}`,
          note: `تم تأكيد العملية بطريقة دفع (${orderPayload.paymentMethod.toUpperCase()}) وجاري حجز الأصناف من المستودع.`,
          completed: true
        },
        {
          status: 'processing',
          label: 'قيد التجهيز والتغليف الآمن',
          timestamp: 'قيد الإجراء بالمستودع',
          note: 'فحص جودة العتاد وتغليفه بالصناديق المصفحة.',
          completed: false
        },
        {
          status: 'shipped',
          label: 'تم الشحن والتسليم للناقل',
          timestamp: 'بانتظار الناقل',
          note: 'تسليم الشحنة لشركة سمسا إكسبريس للفرز.',
          completed: false
        },
        {
          status: 'out_for_delivery',
          label: 'المندوب في الطريق للتوصيل',
          timestamp: 'متوقع غداً',
          note: 'الشحنة مع المندوب متجهة لعنوانك المسجل.',
          completed: false
        },
        {
          status: 'delivered',
          label: 'تم التسليم والتركيب بنجاح',
          timestamp: 'متوقع خلال 48 ساعة',
          note: 'تسليم الطلب والتحقق من سلامة الأجهزة والضمان.',
          completed: false
        }
      ]
    };

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((c) => c.product.id === prod.id);
        if (cartItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartItem.quantity)
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger Notification
    triggerNotification(
      'تأكيد استلام طلب جديد 🎉',
      `تم استلام طلبك رقم ${orderId} بقيمة ${totalAmount.toLocaleString('en-US')} ر.س بنجاح، يمكنك تتبعه الآن مباشرة!`,
      'order',
      { orderId }
    );

    setActiveTrackingId(orderId);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['new', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const targetIdx = statusOrder.indexOf(status);

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline.map((step) => {
            const stepIdx = statusOrder.indexOf(step.status);
            return {
              ...step,
              completed: stepIdx <= targetIdx
            };
          });

          return {
            ...ord,
            status,
            timeline: updatedTimeline
          };
        }
        return ord;
      })
    );

    // Add notification to customer
    const statusArabic = {
      new: 'تم تأكيد الطلب',
      processing: 'قيد التجهيز في المستودع',
      shipped: 'تم الشحن والتسليم لشركة النقل',
      out_for_delivery: 'المندوب في الطريق إلى موقعك',
      delivered: 'تم تسليم وتركيب طلبك بنجاح',
      cancelled: 'تم إلغاء الطلب'
    }[status];

    triggerNotification(
      `تحديث على طلبك ${orderId}`,
      `أصبحت حالة طلبك الرياضي الآن: ${statusArabic}`,
      'order',
      { orderId }
    );
  };

  const updateProductStock = (productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const oldStock = p.stock;
          const updated = { ...p, stock: Math.max(0, stock) };
          if (oldStock === 0 && stock > 0) {
            triggerNotification(
              `تجديد مخزون: ${p.name}`,
              `تم توفير كميات جديدة من هذا الصنف الرياضي بالمستودع الآن!`,
              'stock',
              { productId: p.id }
            );
          }
          return updated;
        }
        return p;
      })
    );
  };

  const updateProductPrice = (productId: string, price: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: Math.max(1, price) } : p))
    );
  };

  const addProduct = (productData: Omit<Product, 'id' | 'sku' | 'rating' | 'reviewCount'>) => {
    const id = `prod-${Date.now()}`;
    const sku = `IF-NEW-${Math.floor(100 + Math.random() * 900)}`;
    const newProduct: Product = {
      ...productData,
      id,
      sku,
      rating: 5.0,
      reviewCount: 0,
      isNewArrival: true
    };
    setProducts((prev) => [newProduct, ...prev]);

    triggerNotification(
      'وصول عتاد رياضي جديد بالموقع ⚡',
      `تمت إضافة "${newProduct.name}" إلى تشكيلة العدة الرياضية الاحترافية. تفقدها الآن!`,
      'new_arrival',
      { productId: newProduct.id }
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const addProductReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };

    setReviews((prev) => [newReview, ...prev]);

    // Update product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const productReviews = [...reviews.filter((r) => r.productId === p.id), newReview];
          const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: productReviews.length
          };
        }
        return p;
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const triggerNotification = (
    title: string,
    message: string,
    type: NotificationItem['type'],
    meta?: { productId?: string; orderId?: string }
  ) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      date: 'الآن',
      type,
      read: false,
      productId: meta?.productId,
      orderId: meta?.orderId
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        reviews,
        orders,
        notifications,
        cart,
        cartCount,
        cartTotal,
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        cartDrawerOpen,
        setCartDrawerOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        trackingModalOpen,
        setTrackingModalOpen,
        activeTrackingId,
        setActiveTrackingId,
        chatOpen,
        setChatOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        updateProductStock,
        updateProductPrice,
        addProduct,
        deleteProduct,
        addProductReview,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        triggerNotification
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
