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

// Bundle systems
import theRotationImg from '../assets/images/the-rotation-wet-counter.webp';
import fullShiftKitImg from '../assets/images/full-shift-hero-2.png';
import fullShiftDetailImg from '../assets/images/full-shift-detail.webp';
import fullShiftAccessoriesImg from '../assets/images/full-shift-accessories.webp';
import fullShiftLineupImg from '../assets/images/full-shift-lineup.webp';
import rotationLifestyleImg from '../assets/images/Rotation-lifestyle.webp';
import rotationSideImg from '../assets/images/Rotation-side.webp';
import rotationMacroImg from '../assets/images/Rotation-macro.webp';
import theCycleImg from '../assets/images/the-cycle-wet-counter.webp';
import theCycleOpenImg from '../assets/images/the-cycle-open-hero.webp';

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
    tagline: 'The complete lineup. The exclusive scrub tool. The full experience.',
    category: 'bundles',
    categoryLabel: 'Flagship Boxed Kit',
    price: 38,
    weight: '3 Full-Size Bars + Black Mesh Pouch + Box',
    ribbon: 'Flagship Boxed Kit',
    gritLevel: 5,
    gritDescription: 'The Flagship Box: 3 Full Bars + Exclusive Black Mesh Pouch + Manifesto Card',
    image: fullShiftKitImg,
    gallery: [fullShiftKitImg, fullShiftDetailImg, fullShiftAccessoriesImg, fullShiftLineupImg],
    description: 'The flagship boxed kit: The Reset, The Recharge, The Graveyard, the kit-exclusive black mesh exfoliating pouch, and the UNDA manifesto card in a complete kraft presentation box.',
    fullDetails: 'The complete UNDA system for trade life. The Full Shift contains all three signature cold-process bars, the heavy-duty black mesh exfoliating pouch available exclusively inside this kit, the UNDA manifesto card, and the complete printed kraft presentation box. Contents: 1x The Reset, 1x The Recharge, 1x The Graveyard, 1x exclusive Black Mesh Exfoliating Soap Pouch with locking drawstring, and 1x UNDA Workshop Manifesto Card. Handmade cold-process soap with farm-fresh goat’s milk, pure activated charcoal, coarse sea salt, and refreshing eucalyptus & spearmint essential oils.',
    keyBenefits: [
      'Contents: The Reset, The Recharge, The Graveyard, kit-exclusive Black Mesh Pouch & Manifesto Card',
      'The complete flagship lineup: Covers day shift, second half, midnight shifts, and the scrub tool',
      'Printed kraft presentation box — great for shop lockers or gifting to crew',
      'The black mesh pouch is exclusive to The Full Shift and is not sold separately',
      'Handmade with farm-fresh goat’s milk, pure activated charcoal & coarse sea salt'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'The Reset — Goat’s Milk, Activated Charcoal, Sea Salt, Eucalyptus & Spearmint',
      'The Recharge — Goat’s Milk, Sea Salt, Eucalyptus & Spearmint',
      'The Graveyard — Goat’s Milk, Activated Charcoal, Sea Salt, Eucalyptus & Spearmint',
      'Heavy-Duty Black Mesh Exfoliating Soap Pouch with Locking Drawstring',
      'UNDA Workshop Manifesto Card in Printed Kraft Box'
    ],
    tradeSuitability: ['All Trades', 'Full Week Shift Crews', 'Mechanics, Welders & Ironworkers', 'Workshop Owners'],
    howToUse: 'Insert any bar into the black mesh pouch for maximum mechanical lather and heavy scrub, or lather bars directly onto skin. Hang dry in shower after shift.',
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single-kit', name: '1x The Full Shift', count: 1, price: 38, unitPrice: 38, badge: 'Flagship' },
      { id: 'double-kit', name: '2x The Full Shift Kits (Shop + Home)', count: 2, price: 70, unitPrice: 35, badge: 'Save $6', savingsPercent: 8 }
    ]
  },
  {
    id: 'the-rotation',
    name: 'The Rotation',
    tagline: 'Every bar. Every shift.',
    category: 'bundles',
    categoryLabel: 'Featured Bundle',
    price: 28,
    weight: '3 Full-Size Bars',
    ribbon: 'Save $10',
    gritLevel: 5,
    gritDescription: 'Complete 3-Bar Lineup (Reset, Recharge & Graveyard)',
    image: theRotationImg,
    secondaryImage: rotationLifestyleImg,
    gallery: [theRotationImg, rotationLifestyleImg, rotationSideImg, rotationMacroImg],
    description: 'Reset. Recharge. Graveyard. The full lineup for the full week — day shift, second half, and the nights nobody sees. Build your own custom 3-bar mix through Find My Routine at the same price.',
    fullDetails: 'The complete 3-bar rotation built for the entire work week. Contents: 1x The Reset (activated charcoal and goat’s milk grime cutter), 1x The Recharge (creamy goat’s milk and sea salt daily bar), and 1x The Graveyard (full-charcoal heavy hitter). Customers can also tailor a custom 3-bar mix through Find My Routine for the same $28 price. Formula highlights include goat’s milk, activated charcoal, sea salt, eucalyptus and spearmint.',
    keyBenefits: [
      'Contents: The Reset, The Recharge, and The Graveyard (3 full-size bars)',
      'Covers every shift: Day shift recovery, grime strip, and full charcoal cut',
      'Instant $10 savings compared to buying individual bars ($38 value)',
      'Customizable 3-bar mix option available through Find My Routine',
      'Handmade with farm-fresh goat’s milk, activated charcoal & sea salt'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'The Reset — Goat’s Milk, Activated Charcoal, Sea Salt, Eucalyptus & Spearmint',
      'The Recharge — Goat’s Milk, Sea Salt, Eucalyptus & Spearmint',
      'The Graveyard — Goat’s Milk, Activated Charcoal, Sea Salt, Eucalyptus & Spearmint'
    ],
    tradeSuitability: ['Night & Day Shift Crews', 'Heavy Equipment & Mechanics', 'Pipeline & Structural Welders', 'All Trades'],
    howToUse: 'Rotate between The Recharge for morning & light shifts, The Reset for daily post-work grime, and The Graveyard when clocking out of the dirtiest, heaviest shifts.',
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
    weight: 'Full-Size Bar',
    ribbon: 'Best Seller',
    gritLevel: 5,
    gritDescription: 'Maximum Heavy Scrub (Sea Salt & Activated Charcoal)',
    image: resetBarImg,
    secondaryImage: resetBarLifestyle,
    gallery: [resetBarImg, resetBarLifestyle, resetBarSide, resetBarMacro],
    description: "More than a hand bar — built for full-body post-shift showers. Cuts grease without stripping skin.",
    fullDetails: 'A cold-process full-body and sink-scrub bar for demanding shifts. Formula highlights include goat’s milk, activated charcoal, sea salt, eucalyptus and spearmint. The full ingredient declaration will be published when the production formula is finalized.',
    keyBenefits: [
      'Built for hands, arms, shoulders, and full post-shift body showers',
      'Activated charcoal helps lift surface oil, carbon, and diesel soot',
      'Sea salt delivers natural scrubbing friction without synthetic micro-plastics',
      'Goat’s milk supports a creamy, comfortable post-shift wash',
      'Clean eucalyptus & spearmint scent cuts shop grime and odors'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'Farm-Fresh Goat’s Milk',
      'Activated Charcoal',
      'Sea Salt',
      'Eucalyptus Essential Oil',
      'Spearmint Essential Oil'
    ],
    tradeSuitability: ['Diesel Mechanics', 'Pipeline Welders', 'Machinists', 'Construction & Paving Crews'],
    howToUse: 'Work into a dense lather between wet hands. Scrub hands, arms, neck, and body in the shower after the shift. Rinses clean with zero residue.',
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
    weight: 'Full-Size Bar',
    ribbon: 'Full Charcoal',
    gritLevel: 5,
    gritDescription: 'Maximum Heavy Cut (Full Bar Activated Charcoal & Added Sea Salt)',
    image: graveyardBarImg,
    secondaryImage: graveyardBarLifestyle,
    gallery: [graveyardBarImg, graveyardBarLifestyle, graveyardBarSide, graveyardBarMacro],
    description: "Some shifts end when the sun comes up. The Graveyard is our heaviest bar. Activated charcoal top to bottom — no white layer, no half measures. Goat's milk underneath so it pulls the day off without pulling your skin apart. Built for the nights nobody sees. Clock out clean.",
    fullDetails: "Handmade cold-process goat's milk soap. Activated charcoal, full bar. Added sea salt. Built for the nights nobody sees. Concentrated activated charcoal runs top to bottom, while goat's milk supports a comfortable post-shift wash.",
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
      'Eucalyptus Essential Oil',
      'Spearmint Essential Oil'
    ],
    tradeSuitability: ['Midnight Shift Crews', 'Diesel & Heavy Equipment Techs', 'Foundry & Structural Ironworkers', 'Asphalt & Oil Field Crews'],
    howToUse: 'Lather between wet hands. Scrub forearms, neck, face, and body after heavy shifts. Rinses away completely clean with zero residue.',
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
    weight: 'Full-Size Bar',
    ribbon: 'Staff Pick',
    gritLevel: 2,
    gritDescription: 'Smooth Creamy Restore & Mild Buffing (Goat’s Milk & Sea Salt)',
    image: rechargeBarImg,
    secondaryImage: rechargeBarLifestyle,
    gallery: [rechargeBarImg, rechargeBarLifestyle, rechargeBarSide, rechargeBarMacro],
    description: 'More than a hand bar. Rich goat’s milk and sea salt leave your skin clean, refreshed, and restored.',
    fullDetails: 'A daily cold-process full-body bar with goat’s milk, sea salt, eucalyptus and spearmint among its formula highlights. Designed for a thick, creamy lather and a clean, comfortable post-shift feel. The full ingredient declaration will be published when the production formula is finalized.',
    keyBenefits: [
      'Ultra-creamy, comforting full-body shower lather',
      'Goat’s milk supports a rich, creamy daily lather',
      'Gentle sea salt mineral cleansing with zero artificial perfumes',
      'Revitalizing eucalyptus & spearmint aroma clears the head post-shift'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'Farm-Fresh Goat’s Milk',
      'Sea Salt',
      'Eucalyptus Essential Oil',
      'Spearmint Essential Oil'
    ],
    tradeSuitability: ['Carpenters & Framers', 'Electricians', 'Landscapers', 'All Trades & Daily Showers'],
    howToUse: 'Lather generously across hands, neck, chest, and body during your morning or evening shower. Enjoy the crisp eucalyptus & spearmint foam and rinse clean.',
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single', name: 'Single Bar', count: 1, price: 12, unitPrice: 12 },
      { id: 'four-pack', name: '4-Pack', count: 4, price: 40, unitPrice: 10, badge: 'Best Value', savingsPercent: 17 },
    ]
  },
  {
    id: 'the-cycle',
    name: 'The Cycle',
    tagline: 'Reset the shift. Recharge for the next one.',
    category: 'bundles',
    categoryLabel: 'Two-Bar Daily System',
    price: 22,
    weight: '2 Full-Size Bars',
    ribbon: 'Daily Duo',
    gritLevel: 5,
    gritDescription: 'Two-Step Routine: Heavy Reset + Daily Recharge',
    image: theCycleImg,
    gallery: [theCycleImg, theCycleOpenImg],
    description: 'The two middle moves in the UNDA rhythm: Reset the grime, Recharge the skin, and get ready to repeat.',
    fullDetails: 'The Cycle is a focused two-bar system built around the core UNDA routine. The Reset strips away the weight of the shift with activated charcoal, goat’s milk, and sea salt. The Recharge follows with a creamy goat’s milk and sea salt lather that leaves skin ready for whatever comes next. No pouch, no filler, and no duplicate bars—just the everyday Reset-and-Recharge combination in its own compact package.',
    keyBenefits: [
      'Contents: 1x The Reset and 1x The Recharge',
      'A simple post-shift and next-shift two-step routine',
      'The Reset handles embedded grime, grease, soot, and sweat',
      'The Recharge restores a clean, comfortable skin feel for daily use',
      'Compact two-bar package with no accessories or unnecessary extras'
    ],
    scentNotes: ['Eucalyptus', 'Spearmint'],
    ingredients: [
      'The Reset — Goat’s Milk, Activated Charcoal, Sea Salt, Eucalyptus & Spearmint',
      'The Recharge — Goat’s Milk, Sea Salt, Eucalyptus & Spearmint'
    ],
    tradeSuitability: ['Everyday Trade Crews', 'Mechanics & Fabricators', 'Construction & Landscaping', 'Daily Post-Shift Showers'],
    howToUse: 'Use The Reset after dirty shifts to cut through grime. Follow with The Recharge during the next shower or on lighter days. Reset. Recharge. Repeat.',
    inStock: true,
    featured: true,
    packOptions: [
      { id: 'single-cycle', name: '1x The Cycle (2 Bars)', count: 1, price: 22, unitPrice: 22, badge: 'Save $2' },
      { id: 'double-cycle', name: '2x The Cycle (4 Bars Total)', count: 2, price: 42, unitPrice: 21, badge: 'Save $6', savingsPercent: 13 }
    ]
  }
];
