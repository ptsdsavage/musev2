"use client";

import { useSearchParams } from "next/navigation";
import { Picks } from "@/components/Picks";

export default function PicksClient() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? undefined;
  return <Picks userId={userId} />;
}
