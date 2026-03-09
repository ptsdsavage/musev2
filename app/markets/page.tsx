"use client";

import { useEffect, useState } from "react";
import { fetchMarkets } from "@/lib/store";
import { MarketCard } from "@/components/MarketCard";
import type { Market } from "@/lib/types";

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const m = await fetchMarkets();
      setMarkets(m);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading markets…</div>;
  if (!markets.length) return <div className="p-8 text-center text-gray-400">No markets found.</div>;

  return (
    <div className="min-h-screen pb-16 max-w-md mx-auto px-6">
      <div className="grid grid-cols-2 gap-3">
        {markets.map((m) => (
          <MarketCard key={m.id} market={m} />
        ))}
      </div>
    </div>
  );
}
