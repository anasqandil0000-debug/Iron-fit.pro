import React from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingBag, Eye, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useStore();

  const isLowStock = product.stock > 0 && product.stock <= 4;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group relative bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-3 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 text-right">
      {/* Image Container (Takes ~65-70% visual focus) */}
      <div 
        onClick={() => onOpenDetails(product)}
        className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-zinc-950 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Text Tag (Non-pill, quiet indicator) */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 right-2.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded">
            الأكثر طلباً
          </div>
        )}
        {product.isNewArrival && !product.isBestSeller && (
          <div className="absolute top-2.5 right-2.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded">
            وصل حديثاً
          </div>
        )}

        {/* Stock warning if low */}
        {isLowStock && (
          <div className="absolute bottom-2.5 right-2.5 bg-rose-950/85 text-rose-300 border border-rose-800/60 text-[10px] font-semibold px-2 py-0.5 rounded">
            متبقي {product.stock} قطع فقط
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-zinc-400 font-bold text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
              نفذت الكمية مؤقتاً
            </span>
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-zinc-900/90 text-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-zinc-700">
            <Eye className="w-3.5 h-3.5" />
            معاينة التفاصيل
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-zinc-500">{product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="text-sm font-bold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="mr-1 font-bold font-mono tabular-nums text-zinc-200">
                {product.rating}
              </span>
            </div>
            <span className="text-zinc-500 font-mono text-[11px]">
              ({product.reviewCount} تقييم)
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          {/* Price display with Tabular Numbers */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-white font-mono tabular-nums">
                {product.price.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-zinc-400 font-normal">ر.س</span>
            </div>
            {product.originalPrice && (
              <span className="text-[11px] text-zinc-500 line-through font-mono tabular-nums block -mt-0.5">
                {product.originalPrice.toLocaleString('en-US')} ر.س
              </span>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) {
                addToCart(product, 1);
              } else {
                onOpenDetails(product);
              }
            }}
            disabled={isOutOfStock}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
              isOutOfStock
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-sm'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'غير متوفر' : 'أضف للسلة'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
