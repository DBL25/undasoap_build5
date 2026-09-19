export type ProductCategory = 'all' | 'heavy-duty' | 'daily-restore' | 'bundles' | 'accessories';

export type GritLevel = 1 | 2 | 3 | 4 | 5;

export interface ProductPackOption {
  id: string;
  name: string;
  count: number;
  price: number;
  unitPrice: number;
  badge?: string;
  savingsPercent?: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  weight: string;
  ribbon?: string;
  gritLevel: GritLevel;
  gritDescription: string;
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  description: string;
  fullDetails: string;
  keyBenefits: string[];
  scentNotes?: string[];
  ingredients: string[];
  tradeSuitability: string[];
  howToUse: string;
  packOptions: ProductPackOption[];
  inStock: boolean;
  featured?: boolean;
  isDarkCard?: boolean;
}

export interface CartItem {
  id: string; // unique item key combining product id and pack option
  product: Product;
  selectedPack: ProductPackOption;
  quantity: number;
}

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  trade?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  deliveryInstructions?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
}
