"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Market } from "@/lib/types";
import { weightedPercents, roundPercent, endsInText } from "@/lib/calc";
import { ProbBar } from "./ProbBar";
import { asset } from "@/lib/basePath";

type Mode = "VOTE" | "PREDICT";

export function Predict({
  market,
  onClose,
  onVote,
  onPredict,
  variantTypeId,
  userId,
}: {
  market: Market;
  onClose: () => void;
  onVote: (marketId: string, optionId: string) => Promise<void>;
  onPredict: (marketId: string, optionId: string) => Promise<void>;
  variantTypeId?: string;
  userId?: string;
}) {
  const [mode, setMode] = useState<Mode>("PREDICT");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pre-select the variant that matches the passed variantTypeId
  useEffect(() => {
    if (variantTypeId && market.options.length > 0 && !selectedOption) {
      const match = market.options.find((o) => o.variantTypeId === variantTypeId);
      if (match) setSelectedOption(match.id);
    }
  }, [variantTypeId, market.options, selectedOption]);

  const percents = weightedPercents(market);
  const colors = market.options.map((o) => o.colorHex);
  const router = useRouter();

  async function handleSubmit() {
    if (!selectedOption) return;
    setSubmitting(true);
    try {
      if (mode === "VOTE") {
        await onVote(market.id, selectedOption);
      } else {
        await onPredict(market.id, selectedOption);
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1200);
    } finally {
      setSubmitting(false);
    }
  }

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

      {/* Image & Description */}
      <div className="mt-4 flex items-start">
        <div className="w-1/2 pr-3 flex flex-col justify-start">
          <div className="h-8"></div> {/* Spacer to move description down */}
          <p className="text-base font-bold text-gray-500">
            {market.description}
          </p>
          <button className="mt-3 text-2xl hover:scale-110 transition-transform self-start" aria-label="favorites">♡</button>
          <img src={asset("/images/nav/crowd-picks.png")} alt="Crowd Picks" className="mt-2 w-full h-8 self-start" />
        </div>
        <div className="w-1/2">
          <div className="relative rounded-2xl overflow-hidden">
            <img src={market.imageUrl} alt={market.title} className="w-full h-48 object-cover block" />
            <img src={market.brand_logo} alt="Brand Logo" className="absolute top-8 right-2 w-12 h-12 object-contain" />
            {/* Time left overlay */}
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

      {/* Variant Names Grid: 1 column × n rows */}
      {market.options.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">
            {market.variant_type ?? "Variants"} ({market.options.length})
          </h3>
          <div className="flex flex-col gap-3">
            {market.options.map((opt, i) => {
              const totalVotes = market.options.reduce((sum, o) => sum + o.votes, 0);
              const pct = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-[#9A6C62] bg-[#FFF4F0]"
                      : "border-gray-100 bg-white hover:border-[#E6C7BF] cursor-pointer"
                  }`}
                >
                  {/* Color swatch */}
                  <span
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                    style={{ background: opt.colorHex ?? "#DDD" }}
                  />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {opt.name}
                      </span>
                      {opt.variantType && (
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide flex-shrink-0">
                          {opt.variantType}
                        </span>
                      )}
                    </div>
                    {/* Mini progress bar */}
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
                  {/* Selection indicator */}
                  {isSelected && (
                    <span className="text-[#9A6C62] text-lg flex-shrink-0">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="h-16" />

      {/* Vote Container */}
      <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700">Pick Your Move!</h3>
        <div className="flex items-start mt-2">
          <img src={asset("/images/nav/ten-pts.png")} alt="10 Points" className="w-1/6" />
          <div className="w-5/6 text-sm text-gray-500 text-right">
            <p>Vote for free to earn points. No purchase required.</p>
            <p>Boosts trendIQ score.</p>
          </div>
        </div>
        <img src={asset("/images/nav/vote-button.png")} alt="Vote" className="mt-3 w-full" />
      </div>

      <div className="h-6" />

      {/* Predict Container */}
      <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700">Predict & Pre-order</h3>
        <button
          onClick={() => {
            const selectedOpt = market.options.find((o) => o.id === selectedOption);
            const params = new URLSearchParams();
            if (selectedOpt?.variantTypeId) params.set("variantTypeId", selectedOpt.variantTypeId);
            if (userId) params.set("userId", userId);
            const qs = params.toString();
            router.push(`/markets/shopping?id=${market.id}${qs ? `&${qs}` : ""}`);
          }}
          className="mt-3 w-full cursor-pointer"
        >
          <img src={asset("/images/nav/predict-button.png")} alt="Predict" className="w-full hover:opacity-90 active:scale-[0.98] transition-all" />
        </button>
      </div>

      {/* Probability bar
      <div className="mt-4">
        <ProbBar
          percents={percents}
          colors={colors}
          labels={market.options.map((o) => o.name)}
        />
      </div>
      */}

      {/* Mode toggle
      <div className="mt-5 flex gap-2">
        {(["VOTE", "PREDICT"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setSelectedOption(null); }}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              mode === m
                ? "bg-[#9A6C62] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {m === "VOTE" ? "🗳 Vote (Free)" : "💎 Pre-order"}
          </button>
        ))}
      </div>
      */}

      {/* Description
      <div className="mt-6 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <p className="text-xs text-gray-500">
          {mode === "VOTE"
            ? "Pick Your Move!"
            : "Vote for free to earn points. No purchase required."}
        </p>
      </div>
      */}

      {/* Options
      <div className="mt-4 flex flex-col gap-2">
        {market.options.map((opt, i) => {
          const isSelected = selectedOption === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelectedOption(opt.id)}
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-[#9A6C62] bg-[#FFF4F0]"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                  style={{ background: opt.colorHex ?? "#DDD" }}
                />
                <div className="text-left">
                  <span className="text-sm font-medium">{opt.name}</span>
                  <span className="text-[11px] text-gray-400 ml-2">
                    {opt.votes} votes · {opt.preorders} pre-orders
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-[#9A6C62]">
                {roundPercent(percents[i])}%
              </span>
            </button>
          );
        })}
      </div>
      */}

      {/* Submit
      <button
        onClick={handleSubmit}
        disabled={!selectedOption || submitting}
        className={`w-full mt-5 py-3.5 rounded-full text-sm font-bold transition-all ${
          submitted
            ? "bg-green-500 text-white"
            : selectedOption
              ? "bg-[#9A6C62] text-white hover:bg-[#85574E] active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {submitted
          ? "✓ Submitted!"
          : submitting
            ? "Submitting…"
            : mode === "VOTE"
              ? "Cast Vote"
              : "Confirm Pre-order"}
      </button>
      */}

      {/* Timer
      <p className="text-center text-[11px] text-gray-400 mt-3">
        {endsInText(market.endsAtISO)}
      </p>
      */}
    </div>
  );
}
