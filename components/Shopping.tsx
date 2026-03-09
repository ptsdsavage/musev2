"use client";

import { useState, useEffect } from "react";
import type { Market } from "@/lib/types";
import { roundPercent } from "@/lib/calc";
import { asset } from "@/lib/basePath";

export function Shopping({
  market,
  variantTypeId,
  userId,
}: {
  market: Market;
  variantTypeId?: string;
  userId?: string;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Pre-select the variant that matches the passed variantTypeId
  useEffect(() => {
    if (variantTypeId && market.options.length > 0 && !selectedOption) {
      const match = market.options.find((o) => o.variantTypeId === variantTypeId);
      if (match) setSelectedOption(match.id);
    }
  }, [variantTypeId, market.options, selectedOption]);

  return (
    <div className="min-h-screen pb-16 max-w-md px-6">
      {/* Top Nav */}
      <header className="flex items-center justify-between pb-2">
        <img src={asset("/images/nav/muselogosmall.png")} alt="MUSE" className="h-10" />
        <div className="flex items-center gap-3">
          <button className="text-xl hover:scale-110 transition-transform" aria-label="favorites">♡</button>
          <button className="text-xl hover:scale-110 transition-transform" aria-label="cart">🛒</button>
        </div>
      </header>

      {/* Predictor Disc */}
      <div className="mt-4">
        <img src={asset("/images/nav/predictor-disc.png")} alt="Predictor Discount" className="w-full" />
      </div>

      {/* Image & Description
      <div className="mt-4 flex items-start">
        <div className="w-1/2 pr-3 flex flex-col justify-start">
          <div className="h-8"></div>
          <p className="text-base font-bold text-gray-500">
            {market.description}
          </p>
          <p className="mt-2 text-lg font-bold text-[#9A6C62]">
            {market.priceLabel}
          </p>
        </div>
        <div className="w-1/2">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={market.imageUrl} alt={market.title} className="w-full h-48 object-cover block" />
            <img src={market.brand_logo} alt="Brand Logo" className="absolute top-8 right-2 w-12 h-12 object-contain" />
            {/* Time left overlay
            <div className="absolute bottom-10 right-2 bg-white bg-opacity-90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {(() => {
                const closesAt = new Date(market.closes_at ?? market.endsAtISO);
                const now = new Date();
                const diffMs = closesAt.getTime() - now.getTime();
                if (diffMs <= 0) return "Closed";
                const diffSec = Math.floor(diffMs / 1000);
                const diffMin = Math.floor(diffSec / 60);
                const diffHr = Math.floor(diffMin / 60);
                const diffDay = Math.floor(diffHr / 24);
                if (diffDay > 0) return `${diffDay}d ${diffHr % 24}h left`;
                if (diffHr > 0) return `${diffHr}h ${diffMin % 60}m left`;
                if (diffMin > 0) return `${diffMin}m ${diffSec % 60}s left`;
                return `${diffSec}s left`;
              })()}
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Variant Selection
      {market.options.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">
            Select {market.variant_type ?? "Variant"}
          </h3>
          <div className="flex flex-col gap-3">
            {market.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const totalVotes = market.options.reduce((sum, o) => sum + o.votes, 0);
              const pct = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#9A6C62] bg-[#FFF4F0]"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  {/* Color swatch
                  <span
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                    style={{ background: opt.colorHex ?? "#DDD" }}
                  />
                  {/* Info
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {opt.name}
                      </span>
                    </div>
                    {/* Mini progress bar
                    <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: opt.colorHex ?? "#9A6C62",
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-gray-400">
                        {opt.votes} votes · {opt.preorders} pre-orders
                      </span>
                      <span className="text-[11px] font-bold text-[#9A6C62]">
                        {roundPercent(pct)}%
                      </span>
                    </div>
                  </div>
                  {/* Checkmark
                  {isSelected && (
                    <span className="text-[#9A6C62] text-lg flex-shrink-0">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      */}

      <div className="h-8" />

      {/* Pre-order Button
      <button
        disabled={!selectedOption}
        className={`w-full py-3.5 rounded-full text-sm font-bold transition-all ${
          selectedOption
            ? "bg-[#9A6C62] text-white hover:bg-[#85574E] active:scale-[0.98]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Pre-order Now
      </button>

      <p className="text-center text-[11px] text-gray-400 mt-3">
        You will only be charged if your prediction is correct.
      </p>
      */}

      {/* Your Order */}
      <p className="text-lg font-extrabold text-gray-900 mb-2">Your Order (3)</p>

      <div className="rounded-2xl overflow-hidden mb-3">
        <img src={asset("/images/shopping/shop1.png")} alt="Order Item 1" className="w-full h-auto" />
      </div>

      <div className="rounded-2xl overflow-hidden mb-3">
        <img src={asset("/images/shopping/shop2.png")} alt="Order Item 2" className="w-full h-auto" />
      </div>

      <div className="rounded-2xl overflow-hidden mb-3">
        <img src={asset("/images/shopping/shop3.png")} alt="Order Item 3" className="w-full h-auto" />
      </div>

      <div className="rounded-2xl overflow-hidden mb-3">
        <img src={asset("/images/shopping/text1.png")} alt="Order Details" className="w-full h-auto" />
      </div>

      <div className="rounded-2xl overflow-hidden mb-3">
        <img src={asset("/images/shopping/checkout.png")} alt="Checkout" className="w-full h-auto" />
      </div>

      <p className="text-lg font-extrabold text-gray-900 mt-2 mb-4">Enter Shipping Details:</p>
    </div>
  );
}
