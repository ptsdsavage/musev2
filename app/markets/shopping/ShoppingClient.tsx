"use client";

import { Shopping } from "@/components/Shopping";
import { fetchMarkets } from "@/lib/store";
import type { Market } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ShoppingClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  const variantTypeId = searchParams.get("variantTypeId") ?? undefined;
  const userId = searchParams.get("userId") ?? undefined;

  useEffect(() => {
    async function load() {
      const markets = await fetchMarkets();
      setMarket(markets.find((m) => m.id === id) ?? null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>;
  if (!market) return <div className="p-8 text-center text-gray-400">Market not found.</div>;

  return (
    <div className="min-h-screen pb-16 max-w-md px-6">
      <Shopping market={market} variantTypeId={variantTypeId} userId={userId} />
    </div>
  );
}
