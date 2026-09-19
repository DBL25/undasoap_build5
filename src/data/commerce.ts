import { ShippingMethod } from '../types';

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Workshop Ground Delivery',
    duration: '3–5 Business Days',
    price: 4.99,
    description: 'Tracked ground shipping. Free on orders over $35.',
  },
  {
    id: 'express',
    name: 'Job Site Rush Priority',
    duration: '2 Business Days',
    price: 9.99,
    description: 'Expedited delivery preview.',
  },
  {
    id: 'overnight',
    name: 'Next-Day AM Dispatch',
    duration: 'Next Business Day',
    price: 18.99,
    description: 'Next-day delivery preview.',
  },
];
