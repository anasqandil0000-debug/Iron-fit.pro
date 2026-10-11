import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ArrowLeft, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    setCheckoutModalOpen
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!cartDrawerOpen) return null;

  const discountAmount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const shippingFee = cartTotal > 500 ? 0 : (cartTotal > 0 ? 45 : 0);
  const grandTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'FIT10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('كوبون غير صالح. جرب استخدام FIT10 لخصم 10%');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-start text-right">
      <div 
        className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-black text-white">سلة المشتريات</h3>
            <span className="text-xs bg-zinc-800 text-zinc-300 font-mono px-2 py-0.5 rounded-full">
              {cart.reduce((a, b) => a + b.quantity, 0)} قطع
            </span>
          </div>

          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-800/60">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-zinc-800/60 flex items-center justify-center mx-auto text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-zinc-300">سلتك فارغة حالياً</p>
              <p className="text-xs text-zinc-500">اختر من تشكيلتنا الرياضية وابدأ تمرينك اليوم</p>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                تصفح المنتجات الآن
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <div className="w-16 h-16 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate" title={item.product.name}>
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    {item.product.price.toLocaleString('en-US')} ر.س للقطعة
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-6 h-6 flex items-center justify-center text-xs text-zinc-400 hover:text-white disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-left font-mono font-bold text-xs text-white tabular-nums">
                  {(item.product.price * item.quantity).toLocaleString('en-US')} ر.س
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="كود الخصم (FIT10)"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pr-8 pl-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-amber-500"
                />
                <Tag className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-3 py-1.5 rounded-lg"
              >
                تطبيق
              </button>
            </form>

            {promoApplied && (
              <p className="text-[11px] text-emerald-400">تم تطبيق كود FIT10 بنجاح (خصم 10%)</p>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-400">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-300 pt-2 border-t border-zinc-900">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span className="font-mono tabular-nums">{cartTotal.toLocaleString('en-US')} ر.س</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>خصم الكوبون (10%)</span>
                  <span className="font-mono tabular-nums">-{discountAmount.toLocaleString('en-US')} ر.س</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>رسوم الشحن والتوصيل</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-400">مجاني</span> : `${shippingFee} ر.س`}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                <span>المجموع النهائي</span>
                <span className="font-mono text-amber-400 tabular-nums">
                  {grandTotal.toLocaleString('en-US')} ر.س
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                setCheckoutModalOpen(true);
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <span>متابعة إتمام الطلب والدفع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
