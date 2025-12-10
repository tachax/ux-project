import { useState } from 'react';
import { Product } from '../types/product';
import { ImageWithFallback } from './image/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';

interface PreviewViewProps {
  products: Product[];
  onBack: () => void;
}

interface PositionedProduct {
  product: Product;
  x: number;
  y: number;
}

export function PreviewView({ products, onBack }: PreviewViewProps) {
  const [positionedProducts, setPositionedProducts] = useState<PositionedProduct[]>(
    products.map((product, index) => ({
      product,
      x: 100 + (index % 3) * 250,
      y: 100 + Math.floor(index / 3) * 300
    }))
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedIndex(index);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedIndex === null) return;

    const container = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - container.left - dragOffset.x;
    const newY = e.clientY - container.top - dragOffset.y;

    setPositionedProducts(prev => 
      prev.map((item, index) => 
        index === draggedIndex 
          ? { ...item, x: Math.max(0, newX), y: Math.max(0, newY) }
          : item
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Compare
            </button>
          </div>
          <h2>Outfit Preview</h2>
          <p className="text-gray-600">Drag and drop items to visualize your outfit combination</p>
        </div>
      </div>
      
      <div 
        className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
        style={{ height: '600px' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {positionedProducts.map((item, index) => (
          <div
            key={item.product.id}
            className={`absolute bg-white rounded-lg shadow-lg border-2 ${
              draggedIndex === index ? 'border-blue-500 cursor-grabbing' : 'border-gray-200 cursor-grab'
            }`}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: '200px',
              zIndex: draggedIndex === index ? 10 : 1
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
          >
            <ImageWithFallback 
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-48 object-cover rounded-lg pointer-events-none"
            />
          </div>
        ))}
        
        {positionedProducts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No products selected for preview
          </div>
        )}
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {positionedProducts.map((item) => (
          <div key={item.product.id} className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: item.product.color.toLowerCase() }}
              />
              <div>
                <p className="text-black">{item.product.name}</p>
                <p className="text-xs text-gray-500">{item.product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}