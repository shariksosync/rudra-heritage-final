import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: createPageMeta(
      "Contact & Custom Orders | Rudra Arts And Handicrafts",
      "Reach our Kolhapur studio for product questions, custom heritage sculptures, and bespoke decor installations.",
    ),
  }),
  component: RudraApp,
});
