"use client";

import { Suspense } from "react";
import TrendIQClient from "./TrendIQClient";

export default function TrendIQPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <TrendIQClient />
    </Suspense>
  );
}
