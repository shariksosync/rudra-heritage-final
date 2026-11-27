import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: createPageMeta(
      "Shop Heritage Art | Rudra Arts And Handicrafts",
      "Browse Chhatrapati Shivaji Maharaj statues, historical replicas, Maratha weaponry, mural frames, and handcrafted sculptures.",
    ),
  }),
  component: RudraApp,
});
