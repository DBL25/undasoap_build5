export type ProductCategory = 'all' | 'heavy-duty' | 'daily-restore' | 'bundles' | 'accessories';

export type GritLevel = 1 | 2 | 3 | 4 | 5;

export type TradeProfession = 
  | 'Mechanic / Automotive'
  | 'Welder / Metal Fabricator'
  | 'Carpenter / Woodworker'
  | 'Landscaper / Forestry'
  | 'Construction / Drywaller'
  | 'Plumber / Pipefitter'
  | 'Painter / Finisher'
  | 'Weekend DIY / Garage'
  | 'Other'
  | string;

export interface ProductPackOption {
  id: string;
  name: string;
  count: number;
  price: number;
  unitPrice: number;
  badge?: string;
  savingsPercent?: number;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  profession: TradeProfession;
  rating: number;
  title: string;
  content: string;
  date: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  gritRating?: number;
  latherRating?: number;
  longevityRating?: number;
  avatarText?: string;
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
  rating: number;
  reviewCount: number;
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
  isSubscription?: boolean;
  subscriptionFrequencyWeeks?: number;
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

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'google_pay' | 'shop_pay';
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  address: CheckoutAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'Confirmed' | 'Packing in Workshop' | 'In Transit' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}
