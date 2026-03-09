import { Suspense } from "react";
import VoteClient from "./VoteClient";

export default function VotePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <VoteClient />
    </Suspense>
  );
}
