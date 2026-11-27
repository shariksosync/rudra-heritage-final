import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { hydrateStore, INITIAL_STORE } from "@/data/mock-data.js";

const RudraContext = createContext(null);
const STORAGE_KEY = "rudra-arts-demo-v1";

export function RudraProvider({ children }) {
  const routerNavigate = useNavigate();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const urlSearch = useRouterState({ select: (state) => state.location.search });
  const [store, setStore] = useState(INITIAL_STORE);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [quickProduct, setQuickProduct] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.store && typeof parsed.store === "object") setStore(hydrateStore(parsed.store));
        if (Array.isArray(parsed.cart)) setCart(parsed.cart);
        if (Array.isArray(parsed.wishlist)) setWishlist(parsed.wishlist);
        if (parsed.customer) setCustomer(parsed.customer);
        if (parsed.adminAuthenticated) setAdminAuthenticated(true);
        if (parsed.lastOrder) setLastOrder(parsed.lastOrder);
      }
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // The storefront remains usable when browser storage is unavailable.
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ store, cart, wishlist, customer, adminAuthenticated, lastOrder }),
      );
    } catch {
      // The demo remains usable if browser storage is unavailable or full.
    }
  }, [store, cart, wishlist, customer, adminAuthenticated, lastOrder, ready]);

  const navigate = useCallback(
    (destination) => {
      if (typeof destination !== "string") return;
      const [to, query = ""] = destination.split("?");
      const search = Object.fromEntries(new URLSearchParams(query).entries());
      const options = Object.keys(search).length > 0 ? { to, search } : { to };
      void routerNavigate(options);
      setMobileMenuOpen(false);
      setSearchOpen(false);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [routerNavigate],
  );

  const updateStore = useCallback((updater) => {
    setStore((current) => (typeof updater === "function" ? updater(current) : { ...current, ...updater }));
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.price <= 0 || quantity <= 0) return;
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...current, { productId: product.id, quantity }];
    });
  }, []);

  const setCartQuantity = useCallback((productId, quantity) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  }, []);

  const addInquiry = useCallback(
    (fields) => {
      const inquiry = {
        id: `inq-${Date.now()}`,
        name: fields.name,
        phone: fields.phone,
        email: fields.email,
        subject: fields.subject || "General enquiry",
        message: fields.message,
        date: new Date().toISOString().slice(0, 10),
        status: "New",
      };
      updateStore((current) => ({ ...current, inquiries: [inquiry, ...current.inquiries] }));
      return inquiry;
    },
    [updateStore],
  );

  const value = useMemo(
    () => ({
      path,
      urlSearch,
      ready,
      store,
      updateStore,
      cart,
      setCart,
      addToCart,
      setCartQuantity,
      wishlist,
      toggleWishlist,
      customer,
      setCustomer,
      adminAuthenticated,
      setAdminAuthenticated,
      lastOrder,
      setLastOrder,
      quickProduct,
      setQuickProduct,
      inquiryOpen,
      setInquiryOpen,
      searchOpen,
      setSearchOpen,
      mobileMenuOpen,
      setMobileMenuOpen,
      navigate,
      addInquiry,
    }),
    [
      path,
      urlSearch,
      ready,
      store,
      updateStore,
      cart,
      addToCart,
      setCartQuantity,
      wishlist,
      toggleWishlist,
      customer,
      adminAuthenticated,
      lastOrder,
      quickProduct,
      inquiryOpen,
      searchOpen,
      mobileMenuOpen,
      navigate,
      addInquiry,
    ],
  );

  return <RudraContext.Provider value={value}>{children}</RudraContext.Provider>;
}

export function useRudra() {
  const context = useContext(RudraContext);
  if (!context) throw new Error("useRudra must be used inside RudraProvider");
  return context;
}