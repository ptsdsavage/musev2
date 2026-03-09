"use client";

import { MarketDetail } from "@/components/MarketDetail";
import { fetchMarkets, submitVote, submitPredict } from "@/lib/store";
import type { Market } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MarketDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const markets = await fetchMarkets();
      setMarket(markets.find((m) => m.id === id) ?? null);
      setLoading(false);
    }
    load();
  }, [id]);

  function handleVote(marketId: string, optionId: string) {
    return submitVote("userId", marketId, optionId);
  }
  function handlePredict(marketId: string, optionId: string) {
    return submitPredict("userId", marketId, optionId);
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>;
  if (!market) return <div className="p-8 text-center text-gray-400">Market not found.</div>;

  return (
    <div className="min-h-screen pb-16 max-w-md px-6">
      <MarketDetail
        market={market}
        onClose={() => router.push("/markets")}
        onVote={handleVote}
        onPredict={handlePredict}
      />
    </div>
  );
}
