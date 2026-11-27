import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { INITIAL_STORE } from "@/data/mock-data.js";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/product/$productId")({
  head: ({ params }) => {
    const product = INITIAL_STORE.products.find((item) => item.id === params.productId);
    if (!product) {
      return {
        meta: createPageMeta(
          "Heritage Piece | Rudra Arts And Handicrafts",
          "Explore handcrafted heritage sculptures, replicas, and decor from Rudra Arts And Handicrafts.",
        ),
      };
    }
    return {
      meta: createPageMeta(`${product.name} | Rudra Arts And Handicrafts`, product.description),
    };
  },
  component: RudraApp,
});
