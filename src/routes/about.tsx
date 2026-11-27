import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: createPageMeta(
      "Our Story | Rudra Arts And Handicrafts",
      "Learn about Satyajeet Arun Vaidya and our Kolhapur studio preserving Maratha heritage through handcrafted sculptures and traditional art.",
    ),
  }),
  component: RudraApp,
});
