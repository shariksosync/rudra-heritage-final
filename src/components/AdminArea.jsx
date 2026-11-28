import { useEffect, useMemo, useState } from "react";
import { ADMIN_EMAIL, ADMIN_PASSWORD, matchesAdminCredentials, RUDRA_IMAGES } from "@/data/mock-data.js";
import { useRudra } from "@/context/RudraContext.jsx";
import { Button, Icon, StoreImage, formatPrice } from "@/components/StoreUI.jsx";

const ADMIN_SECTIONS = [
  ["/admin/dashboard", "Overview", "grid"],
  ["/admin/products", "Products", "box"],
  ["/admin/categories", "Categories", "layers"],
  ["/admin/orders", "Orders", "bag"],
  ["/admin/customers", "Customers", "users"],
  ["/admin/homepage", "Homepage", "home"],
  ["/admin/banner", "Banner", "image"],
  ["/admin/testimonials", "Testimonials", "star"],
  ["/admin/inquiries", "Inquiries", "message"],
  ["/admin/settings", "Settings", "settings"],
];

const ORDER_STATUSES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];
const INQUIRY_STATUSES = ["New", "Contacted", "In Progress", "Completed"];

function AdminLink({ to, active, children }) {
  const { navigate } = useRudra();
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
      className={`flex min-h-10 items-center gap-3 border-l-2 px-4 text-sm transition-colors ${active ? "border-antique-gold bg-primary/10 font-semibold text-primary" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
      {children}
    </a>
  );
}

function AdminLogin() {
  const { setAdminAuthenticated, navigate } = useRudra();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!matchesAdminCredentials(email, password)) {
      setError("Those details don't match the demo administrator account.");
      return;
    }
    setAdminAuthenticated(true);
    navigate("/admin/dashboard");
  }

  function autofillDemo() {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
    setError("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4 py-12">
      <div className="w-full max-w-md border border-border bg-card px-7 py-9 shadow-heritage sm:px-10">
        <a href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }} className="mb-8 inline-flex items-center gap-3">
          <span className="grid size-11 place-items-center border border-antique-gold text-primary"><Icon name="crest" size={26} /></span>
          <span className="font-display text-lg leading-tight text-foreground">Rudra Arts<span className="block font-sans text-[10px] font-medium uppercase tracking-[0.17em] text-muted-foreground">Administration</span></span>
        </a>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Store access</p>
        <h1 className="font-display text-3xl text-foreground">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Sign in to manage products, orders, and the storefront.</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm font-medium text-foreground">Email
            <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-primary" placeholder="admin@rudraarts.com" />
          </label>
          <label className="block text-sm font-medium text-foreground">Password
            <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none transition focus:border-primary" placeholder="Enter your password" />
          </label>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <div className="space-y-2.5 pt-1">
            <Button type="submit" className="w-full">Sign in to dashboard <Icon name="arrow" size={16} /></Button>
            <Button type="button" variant="outline" size="small" className="w-full" onClick={autofillDemo}><Icon name="spark" size={14} />Auto-fill demo credentials</Button>
          </div>
        </form>
        <p className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Demo access: <span className="font-medium text-foreground">{ADMIN_EMAIL}</span> · <span className="font-medium text-foreground">{ADMIN_PASSWORD}</span></p>
      </div>
    </div>
  );
}

function AdminSidebar({ active }) {
  const { setAdminAuthenticated, navigate, store } = useRudra();
  return (
    <>
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-border bg-card shadow-[4px_0_24px_rgba(36,32,29,0.03)] lg:flex lg:flex-col">
        <a href="/admin/dashboard" onClick={(event) => { event.preventDefault(); navigate("/admin/dashboard"); }} className="flex h-20 items-center gap-3 border-b border-border/80 px-6">
          <span className="grid size-10 place-items-center border border-antique-gold/80 bg-sand/30 text-primary"><Icon name="crest" size={24} /></span>
          <span className="font-display text-base leading-tight">Rudra Arts<span className="block font-sans text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Atelier Studio</span></span>
        </a>
        <div className="px-4 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Manage store</div>
        <nav className="space-y-1 px-2">
          {ADMIN_SECTIONS.map(([to, label, icon]) => (
            <AdminLink key={to} to={to} active={active === to}><Icon name={icon} size={16} />{label}
              {label === "Inquiries" && store.inquiries.filter((inquiry) => inquiry.status === "New").length > 0 && <span className="ml-auto grid size-5 place-items-center rounded-full bg-primary text-[10px] font-semibold tabular-nums text-primary-foreground">{store.inquiries.filter((inquiry) => inquiry.status === "New").length}</span>}
            </AdminLink>
          ))}
        </nav>
        <div className="mt-auto border-t border-border p-4">
          <button onClick={() => { setAdminAuthenticated(false); navigate("/admin/login"); }} className="flex min-h-10 w-full items-center gap-3 px-3 text-sm text-muted-foreground transition hover:text-primary"><Icon name="logout" size={16} />Sign out</button>
          <button onClick={() => navigate("/")} className="mt-1 flex min-h-10 w-full items-center gap-3 px-3 text-sm text-muted-foreground transition hover:text-primary"><Icon name="arrow" size={16} />View storefront</button>
        </div>
      </aside>
    </>
  );
}

function AdminTopbar({ activeLabel }) {
  const { setAdminAuthenticated, navigate } = useRudra();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-7">
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">Rudra Arts And Handicrafts / Administration</p>
          <h1 className="font-display text-xl text-foreground">{activeLabel}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">Satyajeet Arun Vaidya</span>
          <button aria-label="Sign out" title="Sign out" onClick={() => { setAdminAuthenticated(false); navigate("/admin/login"); }} className="grid size-10 shrink-0 place-items-center border border-border text-foreground transition hover:border-primary hover:text-primary"><Icon name="logout" size={17} /></button>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden" aria-label="Admin sections">
        {ADMIN_SECTIONS.map(([to, label]) => <a key={to} href={to} onClick={(event) => { event.preventDefault(); navigate(to); }} className={`shrink-0 px-3 py-2 text-xs ${activeLabel === label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{label}</a>)}
      </nav>
    </header>
  );
}

function AdminHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-primary">{eyebrow}</p>}
        <h2 className="font-display text-3xl text-foreground">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, note, icon }) {
  return (
    <div className="heritage-card border border-border/80 border-t-2 border-t-antique-gold bg-card p-5 shadow-product">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-medium uppercase tracking-[0.06em] text-muted-foreground">{label}</p><p className="mt-3 font-display text-3xl tabular-nums text-foreground">{value}</p><p className="mt-2 text-xs text-muted-foreground">{note}</p></div>
        <span className="grid size-11 place-items-center border border-antique-gold/45 bg-sand/50 text-primary"><Icon name={icon} size={19} /></span>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { store, navigate } = useRudra();
  const activeOrders = store.orders.filter((order) => order.status !== "Cancelled");
  const revenue = activeOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const pending = store.orders.filter((order) => ["Pending", "Confirmed", "Processing"].includes(order.status)).length;
  const newInquiries = store.inquiries.filter((inquiry) => inquiry.status === "New").length;
  const stats = [
    ["Total products", store.products.length, "Across all categories", "box"],
    ["Total orders", store.orders.length, "Demo orders on record", "bag"],
    ["Total revenue", formatPrice(revenue), "Excluding cancelled orders", "chart"],
    ["Total customers", store.customers.length, "Customer records", "users"],
    ["Pending orders", pending, "Awaiting fulfillment", "clock"],
    ["New inquiries", newInquiries, "Need a first response", "message"],
  ];

  const statusCounts = ORDER_STATUSES.map((status) => ({
    label: status,
    count: store.orders.filter((order) => order.status === status).length,
  }));
  const maxStatusCount = Math.max(1, ...statusCounts.map((item) => item.count));

  const categoryTotals = store.categories.map((cat) => ({
    label: cat.shortName || cat.name,
    count: store.products.filter((product) => product.category === cat.id).length,
  }));
  const maxCategoryCount = Math.max(1, ...categoryTotals.map((item) => item.count));

  return (
    <>
      <AdminHeading eyebrow="Good to see you" title="Store overview" description="A clear view of your shop today, from new enquiries to orders in progress." action={<Button variant="outline" onClick={() => navigate("/admin/products")}><Icon name="plus" size={16} />Add a product</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{stats.map(([label, value, note, icon]) => <StatCard key={label} label={label} value={value} note={note} icon={icon} />)}</div>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <section className="border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Fulfillment mix</p>
          <h3 className="mt-1 font-display text-xl">Orders by status</h3>
          <div className="mt-4 space-y-3">
            {statusCounts.map((item) => (
              <div key={item.label} className="grid grid-cols-[96px_1fr_32px] items-center gap-3 text-xs">
                <span className="truncate font-medium text-foreground">{item.label}</span>
                <div className="h-2.5 overflow-hidden bg-sand/70">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.round((item.count / maxStatusCount) * 100)}%` }}
                  />
                </div>
                <span className="text-right font-semibold text-muted-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-card p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Catalog distribution</p>
          <h3 className="mt-1 font-display text-xl">Pieces per collection</h3>
          <div className="mt-4 space-y-3">
            {categoryTotals.map((item) => (
              <div key={item.label} className="grid grid-cols-[140px_1fr_32px] items-center gap-3 text-xs">
                <span className="truncate font-medium text-foreground">{item.label}</span>
                <div className="h-2.5 overflow-hidden bg-sand/70">
                  <div
                    className="h-full bg-antique-gold transition-all duration-300"
                    style={{ width: `${Math.round((item.count / maxCategoryCount) * 100)}%` }}
                  />
                </div>
                <span className="text-right font-semibold text-muted-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Latest activity</p><h3 className="mt-1 font-display text-xl">Recent orders</h3></div><button onClick={() => navigate("/admin/orders")} className="text-xs font-semibold text-primary hover:underline">View all</button></div>
          <div className="divide-y divide-border">
            {store.orders.slice(0, 5).map((order) => <div key={order.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[1fr_1fr_auto_auto]">
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{order.customerName}</p><p className="mt-1 text-xs text-muted-foreground">{order.id} · {order.date}</p></div>
              <p className="hidden text-sm text-muted-foreground sm:block">{order.items?.length || 0} item(s)</p><p className="text-sm font-semibold">{formatPrice(order.total)}</p><StatusPill value={order.status} />
            </div>)}
            {store.orders.length === 0 && <p className="px-5 py-8 text-sm text-muted-foreground">Orders will appear here after checkout.</p>}
          </div>
        </section>
        <section className="border border-border bg-card">
          <div className="border-b border-border px-5 py-4"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Needs attention</p><h3 className="mt-1 font-display text-xl">Recent inquiries</h3></div>
          <div className="divide-y divide-border">
            {store.inquiries.slice(0, 4).map((inquiry) => <div key={inquiry.id} className="px-5 py-4"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-semibold">{inquiry.name}</p><StatusPill value={inquiry.status} /></div><p className="mt-1 truncate text-sm text-muted-foreground">{inquiry.subject}</p><p className="mt-2 text-xs text-muted-foreground">{inquiry.date}</p></div>)}
            {store.inquiries.length === 0 && <p className="px-5 py-8 text-sm text-muted-foreground">New inquiries will appear here.</p>}
          </div>
          <button onClick={() => navigate("/admin/inquiries")} className="w-full border-t border-border px-5 py-4 text-left text-xs font-semibold text-primary hover:bg-muted">Open inquiry desk <span aria-hidden="true">→</span></button>
        </section>
      </div>
      <section className="mt-7 border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Quick actions</p><h3 className="mt-1 font-display text-xl">Keep the store moving</h3></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => navigate("/admin/banner")}><Icon name="image" size={15} />Edit banner</Button><Button variant="outline" onClick={() => navigate("/admin/categories")}><Icon name="layers" size={15} />Manage categories</Button><Button variant="outline" onClick={() => navigate("/admin/settings")}><Icon name="settings" size={15} />Store settings</Button></div></div>
      </section>
    </>
  );
}

function StatusPill({ value }) {
  const color = value === "Delivered" || value === "Completed" || value === "Approved" ? "bg-success/10 text-success" : value === "Cancelled" ? "bg-destructive/10 text-destructive" : value === "New" || value === "Pending" ? "bg-antique-gold/20 text-charcoal" : "bg-sand text-charcoal";
  return <span className={`inline-flex w-fit shrink-0 items-center px-2.5 py-1 text-[10px] font-semibold ${color}`}>{value}</span>;
}

function AdminProducts() {
  const { store, updateStore } = useRudra();
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const blank = () => ({ id: "", name: "", category: store.categories[0]?.id || "statues", price: "", originalPrice: "", image: RUDRA_IMAGES.shivajiBust, extraImages: "", description: "", material: "", dimensions: "", weight: "", stock: "0", specifications: "", featured: false, bestselling: false, popularity: 50, created: new Date().toISOString().slice(0, 10) });
  const [draft, setDraft] = useState(blank);
  const items = store.products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase()));

  function saveProduct(event) {
    event.preventDefault();
    const baseSlug = draft.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `piece-${Date.now()}`;
    const existingIds = new Set(store.products.map((item) => item.id));
    const resolvedId = editing && editing !== "new"
      ? editing
      : existingIds.has(baseSlug)
        ? `${baseSlug}-${String(Date.now()).slice(-4)}`
        : baseSlug;
    const extras = String(draft.extraImages || "")
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    const images = Array.from(new Set([draft.image, ...extras].filter(Boolean)));
    const { extraImages: _unused, ...cleanDraft } = draft;
    const product = { ...cleanDraft, id: resolvedId, price: Number(draft.price), originalPrice: draft.originalPrice ? Number(draft.originalPrice) : null, stock: Number(draft.stock), images, popularity: Number(draft.popularity || 50) };
    updateStore((current) => ({ ...current, products: editing && editing !== "new" ? current.products.map((item) => item.id === editing ? product : item) : [product, ...current.products] }));
    setEditing(null);
    setDraft(blank());
  }

  function editProduct(product) {
    setEditing(product.id);
    const extras = (product.images || []).filter((src) => src && src !== product.image).join(", ");
    setDraft({ ...product, price: String(product.price), originalPrice: product.originalPrice ? String(product.originalPrice) : "", stock: String(product.stock), extraImages: extras });
  }
  function deleteProduct(id) { if (window.confirm("Remove this product from the store?")) updateStore((current) => ({ ...current, products: current.products.filter((item) => item.id !== id) })); }
  function field(name, label, type = "text") { return <label className="block text-xs font-semibold text-foreground">{label}<input required={name === "name" || name === "price"} type={type} value={draft[name] ?? ""} onChange={(event) => setDraft((current) => ({ ...current, [name]: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal outline-none focus:border-primary" /></label>; }

  return (
    <>
      <AdminHeading eyebrow="Catalog" title="Products" description="Update product details, pricing, stock, and storefront placement." action={<Button onClick={() => { setEditing("new"); setDraft(blank()); }}><Icon name="plus" size={16} />New product</Button>} />
      <div className="mb-4 flex max-w-md items-center gap-2 border border-input bg-card px-3"><Icon name="search" size={16} className="text-muted-foreground" /><input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products or categories" className="h-11 w-full bg-transparent text-sm outline-none" /></div>
      {editing && <form onSubmit={saveProduct} className="mb-6 border border-antique-gold bg-card p-5 shadow-product">
        <div className="mb-4 flex items-center justify-between"><h3 className="font-display text-xl">{editing === "new" ? "Add a product" : "Edit product"}</h3><button type="button" title="Close" aria-label="Close product form" onClick={() => setEditing(null)} className="grid size-9 place-items-center text-muted-foreground hover:text-primary"><Icon name="close" size={18} /></button></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {field("name", "Product name")}{field("price", "Price (INR)", "number")}{field("originalPrice", "Original price (optional)", "number")}
          <label className="block text-xs font-semibold">Category<select value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal">{store.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
          {field("stock", "Stock quantity", "number")}{field("image", "Primary image URL")}{field("extraImages", "Additional image URLs (comma-separated)")}{field("material", "Material")}{field("dimensions", "Dimensions")}{field("weight", "Weight")}
          <label className="block text-xs font-semibold sm:col-span-2">Description<textarea rows="2" value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>
          <label className="block text-xs font-semibold sm:col-span-2">Specifications<textarea rows="2" value={draft.specifications} onChange={(event) => setDraft((current) => ({ ...current, specifications: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2 xl:col-span-3"><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={Boolean(draft.featured)} onChange={(event) => setDraft((current) => ({ ...current, featured: event.target.checked }))} />Featured</label><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={Boolean(draft.bestselling)} onChange={(event) => setDraft((current) => ({ ...current, bestselling: event.target.checked }))} />Bestselling</label></div>
        </div>
        <div className="mt-5 flex gap-2"><Button type="submit">Save product</Button><Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button></div>
      </form>}
      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-muted text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Stock</th><th className="px-4 py-3">Placement</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-border">
          {items.map((product) => <tr key={product.id}><td className="px-4 py-3"><div className="flex items-center gap-3"><StoreImage src={product.image} alt="" className="size-12 object-cover" /><div><p className="max-w-xs font-medium">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.id}</p></div></div></td><td className="px-4 py-3 text-xs">{store.categories.find((category) => category.id === product.category)?.shortName || product.category}</td><td className="px-4 py-3">{formatPrice(product.price)}</td><td className="px-4 py-3">{product.stock}</td><td className="px-4 py-3"><div className="flex gap-1">{product.featured && <StatusPill value="Featured" />}{product.bestselling && <StatusPill value="Bestseller" />}</div></td><td className="px-4 py-3"><div className="flex justify-end gap-1"><button aria-label={`Edit ${product.name}`} onClick={() => editProduct(product)} className="grid size-9 place-items-center text-muted-foreground hover:text-primary"><Icon name="edit" size={16} /></button><button aria-label={`Delete ${product.name}`} onClick={() => deleteProduct(product.id)} className="grid size-9 place-items-center text-muted-foreground hover:text-destructive"><Icon name="trash" size={16} /></button></div></td></tr>)}
          {items.length === 0 && <tr><td colSpan="6" className="px-4 py-10 text-center text-sm text-muted-foreground">No products match that search.</td></tr>}
        </tbody></table>
      </div>
    </>
  );
}

function AdminCategories() {
  const { store, updateStore } = useRudra();
  const [editing, setEditing] = useState("");
  const [draft, setDraft] = useState({ name: "", shortName: "", description: "", image: "", order: store.categories.length + 1 });
  function choose(category) { setEditing(category.id); setDraft({ ...category }); }
  function save(event) {
    event.preventDefault();
    const id = editing && editing !== "new" ? editing : draft.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const category = { ...draft, id, order: Number(draft.order) };
    updateStore((current) => ({ ...current, categories: editing === "new" ? [...current.categories, category] : current.categories.map((item) => item.id === editing ? category : item) }));
    setEditing("");
  }
  function remove(id) { if (!window.confirm("Delete this category? Products in it will keep their category label.")) return; updateStore((current) => ({ ...current, categories: current.categories.filter((item) => item.id !== id) })); }
  return <>
    <AdminHeading eyebrow="Catalog" title="Categories" description="Keep collections organized and update the imagery used across the storefront." action={<Button onClick={() => { setEditing("new"); setDraft({ name: "", shortName: "", description: "", image: "", order: store.categories.length + 1 }); }}><Icon name="plus" size={16} />Add category</Button>} />
    {editing && <form onSubmit={save} className="mb-6 grid gap-4 border border-antique-gold bg-card p-5 sm:grid-cols-2"><h3 className="font-display text-xl sm:col-span-2">{editing === "new" ? "New category" : "Edit category"}</h3>
      {["name", "shortName", "image", "order"].map((field) => <label key={field} className="text-xs font-semibold capitalize">{field === "image" ? "Image URL (optional)" : field}<input required={field === "name"} type={field === "order" ? "number" : "text"} value={draft[field] ?? ""} onChange={(event) => setDraft((current) => ({ ...current, [field]: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>)}
      <label className="text-xs font-semibold sm:col-span-2">Description<textarea rows="2" value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>
      <div className="flex gap-2 sm:col-span-2"><Button type="submit">Save category</Button><Button type="button" variant="outline" onClick={() => setEditing("")}>Cancel</Button></div>
    </form>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[...store.categories].sort((a, b) => a.order - b.order).map((category) => <article key={category.id} className="overflow-hidden border border-border bg-card">{category.image ? <StoreImage src={category.image} alt={category.name} className="h-48 w-full object-cover" /> : <div className="flex h-36 flex-col justify-between border-b border-border bg-burgundy-royal p-4 text-primary-foreground"><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold">Collection {String(category.order).padStart(2, "0")}</span><p className="font-display text-xl">{category.shortName || category.name}</p></div>}<div className="p-4"><p className="text-[10px] uppercase tracking-[0.13em] text-primary">Position {category.order}</p><h3 className="mt-1 font-display text-xl">{category.name}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{category.description}</p><div className="mt-4 flex gap-2"><Button size="small" variant="outline" onClick={() => choose(category)}><Icon name="edit" size={14} />Edit</Button><Button size="small" variant="ghost" onClick={() => remove(category.id)}><Icon name="trash" size={14} />Delete</Button></div></div></article>)}</div>
  </>;
}

function AdminOrders() {
  const { store, updateStore } = useRudra();
  function changeStatus(id, status) { updateStore((current) => ({ ...current, orders: current.orders.map((order) => order.id === id ? { ...order, status } : order) })); }
  return <>
    <AdminHeading eyebrow="Fulfillment" title="Orders" description="Review demo orders and update their progress through fulfillment." />
    <div className="overflow-x-auto border border-border bg-card"><table className="w-full min-w-[840px] text-left text-sm"><thead className="bg-muted text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Payment</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th></tr></thead><tbody className="divide-y divide-border">{store.orders.map((order) => <tr key={order.id}><td className="px-4 py-4 font-semibold">{order.id}</td><td className="px-4 py-4"><p>{order.customerName}</p><p className="mt-1 text-xs text-muted-foreground">{order.email}</p></td><td className="px-4 py-4 text-xs">{order.date}</td><td className="px-4 py-4 text-xs">{order.payment}</td><td className="px-4 py-4 font-semibold">{formatPrice(order.total)}</td><td className="px-4 py-4"><select aria-label={`Update status for ${order.id}`} value={order.status} onChange={(event) => changeStatus(order.id, event.target.value)} className="border border-input bg-background px-2 py-2 text-xs">{ORDER_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}{store.orders.length === 0 && <tr><td colSpan="6" className="px-4 py-10 text-center text-muted-foreground">No orders yet.</td></tr>}</tbody></table></div>
  </>;
}

function AdminCustomers() {
  const { store } = useRudra();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = store.customers.filter((customer) => `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(search.toLowerCase()));
  const customerOrders = selected ? store.orders.filter((order) => order.email.toLowerCase() === selected.email.toLowerCase()) : [];
  return <>
    <AdminHeading eyebrow="People" title="Customers" description="Search customer records and review their order history." />
    <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
      <section className="border border-border bg-card"><div className="border-b border-border p-4"><label className="flex items-center gap-2 border border-input px-3"><Icon name="search" size={16} className="text-muted-foreground" /><input aria-label="Search customers" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, or phone" className="h-10 w-full bg-transparent text-sm outline-none" /></label></div><div className="divide-y divide-border">{filtered.map((customer) => <button key={customer.id} onClick={() => setSelected(customer)} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 text-left transition hover:bg-muted ${selected?.id === customer.id ? "bg-muted" : ""}`}><span className="min-w-0"><span className="block truncate text-sm font-semibold">{customer.name}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{customer.email}</span></span><span className="text-right text-xs text-muted-foreground">{customer.totalOrders} orders<br />{formatPrice(customer.totalSpending)}</span></button>)}{filtered.length === 0 && <p className="p-5 text-sm text-muted-foreground">No matching customers.</p>}</div></section>
      <section className="border border-border bg-card p-5">{selected ? <><p className="text-[10px] uppercase tracking-[0.15em] text-primary">Customer detail</p><h3 className="mt-2 font-display text-2xl">{selected.name}</h3><p className="mt-3 text-sm text-muted-foreground">{selected.email}<br />{selected.phone}</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="bg-muted p-3"><p className="text-xs text-muted-foreground">Orders</p><p className="mt-1 font-display text-2xl">{selected.totalOrders}</p></div><div className="bg-muted p-3"><p className="text-xs text-muted-foreground">Total spend</p><p className="mt-1 font-display text-xl">{formatPrice(selected.totalSpending)}</p></div></div><h4 className="mt-6 border-b border-border pb-2 text-xs font-semibold uppercase tracking-[0.12em]">Order history</h4><div className="divide-y divide-border">{customerOrders.map((order) => <div key={order.id} className="flex items-center justify-between gap-3 py-3 text-sm"><span>{order.id}<span className="mt-1 block text-xs text-muted-foreground">{order.date} · {order.status}</span></span><span className="font-semibold">{formatPrice(order.total)}</span></div>)}{customerOrders.length === 0 && <p className="py-4 text-sm text-muted-foreground">No orders are linked to this customer yet.</p>}</div></> : <div className="flex min-h-64 flex-col items-center justify-center text-center"><Icon name="users" size={27} className="text-antique-gold" /><h3 className="mt-4 font-display text-xl">Choose a customer</h3><p className="mt-2 max-w-xs text-sm leading-5 text-muted-foreground">Their contact details and order history will appear here.</p></div>}</section>
    </div>
  </>;
}

function AdminBanner() {
  const { store, updateStore } = useRudra();
  function field(label, key, multiline = false) { const Element = multiline ? "textarea" : "input"; return <label className="block text-xs font-semibold text-foreground">{label}<Element rows={multiline ? 3 : undefined} value={store.banner[key] || ""} onChange={(event) => updateStore((current) => ({ ...current, banner: { ...current.banner, [key]: event.target.value } }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal outline-none focus:border-primary" /></label>; }
  return <>
    <AdminHeading eyebrow="Homepage" title="Banner & announcement" description="Update the homepage message, imagery, headline, and calls to action. Changes appear immediately on the storefront." />
    <div className="grid gap-6 xl:grid-cols-[1fr_0.72fr]">
      <section className="border border-border bg-card p-5"><div className="grid gap-4">{field("Announcement bar message", "announcement")}{field("Eyebrow", "eyebrow")}{field("Hero heading", "heading")}{field("Hero subtitle", "subtitle", true)}{field("Hero image URL", "image")}<div className="grid gap-4 sm:grid-cols-2">{field("Primary button text", "ctaText")}{field("Primary button link", "ctaLink")}{field("Secondary button text", "secondaryText")}{field("Secondary button link", "secondaryLink")}</div></div></section>
      <section className="border border-border bg-card p-4"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">Live preview</p><div className="relative min-h-72 overflow-hidden bg-charcoal"><StoreImage src={store.banner.image} alt="Banner preview" className="absolute inset-0 size-full object-cover" /><div className="hero-overlay absolute inset-0" /><div className="relative z-10 flex min-h-72 flex-col justify-end p-6 text-primary-foreground"><p className="text-[10px] uppercase tracking-[0.16em] text-antique-gold">{store.banner.eyebrow}</p><h3 className="mt-2 max-w-sm font-display text-3xl">{store.banner.heading}</h3><p className="mt-2 max-w-sm text-xs leading-5">{store.banner.subtitle}</p></div></div></section>
    </div>
  </>;
}

function AdminGalleryManager() {
  const { store, updateStore } = useRudra();
  const blank = () => ({ id: "", title: "", tag: "", medium: "", image: "" });
  const [editing, setEditing] = useState("");
  const [draft, setDraft] = useState(blank);

  function save(event) {
    event.preventDefault();
    const isNew = editing === "new" || !editing;
    const baseSlug = draft.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || String(Date.now());
    const id = isNew ? `gallery-${baseSlug}-${String(Date.now()).slice(-4)}` : editing;
    const entry = { ...draft, id };
    updateStore((current) => ({
      ...current,
      gallery: isNew
        ? [entry, ...current.gallery]
        : current.gallery.map((item) => (item.id === editing ? entry : item)),
    }));
    setDraft(blank());
    setEditing("");
  }

  function remove(id) {
    if (!window.confirm("Remove this gallery item?")) return;
    updateStore((current) => ({ ...current, gallery: current.gallery.filter((item) => item.id !== id) }));
    if (editing === id) {
      setDraft(blank());
      setEditing("");
    }
  }

  return (
    <section className="mt-6 border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">Storefront imagery</p>
          <h3 className="mt-1 font-display text-xl">Heritage gallery</h3>
        </div>
        <Button onClick={() => { setDraft(blank()); setEditing("new"); }}><Icon name="plus" size={15} />Add gallery item</Button>
      </div>
      {editing && (
        <form onSubmit={save} className="mt-5 grid gap-4 border-y border-border py-5 sm:grid-cols-2">
          <label className="text-xs font-semibold">Title<input required value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>
          <label className="text-xs font-semibold">Category label<input required value={draft.tag} onChange={(event) => setDraft((current) => ({ ...current, tag: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>
          <label className="text-xs font-semibold sm:col-span-2">Image URL (optional)<input value={draft.image} onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label>
          <div className="flex gap-2 sm:col-span-2"><Button type="submit">Save gallery item</Button><Button type="button" variant="outline" onClick={() => { setDraft(blank()); setEditing(""); }}>Cancel</Button></div>
        </form>
      )}
      <div className="mt-4 divide-y divide-border">
        {store.gallery.map((item) => (
          <article key={item.id} className="grid gap-3 py-4 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-center">
            {item.image ? <StoreImage src={item.image} alt="" className="aspect-square w-20 object-cover" /> : <div className="grid aspect-square w-20 place-items-center border border-antique-gold/50 bg-charcoal text-antique-gold"><Icon name="spark" size={18} /></div>}
            <div className="min-w-0"><h4 className="font-display text-lg">{item.title}</h4><p className="mt-1 text-xs text-muted-foreground">{item.tag}</p></div>
            <div className="flex gap-1"><button type="button" aria-label={`Edit ${item.title}`} onClick={() => { setDraft({ ...item }); setEditing(item.id); }} className="grid size-9 place-items-center text-muted-foreground hover:text-primary"><Icon name="edit" size={16} /></button><button type="button" aria-label={`Delete ${item.title}`} onClick={() => remove(item.id)} className="grid size-9 place-items-center text-muted-foreground hover:text-destructive"><Icon name="trash" size={16} /></button></div>
          </article>
        ))}
        {store.gallery.length === 0 && <p className="py-5 text-sm text-muted-foreground">Add imagery to show the work of the atelier.</p>}
      </div>
    </section>
  );
}

function AdminHomepage() {
  const { store, updateStore } = useRudra();
  const visible = store.homepage.sectionVisibility;
  function setHome(key, value) { updateStore((current) => ({ ...current, homepage: { ...current.homepage, [key]: value } })); }
  function toggle(section) { setHome("sectionVisibility", { ...visible, [section]: !visible[section] }); }
  function updateOrder(index, direction) { const order = [...store.homepage.sectionOrder]; const next = index + direction; if (next < 0 || next >= order.length) return; [order[index], order[next]] = [order[next], order[index]]; setHome("sectionOrder", order); }
  return <>
    <AdminHeading eyebrow="Homepage" title="Homepage content" description="Shape the story customers see first, choose which sections are visible, and arrange their order." />
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="border border-border bg-card p-5"><h3 className="font-display text-xl">Heritage story</h3><label className="mt-4 block text-xs font-semibold">Section heading<input value={store.homepage.storyHeading} onChange={(event) => setHome("storyHeading", event.target.value)} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="mt-4 block text-xs font-semibold">Story description<textarea rows="5" value={store.homepage.storyText} onChange={(event) => setHome("storyText", event.target.value)} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="mt-4 block text-xs font-semibold">Craftsmanship features <span className="font-normal text-muted-foreground">(separate with commas)</span><textarea rows="3" value={store.homepage.craftFeatures.join(", ")} onChange={(event) => setHome("craftFeatures", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="mt-5 block text-xs font-semibold">Newsletter heading<input value={store.homepage.newsletterHeading || ""} onChange={(event) => setHome("newsletterHeading", event.target.value)} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="mt-4 block text-xs font-semibold">Newsletter description<textarea rows="3" value={store.homepage.newsletterText || ""} onChange={(event) => setHome("newsletterText", event.target.value)} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label></section>
      <section className="border border-border bg-card p-5"><h3 className="font-display text-xl">Sections & order</h3><p className="mt-1 text-sm text-muted-foreground">Show or hide a section and move it up or down.</p><div className="mt-4 divide-y divide-border">{store.homepage.sectionOrder.map((section, index) => <div key={section} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3"><label className="flex min-w-0 items-center gap-3 text-sm font-medium capitalize"><input type="checkbox" checked={Boolean(visible[section])} onChange={() => toggle(section)} className="size-4 accent-primary" /><span className="truncate">{section.replaceAll("-", " ")}</span></label><div className="flex gap-1"><button aria-label={`Move ${section} up`} disabled={index === 0} onClick={() => updateOrder(index, -1)} className="grid size-8 place-items-center border border-border text-muted-foreground enabled:hover:text-primary disabled:opacity-40"><Icon name="up" size={14} /></button><button aria-label={`Move ${section} down`} disabled={index === store.homepage.sectionOrder.length - 1} onClick={() => updateOrder(index, 1)} className="grid size-8 place-items-center border border-border text-muted-foreground enabled:hover:text-primary disabled:opacity-40"><Icon name="down" size={14} /></button></div></div>)}</div></section>
    </div>
    <AdminGalleryManager />
  </>;
}

function AdminTestimonials() {
  const { store, updateStore } = useRudra();
  const [draft, setDraft] = useState({ id: "", name: "", product: "", rating: 5, text: "", approved: false });
  const [editing, setEditing] = useState(false);
  function save(event) { event.preventDefault(); const testimonial = { ...draft, id: draft.id || `review-${Date.now()}`, rating: Number(draft.rating) }; updateStore((current) => ({ ...current, testimonials: editing ? current.testimonials.map((item) => item.id === testimonial.id ? testimonial : item) : [testimonial, ...current.testimonials] })); setDraft({ id: "", name: "", product: "", rating: 5, text: "", approved: false }); setEditing(false); }
  function edit(item) { setDraft({ ...item }); setEditing(true); }
  function remove(id) { updateStore((current) => ({ ...current, testimonials: current.testimonials.filter((item) => item.id !== id) })); }
  function approve(id) { updateStore((current) => ({ ...current, testimonials: current.testimonials.map((item) => item.id === id ? { ...item, approved: !item.approved } : item) })); }
  return <>
    <AdminHeading eyebrow="Customer voice" title="Testimonials" description="Add, refine, approve, and remove customer reviews shown on the homepage." />
    <form onSubmit={save} className="mb-6 grid gap-4 border border-border bg-card p-5 sm:grid-cols-2"><h3 className="font-display text-xl sm:col-span-2">{editing ? "Edit review" : "Add a testimonial"}</h3><label className="text-xs font-semibold">Customer name<input required value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="text-xs font-semibold">Product<input value={draft.product} onChange={(event) => setDraft((current) => ({ ...current, product: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="text-xs font-semibold">Rating<select value={draft.rating} onChange={(event) => setDraft((current) => ({ ...current, rating: Number(event.target.value) }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal">{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select></label><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={draft.approved} onChange={(event) => setDraft((current) => ({ ...current, approved: event.target.checked }))} />Approved for homepage</label><label className="text-xs font-semibold sm:col-span-2">Review<textarea required rows="3" value={draft.text} onChange={(event) => setDraft((current) => ({ ...current, text: event.target.value }))} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><div className="flex gap-2 sm:col-span-2"><Button type="submit">{editing ? "Save changes" : "Add testimonial"}</Button>{editing && <Button variant="outline" type="button" onClick={() => { setEditing(false); setDraft({ id: "", name: "", product: "", rating: 5, text: "", approved: false }); }}>Cancel</Button>}</div></form>
    <div className="divide-y divide-border border border-border bg-card">{store.testimonials.map((item) => <article key={item.id} className="grid gap-4 p-5 md:grid-cols-[1fr_auto]"><div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold">{item.name}</h3><StatusPill value={item.approved ? "Approved" : "Pending"} /><span className="text-xs text-antique-gold">{"★".repeat(item.rating)}</span></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p><p className="mt-2 text-xs text-muted-foreground">{item.product}</p></div><div className="flex items-center gap-2"><Button size="small" variant="outline" onClick={() => approve(item.id)}>{item.approved ? "Unapprove" : "Approve"}</Button><button aria-label={`Edit review by ${item.name}`} onClick={() => edit(item)} className="grid size-9 place-items-center text-muted-foreground hover:text-primary"><Icon name="edit" size={15} /></button><button aria-label={`Delete review by ${item.name}`} onClick={() => remove(item.id)} className="grid size-9 place-items-center text-muted-foreground hover:text-destructive"><Icon name="trash" size={15} /></button></div></article>)}</div>
  </>;
}

function AdminInquiries() {
  const { store, updateStore } = useRudra();
  const [selected, setSelected] = useState(null);
  function changeStatus(id, status) { updateStore((current) => ({ ...current, inquiries: current.inquiries.map((item) => item.id === id ? { ...item, status } : item) })); }
  return <>
    <AdminHeading eyebrow="Customer care" title="Inquiries" description="Keep track of custom orders, product questions, and contact form messages." />
    <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
      <section className="divide-y divide-border border border-border bg-card">{store.inquiries.map((inquiry) => <button key={inquiry.id} onClick={() => setSelected(inquiry)} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 text-left hover:bg-muted ${selected?.id === inquiry.id ? "bg-muted" : ""}`}><span className="min-w-0"><span className="block truncate text-sm font-semibold">{inquiry.subject}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{inquiry.name} · {inquiry.date}</span></span><StatusPill value={inquiry.status} /></button>)}{store.inquiries.length === 0 && <p className="p-5 text-sm text-muted-foreground">No inquiries yet.</p>}</section>
      <section className="border border-border bg-card p-5">{selected ? <><p className="text-[10px] uppercase tracking-[0.15em] text-primary">Inquiry detail</p><h3 className="mt-2 font-display text-2xl">{selected.subject}</h3><p className="mt-3 text-sm font-semibold">{selected.name}</p><p className="mt-1 text-sm text-muted-foreground">{selected.email}<br />{selected.phone}<br />Received {selected.date}</p><p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-foreground">{selected.message}</p><label className="mt-5 block text-xs font-semibold">Status<select value={selected.status} onChange={(event) => { changeStatus(selected.id, event.target.value); setSelected((current) => ({ ...current, status: event.target.value })); }} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal">{INQUIRY_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label></> : <div className="flex min-h-56 flex-col items-center justify-center text-center"><Icon name="message" size={26} className="text-antique-gold" /><h3 className="mt-4 font-display text-xl">Choose an inquiry</h3><p className="mt-2 text-sm text-muted-foreground">The full message and contact details will appear here.</p></div>}</section>
    </div>
  </>;
}

function AdminSettings() {
  const { store, updateStore } = useRudra();
  const fields = [
    ["businessName", "Business name"], ["owner", "Business owner"], ["phone", "Phone"], ["whatsapp", "WhatsApp number (with country code)"], ["email", "Email"], ["address", "Address"], ["website", "Website URL"], ["instagram", "Instagram link"], ["facebook", "Facebook link"], ["businessHours", "Business hours"], ["footerDescription", "Footer description"], ["copyright", "Copyright text"],
  ];
  function update(key, value) { updateStore((current) => ({ ...current, settings: { ...current.settings, [key]: value } })); }
  return <>
    <AdminHeading eyebrow="Store profile" title="Website settings" description="Update the business details and footer information used throughout the storefront." />
    <div className="grid gap-6 xl:grid-cols-[1fr_0.65fr]">
      <section className="grid gap-4 border border-border bg-card p-5 sm:grid-cols-2">{fields.map(([key, label]) => <label key={key} className={`block text-xs font-semibold ${["address", "footerDescription", "copyright"].includes(key) ? "sm:col-span-2" : ""}`}>{label}{["address", "footerDescription", "copyright"].includes(key) ? <textarea rows={key === "address" ? 3 : 2} value={store.settings[key] || ""} onChange={(event) => update(key, event.target.value)} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" /> : <input value={store.settings[key] || ""} onChange={(event) => update(key, event.target.value)} className="mt-1.5 w-full border border-input bg-background px-3 py-2.5 text-sm font-normal" />}</label>)}</section>
      <aside className="h-fit border border-border bg-card p-5"><p className="text-[10px] uppercase tracking-[0.15em] text-primary">Business contact</p><h3 className="mt-2 font-display text-xl">{store.settings.businessName}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{store.settings.address}</p><p className="mt-4 text-sm">{store.settings.phone}</p><p className="mt-1 text-sm">{store.settings.email}</p><p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">Changes save automatically in this browser.</p></aside>
    </div>
  </>;
}

const ADMIN_COMPONENTS = {
  "/admin/dashboard": ["Overview", AdminDashboard],
  "/admin/products": ["Products", AdminProducts],
  "/admin/categories": ["Categories", AdminCategories],
  "/admin/orders": ["Orders", AdminOrders],
  "/admin/customers": ["Customers", AdminCustomers],
  "/admin/homepage": ["Homepage", AdminHomepage],
  "/admin/banner": ["Banner", AdminBanner],
  "/admin/testimonials": ["Testimonials", AdminTestimonials],
  "/admin/inquiries": ["Inquiries", AdminInquiries],
  "/admin/settings": ["Settings", AdminSettings],
};

export function AdminArea() {
  const { path, adminAuthenticated, navigate, ready } = useRudra();
  useEffect(() => {
    if (!ready) return;
    if (path === "/admin/login" && adminAuthenticated) navigate("/admin/dashboard");
    else if (path.startsWith("/admin") && path !== "/admin/login" && !adminAuthenticated) navigate("/admin/login");
    else if (path === "/admin" && adminAuthenticated) navigate("/admin/dashboard");
  }, [path, adminAuthenticated, navigate, ready]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand px-4">
        <div className="border border-border bg-card px-8 py-6 text-center shadow-product">
          <p className="font-display text-lg text-foreground">Restoring studio session…</p>
        </div>
      </div>
    );
  }

  if (path === "/admin/login" || !adminAuthenticated) return <AdminLogin />;
  const [activeLabel, Page] = ADMIN_COMPONENTS[path] || ADMIN_COMPONENTS["/admin/dashboard"];
  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <AdminSidebar active={path} />
      <div className="min-w-0 flex-1">
        <AdminTopbar activeLabel={activeLabel} />
        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 sm:py-9"><Page /></main>
      </div>
    </div>
  );
}