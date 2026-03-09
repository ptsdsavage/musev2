"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/lib/types";
import { fetchMarkets } from "@/lib/store";
import { MarketCard } from "./MarketCard";
import { weightedPercents, roundPercent, leadingOption } from "@/lib/calc";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";

// Mock leaderboard — will be replaced with Supabase user_scores table
const MOCK_LEADERBOARD = [
  { rank: 1, name: "Mia L.", handle: "@mia_trends", score: 310, streak: 5 },
  { rank: 2, name: "Ava M.", handle: "@ava_style", score: 240, streak: 3 },
  { rank: 3, name: "Jayden K.", handle: "@jayk_fits", score: 185, streak: 2 },
  { rank: 4, name: "You", handle: "@muse_user", score: 42, streak: 0 },
  { rank: 5, name: "Chris R.", handle: "@chrisr", score: 95, streak: 1 },
];

export function TrendIQ({ userId }: { userId?: string }) {
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

  const mockScore = 42;
  const mockRank = 128;
  const correctPicks = 0;
  const streak = 0;
  const pointsAvailable = 90;

  // Trending markets — sort by total activity (votes + preorders)
  const trendingMarkets = [...markets]
    .sort((a, b) => {
      const aTotal = a.options.reduce((s, o) => s + o.votes + o.preorders, 0);
      const bTotal = b.options.reduce((s, o) => s + o.votes + o.preorders, 0);
      return bTotal - aTotal;
    })
    .slice(0, 4);

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
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">TrendIQ</h1>
        <p className="text-sm text-gray-500 mt-1">Your fashion prediction score.</p>
      </div>
      */}

      {/* Points Available */}
      <div className="mt-4 mb-4">
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/points90.png")} alt="90 Points Available" width={400} height={200} className="w-full h-auto" />
        </div>
      </div>

      {/* My TrendIQ */}
      <p className="text-lg font-extrabold text-gray-900 mb-2">My TrendIQ</p>
      <div className="rounded-2xl overflow-hidden mb-5">
        <Image src={asset("/images/trendiq/mytrendiq.png")} alt="My TrendIQ" width={400} height={200} className="w-full h-auto" />
      </div>

      {/* Top Predictors */}
      <p className="text-lg font-extrabold text-gray-900 mb-2">Top Predictors</p>
      <div className="flex flex-col gap-3 mb-5">
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/predictor1.png")} alt="Top Predictor 1" width={400} height={120} className="w-full h-auto" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/predictor2.png")} alt="Top Predictor 2" width={400} height={120} className="w-full h-auto" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/predictor3.png")} alt="Top Predictor 3" width={400} height={120} className="w-full h-auto" />
        </div>
      </div>

      {/* This Week's Challenges */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-extrabold text-gray-900">This Week&apos;s Challenges</p>
        <span className="text-xs text-gray-500 font-medium">Ends in 2d</span>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/challenge1.png")} alt="Challenge 1" width={400} height={120} className="w-full h-auto" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/challenge2.png")} alt="Challenge 2" width={400} height={120} className="w-full h-auto" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image src={asset("/images/trendiq/challenge3.png")} alt="Challenge 3" width={400} height={120} className="w-full h-auto" />
        </div>
      </div>

      {/* Score Card
      <div className="bg-white rounded-3xl border border-[#E6C7BF] p-6 text-center mb-5">
        <div className="text-5xl mb-2">🧠</div>
        <div className="text-5xl font-extrabold text-[#9A6C62]">{mockScore}</div>
        <p className="text-sm text-gray-500 mt-1">TrendIQ Score</p>

        <div className="mt-6 flex justify-center gap-8">
          <div>
            <div className="text-xl font-bold">#{mockRank}</div>
            <p className="text-xs text-gray-400">Global Rank</p>
          </div>
          <div>
            <div className="text-xl font-bold">{correctPicks}</div>
            <p className="text-xs text-gray-400">Correct Picks</p>
          </div>
          <div>
            <div className="text-xl font-bold">{streak}</div>
            <p className="text-xs text-gray-400">Streak</p>
          </div>
        </div>
      */}

        {/* Points Balance
        <div className="mt-5 flex items-center justify-center gap-2">
          <img src={asset("/images/nav/ten-pts.png")} alt="Points" className="w-6 h-6" />
          <span className="text-sm font-bold text-gray-700">
            You have <span className="text-[#9A6C62]">{pointsAvailable}</span> points left
          </span>
        </div>
      </div>
        */}

      {/* How TrendIQ Works
      <div className="bg-white rounded-3xl border border-[#E6C7BF] p-5 mb-5">
        <h3 className="font-bold text-sm mb-3">How TrendIQ works</h3>
        <ul className="text-xs text-gray-500 space-y-2">
          <li>📊 <strong>Vote correctly</strong> on a market → +1 point</li>
          <li>💎 <strong>Pre-order the winner</strong> → +weight × points</li>
          <li>🔥 <strong>Streaks</strong> multiply your score</li>
          <li>🏆 Top predictors earn <strong>early access</strong> to drops</li>
        </ul>
      </div>
      */}

      {/* Leaderboard
      <div className="bg-white rounded-3xl border border-[#E6C7BF] p-5 mb-6">
        <h3 className="font-bold text-sm mb-3">🏆 Leaderboard</h3>
        <div className="flex flex-col gap-2">
          {MOCK_LEADERBOARD
            .sort((a, b) => b.score - a.score)
            .map((user, idx) => {
              const isYou = user.name === "You";
              return (
                <div
                  key={user.handle}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    isYou ? "bg-[#FFF4F0] border border-[#E6C7BF]" : "bg-gray-50"
                  }`}
                >
                  <span className={`text-sm font-extrabold w-6 text-center ${
                    idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-400" : idx === 2 ? "text-amber-600" : "text-gray-300"
                  }`}>
                    #{idx + 1}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                    isYou ? "bg-[#9A6C62]" : "bg-gradient-to-br from-[#E6C7BF] to-[#9A6C62]"
                  }`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isYou ? "text-[#9A6C62]" : "text-gray-800"}`}>
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{user.handle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-[#9A6C62]">{user.score}</p>
                    {user.streak > 0 && (
                      <p className="text-[10px] text-orange-500">🔥 {user.streak} streak</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      */}

      {/* Trending Markets
      <h3 className="text-sm font-bold text-gray-700 mb-3">📈 Trending Markets</h3>
      {loading ? (
        <div className="text-center text-gray-400 text-sm py-8">Loading markets…</div>
      ) : trendingMarkets.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-8">No trending markets.</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {trendingMarkets.map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      )}
      */}
    </div>
  );
}
