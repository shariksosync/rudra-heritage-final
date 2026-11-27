import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { createPageMeta } from "@/lib/page-meta.js";
import { routeTree } from "@/routeTree.gen";

const EXPECTED_PATHS = [
  "/",
  "/shop",
  "/collections",
  "/gallery",
  "/about",
  "/contact",
  "/wishlist",
  "/cart",
  "/checkout",
  "/order-confirmation",
  "/product/shivaji-royal-bronze",
  "/account",
  "/account/login",
  "/account/register",
  "/admin",
  "/admin/login",
  "/admin/dashboard",
  "/admin/products",
  "/admin/categories",
  "/admin/orders",
  "/admin/customers",
  "/admin/homepage",
  "/admin/banner",
  "/admin/testimonials",
  "/admin/inquiries",
  "/admin/settings",
  "/nonexistent-heritage-page",
];

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each(EXPECTED_PATHS)(
    "matches a dedicated route for %s instead of falling back to root not found",
    (path) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const matches = router.matchRoutes(path);
      const leaf = matches.at(-1);

      expect(leaf?.routeId).not.toBe(rootRouteId);
      expect(leaf?.status).not.toBe("notFound");
    },
  );

  it("builds complete metadata entries via createPageMeta", () => {
    const meta = createPageMeta("Shop | Rudra Arts", "Heritage catalog");
    expect(meta).toEqual([
      { title: "Shop | Rudra Arts" },
      { name: "description", content: "Heritage catalog" },
      { property: "og:title", content: "Shop | Rudra Arts" },
      { property: "og:description", content: "Heritage catalog" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ]);
  });
});
