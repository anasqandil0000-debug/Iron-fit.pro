import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Bell, Search, ShieldCheck, Truck, BarChart3, MessageCircle, X, Check } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const {
    cartCount,
    setCartDrawerOpen,
    activeView,
    setActiveView,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setTrackingModalOpen,
    setChatOpen
  } = useStore();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
      {/* Slim Promotional Trust Strip */}
      <div className="bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-300 font-medium flex items-center justify-center gap-6 overflow-hidden">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          شحن وتوصيل مجاني لكافة مدن المملكة للطلبات فوق 500 ر.س
        </span>
        <span className="hidden md:inline-block text-zinc-600">·</span>
        <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          ضمان ذهبي معتمد واستبدال فوري
        </span>
        <span className="hidden lg:inline-block text-zinc-600">·</span>
        <span className="hidden lg:inline whitespace-nowrap">
          خصم إضافي 10% بكود <strong className="font-mono text-white">FIT10</strong>
        </span>
      </div>

      {/* Main Top Bar Contract: Brand — 4-5 Links — Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveView('store')}
            className="group flex items-center gap-2.5 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-zinc-950 font-black flex items-center justify-center text-lg shadow-md tracking-tighter group-hover:bg-amber-400 transition-colors">
              IF
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap">
                IronFit<span className="text-amber-500">Pro</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium -mt-1 tracking-wider whitespace-nowrap">
                العدة الرياضية الاحترافية
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Concise Nav Links (whitespace-nowrap shrink-0) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-zinc-300">
          <button
            onClick={() => setActiveView('store')}
            className={`transition-colors whitespace-nowrap hover:text-white pb-1 border-b-2 ${
              activeView === 'store'
                ? 'text-white border-amber-500 font-bold'
                : 'border-transparent text-zinc-400'
            }`}
          >
            المتجر والمنتجات
          </button>
          
          <button
            onClick={() => setTrackingModalOpen(true)}
            className="transition-colors whitespace-nowrap text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4 text-amber-500" />
            تتبع الشحنات
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('reviews-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActiveView('store');
                setTimeout(() => {
                  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors whitespace-nowrap text-zinc-400 hover:text-white"
          >
            آراء وتجارب العملاء
          </button>

          <button
            onClick={() => setChatOpen(true)}
            className="transition-colors whitespace-nowrap text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-amber-500" />
            الدعم الفني المباشر
          </button>

          <button
            onClick={() => setActiveView(activeView === 'admin' ? 'store' : 'admin')}
            className={`transition-all whitespace-nowrap text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {activeView === 'admin' ? 'الرجوع للمتجر' : 'لوحة إدارة المتجر'}
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Notifications, Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger for Mobile/Desktop */}
          <div className="relative hidden lg:block w-52 xl:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن بار، سير، دمبل..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pr-9 pl-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
              aria-label="التنبيهات"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-zinc-950 font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Menu */}
            {notificationsOpen && (
              <div className="absolute left-0 sm:right-auto sm:left-0 mt-2 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">التنبيهات والتحديثات</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                        {unreadCount} جديد
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                      تحديد الكل كمقروء
                    </button>
                  )}
                </div>

                <div className="divide-y divide-zinc-800/60 max-h-80 overflow-y-auto mt-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-zinc-500">لا توجد تنبيهات جديدة حالياً</div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          markNotificationAsRead(item.id);
                          if (item.orderId) {
                            setTrackingModalOpen(true);
                            setNotificationsOpen(false);
                          }
                        }}
                        className={`p-2.5 text-right cursor-pointer transition-colors hover:bg-zinc-800/60 rounded-lg ${
                          !item.read ? 'bg-amber-500/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-zinc-100">{item.title}</p>
                          <span className="text-[10px] text-zinc-500 shrink-0 tabular-nums">{item.date}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3.5 py-2 rounded-lg transition-all shadow-sm active:scale-95"
            aria-label="حقيبة التسوق"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold whitespace-nowrap">السلة</span>
            <span className="bg-zinc-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-mono tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-y-2 animate-in fade-in duration-200">
          <div className="relative w-full mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أجهزة ومعدات رياضية..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pr-9 pl-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => { setActiveView('store'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-sm text-zinc-200 hover:text-white"
          >
            المتجر والمنتجات
          </button>

          <button
            onClick={() => { setTrackingModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-sm text-zinc-200 hover:text-white flex items-center justify-between"
          >
            <span>تتبع الشحنات والطلبات</span>
            <Truck className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full text-right py-2 text-sm text-zinc-200 hover:text-white"
          >
            آراء وتقييمات العملاء
          </button>

          <button
            onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}
            className="w-full text-right py-2 text-sm text-zinc-200 hover:text-white flex items-center justify-between"
          >
            <span>الدعم الفني والدردشة المباشرة</span>
            <MessageCircle className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={() => {
              setActiveView(activeView === 'admin' ? 'store' : 'admin');
              setMobileMenuOpen(false);
            }}
            className="w-full text-right py-2 text-sm text-amber-400 font-bold border-t border-zinc-800 pt-3 flex items-center justify-between"
          >
            <span>{activeView === 'admin' ? 'الرجوع للمتجر' : 'لوحة إدارة المتجر والمخزون'}</span>
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
