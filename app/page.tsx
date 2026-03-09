"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import type { Market } from "@/lib/types";
import { fetchMarkets, searchMarkets, submitVote, submitPredict } from "@/lib/store";
import { MarketCard } from "@/components/MarketCard";
import { MarketDetail } from "@/components/MarketDetail";
import Image from "next/image";
import { asset } from "@/lib/basePath";

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [openMarketId, setOpenMarketId] = useState<string | null>(null);

  const loadMarkets = useCallback(async () => {
    try {
      const m = await fetchMarkets();
      setMarkets(m);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMarkets();
  }, [loadMarkets]);

  const filtered = useMemo(() => searchMarkets(markets, query), [markets, query]);
  const openMarket = markets.find((m) => m.id === openMarketId) ?? null;

  async function handleVote(marketId: string, optionId: string) {
    await submitVote("user_mvp", marketId, optionId);
    await loadMarkets();
  }

  async function handlePredict(marketId: string, optionId: string) {
    await submitPredict("user_mvp", marketId, optionId, 1);
    await loadMarkets();
  }

  return (
    <div className="min-h-screen pb-16 max-w-md mx-auto px-6">
      {/* Header */}
      <header className="flex items-center justify-between pt-12 pb-2">
        <Image src={asset("/images/nav/muselogosmall.png")} alt="MUSE" width={200} height={80} />
        <div className="flex items-center gap-3">
          <button className="text-xl hover:scale-110 transition-transform" aria-label="favorites">♡</button>
          <button className="text-xl hover:scale-110 transition-transform" aria-label="cart">🛒</button>
          <button className="text-xl hover:scale-110 transition-transform" aria-label="menu">☰</button>
        </div>
      </header>

      {/* Search */}
      <div className="mt-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search markets…"
          className="w-full px-4 py-3 rounded-full border border-[#E6C7BF] bg-white outline-none text-sm placeholder:text-gray-400 focus:border-[#9A6C62] focus:ring-1 focus:ring-[#9A6C62] transition"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-16 text-center text-gray-400 text-sm">Loading markets…</div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 text-center text-gray-400 text-sm">No markets found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.slice(0, 6).map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      )}

      {/* Market Detail Modal */}
      {openMarket && (
        <MarketDetail
          market={openMarket}
          onClose={() => setOpenMarketId(null)}
          onVote={handleVote}
          onPredict={handlePredict}
        />
      )}
    </div>
  );
}
