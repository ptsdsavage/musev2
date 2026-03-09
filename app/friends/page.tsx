"use client";

import { Suspense } from "react";
import FriendsClient from "./FriendsClient";

export default function FriendsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <FriendsClient />
    </Suspense>
  );
}
