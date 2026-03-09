import { Suspense } from "react";
import PredictClient from "./PredictClient";

export default function PredictPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <PredictClient />
    </Suspense>
  );
}
