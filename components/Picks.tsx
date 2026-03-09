"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/lib/types";
import { fetchMarkets, getFavorites } from "@/lib/store";
import { MarketCard } from "./MarketCard";
import { weightedPercents, roundPercent, leadingOption } from "@/lib/calc";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";

type PickTab = "votes" | "predictions" | "favorites";

export function Picks({ userId }: { userId?: string }) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PickTab>("votes");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const m = await fetchMarkets();
      setMarkets(m);
      setFavorites(getFavorites());
      setLoading(false);
    }
    load();
  }, []);

  const favMarkets = markets.filter((m) => favorites.includes(m.id));

  // Mock "voted" markets — first 2 markets simulate user votes
  const votedMarkets = markets.slice(0, 2);
  // Mock "predicted" markets — next 2 markets simulate user predictions
  const predictedMarkets = markets.slice(1, 3);

  const displayMarkets =
    activeTab === "favorites"
      ? favMarkets
      : activeTab === "votes"
        ? votedMarkets
        : predictedMarkets;

  const totalVotes = votedMarkets.length;
  const totalPredictions = predictedMarkets.length;
  const totalFavs = favMarkets.length;

  return (
    <div className="min-h-screen pb-16 max-w-md mx-auto px-6">
      {/* Header */}
      <header className="flex items-center justify-between pt-12 pb-2">
        <Image src={asset("/images/nav/muselogosmall.png")} alt="MUSE" width={200} height={80} />
        <div className="flex items-center gap-3">
          <button className="text-xl hover:scale-110 transition-transform" aria-label="favorites">♡</button>
          <button className="text-xl hover:scale-110 transition-transform" aria-label="cart">🛒</button>
        </div>
      </header>

      {/* Page Title
      <div className="mt-4 mb-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Your Picks</h1>
        <p className="text-sm text-gray-500 mt-1">Track your votes, predictions, and favorites.</p>
      </div>
      */}

      {/* My Predictions header */}
      <div className="flex items-center justify-between mt-4 mb-3">
        <h3 className="text-sm font-bold text-gray-700 text-left">My Predictions (3)</h3>
        <span className="text-sm font-semibold text-[#9A6C62] underline cursor-pointer">See all</span>
      </div>

      {/* Predict 1 */}
      <div className="mb-5">
        <Image src={asset("/images/picks/mypredict1.png")} alt="My Prediction" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Predict 2 */}
      <div className="mb-5">
        <Image src={asset("/images/picks/mypredict2.png")} alt="My Prediction" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      <h3 className="text-sm font-bold text-gray-700 mb-3 text-left">My Votes (5)</h3>

      {/* Votes 1 */}
      <div className="mb-5">
        <Image src={asset("/images/picks/myvotes1.png")} alt="My Votes" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Votes 2 */}
      <div className="mb-5">
        <Image src={asset("/images/picks/myvotes2.png")} alt="My Votes" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      <h3 className="text-sm font-bold text-gray-700 mb-3 text-left">History (12)</h3>

      {/* History 1 */}
      <div className="mb-5">
        <Image src={asset("/images/picks/history1.png")} alt="History" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Stats Row
      <div className="flex gap-3 mb-5">
        <div className="flex-1 bg-white rounded-2xl border border-[#E6C7BF] p-3 text-center">
          <p className="text-xl font-extrabold text-[#9A6C62]">{totalVotes}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Votes</p>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-[#E6C7BF] p-3 text-center">
          <p className="text-xl font-extrabold text-[#9A6C62]">{totalPredictions}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Predictions</p>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-[#E6C7BF] p-3 text-center">
          <p className="text-xl font-extrabold text-[#9A6C62]">{totalFavs}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Favorites</p>
        </div>
      </div>
      */}

      {/* Tabs
      <div className="flex gap-2 mb-5">
        {([
          { key: "votes" as PickTab, label: "🗳 Votes" },
          { key: "predictions" as PickTab, label: "💎 Predictions" },
          { key: "favorites" as PickTab, label: "♡ Favorites" },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold transition-colors ${
              activeTab === tab.key
                ? "bg-[#9A6C62] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      */}

      {/* Content
      {loading ? (
        <div className="text-center text-gray-400 text-sm py-16">Loading…</div>
      ) : displayMarkets.length === 0 ? (
        <div className="mt-12 text-center">
          <div className="text-5xl mb-4">
            {activeTab === "votes" ? "🗳" : activeTab === "predictions" ? "💎" : "♡"}
          </div>
          <h2 className="text-lg font-bold text-gray-700">
            {activeTab === "favorites"
              ? "No favorites yet"
              : activeTab === "votes"
                ? "No votes yet"
                : "No predictions yet"}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Go to <Link href="/markets" className="font-semibold text-[#9A6C62] underline">Markets</Link> to get started.
          </p>
        </div>
      ) : (
        <>
      */}

      {/* Market-specific details per pick
          <div className="flex flex-col gap-3 mb-5">
            {displayMarkets.map((market) => {
              const leader = leadingOption(market);
              const percents = weightedPercents(market);
              const totalVotesOnMarket = market.options.reduce((s, o) => s + o.votes, 0);
              return (
                <Link
                  key={market.id}
                  href={`/markets/detail?id=${market.id}`}
                  className="block p-4 bg-white rounded-2xl border border-[#E6C7BF] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={market.imageUrl}
                      alt={market.title}
                      className="w-14 h-14 rounded-xl object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                          activeTab === "votes"
                            ? "bg-blue-50 text-blue-600"
                            : activeTab === "predictions"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-pink-50 text-pink-600"
                        }`}>
                          {activeTab === "votes" ? "VOTE" : activeTab === "predictions" ? "PREDICT" : "FAV"}
                        </span>
                        {market.brand_logo && (
                          <img src={market.brand_logo} alt="" className="h-4 object-contain" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{market.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {leader && (
                          <>
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block"
                              style={{ background: leader.option.colorHex ?? "#999" }}
                            />
                            <span className="text-[11px] text-gray-500">
                              {leader.option.name} · {roundPercent(leader.percent)}%
                            </span>
                          </>
                        )}
                        <span className="text-[11px] text-gray-400">
                          · {totalVotesOnMarket} votes
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{market.priceLabel}</span>
                  </div>
                </Link>
              );
            })}
          </div>
      */}

      {/* Market Cards Grid
          <h3 className="text-sm font-bold text-gray-700 mb-3">
            {activeTab === "favorites" ? "Your Saved Markets" : "Your Picked Markets"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {displayMarkets.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        </>
      )}
      */}
    </div>
  );
}
