"use client";

import { useSearchParams } from "next/navigation";
import { Friends } from "@/components/Friends";

export default function FriendsClient() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? undefined;
  return <Friends userId={userId} />;
}
