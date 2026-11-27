import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: createPageMeta(
      "Saved Wishlist | Rudra Arts And Handicrafts",
      "Revisit your saved statues, historical replicas, and handcrafted heritage pieces.",
    ),
  }),
  component: RudraApp,
});
