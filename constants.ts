
import { Outfit } from './types';

export const OUTFITS: (Outfit & { category: string })[] = [
  {
    id: 'navy-vneck-elite',
    category: 'Casual',
    name: 'Elite V-Neck Layer',
    description: 'Modern navy V-neck sweater layered over a crisp white shirt with silver accents.',
    thumbnail: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=200&h=300&fit=crop',
    prompt: 'A stylish smart-casual outfit featuring a premium navy blue V-neck knitted sweater layered over a clean white collared dress shirt. Paired with relaxed black denim jeans featuring a silver wallet chain. The look is accessorized with a thin silver necklace and transparent clear-frame glasses.'
  },
  {
    id: 'midnight-tuxedo',
    category: 'Formal',
    name: 'Midnight Peak Suit',
    description: 'Ultra-sharp midnight blue tuxedo with black satin peak lapels.',
    thumbnail: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68a?w=200&h=300&fit=crop',
    prompt: 'A slim-fit midnight blue tuxedo with sharp black satin peak lapels, a crisp white pleated tuxedo shirt, and a black silk bow tie. The fabric has a subtle premium sheen.'
  },
  {
    id: 'charcoal-double-breasted',
    category: 'Formal',
    name: 'Executive Charcoal',
    description: 'Sophisticated charcoal grey double-breasted blazer with silver buttons.',
    thumbnail: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=200&h=300&fit=crop',
    prompt: 'A classic charcoal grey double-breasted suit jacket with polished silver buttons. Worn over a light blue dress shirt with a navy silk tie. The silhouette is structured and authoritative.'
  },
  {
    id: 'burgundy-velvet-jacket',
    category: 'Formal',
    name: 'Scarlet Dinner Jacket',
    description: 'Luxurious burgundy velvet blazer for high-profile evening events.',
    thumbnail: 'https://images.unsplash.com/photo-1617130863154-825012234b5b?w=200&h=300&fit=crop',
    prompt: 'A rich burgundy velvet dinner jacket with black shawl lapels. This is a high-fashion formal look, paired with a black turtleneck for a modern elegant aesthetic.'
  },
  {
    id: 'cream-linen-suit',
    category: 'Formal',
    name: 'Ivory Summer Formal',
    description: 'Lightweight cream linen suit, perfect for summer weddings and galas.',
    thumbnail: 'https://images.unsplash.com/photo-1555069519-0344a117d605?w=200&h=300&fit=crop',
    prompt: 'A tailored ivory cream linen suit with a soft, breathable texture. Worn with a crisp white open-collar shirt. The look is relaxed yet impeccably formal for warm climates.'
  },
  {
    id: 'tweed-heritage-blazer',
    category: 'Formal',
    name: 'Heritage Tweed',
    description: 'Classic brown herringbone tweed blazer with leather elbow patches.',
    thumbnail: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=200&h=300&fit=crop',
    prompt: 'A sophisticated brown herringbone tweed blazer featuring vintage leather elbow patches and a three-button front. Paired with a cream-colored vest and a white oxford shirt.'
  },
  {
    id: 'night-stripe-kurta',
    category: 'Traditional',
    name: 'Night Stripe Paisley',
    description: 'Black pinstriped kurta with vibrant teal paisley patterned sleeves.',
    thumbnail: 'https://images.unsplash.com/photo-1598501068261-26798e3b79da?w=200&h=300&fit=crop',
    prompt: 'A traditional men long kurta in deep black fabric featuring thin, vertical teal pinstripes on the body. The sleeves are uniquely styled with a dense, intricate paisley and floral pattern in a vibrant teal color. The garment has a sharp mandarin collar with subtle teal accents.'
  },
  {
    id: 'amber-paisley-kurta',
    category: 'Traditional',
    name: 'Amber Paisley Panel',
    description: 'Copper-toned kurta with central paisley motif and white floral borders.',
    thumbnail: 'https://images.unsplash.com/photo-1610173827002-62c0f1f05d04?w=200&h=300&fit=crop',
    prompt: 'A refined men long kurta in a warm copper or amber tone. The center of the garment features a large, intricate paisley motif in earthy browns. The sides and sleeves are decorated with white floral vine panels. It features a mandarin collar and a buttoned front placket with white embroidery details.'
  },
  {
    id: 'royal-kurta',
    category: 'Traditional',
    name: 'Blue Floral Kurta',
    description: 'Dusty blue kurta with intricate brown floral vine embroidery.',
    thumbnail: 'https://images.unsplash.com/photo-1597933534024-16499806e987?w=200&h=300&fit=crop',
    prompt: 'A traditional men long kurta in a muted slate blue fabric. The garment is covered in dense, sophisticated brown floral vine embroidery across the entire front and sleeves. It features a refined mandarin collar with a dark brown contrasting border. The look is completed with elegant white straight-leg trousers.'
  },
  {
    id: 'cyber-geisha',
    category: 'Fantasy',
    name: 'Cyber Geisha',
    description: 'Neon-lit traditional fusion with holographic silk.',
    thumbnail: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=200&h=300&fit=crop',
    prompt: 'A futuristic cyber-geisha outfit. A traditional kimono silhouette made of translucent holographic silk with glowing neon pink circuits and a high-tech metallic obi.'
  },
  {
    id: 'iridescent-puffer',
    category: 'Street',
    name: 'Prism Puffer',
    description: 'Oversized color-shifting jacket with liquid shine.',
    thumbnail: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&h=300&fit=crop',
    prompt: 'A massive iridescent puffer jacket that shifts colors between violet and lime green, worn over a sleek chrome bodysuit.'
  },
  {
    id: 'void-knight',
    category: 'Fantasy',
    name: 'Void Armor',
    description: 'Liquid metal plating with glowing violet runes.',
    thumbnail: 'https://images.unsplash.com/photo-1519340333755-5672c7ec0f6c?w=200&h=300&fit=crop',
    prompt: 'Sleek matte black liquid-metal knight armor with glowing violet arcane runes etched into the chest plate and shoulders.'
  },
  {
    id: 'solar-gown',
    category: 'Formal',
    name: 'Solar Flare',
    description: 'A dress that radiates heat and golden plasma.',
    thumbnail: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=300&fit=crop',
    prompt: 'A floor-length gown that appears to be made of molten gold and flowing solar plasma, emitting a soft warm glow.'
  },
  {
    id: 'prism-street',
    category: 'Street',
    name: 'Glass Runner',
    description: 'Transparent vinyl techwear that refracts light.',
    thumbnail: 'https://images.unsplash.com/photo-1523381235312-df5907f39961?w=200&h=300&fit=crop',
    prompt: 'Transparent vinyl techwear jacket and pants that refract environmental light into rainbows, with heavy industrial silver buckles.'
  },
  {
    id: 'cyberpunk-neon',
    category: 'Future',
    name: 'Cyberpunk Tech',
    description: 'Neon-infused futuristic urban gear with glowing accents.',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&h=300&fit=crop',
    prompt: 'A futuristic cyberpunk techwear outfit with glowing neon cyan accents, matte black tactical fabrics, and integrated LED piping on the sleeves and collar.'
  },
  {
    id: 'royal-velvet',
    category: 'Formal',
    name: 'Royal Emerald Suit',
    description: 'Deep emerald velvet evening wear for high-end events.',
    thumbnail: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68a?w=200&h=300&fit=crop',
    prompt: 'A luxurious deep emerald green velvet tailored suit with gold embroidery on the lapels and a crisp white silk shirt underneath.'
  }
];
