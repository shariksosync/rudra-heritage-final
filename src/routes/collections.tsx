import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: createPageMeta(
      "Heritage Collections | Rudra Arts And Handicrafts",
      "Explore curated collections of Maratha-inspired statues, fort miniatures, traditional weaponry, mural frames, and bespoke decor.",
    ),
  }),
  component: RudraApp,
});
