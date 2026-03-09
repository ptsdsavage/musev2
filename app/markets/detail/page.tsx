import { Suspense } from "react";
import MarketDetailClient from "./MarketDetailClient";

export default function MarketDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <MarketDetailClient />
    </Suspense>
  );
}
