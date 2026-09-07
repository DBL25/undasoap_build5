import { Product } from '../types';

// Reset gallery
import resetBarImg from '../assets/images/Reset-main.png';
import resetBarLifestyle from '../assets/images/Reset-lifestyle.png';
import resetBarSide from '../assets/images/Reset-side.png';
import resetBarMacro from '../assets/images/Reset-macro.png';

// Recharge gallery
import rechargeBarImg from '../assets/images/Recharge-Main.png';
import rechargeBarLifestyle from '../assets/images/Recharge-lifestyle.png';
import rechargeBarSide from '../assets/images/Recharge-Side.jpg';
import rechargeBarMacro from '../assets/images/Recharge-macro.png';

// Graveyard gallery
import graveyardBarImg from '../assets/images/Graveyard-Main.png';
import graveyardBarLifestyle from '../assets/images/Graveyard-lifestyle.png';
import graveyardBarSide from '../assets/images/Graveyard-side.png';
import graveyardBarMacro from '../assets/images/Graveyard-macro.png';

// The Rotation gallery
import theRotationMainImg from '../assets/images/Rotation-main.png';
import theRotationLifestyle from '../assets/images/Rotation-lifestyle.png';
import theRotationSide from '../assets/images/Rotation-side.png';
import theRotationMacro from '../assets/images/Rotation-macro.png';

// Bundles & accessories
import theRotationImg from '../assets/images/the_rotation_bundle_1787832036701.jpg';
import theRotationKitImg from '../assets/images/the_rotation_kit_bundle_1787832485903.jpg';
import blackPouchImg from '../assets/images/Pouch-main.png';
import blackPouchInUse from '../assets/images/Pouch-in-use.png';

export const HERO_WORDS: string[] = [
  'something',
  'grease',
  'diesel',
  'sawdust',
  'grime',
  'soot',
  'sludge',
  'dirt',
  'mud',
  'oil',
  'tar',
  'rust',
  'paint',
  'flux',
  'grit',
  'sweat',
  'ash',
  'coolant',
  'resin',
  'cement',
  'dust',
];

export const PRODUCTS: Product[] = [
  {
    id: 'the-full-shift-kit',
    name: 'The Full Shift',
    tagline: '1x Reset + 1x Recharge + 1x Graveyard + Mesh Pouch + Manifesto Card',
    category: 'bundles',
    categoryLabel: 'Flagship Boxed Kit',
    price: 44,
    weight: '3 x 4.2 oz Bars + Black Mesh Pouch + Box',
    ribbon: 'Flagship Boxed Kit',
    gritLevel: 5,
    gritDescription: 'The Flagship Box: 3 Full Bars + Black Mesh Pouch + Manifesto Card',
    image: theRotationKitImg,
    secondaryImage: theRotationImg,
    description: 'The flagship boxed kit: 1x Reset + 1x Recharge + 1x Graveyard + black mesh pouch + UNDA manifesto card, in the printed kraft presentation box. Everything you need for the complete trade week.',
    fullDetails: 'The flagship complete setup for trade life. Contains all three signature cold-process bars, our heavy-duty black mesh exfoliating pouch, and the UNDA manifesto card in our printed kraft presentation box. Contents: 1x The Reset (Charcoal & goat milk grime cutter), 1x The Recharge (Soothing daily goat milk & sea salt bar), 1x The Graveyard (Full concentrated activated charcoal heavy bar), 1x Black Mesh Exfoliating Soap Pouch with locking drawstring, and 1x UNDA Workshop Manifesto Card. Handmade cold-process soap with farm-fresh goat’s milk, pure activated charcoal, coarse sea salt, and refreshing eucalyptus & spearmint essential oils.',
    keyBenefits: [
      'Contents: The Reset, The Recharge, The Graveyard, Black Mesh Pouch & Manifesto Card',
      'The complete flagship lineup: Covers day shift, second half, midnight shifts, and the scrub tool',
      'Printed kraft presentation box — great for shop lockers or gifting to crew',
      'Black mesh pouch amplifies aggressive lather, boosts scrub friction, and hang-dries cleanly',
      'Handmade with farm-fresh goat’s milk, pure activated charcoal & coarse sea salt'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'The Reset Bar (Activated Charcoal, Goat’s Milk, Sea Salt, Lye, Eucalyptus & Spearmint)',
      'The Recharge Bar (Goat’s Milk, Sea Salt, Lye, Eucalyptus & Spearmint)',
      'The Graveyard Bar (Full Activated Charcoal, Goat’s Milk, Sea Salt, Lye, Eucalyptus & Spearmint)',
      'Heavy-Duty Black Mesh Exfoliating Soap Pouch with Locking Drawstring',
      'UNDA Workshop Manifesto Card in Printed Kraft Box'
    ],
    tradeSuitability: ['All Trades', 'Full Week Shift Crews', 'Mechanics, Welders & Ironworkers', 'Workshop Owners'],
    howToUse: 'Insert any bar into the black mesh pouch for maximum mechanical lather and heavy scrub, or lather bars directly onto skin. Hang dry in shower after shift.',
    rating: 5.0,
    reviewCount: 248,
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single-kit', name: '1x The Full Shift', count: 1, price: 44, unitPrice: 44, badge: 'Flagship' },
      { id: 'double-kit', name: '2x The Full Shift Kits (Shop + Home)', count: 2, price: 82, unitPrice: 41, badge: 'Save $6', savingsPercent: 7 }
    ]
  },
  {
    id: 'the-rotation',
    name: 'The Rotation',
    tagline: 'Every bar. Every shift.',
    category: 'bundles',
    categoryLabel: 'Featured Bundle',
    price: 28,
    weight: '3 x 4.2 oz Bars (12.6 oz Total)',
    ribbon: 'Save $10',
    gritLevel: 5,
    gritDescription: 'Complete 3-Bar Lineup (Reset, Recharge & Graveyard)',
    image: theRotationMainImg,
    secondaryImage: theRotationLifestyle,
    gallery: [theRotationMainImg, theRotationLifestyle, theRotationSide, theRotationMacro],
    description: 'Reset. Recharge. Graveyard. The full lineup for the full week — day shift, second half, and the nights nobody sees. Build your own custom 3-bar mix through Find My Routine at the same price.',
    fullDetails: 'The complete 3-bar rotation built for the entire work week. Contents: 1x The Reset (Activated charcoal top, goat’s milk base grime cutter), 1x The Recharge (Creamy goat’s milk and sea salt restorative bar), and 1x The Graveyard (Full charcoal heavy-hitter for midnight shifts). Customers can also tailor their own custom 3-bar mix via Find My Routine for the exact same $28 price. Handmade cold-process soap with farm-fresh goat’s milk, pure activated charcoal, sea salt, food-grade lye, and refreshing eucalyptus & spearmint essential oils.',
    keyBenefits: [
      'Contents: The Reset, The Recharge, and The Graveyard (3 full-size bars)',
      'Covers every shift: Day shift recovery, grime strip, and full charcoal cut',
      'Instant $10 savings compared to buying individual bars ($38 value)',
      'Customizable 3-bar mix option available through Find My Routine',
      'Handmade with farm-fresh goat’s milk, activated charcoal & sea salt'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'The Reset Bar (Activated Charcoal, Goat’s Milk, Sea Salt, Lye, Eucalyptus & Spearmint)',
      'The Recharge Bar (Goat’s Milk, Sea Salt, Lye, Eucalyptus & Spearmint)',
      'The Graveyard Bar (Full Activated Charcoal, Goat’s Milk, Sea Salt, Lye, Eucalyptus & Spearmint)'
    ],
    tradeSuitability: ['Night & Day Shift Crews', 'Heavy Equipment & Mechanics', 'Pipeline & Structural Welders', 'All Trades'],
    howToUse: 'Rotate between The Recharge for morning & light shifts, The Reset for daily post-work grime, and The Graveyard when clocking out of the dirtiest, heaviest shifts.',
    rating: 4.99,
    reviewCount: 194,
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single-rotation', name: '1x The Rotation (3 Bars)', count: 1, price: 28, unitPrice: 28, badge: 'Save $10' },
      { id: 'double-rotation', name: '2x The Rotation (6 Bars Total)', count: 2, price: 56, unitPrice: 28, badge: 'Save $20', savingsPercent: 26 }
    ]
  },
  {
    id: 'the-reset',
    name: 'The Reset',
    tagline: 'Activated Charcoal & Goat’s Milk Heavy Grime Cutter',
    category: 'heavy-duty',
    categoryLabel: 'Heavy Duty & Grit',
    price: 12,
    weight: '4.2 oz (120g)',
    ribbon: 'Best Seller',
    gritLevel: 5,
    gritDescription: 'Maximum Heavy Scrub (Sea Salt & Activated Charcoal)',
    image: resetBarImg,
    secondaryImage: resetBarLifestyle,
    gallery: [resetBarImg, resetBarLifestyle, resetBarSide, resetBarMacro],
    description: "More than a hand bar — built for full-body post-shift showers. Cuts grease without stripping skin.",
    fullDetails: 'Engineered for full-body showering and sink scrubbing after demanding shifts. Made with only simple, honest ingredients: farm-fresh goat’s milk to match natural skin pH, activated charcoal to draw out embedded grease, sea salt for scrubbing friction, food-grade lye for traditional cold-process saponification, and pure eucalyptus & spearmint essential oils.',
    keyBenefits: [
      'Built for hands, arms, shoulders, and full post-shift body showers',
      'Activated charcoal draws out motor oil, carbon, and diesel soot',
      'Sea salt delivers natural scrubbing friction without synthetic micro-plastics',
      'Farm-fresh goat’s milk base leaves skin clean, smooth, and resilient',
      'Clean eucalyptus & spearmint scent cuts shop grime and odors'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'Farm-Fresh Goat’s Milk',
      'Activated Charcoal',
      'Sea Salt',
      'Food-Grade Lye',
      'Eucalyptus Essential Oil',
      'Spearmint Essential Oil'
    ],
    tradeSuitability: ['Diesel Mechanics', 'Pipeline Welders', 'Machinists', 'Construction & Paving Crews'],
    howToUse: 'Work into a dense lather between hands or with a sisal pouch. Scrub hands, arms, neck, and body in the shower after the shift. Rinses clean with zero residue.',
    rating: 4.95,
    reviewCount: 318,
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single', name: 'Single Bar', count: 1, price: 12, unitPrice: 12 },
      { id: 'four-pack', name: '4-Pack Workshop Box', count: 4, price: 40, unitPrice: 10, badge: 'Best Value', savingsPercent: 17 },
    ]
  },
  {
    id: 'the-graveyard',
    name: 'The Graveyard',
    tagline: 'Full charcoal. No mercy.',
    category: 'heavy-duty',
    categoryLabel: 'Heavy Duty & Grit',
    price: 14,
    weight: '4.2 oz (119g)',
    ribbon: 'Full Charcoal',
    gritLevel: 5,
    gritDescription: 'Maximum Heavy Cut (Full Bar Activated Charcoal & Added Sea Salt)',
    image: graveyardBarImg,
    secondaryImage: graveyardBarLifestyle,
    gallery: [graveyardBarImg, graveyardBarLifestyle, graveyardBarSide, graveyardBarMacro],
    description: "Some shifts end when the sun comes up. The Graveyard is our heaviest bar. Activated charcoal top to bottom — no white layer, no half measures. Goat's milk underneath so it pulls the day off without pulling your skin apart. Built for the nights nobody sees. Clock out clean.",
    fullDetails: "Handmade goat's milk soap. Activated charcoal, full bar. Added sea salt. 4.2 oz (119g). Built for the nights nobody sees. Concentrated activated charcoal top to bottom with added coarse sea salt. Farm-fresh goat's milk base preserves skin moisture and prevents cracked raw skin even after multiple washes per shift.",
    keyBenefits: [
      'Full charcoal top to bottom — no white layer, no half measures',
      'Goat’s milk underneath pulls the day off without pulling your skin apart',
      'Added sea salt creates aggressive abrasive friction for heavy grease & carbon',
      'Built for midnight shifts, asphalt paving, diesel rebuilds, and ironwork',
      'Refreshing natural eucalyptus & spearmint essential oils'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'Farm-Fresh Goat’s Milk',
      'Activated Charcoal (Full Bar Concentration)',
      'Added Sea Salt',
      'Food-Grade Lye',
      'Eucalyptus Essential Oil',
      'Spearmint Essential Oil'
    ],
    tradeSuitability: ['Midnight Shift Crews', 'Diesel & Heavy Equipment Techs', 'Foundry & Structural Ironworkers', 'Asphalt & Oil Field Crews'],
    howToUse: 'Lather between wet hands or with the black fiber pouch. Scrub forearms, neck, face, and body after heavy shifts. Rinses away completely clean with zero residue.',
    rating: 4.98,
    reviewCount: 204,
    inStock: true,
    featured: true,
    isDarkCard: true,
    packOptions: [
      { id: 'single', name: 'Single Bar', count: 1, price: 14, unitPrice: 14 },
      { id: 'four-pack', name: '4-Pack Midnight Box', count: 4, price: 48, unitPrice: 12, badge: 'Best Value', savingsPercent: 14 },
    ]
  },
  {
    id: 'the-recharge',
    name: 'The Recharge',
    tagline: 'Goat’s Milk & Sea Salt Daily Skin Restorer',
    category: 'daily-restore',
    categoryLabel: 'Daily Restore',
    price: 12,
    weight: '4.2 oz (120g)',
    ribbon: 'Staff Pick',
    gritLevel: 2,
    gritDescription: 'Smooth Creamy Restore & Mild Buffing (Goat’s Milk & Sea Salt)',
    image: rechargeBarImg,
    secondaryImage: rechargeBarLifestyle,
    gallery: [rechargeBarImg, rechargeBarLifestyle, rechargeBarSide, rechargeBarMacro],
    description: 'More than a hand bar. Rich goat’s milk and sea salt leave your skin clean, refreshed, and restored.',
    fullDetails: 'A nourishing daily full-body bar crafted with farm-fresh goat’s milk, sea salt, food-grade lye, and pure eucalyptus & spearmint essential oils. Produces a thick, velvety lather that washes away the fatigue of the shift, leaving your skin feeling calm, smooth, and revitalized.',
    keyBenefits: [
      'Ultra-creamy, comforting full-body shower lather',
      'Fresh goat milk fatty acids nourish and restore the skin barrier',
      'Gentle sea salt mineral cleansing with zero artificial perfumes',
      'Revitalizing eucalyptus & spearmint aroma clears the head post-shift'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'Farm-Fresh Goat’s Milk',
      'Sea Salt',
      'Food-Grade Lye',
      'Eucalyptus Essential Oil',
      'Spearmint Essential Oil'
    ],
    tradeSuitability: ['Carpenters & Framers', 'Electricians', 'Landscapers', 'All Trades & Daily Showers'],
    howToUse: 'Lather generously across hands, neck, chest, and body during your morning or evening shower. Enjoy the crisp eucalyptus & spearmint foam and rinse clean.',
    rating: 4.91,
    reviewCount: 242,
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single', name: 'Single Bar', count: 1, price: 12, unitPrice: 12 },
      { id: 'four-pack', name: '4-Pack', count: 4, price: 40, unitPrice: 10, badge: 'Best Value', savingsPercent: 17 },
    ]
  },
  {
    id: 'sisal-soap-saver-pouch',
    name: 'Black Woven Fiber Exfoliating Pouch',
    tagline: 'Heavy-Duty Black Fiber Soap Saver & Scrub Bag',
    category: 'accessories',
    categoryLabel: 'Workshop Gear',
    price: 6,
    weight: '1.2 oz Woven Fiber',
    gritLevel: 3,
    gritDescription: 'Tactile Black Scrub Pouch Texture',
    image: blackPouchImg,
    secondaryImage: blackPouchInUse,
    gallery: [blackPouchImg, blackPouchInUse],
    description: 'Slip any bar into this black woven fiber pouch for maximum grip, explosive foam, and easy hang-dry shower storage.',
    fullDetails: 'Woven from rugged textured black plant fibers. Delivers industrial traction so wet soap never slips out of oily or soapy hands. Collects every last sliver of soap and hangs dry between shifts.',
    keyBenefits: [
      'Amplifies rich lather while saving slippery soap slivers',
      'Durable black bead drawstring allows easy hanging on shower hooks',
      'Rugged matte black textured weave hides shop grime',
      'Doubles as an adjustable body scrub sponge'
    ],
    scentNotes: ['Unscented'],
    ingredients: [
      '100% Black Woven Plant Fibers',
      'Black Locking Bead & Heavy-Duty Drawstring Cord'
    ],
    tradeSuitability: ['All Showers', 'Job Site Wash Stations'],
    howToUse: 'Insert soap bar into pouch, tighten drawstring, wet with water, and massage body to create rich foaming lather.',
    rating: 4.87,
    reviewCount: 88,
    inStock: true,
    featured: false,
    packOptions: [
      { id: 'single-pouch', name: '1x Black Fiber Pouch', count: 1, price: 6, unitPrice: 6 },
      { id: 'three-pouches', name: '3-Pack Pouches (Save 22%)', count: 3, price: 14, unitPrice: 4.66, badge: 'Best Value', savingsPercent: 22 }
    ]
  }
];
