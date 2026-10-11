import React, { useState } from 'react';
import { ProductCategory } from '../types/store';
import { Search, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  totalFiltered: number;
  onResetFilters: () => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  priceRange,
  setPriceRange,
  totalFiltered,
  onResetFilters
}) => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'جميع العتاد' },
    { id: 'weights', label: 'أوزان وأثقال' },
    { id: 'cardio', label: 'أجهزة الكارديو' },
    { id: 'benches', label: 'مقاعد وأقفاص' },
    { id: 'combat', label: 'رياضات قتالية' },
    { id: 'accessories', label: 'إكسسوارات ولياقة' }
  ];

  return (
    <div id="catalog-section" className="space-y-4 pt-4">
      {/* Category Segmented Tabs (Interactive functional buttons) */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-zinc-950 shadow-md font-extrabold'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Toggle & Results Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 font-medium tabular-nums">
            {totalFiltered} منتج معروض
          </span>

          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              filterDrawerOpen
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>فلترة متقدمة</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Drawer / Panel */}
      {filterDrawerOpen && (
        <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-right">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              تصفية وبحث متقدم
            </span>
            <button
              onClick={onResetFilters}
              className="text-xs text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة تعيين الفلاتر</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            {/* Search Input in Filter */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">بحث بالاسم أو الكود</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="مثال: بار، سير، ملاكمة، دمبل..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pr-9 pl-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">ترتيب النتائج حسب</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                <option value="popular">الأكثر طلباً وشهرة</option>
                <option value="rating">الأعلى تقييماً من العملاء</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="newest">أحدث المنتجات المضافة</option>
              </select>
            </div>

            {/* Price Range & In-Stock */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1.5">
                  <span>نطاق السعر الأقصى</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">
                    حتى {priceRange[1].toLocaleString('en-US')} ر.س
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-amber-500 cursor-pointer bg-zinc-800 rounded-lg h-1.5"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-amber-500 w-4 h-4"
                />
                <span className="text-xs text-zinc-300">عرض المنتجات المتوفرة في المخزون فقط</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
