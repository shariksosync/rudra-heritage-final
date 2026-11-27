# Rudra Arts Repository Migration

- [x] Bring the linked repository's original artwork, mock catalog, and storefront/admin implementation into this app without importing repository metadata or extra packages.
- [x] Wire the storefront and admin paths into the existing app shell; protect admin pages and preserve demo data safely across refreshes.
- [x] Finish the heritage design tokens, route-specific page metadata, and accessible responsive presentation.
- [x] Verify storefront, search, cart, checkout, inquiries, admin sign-in, and content updates in the running preview; run relevant tests.
- [x] Review this checklist and document the route architecture.

## Route Architecture

- **Root Shell (`src/routes/__root.tsx`)**: Wraps `<Outlet />` with `QueryClientProvider` and `RudraProvider` (`src/context/RudraContext.jsx`), manages default site metadata, loads `src/styles.css`, and preserves shared state (`store`, `cart`, `wishlist`, `customer`, `adminAuthenticated`, `lastOrder`) in `localStorage` (`rudra-arts-demo-v1`).
- **Storefront Routes (`src/routes/`)**:
  - `/` (`index.tsx`), `/shop` (`shop.tsx`), `/collections` (`collections.tsx`), `/gallery` (`gallery.tsx`), `/about` (`about.tsx`), `/contact` (`contact.tsx`), `/wishlist` (`wishlist.tsx`), `/cart` (`cart.tsx`), `/checkout` (`checkout.tsx`), `/order-confirmation` (`order-confirmation.tsx`), `/product/$productId` (`product/$productId.tsx`)
  - `/account` (`account/index.tsx`), `/account/login` (`account/login.tsx`), `/account/register` (`account/register.tsx`)
  - `/*` (`$.tsx`) fallback route rendering the heritage not-found state within `RudraApp`.
- **Admin Routes (`src/routes/admin/`)**:
  - `/admin` (`admin/index.tsx`), `/admin/login` (`admin/login.tsx`), `/admin/dashboard` (`admin/dashboard.tsx`), `/admin/products` (`admin/products.tsx`), `/admin/categories` (`admin/categories.tsx`), `/admin/orders` (`admin/orders.tsx`), `/admin/customers` (`admin/customers.tsx`), `/admin/homepage` (`admin/homepage.tsx`), `/admin/banner` (`admin/banner.tsx`), `/admin/testimonials` (`admin/testimonials.tsx`), `/admin/inquiries` (`admin/inquiries.tsx`), `/admin/settings` (`admin/settings.tsx`).
  - Unauthenticated requests to protected `/admin/*` routes redirect to `/admin/login`; authenticated requests persist across refreshes.
- **Metadata**: Every route defines `head()` via `createPageMeta(title, description)` in `src/lib/page-meta.js`.
