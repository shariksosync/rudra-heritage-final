import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: createPageMeta(
      "Rudra Arts And Handicrafts | Crafting History. Preserving Heritage.",
      "Discover timeless Chhatrapati Shivaji Maharaj statues, Maratha historical replicas, weaponry, and handcrafted heritage decor from Kolhapur, Maharashtra.",
    ),
  }),
  component: RudraApp,
});
