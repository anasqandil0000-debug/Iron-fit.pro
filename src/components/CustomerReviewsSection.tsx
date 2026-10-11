import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, Bell, UserCheck, ShieldCheck, ThumbsUp, Send } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const { reviews, products, triggerNotification } = useStore();

  const [notificationContact, setNotificationContact] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationContact.trim()) return;

    setSubscribedToast(true);
    triggerNotification(
      'تفعيل التنبيهات التلقائية للمنتجات الجديدة 🚀',
      `تم تسجيل (${notificationContact}) بنجاح لتلقي تنبيهات فورية عند وصول معدات رياضية جديدة أو إطلاق عروض حصرية!`,
      'new_arrival'
    );

    setTimeout(() => {
      setNotificationContact('');
    }, 2000);
  };

  return (
    <section id="reviews-section" className="py-12 border-t border-zinc-800/80 bg-zinc-950/60 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>تقييمات موثقة من أبطال ولاعبي كمال الأجسام</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">تجارب حقيقية تعزز ثقتك في كل قطعة عتاد</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              نحن نلتزم بأعلى معايير الصلابة والمتانة. تصفح آراء الرياضيين بعد مئات ساعات التدريب الشاق بأجهزتنا.
            </p>
          </div>

          {/* Quick Aggregate Score */}
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl self-start md:self-auto">
            <div className="text-3xl font-black text-amber-400 font-mono tabular-nums">4.9</div>
            <div className="text-xs">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-zinc-400 text-[11px] mt-0.5 block">من أكثر من 1,200 مراجعة معتمدة</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((rev) => {
            const product = products.find((p) => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-3">
                  {/* Author & Verified Tag */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                          <UserCheck className="w-3 h-3" />
                          <span>مشترٍ موثق</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono tabular-nums">{rev.date}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-400' : 'text-zinc-700'}`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Associated Product snippet */}
                {product && (
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-9 h-9 rounded-lg object-cover bg-zinc-950 border border-zinc-800 shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-[10px] text-zinc-500 block">المنتج المُجرّب:</span>
                      <span className="text-xs font-semibold text-zinc-200 truncate block">
                        {product.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Automated Notifications Opt-in Subscription Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/5 border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400">
              <Bell className="w-4 h-4 animate-bounce" />
              <span>نظام التنبيهات التلقائي للعملاء</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              كن أول من يعلم عند وصول دفعات جديدة وتخفيضات العتاد الرياضي!
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed max-w-lg">
              اشترك مجاناً لتصلك تنبيهات فورية عند وصول أجهزة الكارديو، البارات الأولمبية، أو انخفاض أسعار الأصناف المفضلة لديك.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribedToast ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>تم تفعيل اشتراكك في التنبيهات التلقائية بنجاح! راقب جرس التنبيهات بالأعلى.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={notificationContact}
                  onChange={(e) => setNotificationContact(e.target.value)}
                  placeholder="رقم جوالك أو بريدك الإلكتروني..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-5 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 shadow-md shadow-amber-500/20"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>تفعيل التنبيهات</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
