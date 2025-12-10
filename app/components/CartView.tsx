import type { Product } from '../types/product';
import { ImageWithFallback } from './image/ImageWithFallback';
import { ExternalLink, Trash2, ShoppingBag } from 'lucide-react';

interface CartViewProps {
  products: Product[];
  onRemove: (productId: number) => void;
}

// Mock store URLs based on store names
const getStoreUrl = (storeName: string): string => {
  const storeUrls: Record<string, string> = {
    "En Pointe Dancewear": "https://enpointedancewear.com",
    "Ballet Boutique": "https://balletboutique.com",
    "Prima Dance Supply": "https://primadancesupply.com",
    "Dance Essentials": "https://danceessentials.com",
    "Dancer's Wardrobe": "https://dancerswardrobe.com"
  };
  
  return storeUrls[storeName] || "https://example.com";
};

export function CartView({ products, onRemove }: CartViewProps) {
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-gray-400 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add products from the browse page to get started</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2>Shopping Cart</h2>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex gap-4"
          >
            <ImageWithFallback 
              src={product.image} 
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {product.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {product.color}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 mb-2">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">From: {product.store}</span>
                <a
                  href={getStoreUrl(product.store)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm transition-colors"
                >
                  Visit Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Total:</span>
          <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4">
          <p className="text-gray-600 text-sm mb-3">
            This is a browsing prototype. Click "Visit Store" next to each item to go to the original store website.
          </p>
          <div className="space-y-2">
            {Array.from(new Set(products.map(p => p.store))).map((store) => (
              <a
                key={store}
                href={getStoreUrl(store)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-gray-700">{store}</span>
                <ExternalLink className="w-4 h-4 text-gray-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
