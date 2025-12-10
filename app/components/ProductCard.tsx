import { Product } from '../types/product';
import { ImageWithFallback } from './image/ImageWithFallback';
import { Check, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isInCart?: boolean;
}

export function ProductCard({ product, isSelected, onToggleSelect, onAddToCart, isInCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative">
        <ImageWithFallback 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => onToggleSelect(product)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSelected 
              ? 'bg-blue-600 text-white scale-110' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {isSelected && <Check className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="flex-1">{product.name}</h3>
          <span className="text-blue-600 ml-2">${product.price}</span>
        </div>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-gray-500 text-sm mb-3">Store: {product.store}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {product.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
            {product.color}
          </span>
        </div>
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            disabled={isInCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isInCart
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}