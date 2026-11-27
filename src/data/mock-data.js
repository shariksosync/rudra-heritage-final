import artisanCraftAsset from "@/assets/artisan-craft.png.asset.json";
import fortMiniatureAsset from "@/assets/fort-miniature.png.asset.json";
import heritageMuralAsset from "@/assets/heritage-mural.png.asset.json";
import marathaSwordAsset from "@/assets/maratha-sword.png.asset.json";
import rudraHeroAsset from "@/assets/rudra-hero.png.asset.json";
import shivajiBustAsset from "@/assets/shivaji-bust.png.asset.json";

export const RUDRA_IMAGES = {
  artisanCraft: artisanCraftAsset.url,
  fortMiniature: fortMiniatureAsset.url,
  heritageMural: heritageMuralAsset.url,
  marathaSword: marathaSwordAsset.url,
  rudraHero: rudraHeroAsset.url,
  shivajiBust: shivajiBustAsset.url,
};

const STOREFRONT_DATA = {
  products: [
    {
      id: "shivaji-royal-bronze",
      name: "Chhatrapati Shivaji Maharaj Royal Bronze Statue",
      category: "statues",
      price: 18999,
      originalPrice: 24999,
      image: "/images/shivaji-bust.png",
      images: ["/images/shivaji-bust.png", "/images/rudra-hero.png", "/images/artisan-craft.png"],
      description: "A finely sculpted tribute to the founder of the Maratha Empire, finished in a rich antique bronze patina for a home, office, or heritage collection.",
      material: "Resin with antique bronze finish",
      dimensions: "28 × 16 × 12 cm",
      weight: "2.4 kg",
      stock: 12,
      featured: true,
      bestselling: true,
      popularity: 98,
      created: "2026-09-11",
      specifications: "Hand-finished antique patina; felt-lined base; carefully packed for gifting.",
    },
    {
      id: "coronation-heritage-sculpture",
      name: "Maharaj Coronation Heritage Sculpture",
      category: "statues",
      price: 24900,
      originalPrice: 28900,
      image: "/images/rudra-hero.png",
      images: ["/images/rudra-hero.png", "/images/shivaji-bust.png", "/images/artisan-craft.png"],
      description: "A dramatic courtly composition inspired by the coronation of Chhatrapati Shivaji Maharaj, shaped with a strong sense of movement and ceremonial detail.",
      material: "Hand-finished resin and metal detailing",
      dimensions: "34 × 24 × 18 cm",
      weight: "4.1 kg",
      stock: 7,
      featured: true,
      bestselling: true,
      popularity: 91,
      created: "2026-10-04",
      specifications: "Sculpted relief details; antique finish; display-ready plinth included.",
    },
    {
      id: "maratha-warrior-sculpture",
      name: "Traditional Maratha Warrior Sculpture",
      category: "sculptures",
      price: 13900,
      originalPrice: null,
      image: "/images/artisan-craft.png",
      images: ["/images/artisan-craft.png", "/images/shivaji-bust.png", "/images/rudra-hero.png"],
      description: "A powerful hand-finished sculpture celebrating the courage and discipline of the Maratha warrior tradition.",
      material: "Resin with hand-applied bronze finish",
      dimensions: "26 × 17 × 14 cm",
      weight: "2.1 kg",
      stock: 9,
      featured: false,
      bestselling: true,
      popularity: 84,
      created: "2026-08-22",
      specifications: "Artisan-finished surface; stable display base; each finish has subtle variations.",
    },
    {
      id: "antique-maratha-sword",
      name: "Antique-Style Maratha Sword Replica",
      category: "weaponry",
      price: 11500,
      originalPrice: 14900,
      image: "/images/maratha-sword.png",
      images: ["/images/maratha-sword.png", "/images/heritage-mural.png", "/images/fort-miniature.png"],
      description: "A display replica inspired by traditional Maratha weaponry, featuring an ornate hilt and a finely detailed decorative scabbard.",
      material: "Decorative alloy and wood; blunt display replica",
      dimensions: "76 × 12 × 7 cm",
      weight: "1.8 kg",
      stock: 5,
      featured: true,
      bestselling: true,
      popularity: 88,
      created: "2026-07-18",
      specifications: "Display-only blunt replica; wall stand not included; not intended for use.",
    },
    {
      id: "royal-heritage-mural",
      name: "Royal Heritage Wall Mural",
      category: "mural-frames",
      price: 16800,
      originalPrice: null,
      image: "/images/heritage-mural.png",
      images: ["/images/heritage-mural.png", "/images/rudra-hero.png", "/images/fort-miniature.png"],
      description: "A framed heritage artwork that brings the spirit of Maratha history into an entryway, study, or gathering space.",
      material: "Printed archival artwork and carved-look frame",
      dimensions: "60 × 90 × 5 cm",
      weight: "5.2 kg",
      stock: 4,
      featured: true,
      bestselling: false,
      popularity: 74,
      created: "2026-06-03",
      specifications: "Ready to hang; protective finish; custom sizing available on request.",
    },
    {
      id: "maratha-fort-miniature",
      name: "Handcrafted Maratha Fort Miniature",
      category: "replicas",
      price: 8900,
      originalPrice: 10900,
      image: "/images/fort-miniature.png",
      images: ["/images/fort-miniature.png", "/images/shivaji-bust.png", "/images/heritage-mural.png"],
      description: "A detailed tabletop miniature inspired by the hill forts that shaped the Maratha story, with layered stonework and bastions.",
      material: "Hand-finished resin and stone-texture coating",
      dimensions: "32 × 21 × 15 cm",
      weight: "3.3 kg",
      stock: 8,
      featured: true,
      bestselling: true,
      popularity: 82,
      created: "2026-10-17",
      specifications: "Individually finished; display plinth included; suitable for indoor display.",
    },
    {
      id: "royal-emblem-plaque",
      name: "Maratha Royal Emblem Plaque",
      category: "mural-frames",
      price: 5900,
      originalPrice: null,
      image: "/images/shivaji-bust.png",
      images: ["/images/shivaji-bust.png", "/images/heritage-mural.png", "/images/artisan-craft.png"],
      description: "A compact, sculptural wall plaque with an antique finish, designed as a thoughtful accent for a study or entrance.",
      material: "Resin with antique metal finish",
      dimensions: "30 × 24 × 5 cm",
      weight: "1.2 kg",
      stock: 15,
      featured: false,
      bestselling: false,
      popularity: 63,
      created: "2026-05-06",
      specifications: "Integrated hanging point; hand-finished detailing; made for interior use.",
    },
    {
      id: "bespoke-heritage-installation",
      name: "Bespoke Heritage Decor Consultation",
      category: "custom-decor",
      price: 0,
      originalPrice: null,
      image: "/images/artisan-craft.png",
      images: ["/images/artisan-craft.png", "/images/heritage-mural.png", "/images/rudra-hero.png"],
      description: "A tailored consultation for a custom sculpture, mural, or heritage installation. Final pricing is shared after the brief is reviewed.",
      material: "Made to brief",
      dimensions: "Custom",
      weight: "Varies by project",
      stock: 99,
      featured: false,
      bestselling: false,
      popularity: 52,
      created: "2026-11-01",
      specifications: "Contact our Kolhapur studio to discuss scale, finish, timeline, and delivery.",
    },
  ],
  categories: [
    { id: "statues", name: "Chhatrapati Shivaji Maharaj Statues", shortName: "Maharaj Statues", description: "Sculptural tributes shaped with reverence for the Maratha legacy.", image: "/images/shivaji-bust.png", order: 1 },
    { id: "replicas", name: "Maratha Historical Replicas", shortName: "Historical Replicas", description: "Detailed keepsakes inspired by forts, courts, and stories of the past.", image: "/images/fort-miniature.png", order: 2 },
    { id: "weaponry", name: "Traditional Maratha Weaponry", shortName: "Maratha Weaponry", description: "Display pieces recalling the artistry of traditional arms and armour.", image: "/images/maratha-sword.png", order: 3 },
    { id: "mural-frames", name: "Heritage Wall & Mural Frames", shortName: "Wall & Mural Frames", description: "Framed artwork and wall accents for rooms with a story to tell.", image: "/images/heritage-mural.png", order: 4 },
    { id: "sculptures", name: "Handcrafted Sculptures", shortName: "Sculptures", description: "Small-batch sculptures shaped and finished by skilled hands.", image: "/images/artisan-craft.png", order: 5 },
    { id: "custom-decor", name: "Customized Heritage Decor", shortName: "Custom Heritage Decor", description: "Personalized heritage pieces for homes, businesses, and institutions.", image: "/images/rudra-hero.png", order: 6 },
  ],
  orders: [
    { id: "RAH-10482", customerName: "Ananya Deshmukh", email: "ananya@example.com", phone: "98220 44105", date: "2026-11-15", total: 18999, payment: "Online Payment (Demo)", status: "Shipped", items: [{ productId: "shivaji-royal-bronze", name: "Chhatrapati Shivaji Maharaj Royal Bronze Statue", price: 18999, quantity: 1 }], address: "Pune, Maharashtra" },
    { id: "RAH-10461", customerName: "Kunal Patil", email: "kunal@example.com", phone: "98222 87110", date: "2026-11-10", total: 8900, payment: "Cash on Delivery", status: "Processing", items: [{ productId: "maratha-fort-miniature", name: "Handcrafted Maratha Fort Miniature", price: 8900, quantity: 1 }], address: "Kolhapur, Maharashtra" },
    { id: "RAH-10428", customerName: "Meera Kulkarni", email: "meera@example.com", phone: "98223 68111", date: "2026-11-04", total: 11500, payment: "Cash on Delivery", status: "Pending", items: [{ productId: "antique-maratha-sword", name: "Antique-Style Maratha Sword Replica", price: 11500, quantity: 1 }], address: "Mumbai, Maharashtra" },
  ],
  customers: [
    { id: "cus-1", name: "Ananya Deshmukh", email: "ananya@example.com", phone: "98220 44105", totalOrders: 2, totalSpending: 27899 },
    { id: "cus-2", name: "Kunal Patil", email: "kunal@example.com", phone: "98222 87110", totalOrders: 1, totalSpending: 8900 },
    { id: "cus-3", name: "Meera Kulkarni", email: "meera@example.com", phone: "98223 68111", totalOrders: 1, totalSpending: 11500 },
  ],
  inquiries: [
    { id: "inq-1", name: "Rohan Sawant", phone: "98225 21408", email: "rohan@example.com", subject: "Custom foyer sculpture", message: "We would like to discuss a sculpture for our new reception space.", date: "2026-11-18", status: "New" },
    { id: "inq-2", name: "Nisha Jadhav", phone: "98224 63587", email: "nisha@example.com", subject: "Mural frame dimensions", message: "Please share available custom dimensions for the heritage mural.", date: "2026-11-12", status: "Contacted" },
  ],
  testimonials: [
    { id: "review-1", name: "Ananya Deshmukh", product: "Royal Bronze Statue", rating: 5, approved: true, text: "The detailing is beautiful and the finish feels wonderfully considered. It has become the centrepiece of our reading room." },
    { id: "review-2", name: "Vikram Joshi", product: "Maratha Fort Miniature", rating: 5, approved: true, text: "A thoughtful piece with remarkable fort detail. The team helped us choose the right size for our office." },
    { id: "review-3", name: "Meera Kulkarni", product: "Custom Heritage Decor", rating: 5, approved: true, text: "The custom mural brought the history of our family home to life. Excellent communication from start to finish." },
  ],
  gallery: [
    { id: "gallery-1", title: "The Maharaj Collection", image: "/images/shivaji-bust.png", tag: "Sculpture" },
    { id: "gallery-2", title: "Made by Hand", image: "/images/artisan-craft.png", tag: "Craftsmanship" },
    { id: "gallery-3", title: "A Story in Every Frame", image: "/images/heritage-mural.png", tag: "Heritage Art" },
    { id: "gallery-4", title: "Guardians of the Sahyadri", image: "/images/fort-miniature.png", tag: "Historical Replica" },
    { id: "gallery-5", title: "The Art of the Maratha Sword", image: "/images/maratha-sword.png", tag: "Traditional Weaponry" },
  ],
  banner: {
    announcement: "Preserving India's Heritage Through Timeless Craftsmanship",
    eyebrow: "THE ART OF MARATHA HERITAGE",
    heading: "Crafting History. Preserving Heritage.",
    subtitle: "Discover timeless sculptures, historical replicas, and handcrafted heritage art inspired by the legacy of Chhatrapati Shivaji Maharaj.",
    image: "/images/rudra-hero.png",
    ctaText: "Explore Collection",
    ctaLink: "/shop",
    secondaryText: "Discover Our Craft",
    secondaryLink: "/about",
  },
  homepage: {
    storyHeading: "Where History Meets Handcrafted Excellence",
    storyText: "Every creation at Rudra Arts And Handicrafts reflects a deep respect for India's heritage, the courage of the Maratha legacy, and the timeless beauty of traditional craftsmanship.",
    craftFeatures: ["Heritage-Inspired Designs", "Skilled Artisans", "Premium Craftsmanship", "Custom Heritage Creations"],
    newsletterHeading: "Stay Connected with Our Heritage",
    newsletterText: "Hear about new work, heritage stories, and thoughtful pieces from our Kolhapur studio.",
    sectionVisibility: { collections: true, bestsellers: true, story: true, craftsmanship: true, gallery: true, custom: true, testimonials: true, newsletter: true },
    sectionOrder: ["collections", "bestsellers", "story", "craftsmanship", "gallery", "custom", "testimonials", "newsletter"],
  },
  settings: {
    businessName: "Rudra Arts And Handicrafts",
    owner: "Satyajeet Arun Vaidya",
    phone: "8400456555",
    whatsapp: "918400456555",
    email: "rudra.arts30@gmail.com",
    address: "13th Ln, S.T. Colony, Sanmitra Housing Society, Rajarampuri, Kolhapur, Maharashtra 416008, India (Near Hrudam Hospital)",
    website: "",
    instagram: "https://www.instagram.com/",
    facebook: "",
    footerDescription: "Heritage art, sculptures, and traditional handicrafts shaped with care in Kolhapur, Maharashtra.",
    copyright: "© 2026 Rudra Arts And Handicrafts. Crafted with respect for our heritage.",
    businessHours: "Please contact us for current hours.",
  },
};

const LEGACY_IMAGE_URLS = {
  "/images/artisan-craft.png": RUDRA_IMAGES.artisanCraft,
  "/images/fort-miniature.png": RUDRA_IMAGES.fortMiniature,
  "/images/heritage-mural.png": RUDRA_IMAGES.heritageMural,
  "/images/maratha-sword.png": RUDRA_IMAGES.marathaSword,
  "/images/rudra-hero.png": RUDRA_IMAGES.rudraHero,
  "/images/shivaji-bust.png": RUDRA_IMAGES.shivajiBust,
};

export function resolveAssetUrls(value) {
  if (typeof value === "string") return LEGACY_IMAGE_URLS[value] || value;
  if (Array.isArray(value)) return value.map(resolveAssetUrls);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, resolveAssetUrls(entry)]));
  }
  return value;
}

export const INITIAL_STORE = resolveAssetUrls(STOREFRONT_DATA);

export function hydrateStore(savedStore = {}) {
  const saved = resolveAssetUrls(savedStore);
  return {
    ...INITIAL_STORE,
    ...saved,
    banner: { ...INITIAL_STORE.banner, ...(saved.banner || {}) },
    homepage: {
      ...INITIAL_STORE.homepage,
      ...(saved.homepage || {}),
      craftFeatures: Array.isArray(saved.homepage?.craftFeatures)
        ? saved.homepage.craftFeatures
        : INITIAL_STORE.homepage.craftFeatures,
      sectionVisibility: {
        ...INITIAL_STORE.homepage.sectionVisibility,
        ...(saved.homepage?.sectionVisibility || {}),
      },
      sectionOrder: Array.isArray(saved.homepage?.sectionOrder)
        ? saved.homepage.sectionOrder
        : INITIAL_STORE.homepage.sectionOrder,
    },
    settings: { ...INITIAL_STORE.settings, ...(saved.settings || {}) },
  };
}

export const ADMIN_EMAIL = "admin@rudraarts.com";
export const ADMIN_PASSWORD = "Rudra@123";

export function matchesAdminCredentials(email, password) {
  return typeof email === "string" && email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}