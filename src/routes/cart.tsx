import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: createPageMeta(
      "Shopping Cart | Rudra Arts And Handicrafts",
      "Review your selected heritage sculptures and art pieces before continuing to checkout.",
    ),
  }),
  component: RudraApp,
});
