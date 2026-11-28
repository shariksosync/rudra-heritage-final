import { useEffect, useMemo, useState } from "react";
import { AdminArea } from "@/components/AdminArea.jsx";
import { Button, Icon, StoreImage, formatPrice } from "@/components/StoreUI.jsx";
import { useRudra } from "@/context/RudraContext.jsx";
import { RUDRA_IMAGES } from "@/data/mock-data.js";

const NAV_ITEMS = [
  ["/", "Home"],
  ["/shop", "Shop"],
  ["/collections", "Collections"],
  ["/gallery", "Heritage Gallery"],
  ["/about", "Our Story"],
  ["/contact", "Contact"],
];

const CRAFT_DESCRIPTIONS = [
  "Rooted in authentic Maratha iconography, historic forts, and royal court references.",
  "Hand-sculpted, cast, and finely patinated by experienced Kolhapur master artisans.",
  "Multi-stage bronze and antique-gold finishes balanced for lasting depth and character.",
  "Tailored scales, bespoke plaques, and architectural commissions crafted for your space.",
];

function InternalLink({ to, className = "", children, ...props }) {
  const { navigate } = useRudra();
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`mb-10 max-w-2xl ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {eyebrow && (
        <p className={`mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? "text-antique-gold" : "text-primary"}`}>
          <span className="h-px w-7 bg-antique-gold" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-[1.14] sm:text-4xl">{title}</h2>
      {copy && <p className={`mt-4 max-w-xl text-sm leading-7 ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{copy}</p>}
    </div>
  );
}

function StoreHeader() {
  const {
    path,
    store,
    cart,
    wishlist,
    mobileMenuOpen,
    setMobileMenuOpen,
    searchOpen,
    setSearchOpen,
    navigate,
    customer,
  } = useRudra();
  const [query, setQuery] = useState("");
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const quickSearches = ["Shivaji", "Sword", "Fort", "Mural"];

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
  }

  return (
    <>
      <div className="bg-burgundy-royal border-b border-antique-gold/35 px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground sm:text-[11px]">
        <span className="mx-2 text-antique-gold" aria-hidden="true">◆</span>
        {store.banner.announcement}
        <span className="mx-2 text-antique-gold" aria-hidden="true">◆</span>
      </div>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 shadow-[0_2px_20px_rgba(36,32,29,0.06)] backdrop-blur-md transition-shadow duration-300">
        <div className="mx-auto flex min-h-[80px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-7 lg:px-10">
          <InternalLink to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-label="Rudra Arts And Handicrafts home">
            <span className="relative grid size-10 shrink-0 place-items-center border border-antique-gold/85 bg-card/80 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:size-12">
              <span className="pointer-events-none absolute inset-1 border border-antique-gold/30" aria-hidden="true" />
              <Icon name="crest" size={24} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base leading-tight sm:text-lg">Rudra Arts</span>
              <span className="mt-1 block truncate text-[8.5px] font-medium uppercase tracking-[0.09em] text-muted-foreground sm:text-[10px] sm:tracking-[0.18em]">And Handicrafts</span>
            </span>
          </InternalLink>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
            {NAV_ITEMS.map(([to, label]) => {
              const active = path === to;
              return (
                <InternalLink
                  key={to}
                  to={to}
                  className={`relative border-b-2 py-2.5 text-[12.5px] font-medium tracking-[0.03em] transition-all duration-300 ${active ? "border-primary text-primary" : "border-transparent text-foreground/80 hover:border-antique-gold hover:text-primary"}`}
                >
                  {label}
                </InternalLink>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
            <button type="button" title="Search products" aria-label="Search products" onClick={() => setSearchOpen((open) => !open)} className="grid size-10 place-items-center rounded-full text-foreground transition-colors duration-300 hover:bg-sand/60 hover:text-primary"><Icon name="search" /></button>
            <InternalLink to="/wishlist" title="Wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors duration-300 hover:bg-sand/60 hover:text-primary"><Icon name="heart" />{wishlist.length > 0 && <span className="absolute right-0.5 top-0.5 grid size-[17px] place-items-center rounded-full bg-primary text-[9px] font-semibold tabular-nums text-primary-foreground">{wishlist.length}</span>}</InternalLink>
            <InternalLink to="/cart" title="Shopping cart" aria-label={`Shopping cart, ${cartCount} items`} className="relative grid size-10 place-items-center rounded-full text-foreground transition-colors duration-300 hover:bg-sand/60 hover:text-primary"><Icon name="cart" />{cartCount > 0 && <span className="absolute right-0.5 top-0.5 grid size-[17px] place-items-center rounded-full bg-primary text-[9px] font-semibold tabular-nums text-primary-foreground">{cartCount}</span>}</InternalLink>
            <InternalLink to={customer ? "/account" : "/account/login"} title={customer ? "Your account" : "Customer sign in"} aria-label={customer ? "Your account" : "Customer sign in"} className="hidden size-10 place-items-center rounded-full text-foreground transition-colors duration-300 hover:bg-sand/60 hover:text-primary sm:grid"><Icon name="users" /></InternalLink>
            <button type="button" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-sand/60 xl:hidden"><Icon name={mobileMenuOpen ? "close" : "menu"} /></button>
          </div>
        </div>

        {searchOpen && (
          <div className="animate-drawer-in border-t border-border bg-card/95 px-4 py-5 shadow-product sm:px-7 lg:px-10">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-[1440px] items-center gap-3">
              <Icon name="search" className="text-primary" />
              <input autoFocus aria-label="Search the collection" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search statues, fort miniatures, swords, or murals..." className="min-h-11 min-w-0 flex-1 border-b border-input bg-transparent px-1 text-sm outline-none transition-colors focus:border-primary" />
              <Button type="submit" size="small">Search</Button>
            </form>
            <div className="mx-auto mt-3 flex max-w-[1440px] flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Popular:</span>
              {quickSearches.map((term) => (
                <button key={term} type="button" onClick={() => navigate(`/shop?q=${encodeURIComponent(term)}`)} className="border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-antique-gold hover:text-primary">{term}</button>
              ))}
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <nav className="animate-drawer-in border-t border-border bg-card px-4 py-2 xl:hidden" aria-label="Mobile navigation">
            {NAV_ITEMS.map(([to, label]) => (
              <InternalLink key={to} to={to} className={`flex min-h-11 items-center justify-between border-b border-border/70 text-sm transition-colors ${path === to ? "font-semibold text-primary" : "text-foreground"}`}>
                <span>{label}</span>
                <Icon name="chevron" size={15} className="text-muted-foreground" />
              </InternalLink>
            ))}
            <InternalLink to={customer ? "/account" : "/account/login"} className="flex min-h-11 items-center justify-between text-sm text-foreground">
              <span>{customer ? "My account" : "Customer sign in"}</span>
              <Icon name="users" size={16} className="text-muted-foreground" />
            </InternalLink>
          </nav>
        )}
      </header>
    </>
  );
}

function ProductCard({ product }) {
  const { store, navigate, addToCart, buyNow, wishlist, toggleWishlist, setQuickProduct } = useRudra();
  const category = store.categories.find((item) => item.id === product.category);
  const onSale = Number(product.originalPrice) > Number(product.price);
  const discount = onSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const savings = onSale ? Number(product.originalPrice) - Number(product.price) : 0;
  const wished = wishlist.includes(product.id);

  return (
    <article className="heritage-card group flex min-w-0 flex-col border border-border/80 bg-card p-2.5 shadow-product sm:p-3.5">
      <div className="relative aspect-square overflow-hidden bg-sand/35 image-lift">
        <button type="button" aria-label={`View ${product.name}`} onClick={() => navigate(`/product/${product.id}`)} className="absolute inset-0 z-[1] size-full">
          <StoreImage src={product.image} alt={product.name} loading="lazy" className="size-full object-cover" />
        </button>
        {onSale && (
          <span className="absolute left-2.5 top-2.5 z-[2] border border-antique-gold/55 bg-primary px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-xs">
            {discount}% off
          </span>
        )}
        <div className="absolute right-2.5 top-2.5 z-[3] flex flex-col gap-1.5">
          <button
            type="button"
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wished}
            onClick={() => toggleWishlist(product.id)}
            className={`grid size-9 place-items-center rounded-full border border-border/80 bg-background/95 shadow-xs backdrop-blur-xs transition-all duration-300 ${wished ? "border-primary/40 text-primary" : "text-foreground hover:border-antique-gold hover:text-primary"}`}
          >
            <Icon name="heart" size={15} />
          </button>
          <button
            type="button"
            aria-label={`Quick view ${product.name}`}
            title="Quick view"
            onClick={() => setQuickProduct(product)}
            className="grid size-9 place-items-center rounded-full border border-border/80 bg-background/95 text-foreground shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-antique-gold hover:text-primary sm:hidden"
          >
            <Icon name="eye" size={15} />
          </button>
        </div>
        <button
          type="button"
          aria-label={`Quick inspect ${product.name}`}
          onClick={() => setQuickProduct(product)}
          className="absolute bottom-2.5 left-2.5 right-2.5 z-[2] hidden min-h-9 items-center justify-center gap-1.5 border border-antique-gold/50 bg-background/95 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground backdrop-blur-xs transition-all duration-300 sm:flex sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 hover:border-primary hover:text-primary"
        >
          <Icon name="eye" size={14} />Quick view
        </button>
      </div>
      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/80">{category?.shortName || category?.name || "Heritage art"}</p>
        <InternalLink to={`/product/${product.id}`} className="mt-1.5 block min-h-11 font-display text-[15px] leading-snug text-foreground transition-colors duration-300 hover:text-primary sm:text-base">{product.name}</InternalLink>
        <div className="mt-2 flex flex-wrap items-baseline gap-2 tabular-nums">
          <span className="text-sm font-semibold text-foreground sm:text-[15px]">{product.price > 0 ? formatPrice(product.price) : "Price on request"}</span>
          {onSale && <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
          {savings > 0 && <span className="hidden text-[10px] font-semibold text-primary sm:inline">Save {formatPrice(savings)}</span>}
        </div>
        {product.price > 0 ? (
          <div className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button size="small" variant="outline" className="w-full" onClick={() => addToCart(product)}>
              <Icon name="bag" size={14} />Add to cart
            </Button>
            <Button size="small" variant="primary" className="w-full" onClick={() => buyNow(product)}>
              Buy now
            </Button>
          </div>
        ) : (
          <Button size="small" variant="outline" className="mt-3.5 w-full" onClick={() => navigate("/contact?type=custom")}>
            <Icon name="message" size={14} />Request details
          </Button>
        )}
      </div>
    </article>
  );
}

function ProductGrid({ products, emptyMessage = "No pieces match these filters." }) {
  if (products.length === 0) return <p className="border-y border-border bg-card/60 py-14 text-center text-sm text-muted-foreground">{emptyMessage}</p>;
  return <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

function ProvenanceStrip() {
  const pillars = [
    ["award", "Handcrafted in Kolhapur", "Sculpted & finished in our studio"],
    ["spark", "Museum-Grade Patina", "Multi-stage bronze & gold detailing"],
    ["shield", "Insured Dispatch", "Custom foam & wooden crating"],
    ["layers", "Bespoke Commissions", "Tailored dimensions for any space"],
  ];
  return (
    <section aria-label="Atelier guarantees" className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-[1440px] divide-y divide-border/70 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {pillars.map(([icon, title, subtitle]) => (
          <div key={title} className="flex items-center gap-3.5 px-4 py-4 sm:px-7 lg:py-5">
            <span className="grid size-10 shrink-0 place-items-center border border-antique-gold/55 bg-sand/40 text-primary">
              <Icon name={icon} size={18} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-medium text-foreground">{title}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollectionsSection({ compact = false }) {
  const { store, navigate } = useRudra();
  const categories = [...store.categories].sort((a, b) => Number(a.order) - Number(b.order));
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Explore the atelier" title="Collections shaped by history" copy="Discover sculptural tributes, finely finished replicas, and heritage pieces crafted for refined spaces." />
        {compact && <InternalLink to="/collections" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-antique-gold">View all collections <Icon name="arrow" size={16} /></InternalLink>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const count = store.products.filter((item) => item.category === category.id).length;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(`/shop?category=${encodeURIComponent(category.id)}`)}
              className={`heritage-card group relative min-h-[250px] overflow-hidden border border-border/70 text-left shadow-product sm:min-h-[280px] ${index === 0 ? "lg:col-span-2 lg:row-span-2 lg:min-h-[576px]" : ""}`}
            >
              <StoreImage src={category.image} alt={category.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/65 to-charcoal/20" />
              <span className="pointer-events-none absolute inset-3 border border-antique-gold/25 transition-colors duration-300 group-hover:border-antique-gold/65" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-6">
                <span className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold">
                  <span>Collection {String(index + 1).padStart(2, "0")}</span>
                  <span className="border border-antique-gold/45 bg-charcoal/70 px-2 py-0.5 text-[9px] text-primary-foreground">{count > 0 ? `${count} ${count === 1 ? "Piece" : "Pieces"}` : "Curated"}</span>
                </span>
                <span className="block max-w-sm font-display text-2xl leading-tight text-primary-foreground sm:text-3xl">{category.name}</span>
                <span className="mt-2 block max-w-sm text-xs leading-5 text-primary-foreground/82">{category.description}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-antique-gold transition-transform duration-300 group-hover:translate-x-1">Explore collection <Icon name="arrow" size={14} /></span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function StorySection({ compact = false }) {
  const { store, navigate } = useRudra();
  return (
    <section className="border-y border-border/70 bg-sand/45">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-14 sm:px-7 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-10">
        <div className="relative min-h-[320px] overflow-hidden border border-antique-gold/40 shadow-heritage sm:min-h-[450px]">
          <StoreImage src={RUDRA_IMAGES.artisanCraft} alt="An artisan finishing a handcrafted Maratha sculpture" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between border border-antique-gold/35 bg-charcoal/75 p-4 text-primary-foreground backdrop-blur-xs sm:inset-x-6 sm:bottom-6 sm:p-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold">Kolhapur Atelier</p>
              <span className="mt-1 block font-display text-xl sm:text-2xl">Led by {store.settings.owner}</span>
            </div>
            <span className="grid size-11 shrink-0 place-items-center border border-antique-gold/70 bg-primary/40"><Icon name="spark" size={20} className="text-antique-gold" /></span>
          </div>
        </div>
        <div className="max-w-xl">
          <SectionHeading eyebrow="A living tradition" title={store.homepage.storyHeading} copy={store.homepage.storyText} />
          <p className="border-l-2 border-antique-gold pl-4 text-sm leading-7 text-muted-foreground">Each piece begins with historical research and reverence, shaped through patient artistry and hand-applied patina finishes in Kolhapur, Maharashtra.</p>
          <div className="mt-7 grid grid-cols-3 gap-4 border-y border-border/80 py-5">
            <div><p className="font-display text-xl text-primary sm:text-2xl">100%</p><p className="mt-1 text-[11px] text-muted-foreground">Hand-finished detail</p></div>
            <div><p className="font-display text-xl text-primary sm:text-2xl">Custom</p><p className="mt-1 text-[11px] text-muted-foreground">Scale & patina options</p></div>
            <div><p className="font-display text-xl text-primary sm:text-2xl">Pan-India</p><p className="mt-1 text-[11px] text-muted-foreground">Insured atelier delivery</p></div>
          </div>
          {!compact && <Button onClick={() => navigate("/about")} className="mt-7">Our story <Icon name="arrow" size={16} /></Button>}
          {compact && <Button variant="outline" onClick={() => navigate("/about")} className="mt-7">Discover our craft <Icon name="arrow" size={16} /></Button>}
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipSection() {
  const { store } = useRudra();
  const icons = ["spark", "users", "award", "layers"];
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
      <SectionHeading eyebrow="The Rudra standard" title="Craft with meaning" copy="Heritage-led design, patient hands, and considered finishes come together in every piece." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {store.homepage.craftFeatures.map((feature, index) => (
          <div key={`${feature}-${index}`} className="heritage-card relative border border-border/80 bg-card p-6 shadow-product">
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center border border-antique-gold/60 bg-sand/45 text-primary">
                <Icon name={icons[index % icons.length]} size={20} />
              </span>
              <span className="font-display text-sm text-antique-gold">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 font-display text-xl">{feature}</h3>
            <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{CRAFT_DESCRIPTIONS[index % CRAFT_DESCRIPTIONS.length]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ compact = false }) {
  const { store, setLightboxItem } = useRudra();
  const entries = compact ? store.gallery.slice(0, 3) : store.gallery;
  return (
    <section className="bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading light eyebrow="The heritage gallery" title="A closer look at the craft" copy="Click any creation to inspect its texture, proportions, and heritage narrative." />
          {compact && <InternalLink to="/gallery" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-antique-gold transition-colors hover:text-primary-foreground">Enter the gallery <Icon name="arrow" size={16} /></InternalLink>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxItem(item)}
              className={`group relative aspect-[4/3] overflow-hidden border border-primary-foreground/15 text-left transition-colors duration-300 hover:border-antique-gold/70 ${index === 0 && !compact ? "sm:row-span-2 sm:aspect-auto" : ""}`}
            >
              <StoreImage src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-transparent" />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-antique-gold/50 bg-charcoal/70 text-antique-gold opacity-80 transition-opacity group-hover:opacity-100"><Icon name="eye" size={16} /></span>
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-antique-gold">{item.tag}</span>
                <span className="mt-1.5 block font-display text-xl">{item.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomOrderSection() {
  const { store, setInquiryOpen } = useRudra();
  return (
    <section className="bg-burgundy-royal relative overflow-hidden text-primary-foreground">
      <div className="pointer-events-none absolute inset-3 hidden border border-antique-gold/25 sm:block lg:inset-5" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 px-4 py-14 sm:px-7 sm:py-16 lg:flex-row lg:items-center lg:px-12">
        <div className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-antique-gold">
            <span className="h-px w-6 bg-antique-gold" aria-hidden="true" />Made for your space
          </p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">Bring your heritage vision to life</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/82">From personalized sculptures to large-scale institutional and architectural heritage installations, our studio crafts heirloom pieces tailored to your exact brief.</p>
        </div>
        <Button variant="outlineGold" className="shrink-0" onClick={() => setInquiryOpen(true)}>Request a custom order <Icon name="arrow" size={16} /></Button>
        <span className="sr-only">{store.settings.businessName}</span>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { store } = useRudra();
  const reviews = store.testimonials.filter((item) => item.approved);
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
      <SectionHeading eyebrow="In their homes and collections" title="Stories from our customers" copy="Thoughtful pieces, made to be passed on and remembered." />
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.id} className="heritage-card relative flex flex-col justify-between border border-border/80 border-t-2 border-t-antique-gold bg-card p-6 shadow-product sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div aria-label={`${review.rating} out of 5 stars`} className="flex gap-1 text-antique-gold">{Array.from({ length: review.rating }, (_, index) => <Icon key={index} name="star" size={14} />)}</div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">Verified Collector</span>
              </div>
              <blockquote className="mt-4 font-display text-lg leading-7 text-foreground">“{review.text}”</blockquote>
            </div>
            <figcaption className="mt-6 border-t border-border/70 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-foreground">{review.name}<span className="mt-1 block font-normal normal-case tracking-normal text-muted-foreground">{review.product}</span></figcaption>
          </figure>
        ))}
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">Customer stories will be shared here soon.</p>}
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { store } = useRudra();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  }

  return (
    <section className="border-y border-border bg-sand/50">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-14 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary"><span className="h-px w-5 bg-antique-gold" aria-hidden="true" />Notes from the atelier</p>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl">{store.homepage.newsletterHeading || "Stay connected with our heritage"}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{store.homepage.newsletterText || "Hear about new work, heritage stories, and thoughtful pieces from our Kolhapur studio."}</p>
        </div>
        <div className="w-full max-w-lg">
          <form noValidate className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              required
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              placeholder="Your email address"
              className="min-h-12 min-w-0 flex-1 border border-input bg-card px-4 text-sm outline-none transition-colors focus:border-primary"
              disabled={subscribed}
            />
            <Button type="submit" disabled={subscribed}>{subscribed ? "You're on the list" : "Subscribe"}</Button>
          </form>
          {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
          {subscribed && <p role="status" className="mt-2 text-sm text-primary">Thank you for subscribing. We’ll be in touch with notes from the atelier.</p>}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { store, navigate } = useRudra();
  const sections = {
    collections: <CollectionsSection key="collections" compact />,
    bestsellers: <BestSellersSection key="bestsellers" />,
    story: <StorySection key="story" compact />,
    craftsmanship: <CraftsmanshipSection key="craftsmanship" />,
    gallery: <GallerySection key="gallery" compact />,
    custom: <CustomOrderSection key="custom" />,
    testimonials: <TestimonialsSection key="testimonials" />,
    newsletter: <NewsletterSection key="newsletter" />,
  };
  const visibility = store.homepage.sectionVisibility || {};
  const order = store.homepage.sectionOrder || Object.keys(sections);

  return (
    <>
      <section className="relative isolate min-h-[600px] overflow-hidden bg-charcoal text-primary-foreground sm:min-h-[680px] lg:min-h-[740px]">
        <StoreImage src={store.banner.image} alt="Antique-finish Maratha heritage sculpture in a traditional setting" className="animate-slow-zoom absolute inset-0 size-full object-cover object-center" fetchPriority="high" />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="pointer-events-none absolute inset-4 hidden border border-antique-gold/25 sm:block lg:inset-6" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[600px] max-w-[1440px] items-center px-4 py-16 sm:min-h-[680px] sm:px-7 lg:min-h-[740px] lg:px-10">
          <div className="animate-fade-up max-w-2xl py-10">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-antique-gold"><span className="h-px w-8 bg-antique-gold/85" aria-hidden="true" />{store.banner.eyebrow}</p>
            <h1 className="max-w-2xl font-display text-4xl leading-[1.06] sm:text-6xl">{store.banner.heading}</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-primary-foreground/88 sm:text-base sm:leading-8">{store.banner.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button variant="gold" onClick={() => navigate(store.banner.ctaLink || "/shop")}>{store.banner.ctaText || "Explore Collection"}<Icon name="arrow" size={16} /></Button>
              <Button variant="outlineLight" onClick={() => navigate(store.banner.secondaryLink || "/about")}>{store.banner.secondaryText || "Discover Our Craft"}</Button>
            </div>
            <p className="mt-12 flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/75"><span className="h-px w-10 bg-antique-gold" />Kolhapur, Maharashtra · Handcrafted Legacy · Custom Commissions</p>
          </div>
        </div>
      </section>
      <ProvenanceStrip />
      {order.filter((key) => visibility[key] !== false && sections[key]).map((key) => sections[key])}
      <div className="sr-only">{navigate ? "Rudra Arts And Handicrafts" : ""}</div>
    </>
  );
}

function BestSellersSection() {
  const { store, navigate } = useRudra();
  const products = store.products.filter((item) => item.bestselling).slice(0, 4);
  return (
    <section className="bg-sand/35">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Chosen with care" title="Bestselling pieces" copy="A curated selection of sculptures and heritage keepsakes, crafted to anchor living spaces and institutions." />
          <Button variant="outline" className="mb-10" onClick={() => navigate("/shop")}>Shop all pieces <Icon name="arrow" size={16} /></Button>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

function CollectionPage() {
  return <><PageBanner eyebrow="Explore the atelier" title="Heritage collections" copy="Explore a considered range of Maratha-inspired art, historical replicas, and bespoke decor." /><CollectionsSection /></>;
}

function PageBanner({ eyebrow, title, copy }) {
  return (
    <section className="relative border-b border-border bg-sand/50">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10">
        <p className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><span className="h-px w-6 bg-antique-gold" aria-hidden="true" />{eyebrow}</p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        {copy && <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{copy}</p>}
      </div>
    </section>
  );
}

function ShopPage() {
  const { store, urlSearch } = useRudra();
  const [search, setSearch] = useState(String(urlSearch.q || ""));
  const [category, setCategory] = useState(String(urlSearch.category || "all"));
  const [sort, setSort] = useState("popular");
  const [saleOnly, setSaleOnly] = useState(false);
  const [limit, setLimit] = useState(8);
  const [maxPrice, setMaxPrice] = useState("all");
  const categories = [...store.categories].sort((a, b) => Number(a.order) - Number(b.order));

  const matchingProducts = useMemo(() => {
    let result = store.products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchMatch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase());
      const priceMatch = maxPrice === "all" || Number(product.price) <= Number(maxPrice) || Number(product.price) === 0;
      const saleMatch = !saleOnly || Number(product.originalPrice) > Number(product.price);
      return categoryMatch && searchMatch && priceMatch && saleMatch;
    });
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "newest") result = [...result].sort((a, b) => String(b.created).localeCompare(String(a.created)));
    if (sort === "popular") result = [...result].sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0));
    return result;
  }, [store.products, category, search, maxPrice, saleOnly, sort]);

  return (
    <>
      <PageBanner eyebrow="The Rudra collection" title="Shop heritage art" copy="Find a meaningful piece inspired by the enduring courage, artistry, and stories of the Maratha legacy." />
      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-7 sm:py-14 lg:px-10">
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Quick collection filters">
          <button type="button" onClick={() => { setCategory("all"); setLimit(8); }} className={`border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${category === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-antique-gold hover:text-primary"}`}>
            All pieces
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setCategory(item.id); setLimit(8); }}
              className={`border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${category === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-antique-gold hover:text-primary"}`}
            >
              {item.shortName || item.name}
            </button>
          ))}
        </div>

        <div className="mb-8 grid gap-3 border border-border/80 bg-card p-4 shadow-product sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_0.9fr_auto]">
          <label className="block text-xs font-semibold text-muted-foreground">Search
            <span className="mt-1 flex min-h-11 items-center gap-2 border border-input bg-background px-3"><Icon name="search" size={16} /><input aria-label="Search products" value={search} onChange={(event) => { setSearch(event.target.value); setLimit(8); }} placeholder="Search the collection" className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" /></span>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">Collection
            <select aria-label="Filter by collection" value={category} onChange={(event) => { setCategory(event.target.value); setLimit(8); }} className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-sm text-foreground"><option value="all">All collections</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.shortName || item.name}</option>)}</select>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">Maximum price
            <select aria-label="Maximum price" value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); setLimit(8); }} className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-sm text-foreground"><option value="all">Any price</option><option value="10000">Under ₹10,000</option><option value="15000">Under ₹15,000</option><option value="25000">Under ₹25,000</option><option value="50000">Under ₹50,000</option></select>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">Sort by
            <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-sm text-foreground"><option value="popular">Popularity</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select>
          </label>
          <label className="flex min-h-11 items-end gap-2 pb-3 text-xs font-medium text-foreground"><input type="checkbox" checked={saleOnly} onChange={(event) => { setSaleOnly(event.target.checked); setLimit(8); }} className="size-4 accent-primary" />On sale</label>
        </div>
        <div className="mb-5 flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{matchingProducts.length} pieces</p><button type="button" onClick={() => { setSearch(""); setCategory("all"); setSort("popular"); setSaleOnly(false); setMaxPrice("all"); setLimit(8); }} className="text-xs font-semibold text-primary hover:underline">Clear filters</button></div>
        <ProductGrid products={matchingProducts.slice(0, limit)} />
        {matchingProducts.length > limit && <div className="mt-10 text-center"><Button variant="outline" onClick={() => setLimit((current) => current + 8)}>Load more</Button></div>}
      </main>
    </>
  );
}

function GalleryPage() {
  const { store, setLightboxItem } = useRudra();
  return (
    <>
      <PageBanner eyebrow="From our studio" title="Heritage gallery" copy="Select any creation to open an enlarged museum view with its craft category and commission option." />
      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-7 sm:py-14 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {store.gallery.map((item, index) => (
            <figure key={item.id} className={`heritage-card group border border-border/80 bg-card p-3 shadow-product ${index === 0 ? "lg:row-span-2" : ""}`}>
              <button type="button" onClick={() => setLightboxItem(item)} aria-label={`Inspect ${item.title}`} className={`relative block w-full overflow-hidden bg-muted ${index === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <StoreImage src={item.image} alt={item.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-antique-gold/60 bg-charcoal/75 text-antique-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"><Icon name="eye" size={16} /></span>
              </button>
              <figcaption className="flex items-start justify-between gap-4 pt-4 pb-1">
                <span className="font-display text-lg">{item.title}</span>
                <span className="pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{item.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </main>
    </>
  );
}

function AboutPage() {
  const { store, navigate } = useRudra();
  return (
    <>
      <PageBanner eyebrow="Our story" title="Crafted in Kolhapur, inspired by a legacy" copy={store.homepage.storyText} />
      <StorySection />
      <main className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">The work we do</p><h2 className="mt-3 font-display text-3xl">Heritage art with a place in the present</h2></div>
          <div className="space-y-5 text-sm leading-7 text-muted-foreground"><p>{store.settings.businessName} designs, crafts, and supplies premium Chhatrapati Shivaji Maharaj statues, historical replicas, traditional Maratha weaponry, mural frames, and customized heritage decor.</p><p>Founded by {store.settings.owner}, our Kolhapur studio brings together a deep respect for India's history and a careful eye for objects that belong in homes, businesses, and institutions.</p><p>Every commission is approached with care—from the first conversation about scale and finish to the final details that make a piece feel at home in its setting.</p><Button onClick={() => navigate("/contact")}>Speak with our studio <Icon name="arrow" size={16} /></Button></div>
        </div>
      </main>
      <CraftsmanshipSection />
    </>
  );
}

function InquiryForm({ subject = "General enquiry", showTypeTabs = false, onClose }) {
  const { addInquiry } = useRudra();
  const [selectedSubject, setSelectedSubject] = useState(subject);
  const [sent, setSent] = useState(false);
  const inquiryTypes = ["General enquiry", "Custom heritage order", "Product enquiry"];
  function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    addInquiry({ ...fields, subject: fields.subject || selectedSubject });
    setSent(true);
    event.currentTarget.reset();
  }
  if (sent) return <div role="status" className="border border-antique-gold bg-sand/50 p-6"><p className="font-display text-2xl">Thank you for reaching out.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Our Kolhapur studio has received your message and will be in touch.</p><div className="mt-5 flex flex-wrap gap-2"><Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>{onClose && <Button variant="ghost" onClick={onClose}>Close</Button>}</div></div>;
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      {showTypeTabs && (
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Inquiry type">
          {inquiryTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedSubject(type)}
              className={`border px-3 py-1.5 text-xs font-semibold transition-colors ${selectedSubject === type ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-antique-gold"}`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
      <label className="text-xs font-semibold">Your name<input required name="name" autoComplete="name" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold">Phone number<input required type="tel" name="phone" autoComplete="tel" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold">Subject<input required name="subject" value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)} className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold sm:col-span-2">How can we help?<textarea required name="message" rows="4" className="mt-1.5 w-full border border-input bg-background px-3 py-3 text-sm font-normal" /></label>
      <div className="sm:col-span-2"><Button type="submit">Send enquiry <Icon name="arrow" size={16} /></Button></div>
    </form>
  );
}

function ContactPage() {
  const { store, urlSearch } = useRudra();
  const subject = urlSearch.type === "custom" ? "Custom heritage order" : urlSearch.type === "product" ? "Product enquiry" : "General enquiry";
  const { whatsappUrl, telUrl } = buildContactLinks(store.settings);
  return (
    <>
      <PageBanner eyebrow="Talk with our studio" title="Contact Rudra Arts" copy="Whether you have a question about a piece or a vision for a custom creation, our team would be glad to hear from you." />
      <main className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 sm:px-7 sm:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
        <aside className="space-y-6">
          <div className="border border-border/80 bg-card p-6 shadow-product">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Visit or call</p>
            <h2 className="mt-3 font-display text-2xl">{store.settings.businessName}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{store.settings.address}</p>
            <div className="mt-5 space-y-3 border-t border-border pt-5">
              <a href={telUrl} className="flex items-center gap-3 text-sm hover:text-primary"><Icon name="phone" size={17} className="text-antique-gold" />{store.settings.phone}</a>
              <a href={`mailto:${store.settings.email}`} className="flex items-center gap-3 text-sm hover:text-primary"><Icon name="mail" size={17} className="text-antique-gold" />{store.settings.email}</a>
              <p className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><Icon name="clock" size={17} className="mt-0.5 shrink-0 text-antique-gold" />{store.settings.businessHours}</p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 border border-antique-gold/70 bg-sand/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
              <Icon name="whatsapp" size={15} className="text-[#25d366]" />Chat directly on WhatsApp
            </a>
          </div>
          <div className="border border-antique-gold/45 bg-sand/50 p-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Custom heritage work</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Share your space, dimensions, and finish inspiration. Led by {store.settings.owner}, our studio guides every custom piece from sketch to installation.</p></div>
        </aside>
        <section className="border border-border/80 bg-card p-5 shadow-product sm:p-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Send us a message</p><h2 className="mb-6 font-display text-2xl">Start a conversation</h2><InquiryForm key={subject} subject={subject} showTypeTabs /></section>
      </main>
    </>
  );
}

function ProductDetailPage({ product }) {
  const { store, addToCart, buyNow, toggleWishlist, wishlist, navigate } = useRudra();
  const [image, setImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  if (!product) return <EmptyState title="This piece is not available" actionLabel="Return to shop" action={() => navigate("/shop")} />;
  const related = store.products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);
  const images = product.images?.length ? product.images : [product.image];
  const onSale = Number(product.originalPrice) > Number(product.price);
  const { whatsappUrl } = buildContactLinks(store.settings, `Namaskar! I would like details about "${product.name}".`);
  return (
    <>
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-7 sm:py-12 lg:px-10">
        <p className="mb-7 text-xs text-muted-foreground"><InternalLink to="/shop" className="hover:text-primary">Shop</InternalLink><span className="px-2">/</span>{product.name}</p>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="grid gap-3 sm:grid-cols-[76px_1fr] lg:sticky lg:top-24 lg:h-fit">
            <div className="order-2 flex gap-2 overflow-auto sm:order-1 sm:flex-col">{images.map((src, index) => <button key={`${src}-${index}`} type="button" onClick={() => setImage(src)} aria-label={`View product image ${index + 1}`} className={`size-[68px] shrink-0 overflow-hidden border transition-all duration-300 ${image === src ? "border-primary ring-1 ring-antique-gold/60" : "border-border hover:border-antique-gold"}`}><StoreImage src={src} alt="" className="size-full object-cover" /></button>)}</div>
            <div className="image-lift order-1 aspect-square overflow-hidden border border-border/80 bg-sand/30 shadow-heritage sm:order-2"><StoreImage src={image || product.image} alt={product.name} className="size-full object-cover" /></div>
          </div>
          <div className="py-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{store.categories.find((item) => item.id === product.category)?.name || "Heritage collection"}</p>
              <span className="border border-antique-gold/60 bg-sand/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">{product.stock > 0 ? "Ready for Insured Dispatch" : "Made to Commission"}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 tabular-nums"><span className="text-2xl font-semibold">{product.price > 0 ? formatPrice(product.price) : "Price on request"}</span>{onSale && <><span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span><span className="bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</span></>}</div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{product.description}</p>
            <p className="mt-4 text-xs font-medium text-muted-foreground">{product.stock > 0 ? `${product.stock} pieces available in studio` : "Made to order — enquire for lead time"}</p>
            {product.price > 0 ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex min-h-11 items-center border border-input bg-card"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="grid size-10 place-items-center text-foreground transition-colors hover:text-primary">−</button><span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => Math.min(Number(product.stock) || 99, current + 1))} className="grid size-10 place-items-center text-foreground transition-colors hover:text-primary">+</button></div>
                <Button variant="primary" onClick={() => buyNow(product, quantity)}>Buy now <Icon name="arrow" size={16} /></Button>
                <Button variant="outline" onClick={() => addToCart(product, quantity)}><Icon name="bag" size={16} />Add to cart</Button>
                <Button variant="outline" aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wishlist.includes(product.id)} onClick={() => toggleWishlist(product.id)}><Icon name="heart" /></Button>
              </div>
            ) : (
              <Button className="mt-6" onClick={() => navigate("/contact?type=custom")}>Request a custom quote <Icon name="arrow" size={16} /></Button>
            )}
            <div className="mt-6 grid gap-3 border border-border/80 bg-sand/35 p-4 text-xs sm:grid-cols-2">
              <p className="flex items-center gap-2 text-foreground"><Icon name="shield" size={15} className="shrink-0 text-primary" />Insured protective crating</p>
              <p className="flex items-center gap-2 text-foreground"><Icon name="award" size={15} className="shrink-0 text-primary" />Hand-finished in Kolhapur</p>
            </div>
            <div className="mt-8 border-t border-border pt-5">
              <h2 className="font-display text-xl">Piece specifications</h2>
              <dl className="mt-4 grid grid-cols-[115px_1fr] gap-x-4 gap-y-3 text-sm"><dt className="text-muted-foreground">Material</dt><dd>{product.material || "Made to brief"}</dd><dt className="text-muted-foreground">Dimensions</dt><dd>{product.dimensions || "Made to order"}</dd><dt className="text-muted-foreground">Weight</dt><dd>{product.weight || "Varies by piece"}</dd><dt className="text-muted-foreground">Craft Notes</dt><dd>{product.specifications || "Hand-finished by our artisans."}</dd></dl>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
              <Icon name="whatsapp" size={16} className="text-[#25d366]" />Have a question? Ask our studio on WhatsApp
            </a>
          </div>
        </div>
      </main>
      {related.length > 0 && <section className="border-t border-border/70 bg-sand/35"><div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 lg:px-10"><SectionHeading eyebrow="Continue exploring" title="Related pieces" /><ProductGrid products={related} /></div></section>}
    </>
  );
}

function EmptyState({ title, actionLabel, action, secondaryTo, secondaryLabel }) {
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-14 text-center"><span className="grid size-14 place-items-center border border-antique-gold bg-card text-primary shadow-product"><Icon name="crest" size={26} /></span><h1 className="mt-5 font-display text-3xl">{title}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Your next treasured piece may be waiting in the collection.</p><div className="mt-6 flex flex-wrap justify-center gap-3">{action && <Button onClick={action}>{actionLabel || "Continue"}</Button>}{secondaryTo && <InternalLink to={secondaryTo} className="inline-flex min-h-11 items-center border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">{secondaryLabel}</InternalLink>}</div></div>;
}

function CheckoutSteps({ step = 1 }) {
  const steps = ["Shopping Bag", "Details & Payment", "Order Certificate"];
  return (
    <div className="border-b border-border bg-card/80">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-4 px-4 py-3.5 sm:gap-8 sm:px-7 lg:px-10">
        {steps.map((label, idx) => {
          const num = idx + 1;
          const active = step === num;
          const done = step > num;
          return (
            <div key={label} className="flex items-center gap-2.5 text-xs">
              <span className={`grid size-6 place-items-center rounded-full border text-[10px] font-semibold tabular-nums ${done ? "border-antique-gold bg-antique-gold text-charcoal" : active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                {done ? <Icon name="check" size={12} /> : num}
              </span>
              <span className={active ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CartPage() {
  const { cart, store, setCartQuantity, navigate } = useRudra();
  const items = cart.map((entry) => ({ ...entry, product: store.products.find((product) => product.id === entry.productId) })).filter((entry) => entry.product);
  const subtotal = items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
  if (items.length === 0) return <EmptyState title="Your cart is waiting" actionLabel="Explore the collection" action={() => navigate("/shop")} secondaryTo="/wishlist" secondaryLabel="View wishlist" />;
  return (
    <>
      <PageBanner eyebrow="Your selection" title="Shopping cart" copy="Review your chosen pieces before continuing to checkout." />
      <CheckoutSteps step={1} />
      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[1fr_380px] lg:px-10">
        <section className="divide-y divide-border border border-border/80 bg-card px-4 sm:px-6 shadow-product">
          {items.map(({ product, quantity }) => (
            <article key={product.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[116px_minmax(0,1fr)_auto] sm:items-center">
              <StoreImage src={product.image} alt={product.name} className="aspect-square w-full border border-border/60 object-cover" />
              <div className="min-w-0">
                <InternalLink to={`/product/${product.id}`} className="font-display text-lg leading-6 hover:text-primary">{product.name}</InternalLink>
                <p className="mt-1.5 text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
                <div className="mt-3 inline-flex min-h-9 items-center border border-input bg-background">
                  <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => setCartQuantity(product.id, quantity - 1)} className="grid size-9 place-items-center hover:text-primary">−</button>
                  <span className="min-w-8 text-center text-xs tabular-nums">{quantity}</span>
                  <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => setCartQuantity(product.id, quantity + 1)} className="grid size-9 place-items-center hover:text-primary">+</button>
                </div>
                <button type="button" onClick={() => setCartQuantity(product.id, 0)} className="ml-3 text-xs text-muted-foreground underline hover:text-primary">Remove</button>
              </div>
              <p className="col-span-2 text-right text-sm font-semibold tabular-nums sm:col-span-1">{formatPrice(product.price * quantity)}</p>
            </article>
          ))}
        </section>
        <aside className="h-fit border border-border/80 border-t-2 border-t-antique-gold bg-card p-5 shadow-product sm:p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-5 space-y-3 border-b border-border pb-5 text-sm">
            <div className="flex justify-between gap-4 tabular-nums"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">Insured crating & delivery</span><span className="text-right">Quoted before dispatch</span></div>
          </div>
          <div className="mt-5 flex justify-between gap-4 font-semibold tabular-nums"><span>Estimated total</span><span>{formatPrice(subtotal)}</span></div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Delivery charges are confirmed with you before dispatch. No payment is collected in this demo.</p>
          <Button className="mt-6 w-full" onClick={() => navigate("/checkout")}>Continue to checkout <Icon name="arrow" size={16} /></Button>
          <Button variant="outline" className="mt-2 w-full" onClick={() => navigate("/shop")}>Continue shopping</Button>
        </aside>
      </main>
    </>
  );
}

function CheckoutPage() {
  const { cart, store, setCart, updateStore, customer, setCustomer, setLastOrder, navigate } = useRudra();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const items = cart.map((entry) => ({ ...entry, product: store.products.find((product) => product.id === entry.productId) })).filter((entry) => entry.product);
  const subtotal = items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
  if (items.length === 0) return <EmptyState title="There is nothing to check out" actionLabel="Browse the collection" action={() => navigate("/shop")} />;

  function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    const order = {
      id: `RAH-${String(Date.now()).slice(-5)}`,
      customerName: fields.name,
      email: fields.email,
      phone: fields.phone,
      date: new Date().toISOString().slice(0, 10),
      total: subtotal,
      payment: fields.payment,
      status: "Pending",
      items: items.map(({ product, quantity }) => ({ productId: product.id, name: product.name, price: product.price, quantity })),
      address: `${fields.address}, ${fields.city}, ${fields.state} ${fields.pincode}`,
    };
    updateStore((current) => {
      const existing = current.customers.find((item) => item.email.toLowerCase() === String(fields.email).toLowerCase());
      const nextCustomer = existing
        ? { ...existing, name: fields.name, phone: fields.phone, totalOrders: Number(existing.totalOrders || 0) + 1, totalSpending: Number(existing.totalSpending || 0) + subtotal }
        : { id: `cus-${Date.now()}`, name: fields.name, email: fields.email, phone: fields.phone, totalOrders: 1, totalSpending: subtotal };
      return {
        ...current,
        orders: [order, ...current.orders],
        customers: existing ? current.customers.map((item) => item.email.toLowerCase() === String(fields.email).toLowerCase() ? nextCustomer : item) : [nextCustomer, ...current.customers],
      };
    });
    setCustomer({ name: fields.name, email: fields.email, phone: fields.phone });
    setLastOrder(order);
    setCart([]);
    navigate("/order-confirmation");
  }

  return (
    <>
      <PageBanner eyebrow="A considered final step" title="Checkout" copy="Share your delivery details and choose a demo payment preference." />
      <CheckoutSteps step={2} />
      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[1fr_380px] lg:px-10">
        <form id="checkout-form" onSubmit={submit} className="space-y-6">
          <section className="border border-border/80 bg-card p-5 shadow-product sm:p-7">
            <h2 className="mb-5 font-display text-2xl">01. Your details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold">Full name<input required name="name" defaultValue={customer?.name || ""} autoComplete="name" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
              <label className="text-xs font-semibold">Email<input required type="email" name="email" defaultValue={customer?.email || ""} autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
              <label className="text-xs font-semibold">Phone<input required type="tel" name="phone" defaultValue={customer?.phone || ""} autoComplete="tel" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
              <label className="text-xs font-semibold sm:col-span-2">Street address<input required name="address" autoComplete="street-address" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
              <label className="text-xs font-semibold">City<input required name="city" autoComplete="address-level2" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
              <label className="text-xs font-semibold">State<input required name="state" autoComplete="address-level1" defaultValue="Maharashtra" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
              <label className="text-xs font-semibold">Pincode<input required inputMode="numeric" name="pincode" autoComplete="postal-code" pattern="[0-9]{6}" title="Enter a six-digit pincode" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
            </div>
          </section>
          <section className="border border-border/80 bg-card p-5 shadow-product sm:p-7">
            <h2 className="mb-5 font-display text-2xl">02. Payment preference</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[["Cash on Delivery", "Pay when your order arrives"], ["Online Payment (Demo)", "No real payment will be taken"]].map(([method, note]) => (
                <label key={method} className={`flex min-h-16 cursor-pointer items-center gap-3 border p-4 transition-colors ${paymentMethod === method ? "border-antique-gold bg-sand/35" : "border-border bg-background"}`}>
                  <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="size-4 accent-primary" />
                  <span><span className="block text-sm font-semibold">{method}</span><span className="mt-1 block text-xs text-muted-foreground">{note}</span></span>
                </label>
              ))}
            </div>
          </section>
          <Button type="submit">Place demo order <Icon name="arrow" size={16} /></Button>
        </form>
        <aside className="h-fit border border-border/80 border-t-2 border-t-antique-gold bg-card p-5 shadow-product sm:p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <div className="mt-5 divide-y divide-border">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-3 py-3 text-sm">
                <StoreImage src={product.image} alt="" className="size-12 shrink-0 border border-border/60 object-cover" />
                <span className="min-w-0 flex-1 text-muted-foreground">{product.name}<span className="mt-0.5 block text-xs">Qty {quantity}</span></span>
                <span className="shrink-0 font-medium tabular-nums">{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between tabular-nums"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between gap-3"><span className="text-muted-foreground">Delivery</span><span className="text-right">Quoted before dispatch</span></div>
            <div className="flex justify-between border-t border-border pt-4 font-semibold tabular-nums"><span>Estimated total</span><span>{formatPrice(subtotal)}</span></div>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">The delivery quote will be confirmed by our studio. This demo does not charge a payment.</p>
        </aside>
      </main>
    </>
  );
}

function OrderConfirmationPage() {
  const { lastOrder, navigate } = useRudra();
  if (!lastOrder) return <EmptyState title="No recent order to show" actionLabel="Browse the collection" action={() => navigate("/shop")} />;
  return (
    <>
      <CheckoutSteps step={3} />
      <main className="mx-auto max-w-2xl px-4 py-14">
        <div className="border border-antique-gold/70 bg-card p-6 text-center shadow-heritage sm:p-10">
          <span className="mx-auto grid size-16 place-items-center border border-antique-gold bg-sand/40 text-primary"><Icon name="spark" size={28} /></span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Order certificate · Recorded</p>
          <h1 className="mt-3 font-display text-4xl">Thank you, {lastOrder.customerName.split(" ")[0]}.</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Your demo order has been recorded with our Kolhapur studio. Our team will confirm the insured crating quote and next steps with you.</p>
          <div className="mt-7 space-y-3 border-y border-border py-5 text-left text-sm">
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">Order number</span><span className="font-semibold">{lastOrder.id}</span></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">Order estimate</span><span className="font-semibold tabular-nums">{formatPrice(lastOrder.total)}</span></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">Payment preference</span><span className="text-right">{lastOrder.payment}</span></div>
            {lastOrder.address && <div className="flex justify-between gap-4"><span className="text-muted-foreground">Delivery destination</span><span className="text-right">{lastOrder.address}</span></div>}
          </div>
          {lastOrder.items?.length > 0 && (
            <div className="mt-5 space-y-2 border-b border-border pb-5 text-left text-xs">
              {lastOrder.items.map((item) => (
                <div key={item.productId} className="flex justify-between gap-3"><span className="text-muted-foreground">{item.name} × {item.quantity}</span><span className="font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span></div>
              ))}
            </div>
          )}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button onClick={() => navigate("/shop")}>Continue exploring <Icon name="arrow" size={16} /></Button>
            <Button variant="outline" onClick={() => { if (typeof window !== "undefined") window.print(); }}>Print certificate</Button>
          </div>
        </div>
      </main>
    </>
  );
}

function WishlistPage() {
  const { wishlist, store, navigate } = useRudra();
  const products = wishlist.map((id) => store.products.find((item) => item.id === id)).filter(Boolean);
  return <><PageBanner eyebrow="Saved for later" title="Your wishlist" copy="Keep the heritage pieces you love close at hand." /><main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-7 sm:py-14 lg:px-10">{products.length ? <ProductGrid products={products} /> : <EmptyState title="Your wishlist is empty" actionLabel="Explore the collection" action={() => navigate("/shop")} />}</main></>;
}

function AccountLoginPage() {
  const { store, setCustomer, navigate } = useRudra();
  const [message, setMessage] = useState("");
  function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    const existing = store.customers.find((item) => item.email.toLowerCase() === String(fields.email).toLowerCase());
    setCustomer(existing || { name: String(fields.email).split("@")[0], email: fields.email, phone: "", totalOrders: 0, totalSpending: 0 });
    navigate("/account");
  }
  return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12"><section className="w-full border border-border/80 border-t-2 border-t-antique-gold bg-card p-6 shadow-heritage sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Customer account</p><h1 className="mt-3 font-display text-3xl">Welcome back</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to revisit your orders and saved pieces.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Password<input required type="password" name="password" autoComplete="current-password" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>{message && <p role="alert" className="text-sm text-destructive">{message}</p>}<Button type="submit" className="w-full">Sign in</Button></form><p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">New to Rudra? <InternalLink to="/account/register" className="font-semibold text-primary">Create an account</InternalLink></p></section></main>;
}

function AccountRegisterPage() {
  const { store, updateStore, setCustomer, navigate } = useRudra();
  function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    const customer = { id: `cus-${Date.now()}`, name: fields.name, email: fields.email, phone: fields.phone, totalOrders: 0, totalSpending: 0 };
    updateStore((current) => current.customers.some((item) => item.email.toLowerCase() === String(fields.email).toLowerCase()) ? current : { ...current, customers: [customer, ...current.customers] });
    setCustomer(customer);
    navigate("/account");
  }
  return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12"><section className="w-full border border-border/80 border-t-2 border-t-antique-gold bg-card p-6 shadow-heritage sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Customer account</p><h1 className="mt-3 font-display text-3xl">Create your account</h1><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-semibold">Full name<input required name="name" autoComplete="name" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Phone number<input required type="tel" name="phone" autoComplete="tel" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Password<input required type="password" name="password" autoComplete="new-password" minLength="6" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><Button type="submit" className="w-full">Create account</Button></form><p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">Already have an account? <InternalLink to="/account/login" className="font-semibold text-primary">Sign in</InternalLink></p></section></main>;
}

function AccountPage() {
  const { customer, setCustomer, store, wishlist, navigate } = useRudra();
  if (!customer) return <EmptyState title="Sign in to your account" actionLabel="Customer sign in" action={() => navigate("/account/login")} secondaryTo="/account/register" secondaryLabel="Create account" />;
  const orders = store.orders.filter((order) => order.email.toLowerCase() === customer.email.toLowerCase());
  return <><PageBanner eyebrow="Your account" title={`Welcome, ${customer.name}`} copy="Your order history and saved pieces, together in one place." /><main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[0.7fr_1.3fr] lg:px-10"><aside className="border border-border/80 bg-card p-6 shadow-product"><h2 className="font-display text-xl">Profile details</h2><p className="mt-4 text-sm leading-6">{customer.name}<br /><span className="text-muted-foreground">{customer.email}<br />{customer.phone || "Phone not added"}</span></p><div className="mt-5 border-t border-border pt-4"><p className="text-xs text-muted-foreground">Saved pieces</p><p className="mt-1 font-display text-2xl">{wishlist.length}</p></div><button type="button" onClick={() => { setCustomer(null); navigate("/"); }} className="mt-5 text-xs font-semibold text-primary underline">Sign out</button></aside><section className="border border-border/80 bg-card p-6 shadow-product"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Your history</p><h2 className="mt-2 font-display text-2xl">Orders</h2></div><InternalLink to="/wishlist" className="text-sm font-semibold text-primary">View wishlist ({wishlist.length})</InternalLink></div><div className="mt-4 divide-y divide-border border-t border-border">{orders.map((order) => <article key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="text-sm font-semibold">{order.id}</p><p className="mt-1 text-xs text-muted-foreground">{order.date} · {order.status}</p></div><p className="text-sm font-semibold tabular-nums">{formatPrice(order.total)}</p></article>)}{orders.length === 0 && <p className="py-8 text-sm text-muted-foreground">Your orders will appear here after checkout.</p>}</div></section></main></>;
}

function buildContactLinks(settings = {}, customMessage = "Namaskar! I would like to enquire about Rudra Arts And Handicrafts creations.") {
  const phoneRaw = String(settings.phone || "8400456555").trim();
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  const whatsappSource = String(settings.whatsapp || phoneDigits || "918400456555").replace(/\D/g, "");
  const whatsappDigits = whatsappSource.length === 10 ? `91${whatsappSource}` : whatsappSource;
  const instagramUrl = String(settings.instagram || "").trim() || "https://www.instagram.com/";
  const facebookUrl = String(settings.facebook || "").trim();
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(customMessage)}`;
  const telUrl = `tel:${phoneDigits.length === 10 ? `+91${phoneDigits}` : phoneRaw}`;
  return { phoneRaw, instagramUrl, facebookUrl, whatsappUrl, telUrl };
}

function StoreFooter() {
  const { store, navigate } = useRudra();
  const links = [["/shop", "Shop all"], ["/collections", "Collections"], ["/gallery", "Heritage gallery"], ["/about", "Our story"], ["/contact", "Contact us"]];
  const categories = [...store.categories].sort((a, b) => Number(a.order) - Number(b.order)).slice(0, 6);
  const { phoneRaw, instagramUrl, facebookUrl, whatsappUrl, telUrl } = buildContactLinks(store.settings);
  return (
    <footer className="border-t border-antique-gold/30 bg-charcoal text-primary-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-9 px-4 py-14 sm:px-7 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.65fr_0.85fr_1fr] lg:px-10">
        <div>
          <InternalLink to="/" className="inline-flex items-center gap-3"><span className="grid size-11 place-items-center border border-antique-gold text-antique-gold"><Icon name="crest" size={25} /></span><span className="font-display text-xl">Rudra Arts<span className="block font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-primary-foreground/65">And Handicrafts</span></span></InternalLink>
          <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/72">{store.settings.footerDescription}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className="fab fab-ig !h-10 !w-10">
              <Icon name="instagram" size={18} />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" className="fab fab-wa !h-10 !w-10">
              <Icon name="whatsapp" size={18} />
            </a>
            <a href={telUrl} aria-label={`Call studio at ${phoneRaw}`} title={`Call ${phoneRaw}`} className="fab fab-call !h-10 !w-10">
              <Icon name="phoneFill" size={17} />
            </a>
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook" className="fab fab-fb !h-10 !w-10">
                <Icon name="facebook" size={18} />
              </a>
            )}
          </div>
        </div>
        <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">Explore</h2><nav className="mt-4 grid gap-3">{links.map(([to, label]) => <InternalLink key={to} to={to} className="text-sm text-primary-foreground/75 transition hover:text-antique-gold">{label}</InternalLink>)}</nav></div>
        <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">Categories</h2><nav className="mt-4 grid gap-3">{categories.map((cat) => <InternalLink key={cat.id} to={`/shop?category=${encodeURIComponent(cat.id)}`} className="text-sm text-primary-foreground/75 transition hover:text-antique-gold">{cat.shortName || cat.name}</InternalLink>)}</nav></div>
        <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">Visit our studio</h2><address className="mt-4 space-y-3 not-italic text-sm leading-6 text-primary-foreground/75"><p>{store.settings.address}</p><a className="block hover:text-antique-gold" href={telUrl}>{store.settings.phone}</a><a className="block break-all hover:text-antique-gold" href={`mailto:${store.settings.email}`}>{store.settings.email}</a></address></div>
      </div>
      <div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 text-[10px] text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10"><p>{store.settings.copyright}</p><button type="button" onClick={() => navigate("/admin/login")} className="w-fit text-primary-foreground/55 underline-offset-2 hover:text-antique-gold hover:underline">Admin login</button></div></div>
    </footer>
  );
}

function CartDrawer() {
  const { cart, store, cartOpen, setCartOpen, setCartQuantity, navigate } = useRudra();
  if (!cartOpen) return null;
  const items = cart.map((entry) => ({ ...entry, product: store.products.find((product) => product.id === entry.productId) })).filter((entry) => entry.product);
  const subtotal = items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[75] flex justify-end bg-charcoal/70 backdrop-blur-xs" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
      <aside role="dialog" aria-modal="true" aria-label="Your shopping bag" className="animate-slide-right flex h-full w-full max-w-md flex-col border-l border-antique-gold/40 bg-background shadow-heritage">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">Curated Selection</p>
            <h2 className="font-display text-xl">Your shopping bag</h2>
          </div>
          <button type="button" aria-label="Close shopping bag" onClick={() => setCartOpen(false)} className="grid size-9 place-items-center border border-border bg-card text-foreground hover:border-antique-gold hover:text-primary"><Icon name="close" size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Icon name="bag" size={28} className="text-antique-gold" />
              <p className="mt-3 font-display text-xl">Your bag is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">Explore our Maratha heritage collection to add pieces.</p>
              <Button className="mt-5" onClick={() => { setCartOpen(false); navigate("/shop"); }}>Explore collection</Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3.5 py-4">
                  <StoreImage src={product.image} alt={product.name} className="size-20 shrink-0 border border-border/70 object-cover" />
                  <div className="min-w-0 flex-1">
                    <button type="button" onClick={() => { setCartOpen(false); navigate(`/product/${product.id}`); }} className="text-left font-display text-sm leading-snug text-foreground hover:text-primary">{product.name}</button>
                    <p className="mt-1 text-xs font-semibold tabular-nums">{formatPrice(product.price)}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="inline-flex items-center border border-input bg-card">
                        <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => setCartQuantity(product.id, quantity - 1)} className="grid size-7 place-items-center text-xs hover:text-primary">−</button>
                        <span className="min-w-6 text-center text-xs tabular-nums">{quantity}</span>
                        <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => setCartQuantity(product.id, quantity + 1)} className="grid size-7 place-items-center text-xs hover:text-primary">+</button>
                      </div>
                      <button type="button" onClick={() => setCartQuantity(product.id, 0)} className="text-[11px] text-muted-foreground underline hover:text-primary">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-card p-5">
            <div className="flex justify-between text-sm font-semibold tabular-nums"><span>Estimated subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">Insured crating & delivery quoted before dispatch.</p>
            <div className="mt-4 grid gap-2">
              <Button className="w-full" onClick={() => { setCartOpen(false); navigate("/checkout"); }}>Proceed to checkout <Icon name="arrow" size={16} /></Button>
              <Button variant="outline" className="w-full" onClick={() => { setCartOpen(false); navigate("/cart"); }}>View full cart</Button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function GalleryLightbox() {
  const { store, lightboxItem, setLightboxItem, navigate } = useRudra();
  const entries = store.gallery;
  const activeIndex = lightboxItem ? entries.findIndex((entry) => entry.id === lightboxItem.id) : -1;

  useEffect(() => {
    if (!lightboxItem) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") setLightboxItem(null);
      if (event.key === "ArrowRight" && entries.length > 1) {
        setLightboxItem(entries[(activeIndex + 1) % entries.length]);
      }
      if (event.key === "ArrowLeft" && entries.length > 1) {
        setLightboxItem(entries[(activeIndex - 1 + entries.length) % entries.length]);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxItem, activeIndex, entries, setLightboxItem]);

  if (!lightboxItem) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-xs" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxItem(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="lightbox-title" className="animate-modal-in relative grid max-h-[92vh] w-full max-w-4xl overflow-auto border border-antique-gold/50 bg-charcoal text-primary-foreground shadow-heritage md:grid-cols-[1.25fr_0.75fr]">
        <button type="button" aria-label="Close gallery view" onClick={() => setLightboxItem(null)} className="absolute right-3 top-3 z-10 grid size-10 place-items-center border border-antique-gold/50 bg-charcoal/85 text-primary-foreground transition-colors hover:border-antique-gold hover:text-antique-gold"><Icon name="close" /></button>
        <div className="relative aspect-square bg-black/40 md:aspect-auto md:min-h-[420px]">
          <StoreImage src={lightboxItem.image} alt={lightboxItem.title} className="size-full object-cover" />
          {entries.length > 1 && (
            <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
              <button type="button" aria-label="Previous gallery piece" onClick={() => setLightboxItem(entries[(activeIndex - 1 + entries.length) % entries.length])} className="grid size-10 place-items-center rounded-full border border-antique-gold/60 bg-charcoal/80 text-primary-foreground hover:bg-primary"><Icon name="chevronLeft" size={18} /></button>
              <button type="button" aria-label="Next gallery piece" onClick={() => setLightboxItem(entries[(activeIndex + 1) % entries.length])} className="grid size-10 place-items-center rounded-full border border-antique-gold/60 bg-charcoal/80 text-primary-foreground hover:bg-primary"><Icon name="chevron" size={18} /></button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold">{lightboxItem.tag} · {String(activeIndex + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}</p>
            <h2 id="lightbox-title" className="mt-3 font-display text-2xl sm:text-3xl">{lightboxItem.title}</h2>
            <p className="mt-4 text-sm leading-7 text-primary-foreground/80">Handcrafted in our Kolhapur studio. Available in custom scales and museum-grade antique patina finishes for homes, offices, and public institutions.</p>
          </div>
          <div className="mt-8 space-y-2.5">
            <Button variant="gold" className="w-full" onClick={() => { setLightboxItem(null); navigate("/contact?type=custom"); }}>Enquire about a similar piece <Icon name="arrow" size={16} /></Button>
            <Button variant="outlineLight" className="w-full" onClick={() => { setLightboxItem(null); navigate("/shop"); }}>Browse shop pieces</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickViewModal() {
  const { quickProduct, setQuickProduct, addToCart, buyNow, navigate } = useRudra();
  if (!quickProduct) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/75 p-4 backdrop-blur-xs" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickProduct(null); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="quick-view-title" className="animate-modal-in relative grid max-h-[90vh] w-full max-w-3xl overflow-auto border border-antique-gold/40 bg-background shadow-heritage md:grid-cols-2">
        <button type="button" aria-label="Close quick view" onClick={() => setQuickProduct(null)} className="absolute right-3 top-3 z-10 grid size-10 place-items-center border border-border bg-background/95 transition-colors hover:border-antique-gold hover:text-primary"><Icon name="close" /></button>
        <StoreImage src={quickProduct.image} alt={quickProduct.name} className="aspect-square size-full object-cover" />
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Quick view</p>
          <h2 id="quick-view-title" className="mt-3 font-display text-2xl">{quickProduct.name}</h2>
          <p className="mt-4 text-lg font-semibold tabular-nums">{quickProduct.price > 0 ? formatPrice(quickProduct.price) : "Price on request"}</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{quickProduct.description}</p>
          {quickProduct.price > 0 ? (
            <>
              <Button className="mt-6" onClick={() => { const item = quickProduct; setQuickProduct(null); buyNow(item); }}>Buy now <Icon name="arrow" size={16} /></Button>
              <Button variant="outline" className="mt-2" onClick={() => { addToCart(quickProduct); setQuickProduct(null); }}><Icon name="bag" size={15} />Add to cart</Button>
            </>
          ) : (
            <Button className="mt-6" onClick={() => { setQuickProduct(null); navigate("/contact?type=custom"); }}>Request details</Button>
          )}
          <Button variant="ghost" className="mt-2" onClick={() => { const id = quickProduct.id; setQuickProduct(null); navigate(`/product/${id}`); }}>View full details</Button>
        </div>
      </section>
    </div>
  );
}

function InquiryModal() {
  const { inquiryOpen, setInquiryOpen } = useRudra();
  if (!inquiryOpen) return null;
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/75 p-4 backdrop-blur-xs" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setInquiryOpen(false); }}><section role="dialog" aria-modal="true" aria-labelledby="custom-inquiry-title" className="animate-modal-in relative max-h-[90vh] w-full max-w-2xl overflow-auto border border-antique-gold/40 bg-background p-5 shadow-heritage sm:p-8"><button type="button" aria-label="Close custom inquiry" onClick={() => setInquiryOpen(false)} className="absolute right-3 top-3 grid size-10 place-items-center text-muted-foreground transition-colors hover:text-primary"><Icon name="close" /></button><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Custom heritage work</p><h2 id="custom-inquiry-title" className="mb-6 mt-2 font-display text-2xl">Tell us about your vision</h2><InquiryForm subject="Custom heritage order" onClose={() => setInquiryOpen(false)} /></section></div>;
}

function FloatingContactDock() {
  const { store } = useRudra();
  const { phoneRaw, instagramUrl, whatsappUrl, telUrl } = buildContactLinks(store.settings);

  const actions = [
    {
      label: "Instagram",
      ariaLabel: "Follow Rudra Arts on Instagram",
      href: instagramUrl,
      icon: "instagram",
      kind: "ig",
      external: true,
    },
    {
      label: "WhatsApp",
      ariaLabel: "Chat with Rudra Arts on WhatsApp",
      href: whatsappUrl,
      icon: "whatsapp",
      kind: "wa",
      external: true,
    },
    {
      label: "Call us",
      ariaLabel: `Call Rudra Arts at ${phoneRaw}`,
      href: telUrl,
      icon: "phoneFill",
      kind: "call",
      external: false,
    },
  ];

  return (
    <aside aria-label="Quick contact actions" className="fab-stack">
      {actions.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.ariaLabel}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          className={`fab fab-${item.kind}`}
        >
          <span className="fab-label" aria-hidden="true">{item.label}</span>
          <Icon name={item.icon} size={20} />
        </a>
      ))}
    </aside>
  );
}

function ToastBanner() {
  const { toast, setToast, navigate } = useRudra();
  if (!toast) return null;
  return (
    <div role="status" aria-live="polite" className="animate-fade-up fixed bottom-5 left-4 z-50 flex max-w-sm items-center gap-3 border border-antique-gold/70 bg-charcoal/95 px-4 py-3 text-xs text-primary-foreground shadow-heritage backdrop-blur-md sm:bottom-7 sm:left-6">
      <Icon name="spark" size={16} className="shrink-0 text-antique-gold" />
      <span className="min-w-0 flex-1 leading-5">{toast}</span>
      <button type="button" onClick={() => { setToast(null); navigate("/cart"); }} className="shrink-0 font-semibold text-antique-gold hover:underline">View cart</button>
      <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)} className="shrink-0 text-primary-foreground/70 hover:text-primary-foreground"><Icon name="close" size={14} /></button>
    </div>
  );
}

function StorefrontPage() {
  const { path, urlSearch, store, navigate } = useRudra();
  const productId = path.startsWith("/product/") ? decodeURIComponent(path.slice("/product/".length)).replace(/\/+$/, "") : "";
  let page;
  if (path === "/") page = <HomePage />;
  else if (path === "/shop") page = <ShopPage key={`${path}-${JSON.stringify(urlSearch)}`} />;
  else if (path === "/collections") page = <CollectionPage />;
  else if (path === "/gallery") page = <GalleryPage />;
  else if (path === "/about") page = <AboutPage />;
  else if (path === "/contact") page = <ContactPage key={`${path}-${JSON.stringify(urlSearch)}`} />;
  else if (path === "/wishlist") page = <WishlistPage />;
  else if (path === "/cart") page = <CartPage />;
  else if (path === "/checkout") page = <CheckoutPage />;
  else if (path === "/order-confirmation") page = <OrderConfirmationPage />;
  else if (path === "/account/login") page = <AccountLoginPage />;
  else if (path === "/account/register") page = <AccountRegisterPage />;
  else if (path === "/account") page = <AccountPage />;
  else if (productId) page = <ProductDetailPage key={productId} product={store.products.find((item) => item.id === productId)} />;
  else page = <EmptyState title="We couldn't find that page" actionLabel="Return home" action={() => navigate("/")} />;

  return <><StoreHeader /><div className="min-h-[40vh]">{page}</div><StoreFooter /><FloatingContactDock /><ToastBanner /><CartDrawer /><GalleryLightbox /><QuickViewModal /><InquiryModal /></>;
}

export function RudraApp() {
  const { path } = useRudra();
  if (path.startsWith("/admin")) return <AdminArea />;
  return <StorefrontPage />;
}
