"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/lib/types";
import { fetchMarkets, getFavorites } from "@/lib/store";
import { MarketCard } from "./MarketCard";
import { leadingOption, roundPercent } from "@/lib/calc";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/basePath";

export function Profile({ userId }: { userId?: string }) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
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
  // Show the user's most recent activity (mock: first 3 markets)
  const recentMarkets = markets.slice(0, 3);

  const mockUser = {
    name: "MVP User",
    handle: "@muse_user",
    avatar: "M",
    trendIQ: 42,
    totalVotes: recentMarkets.length,
    totalPreorders: 0,
    totalFavorites: favMarkets.length,
    pointsLeft: 90,
  };

  return (
    <div className="min-h-screen pb-16 max-w-md mx-auto px-6">
      {/* Header
      <header className="flex items-center justify-between pt-12 pb-2">
        <Image src={asset("/images/nav/muselogosmall.png")} alt="MUSE" width={200} height={80} />
        <div className="flex items-center gap-3">
          <button className="text-xl hover:scale-110 transition-transform" aria-label="settings">⚙️</button>
        </div>
      </header>
      */}

      {/* Header */}
      <header className="flex items-center justify-between pt-12 pb-2">
        <Image src={asset("/images/nav/muselogosmall.png")} alt="MUSE" width={200} height={80} />
        <div className="flex items-center gap-3">
          <button className="text-xl hover:scale-110 transition-transform" aria-label="favorites">♡</button>
          <button className="text-xl hover:scale-110 transition-transform" aria-label="cart">🛒</button>
        </div>
      </header>

      {/* Profile Card
      <div className="mt-4 bg-white rounded-3xl border border-[#E6C7BF] p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E6C7BF] to-[#9A6C62] mx-auto flex items-center justify-center text-3xl text-white font-bold">
          {mockUser.avatar}
        </div>
        <h2 className="text-lg font-bold mt-3">{mockUser.name}</h2>
        <p className="text-sm text-gray-500">{mockUser.handle}</p>

        {/* Stats
        <div className="mt-5 flex justify-center gap-6">
          <div>
            <div className="text-xl font-bold text-[#9A6C62]">{mockUser.totalVotes}</div>
            <p className="text-xs text-gray-400">Votes</p>
          </div>
          <div>
            <div className="text-xl font-bold text-[#9A6C62]">{mockUser.totalPreorders}</div>
            <p className="text-xs text-gray-400">Pre-orders</p>
          </div>
          <div>
            <div className="text-xl font-bold text-[#9A6C62]">{mockUser.trendIQ}</div>
            <p className="text-xs text-gray-400">TrendIQ</p>
          </div>
        </div>
        */}

        {/* Points
        <div className="mt-4 flex items-center justify-center gap-2">
          <img src={asset("/images/nav/ten-pts.png")} alt="Points" className="w-5 h-5" />
          <span className="text-sm text-gray-600">
            <span className="font-bold text-[#9A6C62]">{mockUser.pointsLeft}</span> points available
          </span>
        </div>
      </div>
        */}

      {/* Quick Actions
      <div className="mt-4 flex flex-col gap-2">
        {[
          { label: "♡ Favorites", href: "/picks", count: mockUser.totalFavorites },
          { label: "🧠 TrendIQ", href: "/trendiq", count: mockUser.trendIQ },
          { label: "👥 Friends", href: "/friends", count: null },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E6C7BF] text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <span>{item.label}</span>
            <div className="flex items-center gap-2">
              {item.count !== null && (
                <span className="text-xs font-bold text-[#9A6C62]">{item.count}</span>
              )}
              <span className="text-gray-300">›</span>
            </div>
          </Link>
        ))}
      </div>
      */}

      {/* Recent Activity
      {loading ? (
        <div className="text-center text-gray-400 text-sm py-8">Loading…</div>
      ) : recentMarkets.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-8">No activity yet.</div>
      ) : (
        <div className="flex flex-col gap-3 mb-5">
          {recentMarkets.map((market) => {
            const leader = leadingOption(market);
            return (
              <Link
                key={market.id}
                href={`/markets/detail?id=${market.id}`}
                className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E6C7BF] shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={asset(market.imageUrl)}
                  alt={market.title}
                  className="w-12 h-12 rounded-xl object-cover bg-gray-50 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{market.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {leader && (
                      <>
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ background: leader.option.colorHex ?? "#999" }}
                        />
                        <span className="text-[11px] text-gray-500">
                          {leader.option.name} · {roundPercent(leader.percent)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{market.priceLabel}</span>
              </Link>
            );
          })}
        </div>
      )}
      */}

      {/* Favorites Grid
      {favMarkets.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">♡ Your Favorites</h3>
          <div className="grid grid-cols-2 gap-3">
            {favMarkets.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        </div>
      )}
      */}

      {/* Settings Menu
      <div className="mt-6 mb-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Settings</h3>
        <div className="flex flex-col gap-2">
          {["Order History", "Notifications", "Help & FAQ", "Log Out"].map((item) => (
            <button
              key={item}
              className={`w-full text-left p-4 bg-white rounded-2xl border border-[#E6C7BF] text-sm font-medium hover:bg-gray-50 transition ${
                item === "Log Out" ? "text-red-500" : "text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      */}

      {/* Status */}
      <div className="mt-4 rounded-2xl overflow-hidden">
        <Image src={asset("/images/profile/status.png")} alt="Status" width={400} height={200} className="w-full h-auto" />
      </div>

      {/* Order History header */}
      <p className="text-lg font-extrabold text-gray-900 mt-5 mb-2">Order History +(10)</p>

      {/* Order 1 */}
      <div className="rounded-2xl overflow-hidden mb-3">
        <Image src={asset("/images/profile/order1.png")} alt="Order 1" width={400} height={120} className="w-full h-auto" />
      </div>

      {/* Order 2 */}
      <div className="rounded-2xl overflow-hidden mb-5">
        <Image src={asset("/images/profile/order2.png")} alt="Order 2" width={400} height={120} className="w-full h-auto" />
      </div>

      {/* Rewards header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-extrabold text-gray-900">Rewards (6)</p>
        <span className="text-sm text-[#9A6C62] font-semibold">See all</span>
      </div>

      {/* Rewards */}
      <div className="rounded-2xl overflow-hidden mb-5">
        <Image src={asset("/images/profile/rewards.png")} alt="Rewards" width={400} height={120} className="w-full h-auto" />
      </div>

      {/* My Badges header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-extrabold text-gray-900">My Badges (5/12 earned)</p>
        <span className="text-sm text-[#9A6C62] font-semibold">See all</span>
      </div>

      {/* Badges */}
      <div className="rounded-2xl overflow-hidden mb-5">
        <Image src={asset("/images/profile/badges.png")} alt="Badges" width={400} height={120} className="w-full h-auto" />
      </div>
    </div>
  );
}
