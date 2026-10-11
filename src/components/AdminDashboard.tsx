import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, ProductCategory } from '../types/store';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Edit, 
  Trash2, 
  Search, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  Filter,
  Check,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    updateProductStock,
    updateProductPrice,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    setActiveTrackingId,
    setTrackingModalOpen
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');

  // Search & Filter in Inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'low' | 'out'>('all');

  // Search & Filter in Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // New Product Modal State
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('weights');
  const [newProdPrice, setNewProdPrice] = useState(950);
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('');

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 4).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.includes(inventorySearch) || p.sku.includes(inventorySearch.toUpperCase());
    if (inventoryFilter === 'low') return matchesSearch && p.stock > 0 && p.stock <= 4;
    if (inventoryFilter === 'out') return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.includes(orderSearch.toUpperCase()) || 
                          o.customerName.includes(orderSearch) || 
                          o.customerPhone.includes(orderSearch);
    if (orderStatusFilter !== 'all') return matchesSearch && o.status === orderStatusFilter;
    return matchesSearch;
  });

  // Handle Create Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const catLabels: Record<ProductCategory, string> = {
      all: 'عام',
      cardio: 'أجهزة الكارديو',
      weights: 'أوزان وأثقال',
      benches: 'مقاعد وأقفاص',
      combat: 'رياضات قتالية',
      accessories: 'إكسسوارات ولياقة'
    };

    addProduct({
      name: newProdName,
      nameEn: newProdNameEn || 'Pro Fitness Gear',
      category: newProdCategory,
      categoryLabel: catLabels[newProdCategory] || 'معدات رياضية',
      price: Number(newProdPrice),
      stock: Number(newProdStock),
      image: newProdImage || products[0]?.image || '',
      description: newProdDesc || 'معدة رياضية احترافية ذات جودة عالية وصناعة متينة.',
      features: ['هيكل عالي التحمل للمهام الشاقة', 'تصميم متطور للصالات والمنازل'],
      specs: {
        'المادة': 'فولاذ مقوى ومطاط صناعي',
        'الضمان': 'ضمان سنتين'
      },
      warranty: 'ضمان سنتين'
    });

    setAddProductModalOpen(false);
    setNewProdName('');
    setNewProdNameEn('');
    setNewProdDesc('');
    setNewProdImage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-right">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>لوحة الإدارة والمراقبة المركزية</span>
          </div>
          <h1 className="text-2xl font-black text-white">إدارة المتجر والمخزون والمبيعات</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            تحكم فوري بمستويات التخزين، حالات الطلبات، وتحليلات المبيعات والإيرادات
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>تقارير المبيعات</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>إدارة المخزون ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>الطلبات والشحنات ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Sales Analytics & Reports */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>إجمالي الإيرادات المحققة</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {totalRevenue.toLocaleString('en-US')} <span className="text-xs font-sans text-zinc-400">ر.س</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
                <ArrowUpRight className="w-3 h-3" />
                <span>+18.4% نمو المبيعات هذا الشهر</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>إجمالي الطلبات المكتملة</span>
                <ShoppingCart className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {totalOrdersCount} <span className="text-xs font-sans text-zinc-400">طلب</span>
              </div>
              <div className="text-[11px] text-zinc-400 pt-1">
                متوسط قيمة الطلب: <strong className="text-white font-mono">{avgOrderValue.toLocaleString('en-US')} ر.س</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>حالة توفر المخزون</span>
                <Package className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">
                {products.reduce((acc, p) => acc + p.stock, 0)} <span className="text-xs font-sans text-zinc-400">قطعة</span>
              </div>
              <div className="text-[11px] text-zinc-400 pt-1">
                عبر {products.length} صنف رياضي في الكتالوج
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>تنبيهات انخفاض المخزون</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400 font-mono tabular-nums">
                {lowStockCount + outOfStockCount} <span className="text-xs font-sans text-zinc-400">أصناف تحتاج تموين</span>
              </div>
              <div className="text-[11px] text-zinc-400 pt-1">
                {outOfStockCount} نفذت بالكامل · {lowStockCount} أوشكت على النفاد
              </div>
            </div>
          </div>

          {/* Interactive Chart Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sales Revenue Curve (SVG Chart) */}
            <div className="lg:col-span-8 p-5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">منحنى المبيعات والإيرادات الأسبوعية</h3>
                  <p className="text-xs text-zinc-400">حركة المبيعات خلال الأيام الـ 7 الأخيرة (بالريال السعودي)</p>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                  محدث لحظياً
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="h-48 w-full pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150">
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="600" y2="30" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="600" y2="75" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#27272a" strokeDasharray="3 3" />

                  {/* Area fill */}
                  <path
                    d="M 20 120 Q 100 90, 180 70 T 300 45 T 420 80 T 520 30 L 520 140 L 20 140 Z"
                    fill="url(#salesGrad)"
                  />
                  {/* Line curve */}
                  <path
                    d="M 20 120 Q 100 90, 180 70 T 300 45 T 420 80 T 520 30"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Data Points */}
                  {[
                    { x: 20, y: 120, label: 'السبت', val: '2,800' },
                    { x: 100, y: 90, label: 'الأحد', val: '4,100' },
                    { x: 180, y: 70, label: 'الاثنين', val: '5,600' },
                    { x: 300, y: 45, label: 'الثلاثاء', val: '8,200' },
                    { x: 420, y: 80, label: 'الأربعاء', val: '6,400' },
                    { x: 520, y: 30, label: 'الخميس', val: '11,500' }
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#f59e0b" stroke="#09090b" strokeWidth="2" />
                      <text x={pt.x} y="145" textAnchor="middle" fill="#71717a" fontSize="10">
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="lg:col-span-4 p-5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-4">
              <h3 className="text-sm font-bold text-white">توزيع المبيعات حسب فئة العتاد</h3>
              <div className="space-y-3 text-xs">
                {[
                  { name: 'أجهزة الكارديو والسير', percentage: 42, color: 'bg-amber-500' },
                  { name: 'أوزان وبارات أولمبية', percentage: 28, color: 'bg-emerald-500' },
                  { name: 'مقاعد وأقفاص تدريب', percentage: 16, color: 'bg-blue-500' },
                  { name: 'رياضات قتالية وملاكمة', percentage: 9, color: 'bg-rose-500' },
                  { name: 'إكسسوارات ولياقة منزلية', percentage: 5, color: 'bg-purple-500' }
                ].map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-zinc-300">
                      <span>{cat.name}</span>
                      <span className="font-mono tabular-nums font-bold">{cat.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Selling Products List */}
          <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-white">العدة الرياضية الأكثر مبيعاً وتحقيقاً للإيراد</h3>
            <div className="divide-y divide-zinc-800 text-xs">
              {products.slice(0, 5).map((p, idx) => (
                <div key={p.id} className="py-2.5 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-zinc-500 font-bold w-4">#{idx + 1}</span>
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-zinc-950 border border-zinc-800" />
                    <div className="truncate">
                      <p className="font-bold text-white truncate">{p.name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">{p.categoryLabel} · {p.sku}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-left font-mono">
                      <span className="text-zinc-400 text-[10px] block">المخزون الحالي</span>
                      <span className={`font-bold tabular-nums ${p.stock <= 4 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {p.stock} قطعة
                      </span>
                    </div>

                    <div className="text-left font-mono">
                      <span className="text-zinc-400 text-[10px] block">السعر</span>
                      <span className="font-bold text-amber-400 tabular-nums">
                        {p.price.toLocaleString('en-US')} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="ابحث باسم المنتج أو الكود SKU..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pr-8 pl-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Inventory Filter */}
              <select
                value={inventoryFilter}
                onChange={(e) => setInventoryFilter(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">كافة الأصناف</option>
                <option value="low">مخزون منخفض (أقل من 5)</option>
                <option value="out">نفذت الكمية (0)</option>
              </select>
            </div>

            <button
              onClick={() => setAddProductModalOpen(true)}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة صنف رياضي جديد</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-zinc-950/80 text-zinc-400 font-semibold border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">المنتج والرمز</th>
                    <th className="py-3 px-3">التصنيف</th>
                    <th className="py-3 px-3">السعر (ر.س)</th>
                    <th className="py-3 px-3">المخزون المتوفر</th>
                    <th className="py-3 px-3">الحالة</th>
                    <th className="py-3 px-4 text-left">إجراءات المخزون</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredProducts.map((p) => {
                    const isLow = p.stock > 0 && p.stock <= 4;
                    const isOut = p.stock === 0;

                    return (
                      <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-zinc-950 border border-zinc-800 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-bold text-white truncate max-w-xs">{p.name}</p>
                              <span className="font-mono text-[10px] text-zinc-400">{p.sku}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-zinc-300">{p.categoryLabel}</td>
                        <td className="py-3 px-3 font-mono font-bold text-amber-400 tabular-nums">
                          {p.price.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateProductStock(p.id, Math.max(0, p.stock - 1))}
                              className="w-5 h-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-mono font-bold tabular-nums text-white">
                              {p.stock}
                            </span>
                            <button
                              onClick={() => updateProductStock(p.id, p.stock + 1)}
                              className="w-5 h-5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {isOut ? (
                            <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-bold">
                              نفذت الكمية
                            </span>
                          ) : isLow ? (
                            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
                              مخزون منخفض ({p.stock})
                            </span>
                          ) : (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                              متوفر بالمستودع
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-left">
                          <div className="flex items-center justify-end gap-2">
                            {/* Fast Restock +10 */}
                            {(isLow || isOut) && (
                              <button
                                onClick={() => updateProductStock(p.id, p.stock + 10)}
                                className="text-[10px] bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded transition-colors whitespace-nowrap"
                              >
                                إعادة تزويد (+10)
                              </button>
                            )}
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                              title="حذف الصنف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="ابحث برقم الطلب (SP-...) أو اسم العميل أو الهاتف..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pr-8 pl-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">كافة الحالات</option>
                <option value="new">جديد / مؤكد</option>
                <option value="processing">قيد التجهيز</option>
                <option value="shipped">تم الشحن</option>
                <option value="out_for_delivery">جاري التوصيل</option>
                <option value="delivered">تم التسليم</option>
              </select>
            </div>

            <span className="text-xs text-zinc-400">
              إجمالي الطلبات المعروضة: <strong className="text-white font-mono">{filteredOrders.length}</strong>
            </span>
          </div>

          {/* Orders Table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-zinc-950/80 text-zinc-400 font-semibold border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">رقم الطلب والعميل</th>
                    <th className="py-3 px-3">المدينة والوجهة</th>
                    <th className="py-3 px-3">المنتجات</th>
                    <th className="py-3 px-3">المبلغ الإجمالي</th>
                    <th className="py-3 px-3">طريقة الدفع</th>
                    <th className="py-3 px-3">حالة الطلب الحالية</th>
                    <th className="py-3 px-4 text-left">تحديث الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <span className="font-mono font-bold text-amber-400">{ord.id}</span>
                          <p className="font-bold text-white text-xs mt-0.5">{ord.customerName}</p>
                          <span className="font-mono text-[10px] text-zinc-400">{ord.customerPhone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-zinc-200 font-semibold">{ord.city}</span>
                        <p className="text-[10px] text-zinc-400 truncate max-w-[140px]">{ord.address}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-zinc-300 font-mono">{ord.items.length} أصناف</span>
                        <p className="text-[10px] text-zinc-400 truncate max-w-[140px]">
                          {ord.items.map((i) => i.productName).join(', ')}
                        </p>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white tabular-nums">
                        {ord.totalAmount.toLocaleString('en-US')} ر.س
                      </td>
                      <td className="py-3 px-3 text-zinc-300 uppercase font-mono text-[11px]">
                        {ord.paymentMethod}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          ord.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          ord.status === 'out_for_delivery' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          ord.status === 'shipped' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                          ord.status === 'processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-zinc-800 text-zinc-300'
                        }`}>
                          {ord.status === 'delivered' ? 'تم التسليم والتركيب' :
                           ord.status === 'out_for_delivery' ? 'المندوب في الطريق' :
                           ord.status === 'shipped' ? 'تم الشحن للناقل' :
                           ord.status === 'processing' ? 'قيد التجهيز بالمستودع' :
                           'طلب جديد'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-left">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-zinc-200 focus:outline-none focus:border-amber-500"
                          >
                            <option value="new">جديد</option>
                            <option value="processing">قيد التجهيز</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="out_for_delivery">جاري التوصيل</option>
                            <option value="delivered">تم التسليم</option>
                          </select>

                          <button
                            onClick={() => {
                              setActiveTrackingId(ord.id);
                              setTrackingModalOpen(true);
                            }}
                            className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-2 py-1 rounded transition-colors whitespace-nowrap"
                          >
                            معاينة التتبع
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      {addProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAddProductModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-white mb-1">إضافة صنف رياضي جديد للمخزون</h3>
            <p className="text-xs text-zinc-400 mb-4">أدخل تفاصيل العتاد وسيظهر فوراً في المتجر مع إشعار تلقائي للعملاء</p>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1">اسم المنتج بالعربية *</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="مثال: حزام رفع أثقال جلدي مدعم Lever Belt"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 mb-1">التصنيف *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="weights">أوزان وأثقال</option>
                    <option value="cardio">أجهزة الكارديو</option>
                    <option value="benches">مقاعد وأقفاص</option>
                    <option value="combat">رياضات قتالية</option>
                    <option value="accessories">إكسسوارات ولياقة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">السعر (ر.س) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 mb-1">كمية المخزون الابتدائية *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    value={newProdNameEn}
                    onChange={(e) => setNewProdNameEn(e.target.value)}
                    placeholder="e.g. Leather Powerlifting Belt"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1">الوصف والمواصفات</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="وصف مميزات العتاد، المادة المصنوع منها، والتحمل..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddProductModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg"
                >
                  حفظ ونشر في المتجر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
