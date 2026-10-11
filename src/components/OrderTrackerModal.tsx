import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types/store';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, MapPin, Phone, User, ExternalLink, RefreshCw } from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const {
    orders,
    trackingModalOpen,
    setTrackingModalOpen,
    activeTrackingId,
    setActiveTrackingId,
    updateOrderStatus
  } = useStore();

  const [searchInput, setSearchInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!trackingModalOpen) return null;

  // Find active order or fallback to first order
  const currentOrder = orders.find(
    (o) => o.id.toUpperCase() === (searchInput.trim() || activeTrackingId).toUpperCase() ||
           o.customerPhone.includes(searchInput.trim())
  ) || orders.find((o) => o.id === activeTrackingId) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    const found = orders.find(
      (o) => o.id.toUpperCase() === query || o.customerPhone.includes(query)
    );

    if (found) {
      setActiveTrackingId(found.id);
      setErrorMessage('');
    } else {
      setErrorMessage(`لم يتم العثور على طلب برقم أو هاتف "${searchInput}". تفقد القائمة بالأسفل.`);
    }
  };

  const stepsConfig: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'new', label: 'تأكيد الطلب', desc: 'تم استلام وتأكيد حجز العتاد' },
    { status: 'processing', label: 'التجهيز والتغليف', desc: 'فحص الجودة والتغليف المصفح' },
    { status: 'shipped', label: 'تم الشحن', desc: 'تسليم الشحنة لشركة النقل' },
    { status: 'out_for_delivery', label: 'جاري التوصيل', desc: 'الشحنة مع المندوب لعنوانك' },
    { status: 'delivered', label: 'تم التسليم', desc: 'تسليم وفحص الضمان' }
  ];

  const currentStepIndex = stepsConfig.findIndex((s) => s.status === currentOrder?.status);

  // Quick Demo status advance
  const handleAdvanceStatus = () => {
    if (!currentOrder) return;
    const allStatuses: OrderStatus[] = ['new', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const nextIdx = (allStatuses.indexOf(currentOrder.status) + 1) % allStatuses.length;
    updateOrderStatus(currentOrder.id, allStatuses[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 text-right">
      <div 
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">نظام التتبع المباشر للطلبات</h2>
              <p className="text-xs text-zinc-400">تابع حركة شحنتك الرياضية خطوة بخطوة حتى باب منزلك</p>
            </div>
          </div>

          <button
            onClick={() => setTrackingModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Order Switcher */}
        <div className="my-4 space-y-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="أدخل رقم الطلب (مثال: SP-8941) أو رقم الجوال..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap"
            >
              بحث وتتبع
            </button>
          </form>

          {errorMessage && (
            <p className="text-[11px] text-rose-400">{errorMessage}</p>
          )}

          {/* Quick Select from existing orders */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto text-xs scrollbar-none">
            <span className="text-zinc-500 text-[11px] shrink-0">طلبات تجريبية سريعة:</span>
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => {
                  setActiveTrackingId(ord.id);
                  setSearchInput('');
                  setErrorMessage('');
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all whitespace-nowrap ${
                  currentOrder?.id === ord.id
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {ord.id} ({ord.customerName.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {currentOrder ? (
          <div className="space-y-6">
            {/* Order Card Overview Banner */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">رقم الشحنة:</span>
                  <span className="font-mono font-black text-amber-400 text-base">{currentOrder.id}</span>
                  <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                    {currentOrder.courier}
                  </span>
                </div>
                <div className="text-xs text-zinc-300 mt-1">
                  العميل: <strong className="text-white">{currentOrder.customerName}</strong> ({currentOrder.city})
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  رقم البوليصة: <span className="font-mono">{currentOrder.trackingNumber}</span> · تاريخ الطلب: {currentOrder.createdAt}
                </div>
              </div>

              {/* Delivery ETA & Demo Advance Button */}
              <div className="flex flex-col md:items-end gap-2 shrink-0">
                <div className="text-right md:text-left bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 block">موعد الوصول التقديري</span>
                  <span className="text-xs font-bold text-emerald-400">{currentOrder.estimatedDelivery}</span>
                </div>

                {/* Demo Status Switcher */}
                <button
                  onClick={handleAdvanceStatus}
                  className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>محاكاة تحديث الحالة للمرحلة التالية</span>
                </button>
              </div>
            </div>

            {/* Visual 5-Stage Step Progress Pipeline */}
            <div className="p-4 sm:p-6 bg-zinc-950/60 border border-zinc-800 rounded-xl">
              <h3 className="text-xs font-bold text-white mb-6">مراحل الشحنة المباشرة</h3>

              {/* Pipeline Grid */}
              <div className="grid grid-cols-5 gap-2 relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-zinc-800 -z-0" />
                <div
                  className="absolute top-4 right-6 h-0.5 bg-amber-500 transition-all duration-500 -z-0"
                  style={{
                    width: `${Math.min(100, (Math.max(0, currentStepIndex) / (stepsConfig.length - 1)) * 90)}%`
                  }}
                />

                {stepsConfig.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.status} className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                        } ${isCurrent ? 'ring-4 ring-amber-500/30' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <span className={`text-[11px] font-bold mt-2 leading-tight ${isCompleted ? 'text-white' : 'text-zinc-500'}`}>
                        {step.label}
                      </span>
                      <span className="hidden sm:inline text-[9px] text-zinc-500 mt-0.5">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier & Delivery Driver Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  بيانات مندوب التوصيل
                </span>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>اسم المندوب:</span>
                  <span className="text-white font-bold">{currentOrder.driverName || 'فهد المنصور'}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>هاتف المندوب المباشر:</span>
                  <span className="font-mono text-amber-400">{currentOrder.driverPhone || '+966 55 123 4567'}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>نوع المركبة:</span>
                  <span className="text-zinc-200">فان شحن مجهز للأجهزة الرياضية</span>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  عنوان التسليم المعتمد
                </span>
                <div className="text-zinc-200">{currentOrder.address}</div>
                <div className="text-zinc-400 text-[11px]">المدينة: {currentOrder.city}</div>
                {currentOrder.notes && (
                  <div className="text-amber-400/90 text-[11px] bg-amber-500/10 p-1.5 rounded">
                    ملاحظة: {currentOrder.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Shipment Logs Timeline */}
            <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                سجل حركة الشحنة بالتفصيل
              </h3>

              <div className="space-y-3 divide-y divide-zinc-800/60 text-xs">
                {currentOrder.timeline.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-start gap-3">
                    <div className="mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.completed ? 'bg-amber-400' : 'bg-zinc-700'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${item.completed ? 'text-white' : 'text-zinc-500'}`}>
                          {item.label}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500 tabular-nums">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-2">
              <h3 className="text-xs font-bold text-white">العدة الرياضية في هذا الطلب</h3>
              <div className="divide-y divide-zinc-800/60">
                {currentOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={it.image} alt={it.productName} className="w-10 h-10 rounded object-cover border border-zinc-800" />
                      <div className="truncate">
                        <p className="font-bold text-zinc-200 truncate">{it.productName}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">الكمية: {it.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-amber-400 tabular-nums shrink-0">
                      {(it.price * it.quantity).toLocaleString('en-US')} ر.س
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
