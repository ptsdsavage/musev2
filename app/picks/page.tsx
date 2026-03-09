"use client";

import { Suspense } from "react";
import PicksClient from "./PicksClient";

export default function PicksPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <PicksClient />
    </Suspense>
  );
}
