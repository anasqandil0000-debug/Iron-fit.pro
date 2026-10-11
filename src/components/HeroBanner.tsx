import React from 'react';
import heroImg from '../assets/images/hero_sports_gym_1791723793459.jpg';
import { ArrowLeft, Shield, Wrench, CreditCard, RotateCcw } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onSelectCategory }) => {
  return (
    <div className="relative border-b border-zinc-800 bg-zinc-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Action Column (In RTL this is right column) */}
          <div className="lg:col-span-6 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <span>تجهيز الصالات الرياضية المنزلية والاحترافية</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>معدات أصلية 100%</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25] text-balance">
              ابنِ قوتك مع أحدث <span className="text-amber-500 underline decoration-amber-500/40 decoration-4 underline-offset-8">المعدات الرياضية</span> بمعايير عالمية
            </h1>

            <p className="text-base text-zinc-300 leading-relaxed max-w-xl">
              نوفر لك تشكيلة متكاملة من أجهزة الكارديو، البارات الأولمبية، ومقاعد التمرين الفولاذية المعتمدة. استمتع بخيارات دفع متعددة وميسرة مع تتبع فوري حتى باب منزلك مع ضمان ذهبي شامل.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2.5 active:scale-95 group text-sm"
              >
                <span>تصفح العدة الرياضية</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => onSelectCategory('weights')}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold px-5 py-3.5 rounded-xl transition-all text-sm"
              >
                الأوزان والبارات الأولمبية
              </button>
            </div>

            {/* Quick stats / trust points */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-800/80 text-right">
              <div>
                <p className="text-2xl font-black text-white font-mono tabular-nums">+50,000</p>
                <p className="text-xs text-zinc-400">عميل ورياضي راضٍ</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-400 font-mono tabular-nums">4.9 / 5</p>
                <p className="text-xs text-zinc-400">تقييم موثق للعتاد</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-mono tabular-nums">48 ساعة</p>
                <p className="text-xs text-zinc-400">متوسط سرعة التوصيل</p>
              </div>
            </div>
          </div>

          {/* Right Image Feature Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
              <img
                src={heroImg}
                alt="صالة حديد ومعدات رياضية متكاملة"
                className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              <div className="absolute bottom-4 right-4 left-4 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-amber-400">تشكيلة 2026 الحصرية</span>
                  <p className="text-sm font-bold text-white">أجهزة القوة والتحمل للمحترفين</p>
                </div>
                <button
                  onClick={onExploreClick}
                  className="text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  اكتشف الآن
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Feature Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">خيارات دفع متعددة</h4>
              <p className="text-[11px] text-zinc-400">مدى، بطاقات، أبل باي، وتقسيط تابي</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">ضمان ذهبي معتمد</h4>
              <p className="text-[11px] text-zinc-400">ضمان شامل حتى 10 سنوات على الهياكل</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">تركيب فني مجاني</h4>
              <p className="text-[11px] text-zinc-400">فريق فني متخصص لتركيب أجهزة الكارديو</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">استبدال واسترجاع سهل</h4>
              <p className="text-[11px] text-zinc-400">إرجاع ميسر خلال 14 يوماً مع استرداد فوري</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
