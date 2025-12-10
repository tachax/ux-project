"use client"

import { useState } from 'react';
import type { Product } from './types/product';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { CompareView } from './components/CompareView';
import { PreviewView } from './components/PreviewView';
import { ProfileView } from './components/ProfileView';
import { CartView } from './components/CartView';
import { ShoppingBag, GitCompare, Eye, User, ShoppingCart } from 'lucide-react';

type View = 'browse' | 'compare' | 'preview' | 'profile' | 'cart';

export default function App() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<View>('browse');

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.find(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromComparison = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isProductSelected = (productId: number) => {
    return selectedProducts.some(p => p.id === productId);
  };

  const addToCart = (product: Product) => {
    setCartProducts(prev => {
      const isInCart = prev.find(p => p.id === product.id);
      if (!isInCart) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isInCart = (productId: number) => {
    return cartProducts.some(p => p.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-900">Fit Compare</h1>
            
            <div className="flex items-center gap-2">
              <nav className="flex gap-2">
                <button
                  onClick={() => setCurrentView('browse')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === 'browse' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse
                </button>
                
                <button
                  onClick={() => setCurrentView('compare')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative ${
                    currentView === 'compare' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <GitCompare className="w-5 h-5" />
                  Compare
                  {selectedProducts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {selectedProducts.length}
                    </span>
                  )}
                </button>
              </nav>
              
              <button 
                onClick={() => setCurrentView('cart')}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors relative ${
                  currentView === 'cart'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartProducts.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setCurrentView('profile')}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  currentView === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {currentView === 'browse' && (
          <div>
            <div className="text-black">
              <h2>Available Products</h2>
              <p className="text-gray-600">
                Select items to compare and preview outfit combinations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={isProductSelected(product.id)}
                  onToggleSelect={toggleProductSelection}
                  onAddToCart={addToCart}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'compare' && (
          <CompareView
            products={selectedProducts}
            onRemove={removeFromComparison}
            onPreview={() => setCurrentView('preview')}
          />
        )}

        {currentView === 'preview' && (
          <PreviewView 
            products={selectedProducts}
            onBack={() => setCurrentView('compare')}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView />
        )}

        {currentView === 'cart' && (
          <CartView
            products={cartProducts}
            onRemove={removeFromCart}
          />
        )}
      </main>
    </div>
  );
}