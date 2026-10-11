import React, { useState } from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Bell, UserCheck, MessageSquare } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, reviews, addProductReview, triggerNotification } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Stock alert email/phone state
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [alertContact, setAlertContact] = useState('');

  if (!product) return null;

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const isOutOfStock = product.stock === 0;

  // Star breakdown calculation
  const totalRev = productReviews.length || 1;
  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: productReviews.filter((r) => r.rating === s).length,
    percentage: Math.round((productReviews.filter((r) => r.rating === s).length / totalRev) * 100)
  }));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addProductReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewAuthor('');
      setReviewComment('');
    }, 2500);
  };

  const handleStockAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertContact.trim()) return;
    setAlertSubscribed(true);
    triggerNotification(
      'تم تفعيل تنبيه المخزون 🔔',
      `سنقوم بإشعارك على (${alertContact}) فور توفر دفعات جديدة من "${product.name}".`,
      'stock',
      { productId: product.id }
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-right">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-full transition-colors z-10"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Product Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Gallery / Image Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isBestSeller && (
                <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-amber-400 text-xs font-bold px-2.5 py-1 rounded">
                  الأكثر مبيعاً
                </div>
              )}
            </div>

            {/* Quick trust strip under image */}
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
              <div className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>شحن وتوصيل سريع لباب المنزل</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-zinc-500">{product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{product.nameEn}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5 text-xs">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  ))}
                  <span className="mr-1.5 font-bold font-mono text-white text-sm">
                    {product.rating}
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-zinc-400 hover:text-amber-400 underline text-xs transition-colors"
                >
                  ({product.reviewCount} تقييم معتمد)
                </button>
              </div>

              {/* Price */}
              <div className="mt-4 p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono tabular-nums">
                      {product.price.toLocaleString('en-US')}
                    </span>
                    <span className="text-xs text-zinc-400">ريال سعودي</span>
                  </div>
                  {product.originalPrice && (
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500 font-mono">
                      <span className="line-through">{product.originalPrice.toLocaleString('en-US')} ر.س</span>
                      <span className="text-amber-400 font-semibold font-sans">
                        وفر {(product.originalPrice - product.price).toLocaleString('en-US')} ر.س
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Badge */}
                <div>
                  {isOutOfStock ? (
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded">
                      غير متوفر بالمستودع
                    </span>
                  ) : product.stock <= 4 ? (
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                      متبقي {product.stock} قطع فقط
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                      متوفر وجاهز للشحن الفوري
                    </span>
                  )}
                </div>
              </div>

              {/* Description excerpt */}
              <p className="text-xs text-zinc-300 leading-relaxed mt-3">
                {product.description}
              </p>
            </div>

            {/* Purchase CTA / Stock Subscription */}
            <div className="pt-3 border-t border-zinc-800/80 space-y-3">
              {!isOutOfStock ? (
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      onClose();
                    }}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>إضافة إلى سلة الشراء ({ (product.price * quantity).toLocaleString('en-US') } ر.س)</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Bell className="w-4 h-4" />
                    <span>تنبيه فوري عند توفر دفعة جديدة</span>
                  </div>
                  {alertSubscribed ? (
                    <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>تم تسجيلك في قائمة التنبيه بنجاح!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleStockAlert} className="flex gap-2">
                      <input
                        type="text"
                        value={alertContact}
                        onChange={(e) => setAlertContact(e.target.value)}
                        placeholder="رقم الجوال أو البريد الإلكتروني"
                        required
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        تفعيل
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Section: Details & Specs vs Customer Reviews */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-4 border-b border-zinc-800 pb-2 mb-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-sm font-bold pb-2 transition-all border-b-2 ${
                activeTab === 'details'
                  ? 'text-white border-amber-500'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              المواصفات الفنية والمميزات
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold pb-2 transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'text-white border-amber-500'
                  : 'text-zinc-400 border-transparent hover:text-white'
              }`}
            >
              <span>تقييمات وتجارب العملاء</span>
              <span className="font-mono text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-300">
                {productReviews.length}
              </span>
            </button>
          </div>

          {activeTab === 'details' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Features List */}
              <div>
                <h4 className="text-xs font-bold text-amber-400 mb-3">أبرز المميزات الهندسية</h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs Table */}
              <div>
                <h4 className="text-xs font-bold text-amber-400 mb-3">جدول المواصفات</h4>
                <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800 text-xs">
                  {Object.entries(product.specs).map(([label, val]) => (
                    <div key={label} className="grid grid-cols-2 p-2.5 bg-zinc-950/40">
                      <span className="text-zinc-400 font-medium">{label}</span>
                      <span className="text-zinc-100 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Reviews Overview Breakdown */}
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 text-center md:text-right border-b md:border-b-0 md:border-l border-zinc-800 pb-4 md:pb-0 md:pl-6">
                  <div className="text-4xl font-black text-white font-mono tabular-nums">{product.rating}</div>
                  <div className="flex justify-center md:justify-start items-center gap-1 text-amber-400 my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400">بناءً على {product.reviewCount} تقييم موثق</p>
                </div>

                {/* Rating Distribution Bars */}
                <div className="md:col-span-8 space-y-1.5">
                  {starCounts.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-10 text-zinc-400 font-mono tabular-nums shrink-0">{star} نجوم</span>
                      <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-zinc-500 font-mono text-left tabular-nums">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white">التقييمات المكتوبة من الرياضيين</h4>
                {productReviews.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-4">كن أول من يقيّم هذا المنتج الرياضي!</p>
                ) : (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-zinc-950/40 border border-zinc-800/80 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              <UserCheck className="w-3 h-3" />
                              شراء مؤكد
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-500 font-mono tabular-nums">{rev.date}</span>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Review Form */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  أضف تقييمك وتجربتك للعتاد
                </h4>

                {reviewSubmitted ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>شكراً لك! تم إضافة تقييمك بنجاح وتعزيز ثقة الرياضيين.</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">اسمك الكريم</label>
                        <input
                          type="text"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="مثال: فهد القحطاني"
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">تقييمك للمنتج (بالنجوم)</label>
                        <div className="flex items-center gap-2 h-9">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none p-0.5"
                            >
                              <Star
                                className={`w-5 h-5 transition-colors ${
                                  star <= reviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-zinc-600 hover:text-zinc-400'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs text-zinc-400 font-mono">({reviewRating} من 5)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">تفاصيل تجربتك مع المنتج</label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="شاركنا رأيك في الجودة، سهولة الاستخدام، متانة الهيكل، وتجربة التمرين..."
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors"
                    >
                      نشر التقييم الآن
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
