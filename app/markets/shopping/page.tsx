import { Suspense } from "react";
import ShoppingClient from "./ShoppingClient";

export default function ShoppingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <ShoppingClient />
    </Suspense>
  );
}
