import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const routerState = vi.hoisted(() => ({
  pathname: "/",
  search: {} as Record<string, string>,
  listeners: new Set<() => void>(),
}));

vi.mock("@tanstack/react-router", async () => {
  const React = await import("react");
  return {
    useNavigate: () => {
      return ({ to, search = {} }: { to: string; search?: Record<string, string> }) => {
        routerState.pathname = to;
        routerState.search = search;
        routerState.listeners.forEach((listener) => listener());
      };
    },
    useRouterState: ({
      select,
    }: {
      select: (state: {
        location: { pathname: string; search: Record<string, string> };
      }) => unknown;
    }) => {
      const [, forceUpdate] = React.useReducer((count: number) => count + 1, 0);
      React.useEffect(() => {
        routerState.listeners.add(forceUpdate);
        return () => {
          routerState.listeners.delete(forceUpdate);
        };
      }, []);
      return select({ location: { pathname: routerState.pathname, search: routerState.search } });
    },
  };
});

import { RudraApp } from "@/components/RudraApp.jsx";
import { RudraProvider } from "@/context/RudraContext.jsx";
import { ADMIN_EMAIL, ADMIN_PASSWORD, matchesAdminCredentials } from "@/data/mock-data.js";

function renderApp(initialPath = "/", initialSearch: Record<string, string> = {}) {
  routerState.pathname = initialPath;
  routerState.search = initialSearch;
  return render(
    <RudraProvider>
      <RudraApp />
    </RudraProvider>,
  );
}

describe("Rudra storefront & admin workflows", () => {
  beforeEach(() => {
    window.localStorage.clear();
    routerState.listeners.clear();
  });

  it("validates demo admin credentials case-insensitively on email", () => {
    expect(matchesAdminCredentials("ADMIN@rudraarts.com", ADMIN_PASSWORD)).toBe(true);
    expect(matchesAdminCredentials(ADMIN_EMAIL, "wrong")).toBe(false);
  });

  it("renders homepage hero, announcement, and adds product to cart through checkout", async () => {
    renderApp("/");

    expect(
      screen.getByText(/Preserving India's Heritage Through Timeless Craftsmanship/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Crafting History\. Preserving Heritage\./i }),
    ).toBeInTheDocument();

    const addButtons = screen.getAllByRole("button", { name: /Add to cart/i });
    fireEvent.click(addButtons[0]!);

    const cartLink = screen.getByLabelText(/Shopping cart, 1 items/i);
    fireEvent.click(cartLink);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Shopping cart/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Continue to checkout/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Checkout/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: "Suresh Shinde" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: "suresh@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "9822011122" } });
    fireEvent.change(screen.getByLabelText(/Street address/i), {
      target: { value: "Rajarampuri 13th Lane" },
    });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Kolhapur" } });
    fireEvent.change(screen.getByLabelText(/Pincode/i), { target: { value: "416008" } });

    fireEvent.click(screen.getByRole("button", { name: /Place demo order/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Thank you, Suresh\./i })).toBeInTheDocument();
    });
    expect(screen.getByText(/RAH-/)).toBeInTheDocument();
  }, 15000);

  it("redirects unauthenticated admin visits to login, signs in, and adds a gallery item", async () => {
    renderApp("/admin/dashboard");

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Welcome back/i })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: ADMIN_EMAIL } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "badpass" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign in to dashboard/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Auto-fill demo credentials/i }));
    expect(screen.getByLabelText(/Email/i)).toHaveValue(ADMIN_EMAIL);
    expect(screen.getByLabelText(/Password/i)).toHaveValue(ADMIN_PASSWORD);
    fireEvent.click(screen.getByRole("button", { name: /Sign in to dashboard/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Store overview/i })).toBeInTheDocument();
    });

    const homepageNavLinks = screen.getAllByText("Homepage");
    fireEvent.click(homepageNavLinks[0]!);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Homepage content/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Add gallery item/i }));
    fireEvent.change(screen.getByLabelText(/^Title$/i), {
      target: { value: "Panhala Fort Diorama" },
    });
    fireEvent.change(screen.getByLabelText(/Category label/i), {
      target: { value: "Historical Replica" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Save gallery item/i }));

    await waitFor(() => {
      expect(screen.getByText("Panhala Fort Diorama")).toBeInTheDocument();
    });
  }, 15000);

  it("supports direct Buy now checkout and renders floating Instagram, WhatsApp, and Phone buttons", async () => {
    renderApp("/");

    expect(screen.getByRole("link", { name: /Follow Rudra Arts on Instagram/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/",
    );
    expect(screen.getByRole("link", { name: /Chat with Rudra Arts on WhatsApp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/918400456555"),
    );
    expect(screen.getByRole("link", { name: /Call Rudra Arts at 8400456555/i })).toHaveAttribute(
      "href",
      "tel:+918400456555",
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector('a[aria-label="Instagram"]')).toHaveAttribute(
      "href",
      "https://www.instagram.com/",
    );
    expect(footer.querySelector('a[aria-label="WhatsApp"]')).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/918400456555"),
    );
    expect(footer.querySelector('a[aria-label="Call studio at 8400456555"]')).toHaveAttribute(
      "href",
      "tel:+918400456555",
    );

    const heroCraftBtn = screen.getByRole("button", { name: "Discover Our Craft" });
    expect(heroCraftBtn).toHaveClass("hover:text-charcoal");
    expect(heroCraftBtn).not.toHaveClass("hover:text-primary-foreground");

    const customOrderBtn = screen.getByRole("button", { name: /Request a custom order/i });
    expect(customOrderBtn).toHaveClass("hover:text-charcoal");
    expect(customOrderBtn).not.toHaveClass("hover:text-primary-foreground");

    const buyNowButtons = screen.getAllByRole("button", { name: /Buy now/i });
    fireEvent.click(buyNowButtons[0]!);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Checkout/i })).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Chhatrapati Shivaji Maharaj Royal Bronze Statue/i),
    ).toBeInTheDocument();
  }, 15000);
});
