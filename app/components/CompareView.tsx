import { Product } from '../types/product';
import { ImageWithFallback } from './image/ImageWithFallback';
import { X } from 'lucide-react';

interface CompareViewProps {
  products: Product[];
  onRemove: (productId: number) => void;
  onPreview: () => void;
}

export function CompareView({ products, onRemove, onPreview }: CompareViewProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2>Compare Products ({products.length})</h2>
        <button
          onClick={onPreview}
          disabled={products.length < 2}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Preview Outfit
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="relative">
              <ImageWithFallback 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => onRemove(product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3>{product.name}</h3>
                <span className="text-blue-600 ml-2">${product.price}</span>
              </div>
              
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Category:</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{product.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Color:</span>
                  <span>{product.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Material:</span>
                  <span>{product.material}</span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500 mb-2 block">Features:</span>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length < 2 && (
        <div className="text-center text-gray-500 mt-8">
          Select at least 2 products to enable outfit preview
        </div>
      )}
    </div>
  );
}