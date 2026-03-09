"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/lib/types";
import { fetchMarkets } from "@/lib/store";
import { MarketCard } from "./MarketCard";
import { weightedPercents, roundPercent, leadingOption } from "@/lib/calc";
import Image from "next/image";
import { asset } from "@/lib/basePath";

// Mock friends data – will be replaced with Supabase user_friends table
const MOCK_FRIENDS = [
  { id: "f1", name: "Ava M.", handle: "@ava_style", avatar: "A", points: 240, picks: 12 },
  { id: "f2", name: "Jayden K.", handle: "@jayk_fits", avatar: "J", points: 185, picks: 8 },
  { id: "f3", name: "Mia L.", handle: "@mia_trends", avatar: "M", points: 310, picks: 15 },
  { id: "f4", name: "Chris R.", handle: "@chrisr", avatar: "C", points: 95, picks: 4 },
];

export function Friends({ userId }: { userId?: string }) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"activity" | "leaderboard">("activity");

  useEffect(() => {
    async function load() {
      const m = await fetchMarkets();
      setMarkets(m);
      setLoading(false);
    }
    load();
  }, []);

  // Simulate "friend activity" by picking markets with the most votes
  const friendActiveMarkets = [...markets]
    .sort((a, b) => {
      const aVotes = a.options.reduce((s, o) => s + o.votes, 0);
      const bVotes = b.options.reduce((s, o) => s + o.votes, 0);
      return bVotes - aVotes;
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
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Friends</h1>
        <p className="text-sm text-gray-500 mt-1">See what your friends are predicting.</p>
      </div>
      */}

      {/* Tabs
      <div className="flex gap-2 mb-5">
        {(["activity", "leaderboard"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === tab
                ? "bg-[#9A6C62] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "activity" ? "🔥 Activity" : "🏆 Leaderboard"}
          </button>
        ))}
      </div>
      */}

      <h3 className="text-sm font-bold text-gray-700 mb-3 text-left">Weekly Tournament</h3>

      {/* Tourney */}
      <div className="mb-5">
        <Image src={asset("/images/friends/tourney.png")} alt="Tourney" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      <h3 className="text-sm font-bold text-gray-700 mb-3 text-left">Friends&apos; Picks</h3>

      {/* Friend 1 */}
      <div className="mb-5">
        <Image src={asset("/images/friends/friend1.png")} alt="Friend" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Friend 2 */}
      <div className="mb-5">
        <Image src={asset("/images/friends/friend2.png")} alt="Friend" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Friend 3 */}
      <div className="mb-5">
        <Image src={asset("/images/friends/friend3.png")} alt="Friend" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Friend 4 */}
      <div className="mb-5">
        <Image src={asset("/images/friends/friend4.png")} alt="Friend" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Invite Friends */}
      <div className="mb-5">
        <Image src={asset("/images/friends/invitefriends.png")} alt="Invite Friends" width={400} height={200} className="w-full rounded-2xl" />
      </div>

      {/* Friend Activity Cards
      {activeTab === "activity" ? (
        <>
          <div className="flex flex-col gap-3 mb-6">
            {MOCK_FRIENDS.slice(0, 3).map((friend, idx) => {
              const market = friendActiveMarkets[idx];
              const leader = market ? leadingOption(market) : null;
              return (
                <div
                  key={friend.id}
                  className="p-4 bg-white rounded-2xl border border-[#E6C7BF] shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6C7BF] to-[#9A6C62] flex items-center justify-center text-white font-bold text-sm">
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{friend.name}</p>
                      <p className="text-xs text-gray-400">{friend.handle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-[#9A6C62]">{friend.points} pts</p>
                      <p className="text-[10px] text-gray-400">{friend.picks} picks</p>
                    </div>
                  </div>
                  {market && leader && (
                    <div className="mt-3 flex items-center gap-2 pl-13">
                      <span className="text-[11px] text-gray-500">
                        Voted on <span className="font-semibold text-gray-700">{market.title}</span>
                      </span>
                      <span
                        className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                        style={{ background: leader.option.colorHex ?? "#999" }}
                      />
                      <span className="text-[11px] font-bold text-[#9A6C62]">
                        {leader.option.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      */}

      {/* Friends are voting on these
          <h3 className="text-sm font-bold text-gray-700 mb-3">🔥 Friends are voting on</h3>
          {loading ? (
            <div className="text-center text-gray-400 text-sm py-8">Loading markets…</div>
          ) : friendActiveMarkets.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">No activity yet.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {friendActiveMarkets.map((m) => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          )}
        </>
      ) : (
      */}

      {/* Leaderboard Tab
        <div className="flex flex-col gap-2">
          {MOCK_FRIENDS
            .sort((a, b) => b.points - a.points)
            .map((friend, idx) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E6C7BF] shadow-sm"
              >
                <span className={`text-lg font-extrabold w-8 text-center ${
                  idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-400" : idx === 2 ? "text-amber-600" : "text-gray-300"
                }`}>
                  #{idx + 1}
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6C7BF] to-[#9A6C62] flex items-center justify-center text-white font-bold text-sm">
                  {friend.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{friend.name}</p>
                  <p className="text-xs text-gray-400">{friend.handle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#9A6C62]">{friend.points}</p>
                  <p className="text-[10px] text-gray-400">points</p>
                </div>
              </div>
            ))}
        </div>
      )}
      */}
    </div>
  );
}
