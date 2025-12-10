export interface Product {
  id: number;
  name: string;
  category: 'leotard' | 'skirt' | 'shoes' | 'accessory';
  price: number;
  description: string;
  features: string[];
  image: string;
  color: string;
  material: string;
  store: string;
}