declare module "@/components/RudraApp.jsx" {
  export function RudraApp(): import("react").JSX.Element;
}

declare module "@/components/StoreUI.jsx" {
  export function resolveAssetSrc(src: string): string;
}

declare module "@/context/RudraContext.jsx" {
  export function RudraProvider(props: {
    children: import("react").ReactNode;
  }): import("react").JSX.Element;
  export function useRudra(): Record<string, unknown>;
}

declare module "@/lib/page-meta.js" {
  export type PageMetaTag =
    { title: string } | { name: string; content: string } | { property: string; content: string };

  export function createPageMeta(title: string, description: string): PageMetaTag[];
}

declare module "@/data/mock-data.js" {
  export interface RudraProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number | null;
    image: string;
    images: string[];
    description: string;
    material: string;
    dimensions: string;
    weight: string;
    stock: number;
    featured: boolean;
    bestselling: boolean;
    popularity: number;
    created: string;
    specifications: string;
  }

  export interface RudraCategory {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon?: string;
    image: string;
    order: number;
  }

  export interface RudraGalleryItem {
    id: string;
    title: string;
    tag: string;
    medium?: string;
    image: string;
  }

  export const RUDRA_IMAGES: {
    artisanCraft: string;
    fortMiniature: string;
    heritageMural: string;
    marathaSword: string;
    rudraHero: string;
    shivajiBust: string;
    [key: string]: string;
  };

  export const INITIAL_STORE: {
    products: RudraProduct[];
    categories: RudraCategory[];
    gallery: RudraGalleryItem[];
    banner: { image: string; [key: string]: unknown };
    [key: string]: unknown;
  };
  export const ADMIN_EMAIL: string;
  export const ADMIN_PASSWORD: string;
  export function matchesAdminCredentials(email: string, password: string): boolean;
  export function hydrateStore(savedStore?: Record<string, unknown>): Record<string, unknown>;
}
