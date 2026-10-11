import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SearchAndFilter } from './components/SearchAndFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ProductCategory, Product } from './types/store';

const StoreContent: React.FC = () => {
  const {
    products,
    activeView,
    setActiveView,
    selectedProduct,
    setSelectedProduct
  } = useStore();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('popular');
    setInStockOnly(false);
    setPriceRange([0, 5000]);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search filter (Arabic name, English name, SKU, description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.nameEn.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Price range
        if (p.price > priceRange[1]) {
          return false;
        }

        // In-stock
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Default: popular (best sellers first)
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeView === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            {/* Hero Section with Campaign Focus */}
            <HeroBanner
              onExploreClick={scrollToCatalog}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat as ProductCategory);
                scrollToCatalog();
              }}
            />

            {/* Catalog Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <SearchAndFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                totalFiltered={filteredProducts.length}
                onResetFilters={handleResetFilters}
              />

              {/* Product Grid (3-column desktop / 2-column mobile & tablet) */}
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center space-y-3 bg-zinc-900/30 rounded-2xl border border-zinc-800/80">
                  <p className="text-base font-bold text-zinc-300">لم يتم العثور على معدات رياضية مطابقة لبحثك</p>
                  <p className="text-xs text-zinc-500">جرب تعديل كلمات البحث أو تصفير الفلاتر لعرض كافة المنتجات</p>
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Social Proof & Customer Reviews & Auto Alerts Subscription */}
            <CustomerReviewsSection />
          </>
        )}
      </main>

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <LiveChatWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
