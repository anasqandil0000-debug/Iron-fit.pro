import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setTrackingModalOpen, setChatOpen, setActiveView } = useStore();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-right pt-12 pb-8 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-zinc-950 font-black flex items-center justify-center text-sm">
                IF
              </div>
              <span className="text-lg font-black text-white">
                IronFit<span className="text-amber-500">Pro</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              الوجهة الأولى لتجهيز الأندية والصلات الرياضية المنزلية في المملكة العربية السعودية بأعلى معايير المتانة والفخامة.
            </p>
            <p className="text-[11px] text-zinc-500">سجل تجاري معتمد · ضريبة القيمة المضافة 15%</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white mb-2">روابط سريعة</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveView('store')} className="hover:text-amber-400 transition-colors">
                  كتالوج العدة الرياضية
                </button>
              </li>
              <li>
                <button onClick={() => setTrackingModalOpen(true)} className="hover:text-amber-400 transition-colors">
                  تتبع الشحنات والطلبات
                </button>
              </li>
              <li>
                <button onClick={() => setChatOpen(true)} className="hover:text-amber-400 transition-colors">
                  الاستشارات والدعم الفني المباشر
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin')} className="hover:text-amber-400 transition-colors">
                  لوحة تحكم إدارة المتجر
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Guarantees */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white mb-2">طرق الدفع والتقسيط</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-300">
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">مدى (Mada)</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">Apple Pay</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">Visa / MasterCard</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">تابي (4 دفعات)</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">تمارا</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">الدفع عند الاستلام</span>
            </div>
            <p className="text-[11px] text-zinc-500 pt-2">
              جميع العمليات البنكية محمية بتشفير عالي الأمان بنظام 3D Secure.
            </p>
          </div>

          {/* Customer Service */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white mb-2">خدمة العملاء</h4>
            <p className="text-zinc-300 font-mono text-xs">+966 800 124 9900</p>
            <p className="text-zinc-400 text-xs">support@ironfitpro.sa</p>
            <p className="text-[11px] text-zinc-500">ساعات العمل: 9:00 ص - 11:00 م (يومياً)</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© 2026 IronFit Pro. جميع الحقوق محفوظة لمتجر العدة الرياضية.</p>
          <div className="flex items-center gap-4">
            <span>سياسة الخصوصية</span>
            <span>·</span>
            <span>الشروط والأحكام</span>
            <span>·</span>
            <span>سياسة الاسترجاع والضمان</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
