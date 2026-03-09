import { Market, Option } from "./types";

/** score = votes + w * preorders */
export function optionScore(opt: Option, weight: number): number {
  return opt.votes + weight * opt.preorders;
}

/** returns percents aligned to options order (0..100) */
export function weightedPercents(market: Market): number[] {
  const scores = market.options.map((o) => optionScore(o, market.weight));
  const total = scores.reduce((a, b) => a + b, 0);
  if (total <= 0) return market.options.map(() => 0);
  return scores.map((s) => (s / total) * 100);
}

/** convenience: top option (by weighted score) */
export function leadingOption(market: Market): { option: Option; percent: number } | null {
  const percents = weightedPercents(market);
  if (market.options.length === 0) return null;
  let bestIdx = 0;
  for (let i = 1; i < market.options.length; i++) {
    if (percents[i] > percents[bestIdx]) bestIdx = i;
  }
  return { option: market.options[bestIdx], percent: percents[bestIdx] };
}

/** clamp + pretty */
export function roundPercent(p: number): number {
  const clamped = Math.max(0, Math.min(100, p));
  return Math.round(clamped);
}

/** e.g., "$78-$134" already ok, but for numbers: */
export function formatMoneyUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

/** "ends in 6 days" */
export function endsInText(endsAtISO: string): string {
  const endsAt = new Date(endsAtISO).getTime();
  const diffMs = Math.max(0, endsAt - Date.now());
  const days = Math.ceil(diffMs / 864e5);
  if (days <= 1) return "ends today";
  return `ends in ${days} days`;
}
