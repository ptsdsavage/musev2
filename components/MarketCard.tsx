"use client";

import type { Market } from "@/lib/types";
import { weightedPercents, endsInText, leadingOption, roundPercent } from "@/lib/calc";
import { ProbBar } from "./ProbBar";
import { toggleFavorite, getFavorites } from "@/lib/store";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthModal } from "./AuthModal";

export function MarketCard({
  market,
}: {
  market: Market;
}) {
  const percents = weightedPercents(market);
  const colors = market.options.map((o) => o.colorHex);
  const labels = market.options.map((o) => o.name);
  const leader = leadingOption(market);
  const [isFav, setIsFav] = useState(() => getFavorites().includes(market.id));
  const [showAuth, setShowAuth] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  function handleFav(e: React.MouseEvent) {
    e.stopPropagation();
    const next = toggleFavorite(market.id);
    setIsFav(next.includes(market.id));
  }

  function handleClick(e: React.MouseEvent) {
    // If not authenticated, intercept the navigation and show auth modal
    if (!authLoading && !user) {
      e.preventDefault();
      setShowAuth(true);
    }
  }

  function handleAuthSuccess() {
    // After successful login/signup, navigate to the market detail
    router.push(`/markets/detail?id=${market.id}`);
  }

  return (
    <>
      <Link
        href={`/markets/detail?id=${market.id}`}
        onClick={handleClick}
        className="w-full text-left border border-[#E6C7BF] rounded-2xl p-3 bg-white hover:shadow-md transition-shadow relative group cursor-pointer"
      >
        {/* Card grid layout */}
        <div className="grid grid-cols-2 gap-2 items-center">
          {/* Left column: logo, title, leader badge, prob bar */}
          <div className="flex flex-col gap-1">
            {/* Logo */}
            {market.brand_logo ? (
              <img
                src={market.brand_logo}
                alt={market.brand}
                className="h-20 object-contain"
              />
            ) : (
              <span className="text-xs font-bold uppercase tracking-wide text-[#9A6C62]">
                {market.brand}
              </span>
            )}
            {/* Title */}
            <p className="text-[13px] text-gray-600 leading-tight line-clamp-2">{market.title}</p>
            {/* Leader badge */}
            {leader && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ background: leader.option.colorHex ?? "#999" }}
                />
              </div>
            )}
            {/* Probability bar */}
            <div className="w-full">
              <ProbBar percents={percents} colors={colors} labels={labels} />
            </div>
          </div>
          {/* Right column: market image with floating price */}
          <div className="relative flex justify-end items-center">
            <img
              src={market.imageUrl}
              alt={market.title}
              className="w-full h-32 object-cover rounded-xl bg-gray-50"
            />
            <span className="absolute top-2 right-2 text-xs font-semibold text-gray-700 bg-white bg-opacity-80 px-2 py-1 rounded shadow">
              {market.priceLabel}
            </span>
          </div>
        </div>
      </Link>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
