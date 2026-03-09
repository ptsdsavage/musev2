"use client";

import { roundPercent } from "@/lib/calc";

export function ProbBar({
  percents,
  colors,
  labels,
}: {
  percents: number[];
  colors: (string | undefined)[];
  labels?: string[];
}) {
  return (
    <div className="w-full">
      <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
        {percents.map((p, i) => (
          <div
            key={i}
            className="transition-all duration-500 ease-out"
            style={{
              width: `${p}%`,
              background: colors[i] ?? "#DDD",
            }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-1.5 text-[11px] text-gray-500">
        {percents.map((p, i) => (
          <span key={i} className="flex flex-col items-center">
            {/* Color dot - commented out
            {labels?.[i] && (
              <span
                className="w-2 h-2 rounded-full inline-block mb-0.5"
                style={{ background: colors[i] ?? "#DDD" }}
              />
            )}
            */}
            <span>{roundPercent(p)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}
