"use client";

import { useSearchParams } from "next/navigation";
import { Profile } from "@/components/Profile";

export default function ProfileClient() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? undefined;
  return <Profile userId={userId} />;
}
