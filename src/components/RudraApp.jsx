import { useMemo, useState } from "react";
import { AdminArea } from "@/components/AdminArea.jsx";
import { Button, Icon, formatPrice } from "@/components/StoreUI.jsx";
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
    <div className={`mb-8 max-w-2xl ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
      {copy && <p className={`mt-4 max-w-xl text-sm leading-7 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{copy}</p>}
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

  function submitSearch(event) {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
  }

  return (
    <>
      <div className="bg-primary px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-primary-foreground sm:text-xs">
        {store.banner.announcement}
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-7 lg:px-10">
          <InternalLink to="/" className="flex min-w-0 items-center gap-3" aria-label="Rudra Arts And Handicrafts home">
            <span className="grid size-11 shrink-0 place-items-center border border-antique-gold text-primary sm:size-12"><Icon name="crest" size={27} /></span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base leading-tight sm:text-lg">Rudra Arts</span>
              <span className="mt-1 block truncate text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">And Handicrafts</span>
            </span>
          </InternalLink>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {NAV_ITEMS.map(([to, label]) => (
              <InternalLink
                key={to}
                to={to}
                className={`border-b py-2 text-[12px] font-medium transition-colors ${path === to ? "border-primary text-primary" : "border-transparent text-foreground/80 hover:border-antique-gold hover:text-primary"}`}
              >
                {label}
              </InternalLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button type="button" title="Search products" aria-label="Search products" onClick={() => setSearchOpen((open) => !open)} className="grid size-10 place-items-center text-foreground transition hover:text-primary"><Icon name="search" /></button>
            <InternalLink to="/wishlist" title="Wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative grid size-10 place-items-center text-foreground transition hover:text-primary"><Icon name="heart" />{wishlist.length > 0 && <span className="absolute right-0 top-0 grid size-[17px] place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">{wishlist.length}</span>}</InternalLink>
            <InternalLink to="/cart" title="Shopping cart" aria-label={`Shopping cart, ${cartCount} items`} className="relative grid size-10 place-items-center text-foreground transition hover:text-primary"><Icon name="cart" />{cartCount > 0 && <span className="absolute right-0 top-0 grid size-[17px] place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">{cartCount}</span>}</InternalLink>
            <InternalLink to={customer ? "/account" : "/account/login"} title={customer ? "Your account" : "Customer sign in"} aria-label={customer ? "Your account" : "Customer sign in"} className="hidden size-10 place-items-center text-foreground transition hover:text-primary sm:grid"><Icon name="users" /></InternalLink>
            <button type="button" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)} className="grid size-10 place-items-center text-foreground xl:hidden"><Icon name={mobileMenuOpen ? "close" : "menu"} /></button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="border-t border-border bg-background px-4 py-4 sm:px-7 lg:px-10">
            <div className="mx-auto flex max-w-[1440px] items-center gap-3">
              <Icon name="search" className="text-muted-foreground" />
              <input autoFocus aria-label="Search the collection" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search statues, replicas, and heritage art" className="min-h-11 min-w-0 flex-1 border-b border-input bg-transparent px-1 text-sm outline-none focus:border-primary" />
              <Button type="submit" size="small">Search</Button>
            </div>
          </form>
        )}

        {mobileMenuOpen && (
          <nav className="border-t border-border bg-background px-4 py-2 xl:hidden" aria-label="Mobile navigation">
            {NAV_ITEMS.map(([to, label]) => (
              <InternalLink key={to} to={to} className={`flex min-h-11 items-center border-b border-border text-sm ${path === to ? "font-semibold text-primary" : "text-foreground"}`}>{label}</InternalLink>
            ))}
            <InternalLink to={customer ? "/account" : "/account/login"} className="flex min-h-11 items-center text-sm text-foreground">{customer ? "My account" : "Customer sign in"}</InternalLink>
          </nav>
        )}
      </header>
    </>
  );
}

function ProductCard({ product }) {
  const { store, navigate, addToCart, wishlist, toggleWishlist, setQuickProduct } = useRudra();
  const category = store.categories.find((item) => item.id === product.category);
  const onSale = Number(product.originalPrice) > Number(product.price);
  const discount = onSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const wished = wishlist.includes(product.id);

  return (
    <article className="group min-w-0">
      <div className="relative aspect-square overflow-hidden bg-muted image-lift">
        <button type="button" aria-label={`View ${product.name}`} onClick={() => navigate(`/product/${product.id}`)} className="absolute inset-0 z-[1] size-full"><img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover" /></button>
        {onSale && <span className="absolute left-3 top-3 z-[2] bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-foreground">{discount}% off</span>}
        <button type="button" aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={wished} onClick={() => toggleWishlist(product.id)} className={`absolute right-3 top-3 z-[3] grid size-9 place-items-center border border-border bg-background/95 transition ${wished ? "text-primary" : "text-foreground hover:text-primary"}`}><Icon name="heart" size={17} /></button>
        <button type="button" aria-label={`Quick view ${product.name}`} onClick={() => setQuickProduct(product)} className="absolute bottom-3 left-3 right-3 z-[2] min-h-10 bg-background/95 px-3 text-xs font-semibold text-foreground opacity-100 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 focus:translate-y-0 focus:opacity-100">Quick view</button>
      </div>
      <div className="pt-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{category?.shortName || category?.name || "Heritage art"}</p>
        <InternalLink to={`/product/${product.id}`} className="mt-1 block min-h-11 font-display text-base leading-5 text-foreground transition-colors hover:text-primary">{product.name}</InternalLink>
        <div className="mt-2 flex min-h-6 items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{product.price > 0 ? formatPrice(product.price) : "Price on request"}</span>
          {onSale && <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>}
        </div>
        <Button size="small" variant="outline" className="mt-3 w-full" onClick={() => product.price > 0 ? addToCart(product) : navigate("/contact?type=custom")}>
          <Icon name={product.price > 0 ? "bag" : "message"} size={15} />{product.price > 0 ? "Add to cart" : "Request details"}
        </Button>
      </div>
    </article>
  );
}

function ProductGrid({ products, emptyMessage = "No pieces match these filters." }) {
  if (products.length === 0) return <p className="border-y border-border py-12 text-center text-sm text-muted-foreground">{emptyMessage}</p>;
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

function CollectionsSection({ compact = false }) {
  const { store, navigate } = useRudra();
  const categories = [...store.categories].sort((a, b) => Number(a.order) - Number(b.order));
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Explore the atelier" title="Collections shaped by history" copy="Discover sculptural tributes, finely finished replicas, and heritage pieces made to be kept." />
        {compact && <InternalLink to="/collections" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">View all collections <Icon name="arrow" size={16} /></InternalLink>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(compact ? categories.slice(0, 3) : categories).map((category, index) => (
          <button key={category.id} type="button" onClick={() => navigate(`/shop?category=${encodeURIComponent(category.id)}`)} className={`group relative min-h-[240px] overflow-hidden text-left sm:min-h-[290px] ${index === 0 && !compact ? "lg:row-span-2 lg:min-h-[604px]" : ""}`}>
            <img src={category.image} alt={category.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-6">
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold">Collection {String(index + 1).padStart(2, "0")}</span>
              <span className="block max-w-sm font-display text-2xl leading-tight text-primary-foreground sm:text-3xl">{category.name}</span>
              <span className="mt-2 block max-w-sm text-xs leading-5 text-primary-foreground/80">{category.description}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary-foreground">Explore collection <Icon name="arrow" size={15} /></span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function StorySection({ compact = false }) {
  const { store, navigate } = useRudra();
  return (
    <section className="bg-sand/50">
      <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-4 py-14 sm:px-7 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:px-10">
        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[430px]">
          <img src={RUDRA_IMAGES.artisanCraft} alt="An artisan finishing a handcrafted Maratha sculpture" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-primary-foreground sm:p-7"><span className="font-display text-2xl">Made with reverence</span><span className="grid size-12 place-items-center border border-antique-gold"><Icon name="spark" size={22} className="text-antique-gold" /></span></div>
        </div>
        <div className="max-w-xl">
          <SectionHeading eyebrow="A living tradition" title={store.homepage.storyHeading} copy={store.homepage.storyText} />
          <p className="border-l border-antique-gold pl-4 text-sm leading-7 text-muted-foreground">Each piece begins with a story, shaped through thoughtful design and the hands of skilled makers in Kolhapur.</p>
          {!compact && <Button onClick={() => navigate("/about")} className="mt-7">Our story <Icon name="arrow" size={16} /></Button>}
          {compact && <Button variant="outline" onClick={() => navigate("/about")} className="mt-7">Discover our craft <Icon name="arrow" size={16} /></Button>}
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipSection() {
  const { store } = useRudra();
  const icons = ["spark", "users", "star", "layers"];
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
      <SectionHeading eyebrow="The Rudra standard" title="Craft with meaning" copy="Heritage-led design, patient hands, and considered finishes come together in every piece." />
      <div className="grid gap-0 border-y border-border sm:grid-cols-2 lg:grid-cols-4">
        {store.homepage.craftFeatures.map((feature, index) => (
          <div key={`${feature}-${index}`} className="border-b border-border py-6 sm:px-5 sm:py-8 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0">
            <Icon name={icons[index % icons.length]} size={24} className="text-antique-gold" />
            <h3 className="mt-4 font-display text-xl">{feature}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">A lasting expression of care, balance, and respect for the story behind the work.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ compact = false }) {
  const { store, navigate } = useRudra();
  const entries = compact ? store.gallery.slice(0, 3) : store.gallery;
  return (
    <section className="bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading light eyebrow="The heritage gallery" title="A closer look at the craft" copy="Sculptures, replicas, artwork, and installations inspired by the courage and artistry of the Maratha legacy." />
          {compact && <InternalLink to="/gallery" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-antique-gold">Enter the gallery <Icon name="arrow" size={16} /></InternalLink>}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((item, index) => (
            <button key={item.id} type="button" onClick={() => navigate("/gallery")} className={`group relative aspect-[4/3] overflow-hidden text-left ${index === 0 && !compact ? "sm:row-span-2 sm:aspect-auto" : ""}`}>
              <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5"><span className="block text-[10px] uppercase tracking-[0.15em] text-antique-gold">{item.tag}</span><span className="mt-2 block font-display text-xl">{item.title}</span></span>
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
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 px-4 py-12 sm:px-7 sm:py-16 lg:flex-row lg:items-center lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.17em] text-antique-gold">Made for your space</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">Bring your heritage vision to life</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/80">From personalized sculptures to large-scale heritage installations, we create meaningful handcrafted pieces tailored to your space.</p>
        </div>
        <Button variant="outline" className="shrink-0 border-antique-gold text-primary-foreground hover:bg-antique-gold hover:text-charcoal" onClick={() => setInquiryOpen(true)}>Request a custom order <Icon name="arrow" size={16} /></Button>
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
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.id} className="border-t border-antique-gold pt-5">
            <div aria-label={`${review.rating} out of 5 stars`} className="flex gap-1 text-antique-gold">{Array.from({ length: review.rating }, (_, index) => <Icon key={index} name="star" size={14} />)}</div>
            <blockquote className="mt-4 font-display text-lg leading-7 text-foreground">“{review.text}”</blockquote>
            <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-foreground">{review.name}<span className="mt-1 block font-normal normal-case tracking-normal text-muted-foreground">{review.product}</span></figcaption>
          </figure>
        ))}
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">Customer stories will be shared here soon.</p>}
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { store } = useRudra();
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section className="border-y border-border bg-sand/50">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-12 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Notes from the atelier</p><h2 className="mt-2 font-display text-2xl">{store.homepage.newsletterHeading || "Stay connected with our heritage"}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{store.homepage.newsletterText || "Hear about new work, heritage stories, and thoughtful pieces from our Kolhapur studio."}</p></div>
        <form className="flex w-full max-w-lg flex-col gap-2 sm:flex-row" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input required type="email" id="newsletter-email" placeholder="Your email address" className="min-h-12 min-w-0 flex-1 border border-input bg-background px-4 text-sm outline-none focus:border-primary" disabled={subscribed} />
          <Button type="submit" disabled={subscribed}>{subscribed ? "You're on the list" : "Subscribe"}</Button>
        </form>
        {subscribed && <p role="status" className="mt-3 text-sm text-primary">Thank you for subscribing. We’ll be in touch with notes from the atelier.</p>}
      </div>
    </section>
  );
}

function HomePage() {
  const { store, navigate } = useRudra();
  const sections = {
    collections: <CollectionsSection key="collections" compact />,
    bestsellers: <BestSellersSection key="bestsellers" />,
    story: <StorySection key="story" />,
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
      <section className="relative isolate min-h-[590px] overflow-hidden bg-charcoal text-primary-foreground sm:min-h-[680px] lg:min-h-[720px]">
        <img src={store.banner.image} alt="Antique-finish Maratha heritage sculpture in a traditional setting" className="absolute inset-0 size-full object-cover object-center" fetchPriority="high" />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative mx-auto flex min-h-[590px] max-w-[1440px] items-center px-4 py-16 sm:min-h-[680px] sm:px-7 lg:min-h-[720px] lg:px-10">
          <div className="max-w-2xl py-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-antique-gold">{store.banner.eyebrow}</p>
            <h1 className="max-w-2xl font-display text-4xl leading-[1.08] sm:text-6xl">{store.banner.heading}</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-primary-foreground/85 sm:text-base sm:leading-8">{store.banner.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => navigate(store.banner.ctaLink || "/shop")}>{store.banner.ctaText || "Explore Collection"}<Icon name="arrow" size={16} /></Button>
              <Button variant="outline" className="border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground hover:text-charcoal" onClick={() => navigate(store.banner.secondaryLink || "/about")}>{store.banner.secondaryText || "Discover Our Craft"}</Button>
            </div>
            <p className="mt-12 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-primary-foreground/70"><span className="h-px w-10 bg-antique-gold" />Kolhapur, Maharashtra · Crafted with reverence</p>
          </div>
        </div>
      </section>
      {order.filter((key) => visibility[key] !== false && sections[key]).map((key) => sections[key])}
      <div className="sr-only">{navigate ? "Rudra Arts And Handicrafts" : ""}</div>
    </>
  );
}

function BestSellersSection() {
  const { store, navigate } = useRudra();
  const products = store.products.filter((item) => item.bestselling).slice(0, 4);
  return (
    <section className="bg-sand/40">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Chosen with care" title="Bestselling pieces" copy="A selection of beloved sculptures and heritage objects, made to bring history into everyday spaces." />
          <Button variant="outline" className="mb-8" onClick={() => navigate("/shop")}>Shop all pieces <Icon name="arrow" size={16} /></Button>
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
  return <section className="border-b border-border bg-sand/50"><div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 sm:py-16 lg:px-10"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p><h1 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h1>{copy && <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{copy}</p>}</div></section>;
}

function ShopPage() {
  const { store, urlSearch } = useRudra();
  const [search, setSearch] = useState(String(urlSearch.q || ""));
  const [category, setCategory] = useState(String(urlSearch.category || "all"));
  const [sort, setSort] = useState("popular");
  const [saleOnly, setSaleOnly] = useState(false);
  const [limit, setLimit] = useState(8);
  const [maxPrice, setMaxPrice] = useState("50000");
  const matchingProducts = useMemo(() => {
    let result = store.products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchMatch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase());
      const priceMatch = Number(product.price) <= Number(maxPrice || 0) || Number(product.price) === 0;
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
        <div className="mb-8 grid gap-3 border-b border-border pb-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_0.9fr_auto]">
          <label className="block text-xs font-semibold text-muted-foreground">Search
            <span className="mt-1 flex min-h-11 items-center gap-2 border border-input bg-background px-3"><Icon name="search" size={16} /><input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" /></span>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">Collection
            <select aria-label="Filter by collection" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-sm text-foreground"><option value="all">All collections</option>{store.categories.map((item) => <option key={item.id} value={item.id}>{item.shortName || item.name}</option>)}</select>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">Maximum price
            <select aria-label="Maximum price" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-sm text-foreground"><option value="50000">Any price</option><option value="10000">Under ₹10,000</option><option value="15000">Under ₹15,000</option><option value="25000">Under ₹25,000</option></select>
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">Sort by
            <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)} className="mt-1 min-h-11 w-full border border-input bg-background px-3 text-sm text-foreground"><option value="popular">Popularity</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select>
          </label>
          <label className="flex min-h-11 items-end gap-2 pb-3 text-xs font-medium text-foreground"><input type="checkbox" checked={saleOnly} onChange={(event) => setSaleOnly(event.target.checked)} className="size-4 accent-primary" />On sale</label>
        </div>
        <div className="mb-5 flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{matchingProducts.length} pieces</p><button type="button" onClick={() => { setSearch(""); setCategory("all"); setSort("popular"); setSaleOnly(false); setMaxPrice("50000"); }} className="text-xs font-semibold text-primary hover:underline">Clear filters</button></div>
        <ProductGrid products={matchingProducts.slice(0, limit)} />
        {matchingProducts.length > limit && <div className="mt-10 text-center"><Button variant="outline" onClick={() => setLimit((current) => current + 8)}>Load more</Button></div>}
      </main>
    </>
  );
}

function GalleryPage() {
  const { store } = useRudra();
  return (
    <>
      <PageBanner eyebrow="From our studio" title="Heritage gallery" copy="A closer look at sculptures, historical replicas, traditional artwork, and custom heritage decor." />
      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-7 sm:py-14 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{store.gallery.map((item, index) => <figure key={item.id} className={`group ${index === 0 ? "lg:row-span-2" : ""}`}><div className={`overflow-hidden bg-muted ${index === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}><img src={item.image} alt={item.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><figcaption className="flex items-start justify-between gap-4 border-b border-border py-4"><span className="font-display text-lg">{item.title}</span><span className="pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{item.tag}</span></figcaption></figure>)}</div>
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

function InquiryForm({ subject = "General enquiry", onClose }) {
  const { addInquiry } = useRudra();
  const [sent, setSent] = useState(false);
  function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    addInquiry({ ...fields, subject: fields.subject || subject });
    setSent(true);
    event.currentTarget.reset();
  }
  if (sent) return <div role="status" className="border border-antique-gold bg-sand/50 p-6"><p className="font-display text-2xl">Thank you for reaching out.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Our Kolhapur studio has received your message and will be in touch.</p>{onClose && <Button variant="outline" className="mt-5" onClick={onClose}>Close</Button>}</div>;
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs font-semibold">Your name<input required name="name" autoComplete="name" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold">Phone number<input required type="tel" name="phone" autoComplete="tel" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold">Subject<input required name="subject" defaultValue={subject} className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>
      <label className="text-xs font-semibold sm:col-span-2">How can we help?<textarea required name="message" rows="4" className="mt-1.5 w-full border border-input bg-background px-3 py-3 text-sm font-normal" /></label>
      <div className="sm:col-span-2"><Button type="submit">Send enquiry <Icon name="arrow" size={16} /></Button></div>
    </form>
  );
}

function ContactPage() {
  const { store, urlSearch } = useRudra();
  const subject = urlSearch.type === "custom" ? "Custom heritage order" : "General enquiry";
  return (
    <>
      <PageBanner eyebrow="Talk with our studio" title="Contact Rudra Arts" copy="Whether you have a question about a piece or a vision for a custom creation, our team would be glad to hear from you." />
      <main className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 sm:px-7 sm:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
        <aside className="space-y-7">
          <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Visit or call</p><h2 className="mt-3 font-display text-2xl">{store.settings.businessName}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{store.settings.address}</p></div>
          <div className="space-y-4 border-y border-border py-5"><a href={`tel:${store.settings.phone}`} className="flex items-center gap-3 text-sm hover:text-primary"><Icon name="phone" size={17} className="text-antique-gold" />{store.settings.phone}</a><a href={`mailto:${store.settings.email}`} className="flex items-center gap-3 text-sm hover:text-primary"><Icon name="mail" size={17} className="text-antique-gold" />{store.settings.email}</a><p className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><Icon name="clock" size={17} className="mt-0.5 shrink-0 text-antique-gold" />{store.settings.businessHours}</p></div>
          <div className="bg-sand/50 p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Custom heritage work</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Share your space, scale, and inspiration. We will help shape a piece made for your setting.</p></div>
        </aside>
        <section className="border border-border bg-card p-5 sm:p-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Send us a message</p><h2 className="mb-6 font-display text-2xl">Start a conversation</h2><InquiryForm subject={subject} /></section>
      </main>
    </>
  );
}

function ProductDetailPage({ product }) {
  const { store, addToCart, toggleWishlist, wishlist, navigate } = useRudra();
  const [image, setImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  if (!product) return <EmptyState title="This piece is not available" actionLabel="Return to shop" action={() => navigate("/shop")} />;
  const related = store.products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);
  const images = product.images?.length ? product.images : [product.image];
  const onSale = Number(product.originalPrice) > Number(product.price);
  return (
    <>
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-7 sm:py-12 lg:px-10">
        <p className="mb-7 text-xs text-muted-foreground"><InternalLink to="/shop" className="hover:text-primary">Shop</InternalLink><span className="px-2">/</span>{product.name}</p>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="grid gap-3 sm:grid-cols-[76px_1fr]">
            <div className="order-2 flex gap-2 overflow-auto sm:order-1 sm:flex-col">{images.map((src, index) => <button key={`${src}-${index}`} type="button" onClick={() => setImage(src)} aria-label={`View product image ${index + 1}`} className={`size-[68px] shrink-0 overflow-hidden border ${image === src ? "border-primary" : "border-border"}`}><img src={src} alt="" className="size-full object-cover" /></button>)}</div>
            <div className="order-1 aspect-square overflow-hidden bg-muted sm:order-2"><img src={image || product.image} alt={product.name} className="size-full object-cover" /></div>
          </div>
          <div className="py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{store.categories.find((item) => item.id === product.category)?.name || "Heritage collection"}</p>
            <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3"><span className="text-xl font-semibold">{product.price > 0 ? formatPrice(product.price) : "Price on request"}</span>{onSale && <><span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span><span className="bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</span></>}</div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{product.description}</p>
            <p className="mt-5 text-xs text-muted-foreground">{product.stock > 0 ? `${product.stock} available` : "Made to order — enquire for availability"}</p>
            {product.price > 0 ? <div className="mt-6 flex flex-wrap gap-3"><div className="flex min-h-11 items-center border border-input"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="grid size-10 place-items-center text-foreground hover:text-primary">−</button><span className="min-w-8 text-center text-sm" aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => Math.min(Number(product.stock) || 99, current + 1))} className="grid size-10 place-items-center text-foreground hover:text-primary">+</button></div><Button onClick={() => addToCart(product, quantity)}><Icon name="bag" size={16} />Add to cart</Button><Button variant="outline" aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wishlist.includes(product.id)} onClick={() => toggleWishlist(product.id)}><Icon name="heart" /></Button></div> : <Button className="mt-6" onClick={() => navigate("/contact?type=custom")}>Request a custom quote <Icon name="arrow" size={16} /></Button>}
            <div className="mt-8 border-t border-border pt-5"><h2 className="font-display text-xl">Piece details</h2><dl className="mt-4 grid grid-cols-[110px_1fr] gap-x-4 gap-y-3 text-sm"><dt className="text-muted-foreground">Material</dt><dd>{product.material || "Made to brief"}</dd><dt className="text-muted-foreground">Dimensions</dt><dd>{product.dimensions || "Made to order"}</dd><dt className="text-muted-foreground">Weight</dt><dd>{product.weight || "Varies by piece"}</dd><dt className="text-muted-foreground">Details</dt><dd>{product.specifications || "Hand-finished by our artisans."}</dd></dl></div>
          </div>
        </div>
      </main>
      {related.length > 0 && <section className="bg-sand/40"><div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-7 lg:px-10"><SectionHeading eyebrow="Continue exploring" title="Related pieces" /><ProductGrid products={related} /></div></section>}
    </>
  );
}

function EmptyState({ title, actionLabel, action, secondaryTo, secondaryLabel }) {
  return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-14 text-center"><span className="grid size-14 place-items-center border border-antique-gold text-primary"><Icon name="crest" size={26} /></span><h1 className="mt-5 font-display text-3xl">{title}</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">Your next treasured piece may be waiting in the collection.</p><div className="mt-6 flex flex-wrap justify-center gap-3">{action && <Button onClick={action}>{actionLabel || "Continue"}</Button>}{secondaryTo && <InternalLink to={secondaryTo} className="inline-flex min-h-11 items-center border border-primary px-5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">{secondaryLabel}</InternalLink>}</div></div>;
}

function CartPage() {
  const { cart, store, setCartQuantity, navigate } = useRudra();
  const items = cart.map((entry) => ({ ...entry, product: store.products.find((product) => product.id === entry.productId) })).filter((entry) => entry.product);
  const subtotal = items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
  if (items.length === 0) return <EmptyState title="Your cart is waiting" actionLabel="Explore the collection" action={() => navigate("/shop")} secondaryTo="/wishlist" secondaryLabel="View wishlist" />;
  return (
    <>
      <PageBanner eyebrow="Your selection" title="Shopping cart" copy="Review your chosen pieces before continuing to checkout." />
      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[1fr_360px] lg:px-10">
        <section className="divide-y divide-border border-y border-border">{items.map(({ product, quantity }) => <article key={product.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center"><img src={product.image} alt={product.name} className="aspect-square w-full object-cover" /><div className="min-w-0"><InternalLink to={`/product/${product.id}`} className="font-display text-lg leading-6 hover:text-primary">{product.name}</InternalLink><p className="mt-2 text-sm font-semibold">{formatPrice(product.price)}</p><div className="mt-3 inline-flex min-h-9 items-center border border-input"><button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => setCartQuantity(product.id, quantity - 1)} className="grid size-9 place-items-center">−</button><span className="min-w-8 text-center text-xs">{quantity}</span><button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => setCartQuantity(product.id, quantity + 1)} className="grid size-9 place-items-center">+</button></div><button type="button" onClick={() => setCartQuantity(product.id, 0)} className="ml-3 text-xs text-muted-foreground underline hover:text-primary">Remove</button></div><p className="col-span-2 text-right text-sm font-semibold sm:col-span-1">{formatPrice(product.price * quantity)}</p></article>)}</section>
        <aside className="h-fit border border-border bg-card p-5 sm:p-6"><h2 className="font-display text-2xl">Order summary</h2><div className="mt-5 space-y-3 border-b border-border pb-5 text-sm"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Delivery</span><span className="text-right">Quoted before dispatch</span></div></div><div className="mt-5 flex justify-between gap-4 font-semibold"><span>Estimated total</span><span>{formatPrice(subtotal)}</span></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Delivery charges are confirmed with you before dispatch. No payment is collected in this demo.</p><Button className="mt-6 w-full" onClick={() => navigate("/checkout")}>Continue to checkout <Icon name="arrow" size={16} /></Button><Button variant="outline" className="mt-2 w-full" onClick={() => navigate("/shop")}>Continue shopping</Button></aside>
      </main>
    </>
  );
}

function CheckoutPage() {
  const { cart, store, setCart, updateStore, setCustomer, setLastOrder, navigate } = useRudra();
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
      const customer = existing
        ? { ...existing, name: fields.name, phone: fields.phone, totalOrders: Number(existing.totalOrders || 0) + 1, totalSpending: Number(existing.totalSpending || 0) + subtotal }
        : { id: `cus-${Date.now()}`, name: fields.name, email: fields.email, phone: fields.phone, totalOrders: 1, totalSpending: subtotal };
      return {
        ...current,
        orders: [order, ...current.orders],
        customers: existing ? current.customers.map((item) => item.email.toLowerCase() === String(fields.email).toLowerCase() ? customer : item) : [customer, ...current.customers],
      };
    });
    setCustomer({ name: fields.name, email: fields.email, phone: fields.phone });
    setLastOrder(order);
    setCart([]);
    navigate("/order-confirmation");
  }

  return (
    <>
      <PageBanner eyebrow="A considered final step" title="Checkout" copy="Share your delivery details and choose a demo payment method." />
      <main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[1fr_360px] lg:px-10">
        <form id="checkout-form" onSubmit={submit} className="space-y-8">
          <section><h2 className="mb-4 font-display text-2xl">Your details</h2><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Full name<input required name="name" autoComplete="name" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="text-xs font-semibold">Email<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="text-xs font-semibold">Phone<input required type="tel" name="phone" autoComplete="tel" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="text-xs font-semibold sm:col-span-2">Street address<input required name="address" autoComplete="street-address" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="text-xs font-semibold">City<input required name="city" autoComplete="address-level2" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="text-xs font-semibold">State<input required name="state" autoComplete="address-level1" defaultValue="Maharashtra" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="text-xs font-semibold">Pincode<input required inputMode="numeric" name="pincode" autoComplete="postal-code" pattern="[0-9]{6}" title="Enter a six-digit pincode" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label></div></section>
          <section><h2 className="mb-4 font-display text-2xl">Payment preference</h2><div className="grid gap-3 sm:grid-cols-2"><label className="flex min-h-16 cursor-pointer items-center gap-3 border border-border p-4"><input type="radio" name="payment" value="Cash on Delivery" defaultChecked className="size-4 accent-primary" /><span><span className="block text-sm font-semibold">Cash on Delivery</span><span className="mt-1 block text-xs text-muted-foreground">Pay when your order arrives</span></span></label><label className="flex min-h-16 cursor-pointer items-center gap-3 border border-border p-4"><input type="radio" name="payment" value="Online Payment (Demo)" className="size-4 accent-primary" /><span><span className="block text-sm font-semibold">Online Payment (Demo)</span><span className="mt-1 block text-xs text-muted-foreground">No real payment will be taken</span></span></label></div></section>
          <Button type="submit">Place demo order <Icon name="arrow" size={16} /></Button>
        </form>
        <aside className="h-fit border border-border bg-card p-5 sm:p-6"><h2 className="font-display text-2xl">Order summary</h2><div className="mt-5 divide-y divide-border">{items.map(({ product, quantity }) => <div key={product.id} className="flex items-start justify-between gap-3 py-3 text-sm"><span className="min-w-0 text-muted-foreground">{product.name}<span className="mt-1 block text-xs">Qty {quantity}</span></span><span className="shrink-0 font-medium">{formatPrice(product.price * quantity)}</span></div>)}</div><div className="mt-4 space-y-3 border-t border-border pt-4 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between gap-3"><span className="text-muted-foreground">Delivery</span><span className="text-right">Quoted before dispatch</span></div><div className="flex justify-between border-t border-border pt-4 font-semibold"><span>Estimated total</span><span>{formatPrice(subtotal)}</span></div></div><p className="mt-4 text-xs leading-5 text-muted-foreground">The delivery quote will be confirmed by our studio. This demo does not charge a payment.</p></aside>
      </main>
    </>
  );
}

function OrderConfirmationPage() {
  const { lastOrder, navigate } = useRudra();
  if (!lastOrder) return <EmptyState title="No recent order to show" actionLabel="Browse the collection" action={() => navigate("/shop")} />;
  return <main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center"><span className="grid size-16 place-items-center border border-antique-gold text-primary"><Icon name="spark" size={28} /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Order received</p><h1 className="mt-3 font-display text-4xl">Thank you, {lastOrder.customerName.split(" ")[0]}.</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">Your demo order has been recorded. Our team will confirm the delivery quote and next steps with you.</p><div className="mt-7 w-full border-y border-border py-5 text-left"><div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Order number</span><span className="font-semibold">{lastOrder.id}</span></div><div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Order estimate</span><span className="font-semibold">{formatPrice(lastOrder.total)}</span></div><div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Payment preference</span><span className="text-right">{lastOrder.payment}</span></div></div><Button className="mt-7" onClick={() => navigate("/shop")}>Continue exploring <Icon name="arrow" size={16} /></Button></main>;
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
  return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12"><section className="w-full border border-border bg-card p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Customer account</p><h1 className="mt-3 font-display text-3xl">Welcome back</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to revisit your orders and saved pieces.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Password<input required type="password" name="password" autoComplete="current-password" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label>{message && <p role="alert" className="text-sm text-destructive">{message}</p>}<Button type="submit" className="w-full">Sign in</Button></form><p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">New to Rudra? <InternalLink to="/account/register" className="font-semibold text-primary">Create an account</InternalLink></p></section></main>;
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
  return <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12"><section className="w-full border border-border bg-card p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Customer account</p><h1 className="mt-3 font-display text-3xl">Create your account</h1><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-xs font-semibold">Full name<input required name="name" autoComplete="name" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Email address<input required type="email" name="email" autoComplete="email" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Phone number<input required type="tel" name="phone" autoComplete="tel" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><label className="block text-xs font-semibold">Password<input required type="password" name="password" autoComplete="new-password" minLength="6" className="mt-1.5 min-h-11 w-full border border-input bg-background px-3 text-sm font-normal" /></label><Button type="submit" className="w-full">Create account</Button></form><p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">Already have an account? <InternalLink to="/account/login" className="font-semibold text-primary">Sign in</InternalLink></p></section></main>;
}

function AccountPage() {
  const { customer, setCustomer, store, wishlist, navigate } = useRudra();
  if (!customer) return <EmptyState title="Sign in to your account" actionLabel="Customer sign in" action={() => navigate("/account/login")} secondaryTo="/account/register" secondaryLabel="Create account" />;
  const orders = store.orders.filter((order) => order.email.toLowerCase() === customer.email.toLowerCase());
  return <><PageBanner eyebrow="Your account" title={`Welcome, ${customer.name}`} copy="Your order history and saved pieces, together in one place." /><main className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-7 lg:grid-cols-[0.7fr_1.3fr] lg:px-10"><aside className="border border-border bg-card p-5"><h2 className="font-display text-xl">Profile details</h2><p className="mt-4 text-sm leading-6">{customer.name}<br /><span className="text-muted-foreground">{customer.email}<br />{customer.phone || "Phone not added"}</span></p><div className="mt-5 border-t border-border pt-4"><p className="text-xs text-muted-foreground">Saved pieces</p><p className="mt-1 font-display text-2xl">{wishlist.length}</p></div><button type="button" onClick={() => { setCustomer(null); navigate("/"); }} className="mt-5 text-xs font-semibold text-primary underline">Sign out</button></aside><section><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Your history</p><h2 className="mt-2 font-display text-2xl">Orders</h2></div><InternalLink to="/wishlist" className="text-sm font-semibold text-primary">View wishlist ({wishlist.length})</InternalLink></div><div className="mt-4 divide-y divide-border border-y border-border">{orders.map((order) => <article key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="text-sm font-semibold">{order.id}</p><p className="mt-1 text-xs text-muted-foreground">{order.date} · {order.status}</p></div><p className="text-sm font-semibold">{formatPrice(order.total)}</p></article>)}{orders.length === 0 && <p className="py-8 text-sm text-muted-foreground">Your orders will appear here after checkout.</p>}</div></section></main></>;
}

function StoreFooter() {
  const { store, navigate } = useRudra();
  const links = [["/shop", "Shop all"], ["/collections", "Collections"], ["/gallery", "Heritage gallery"], ["/about", "Our story"], ["/contact", "Contact us"]];
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-9 px-4 py-12 sm:px-7 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr] lg:px-10">
        <div><InternalLink to="/" className="inline-flex items-center gap-3"><span className="grid size-11 place-items-center border border-antique-gold text-antique-gold"><Icon name="crest" size={25} /></span><span className="font-display text-xl">Rudra Arts<span className="block font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-primary-foreground/65">And Handicrafts</span></span></InternalLink><p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/70">{store.settings.footerDescription}</p><div className="mt-5 flex gap-2">{store.settings.instagram && <a href={store.settings.instagram} aria-label="Instagram" className="grid size-10 place-items-center border border-primary-foreground/20 hover:border-antique-gold hover:text-antique-gold"><Icon name="instagram" size={17} /></a>}{store.settings.facebook && <a href={store.settings.facebook} aria-label="Facebook" className="grid size-10 place-items-center border border-primary-foreground/20 hover:border-antique-gold hover:text-antique-gold"><Icon name="facebook" size={17} /></a>}</div></div>
        <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">Explore</h2><nav className="mt-4 grid gap-3">{links.map(([to, label]) => <InternalLink key={to} to={to} className="text-sm text-primary-foreground/75 transition hover:text-antique-gold">{label}</InternalLink>)}</nav></div>
        <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">Visit our studio</h2><address className="mt-4 space-y-3 not-italic text-sm leading-6 text-primary-foreground/75"><p>{store.settings.address}</p><a className="block hover:text-antique-gold" href={`tel:${store.settings.phone}`}>{store.settings.phone}</a><a className="block break-all hover:text-antique-gold" href={`mailto:${store.settings.email}`}>{store.settings.email}</a></address></div>
      </div>
      <div className="border-t border-primary-foreground/15"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 text-[10px] text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10"><p>{store.settings.copyright}</p><button type="button" onClick={() => navigate("/admin/login")} className="w-fit text-primary-foreground/55 underline-offset-2 hover:text-antique-gold hover:underline">Admin login</button></div></div>
    </footer>
  );
}

function QuickViewModal() {
  const { quickProduct, setQuickProduct, addToCart, navigate } = useRudra();
  if (!quickProduct) return null;
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/70 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickProduct(null); }}><section role="dialog" aria-modal="true" aria-labelledby="quick-view-title" className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto bg-background md:grid-cols-2"><button type="button" aria-label="Close quick view" onClick={() => setQuickProduct(null)} className="absolute right-3 top-3 z-10 grid size-10 place-items-center border border-border bg-background"><Icon name="close" /></button><img src={quickProduct.image} alt={quickProduct.name} className="aspect-square size-full object-cover" /><div className="flex flex-col justify-center p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Quick view</p><h2 id="quick-view-title" className="mt-3 font-display text-2xl">{quickProduct.name}</h2><p className="mt-4 text-lg font-semibold">{quickProduct.price > 0 ? formatPrice(quickProduct.price) : "Price on request"}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{quickProduct.description}</p><Button className="mt-6" onClick={() => { if (quickProduct.price > 0) addToCart(quickProduct); else navigate("/contact?type=custom"); setQuickProduct(null); }}>{quickProduct.price > 0 ? "Add to cart" : "Request details"}</Button><Button variant="outline" className="mt-2" onClick={() => { const id = quickProduct.id; setQuickProduct(null); navigate(`/product/${id}`); }}>View details</Button></div></section></div>;
}

function InquiryModal() {
  const { inquiryOpen, setInquiryOpen } = useRudra();
  if (!inquiryOpen) return null;
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/70 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setInquiryOpen(false); }}><section role="dialog" aria-modal="true" aria-labelledby="custom-inquiry-title" className="relative max-h-[90vh] w-full max-w-2xl overflow-auto bg-background p-5 sm:p-8"><button type="button" aria-label="Close custom inquiry" onClick={() => setInquiryOpen(false)} className="absolute right-3 top-3 grid size-10 place-items-center text-muted-foreground hover:text-primary"><Icon name="close" /></button><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Custom heritage work</p><h2 id="custom-inquiry-title" className="mb-6 mt-2 font-display text-2xl">Tell us about your vision</h2><InquiryForm subject="Custom heritage order" onClose={() => setInquiryOpen(false)} /></section></div>;
}

function StorefrontPage() {
  const { path, urlSearch } = useRudra();
  const productId = path.startsWith("/product/") ? decodeURIComponent(path.slice("/product/".length)) : "";
  const { store } = useRudra();
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

  return <><StoreHeader /><div className="min-h-[40vh]">{page}</div><StoreFooter /><QuickViewModal /><InquiryModal /></>;
}

export function RudraApp() {
  const { path } = useRudra();
  if (path.startsWith("/admin")) return <AdminArea />;
  return <StorefrontPage />;
}