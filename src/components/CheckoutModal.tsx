import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, Order } from '../types/store';
import confetti from 'canvas-confetti';
import { X, CheckCircle, CreditCard, Smartphone, Banknote, ShieldCheck, Truck, ArrowLeft, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    checkoutModalOpen,
    setCheckoutModalOpen,
    createOrder,
    setTrackingModalOpen,
    setActiveTrackingId
  } = useStore();

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+966 5');
  const [customerEmail, setCustomerEmail] = useState('');
  const [city, setCity] = useState('الرياض');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mada');

  // Simulated Card State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing & Success State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!checkoutModalOpen) return null;

  const discount = 0;
  const shippingFee = cartTotal > 500 ? 0 : 45;
  const finalTotal = Math.max(0, cartTotal + shippingFee - discount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerName,
        customerPhone,
        customerEmail: customerEmail || `${customerPhone.replace(/\s+/g, '')}@customer.com`,
        city,
        address,
        notes,
        paymentMethod,
        discount
      });

      setIsSubmitting(false);
      setPlacedOrder(order);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const handleOpenTracker = () => {
    if (placedOrder) {
      setActiveTrackingId(placedOrder.id);
      setCheckoutModalOpen(false);
      setPlacedOrder(null);
      setTrackingModalOpen(true);
    }
  };

  const paymentOptions: { id: PaymentMethod; title: string; subtitle: string; icon: string }[] = [
    {
      id: 'mada',
      title: 'بطاقة مدى (Mada)',
      subtitle: 'دفع فوري وآمن ببطاقات الصراف المعتمدة',
      icon: '💳'
    },
    {
      id: 'card',
      title: 'البطاقات الائتمانية (Visa / MasterCard)',
      subtitle: 'فيزا وماستركارد بجميع البنوك',
      icon: '💎'
    },
    {
      id: 'apple_pay',
      title: 'Apple Pay',
      subtitle: 'الدفع بلمسة واحدة عبر أجهزة أبل',
      icon: '🍎'
    },
    {
      id: 'stc_pay',
      title: 'STC Pay',
      subtitle: 'الدفع المباشر عبر محفظة إس تي سي باي',
      icon: '📱'
    },
    {
      id: 'tabby',
      title: 'تابي (Tabby) - 4 دفعات ميسرة',
      subtitle: `قسّمها على 4 دفعات بقيمة ${(finalTotal / 4).toFixed(0)} ر.س بدون فوائد`,
      icon: '⚡'
    },
    {
      id: 'tamara',
      title: 'تمارا (Tamara) - قسّمها بدون فوائد',
      subtitle: `قسّم فاتورتك على 4 دفعات بدون أي رسوم إضافية`,
      icon: '🛍️'
    },
    {
      id: 'cod',
      title: 'الدفع عند الاستلام (Cash on Delivery)',
      subtitle: 'ادفع نقداً أو بالشبكة عند وصول المندوب لباب منزلك',
      icon: '💵'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 text-right">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[94vh] overflow-y-auto shadow-2xl p-5 sm:p-7 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {!placedOrder && (
          <button
            onClick={() => setCheckoutModalOpen(false)}
            className="absolute top-5 left-5 p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-full"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {placedOrder ? (
          /* Order Success Confirmation View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                تم استلام الطلب بنجاح
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                تهانينا يا كابتن {placedOrder.customerName}!
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                تم تجهيز رقم طلبك وبدء عملية الشحن والتجهيز بالمستودع
              </p>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl max-w-md mx-auto text-right space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                <span className="text-zinc-400">رقم الطلب:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">المبلغ الإجمالي:</span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {placedOrder.totalAmount.toLocaleString('en-US')} ر.س
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">طريقة الدفع:</span>
                <span className="text-zinc-200 font-semibold uppercase">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">شركة الشحن:</span>
                <span className="text-zinc-200">{placedOrder.courier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">رقم البوليصة:</span>
                <span className="font-mono text-zinc-300">{placedOrder.trackingNumber}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleOpenTracker}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-lg shadow-amber-500/20"
              >
                <Truck className="w-4 h-4" />
                <span>تتبع موقع الطلب والمندوب فوراً</span>
              </button>

              <button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  setPlacedOrder(null);
                }}
                className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold px-5 py-3 rounded-xl transition-colors text-xs"
              >
                العودة للتسوق
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Checkout Form */
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">إتمام الطلب وتحديد وسيلة الدفع</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                أدخل بيانات التوصيل واختر طريقة الدفع المناسبة لك
              </p>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>1. معلومات العميل والتوصيل</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: فيصل العتيبي"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+966 50 000 0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">المدينة *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="الرياض">الرياض (توصيل فوري)</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام والخبر</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="بريدة">القصيم / بريدة</option>
                    <option value="أبها">أبها وخميس مشيط</option>
                    <option value="تبوك">تبوك</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-300 mb-1">العنوان التفصيلي (الحي، الشارع، رقم المبنى) *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="حي الملقا، شارع الأمير نايف، فيلا 22"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">ملاحظات للمندوب أو التركيب (اختياري)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: يرجى التوصيل بعد العصر، تركيب في الطابق الثاني"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Multiple Payment Options */}
            <div className="space-y-3 pt-3 border-t border-zinc-800">
              <h3 className="text-xs font-bold text-amber-400">
                2. اختر طريقة الدفع (خيارات دفع متعددة)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === opt.id
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                        : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id)}
                      className="mt-1 text-amber-500 focus:ring-amber-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{opt.icon}</span>
                        <span className="text-xs font-bold text-white truncate">{opt.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{opt.subtitle}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Dynamic Payment Details (e.g. Card inputs if mada/card) */}
              {(paymentMethod === 'mada' || paymentMethod === 'card') && (
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2.5 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>بيانات البطاقة البنكية المعتمدة</span>
                    <span className="text-[10px] text-emerald-400">اتصال مشفر وآمن 256-bit</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="رقم البطاقة (16 رقم)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY انتهاء"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono text-center"
                    />
                    <input
                      type="password"
                      placeholder="CVV رمز الأمان"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white font-mono text-center"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-center space-y-1">
                  <p className="text-xs text-zinc-300">سيتم تفعيل الدفع بـ Face ID / Touch ID عند تأكيد الطلب</p>
                  <p className="text-[10px] text-zinc-500">جاهز للتنفيذ الفوري</p>
                </div>
              )}

              {paymentMethod === 'tabby' && (
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs space-y-2">
                  <p className="text-zinc-200 font-semibold">جدول الأقساط الشهرية مع تابي:</p>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-zinc-400">
                    <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800">
                      <div>الدفعة 1 (الآن)</div>
                      <div className="font-mono text-amber-400 font-bold">{(finalTotal / 4).toFixed(0)} ر.س</div>
                    </div>
                    <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800">
                      <div>بعد شهر</div>
                      <div className="font-mono text-white">{(finalTotal / 4).toFixed(0)} ر.س</div>
                    </div>
                    <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800">
                      <div>بعد شهرين</div>
                      <div className="font-mono text-white">{(finalTotal / 4).toFixed(0)} ر.س</div>
                    </div>
                    <div className="p-1.5 bg-zinc-900 rounded border border-zinc-800">
                      <div>بعد 3 أشهر</div>
                      <div className="font-mono text-white">{(finalTotal / 4).toFixed(0)} ر.س</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">المبلغ الإجمالي المستحق:</span>
                <span className="text-xl font-black text-amber-400 font-mono tabular-nums">
                  {finalTotal.toLocaleString('en-US')} ر.س
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-xs active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>جاري معالجة الدفع...</span>
                ) : (
                  <>
                    <span>تأكيد الطلب والدفع</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
