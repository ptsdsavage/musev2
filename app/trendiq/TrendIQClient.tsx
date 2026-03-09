"use client";

import { useSearchParams } from "next/navigation";
import { TrendIQ } from "@/components/TrendIQ";

export default function TrendIQClient() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? undefined;
  return <TrendIQ userId={userId} />;
}
