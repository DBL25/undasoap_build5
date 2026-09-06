import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'the-reset',
    productName: 'The Reset',
    author: 'Cody M.',
    profession: 'Mechanic / Automotive',
    rating: 5,
    title: 'Cuts 5W-30 and grease in full shower scrub without stripping skin',
    content: 'I run a 4-bay diesel shop in Ohio. I used to use that chemical shop tub soap. By winter my knuckles and arms were raw. Started using The Reset in the shop shower and sink. Within 3 days, the charcoal lifts black diesel grime out of skin pores in one scrub, and the goat’s milk keeps skin feeling smooth. Won’t buy anything else.',
    date: '2 days ago',
    verifiedBuyer: true,
    helpfulCount: 42,
    gritRating: 5,
    latherRating: 5,
    longevityRating: 4,
    avatarText: 'CM'
  },
  {
    id: 'rev-2',
    productId: 'the-reset',
    productName: 'The Reset',
    author: 'Garrett T.',
    profession: 'Welder / Metal Fabricator',
    rating: 5,
    title: 'Cuts through weld spatter, carbon soot, and metal grinding dust in one shower',
    content: 'TIG welding and structural fab work embeds black steel dust and carbon right into your forearms and neck. Most commercial soaps feel like plastic perfumed water. The Reset’s activated charcoal and sea salt cut straight through the slag and grinding grease, and the goat’s milk keeps your skin from peeling raw. Essential kit for the weld shop.',
    date: '5 days ago',
    verifiedBuyer: true,
    helpfulCount: 34,
    gritRating: 5,
    latherRating: 5,
    longevityRating: 5,
    avatarText: 'GT'
  },
  {
    id: 'rev-3',
    productId: 'the-graveyard',
    productName: 'The Graveyard',
    author: 'Derrick K.',
    profession: 'Night Shift Diesel Tech',
    rating: 5,
    title: 'Solid charcoal from top to bottom — clock out clean at 6 AM',
    content: 'Running 3rd shift heavy fleet repairs means rolling out from under trucks covered in old gear oil and axle grease. The Graveyard is the first bar that doesn’t fool around. Full black charcoal all the way through, but the goat milk stops your forearms from feeling stripped raw. You clock out clean.',
    date: '3 days ago',
    verifiedBuyer: true,
    helpfulCount: 29,
    gritRating: 5,
    latherRating: 5,
    longevityRating: 5,
    avatarText: 'DK'
  },
  {
    id: 'rev-4',
    productId: 'the-full-shift-kit',
    productName: 'The Full Shift',
    author: 'Trevor R.',
    profession: 'Structural Steel Foreman',
    rating: 5,
    title: 'The complete setup — the mesh pouch plus all three bars in the box is unbeatable',
    content: 'Got The Full Shift boxed set last month. Having Reset, Recharge, and Graveyard covers every possible shift from easy Tuesday mornings to brutal Friday iron fits. The black mesh pouch makes the lather insane and lets you hang dry the bar right in the shop locker room.',
    date: '1 week ago',
    verifiedBuyer: true,
    helpfulCount: 45,
    gritRating: 5,
    latherRating: 5,
    longevityRating: 5,
    avatarText: 'TR'
  },
  {
    id: 'rev-5',
    productId: 'the-recharge',
    productName: 'The Recharge',
    author: 'Shane W.',
    profession: 'Lineman & Electrician',
    rating: 5,
    title: 'Pure goat milk lather saves dry, calloused hands in winter',
    content: 'Working outside in the bucket in freezing wind will destroy your skin. The Recharge is rich, calming, and smells like crisp eucalyptus. Rinses clean without any slimy chemical film.',
    date: '1 week ago',
    verifiedBuyer: true,
    helpfulCount: 31,
    gritRating: 2,
    latherRating: 5,
    longevityRating: 4,
    avatarText: 'SW'
  },
  {
    id: 'rev-6',
    productId: 'the-rotation',
    productName: 'The Rotation',
    author: 'Marcus B.',
    profession: 'Carpenter / Woodworker',
    rating: 5,
    title: 'Three bars that cover every shift without skin getting stripped raw',
    content: 'Framing and fine woodworking means sawdust, wood resin, and sweat glued to your arms and neck every afternoon. Having The Reset for heavy sawdust days, The Recharge for morning showers, and The Graveyard for filthy demo days means every shift is handled. Heavy bars that hold their shape and never turn to mush.',
    date: '2 weeks ago',
    verifiedBuyer: true,
    helpfulCount: 38,
    gritRating: 5,
    latherRating: 5,
    longevityRating: 5,
    avatarText: 'MB'
  }
];

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Workshop Ground Delivery',
    duration: '3-5 Business Days',
    price: 4.99,
    description: 'Tracked ground shipping. Free on orders over $35.'
  },
  {
    id: 'express',
    name: 'Job Site Rush Priority',
    duration: '2 Business Days',
    price: 9.99,
    description: 'Expedited air freight with signature verification.'
  },
  {
    id: 'overnight',
    name: 'Next-Day AM Urgent Dispatch',
    duration: 'Next Business Day by 10:30 AM',
    price: 18.99,
    description: 'Priority overnight handler direct to shop or job site.'
  }
];

export const PROMO_CODES: Record<string, { discountPercent?: number; freeShipping?: boolean; description: string }> = {
  'DIRTYWORK10': { discountPercent: 10, description: '10% Off Entire Order' },
  'FREESHIP': { freeShipping: true, description: 'Free Standard Ground Shipping' },
  'CREW15': { discountPercent: 15, description: '15% Tradesman Crew Discount' },
  'UNDAFIRST': { discountPercent: 10, description: '10% Welcome Discount' }
};
