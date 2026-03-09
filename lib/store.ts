import type { Market } from "./types";
import { supabase } from "./supabase";

export async function fetchMarkets(): Promise<Market[]> {
  const { data, error } = await supabase
    .from("markets")
    .select("*, variant_types(*, variant_names(*))")
    .eq("featured", true)
    .order("position", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => {
    const options = (row.variant_types ?? [])
      .flatMap((vt: any) =>
        (vt.variant_names ?? [])
          .sort((a: any, b: any) => a.position - b.position)
          .map((vn: any) => ({
            id: vn.id,
            name: vn.name,
            colorHex: vn.color_hex,
            votes: vn.votes,
            preorders: vn.preorders,
            variantType: vt.name,
            variantTypeId: vt.id,
          }))
      );

    // Compute dynamic title: "Trending {variant_type}: {leading variant_name}"
    const leading = options.length > 0
      ? options.reduce((a: any, b: any) => (a.votes > b.votes ? a : b))
      : null;
    const dynamicTitle = leading
      ? `Trending ${leading.variantType}: ${leading.name}`
      : row.title;

    return {
      id: row.id,
      brand: row.brand_name ?? "",
      title: dynamicTitle,
      description: row.description ?? "",
      priceLabel: row.price ? `$${row.price}` : "Free",
      imageUrl: row.image_url ?? "",
      options,
      weight: 1,
      endsAtISO: row.closes_at,
      brand_name: row.brand_name,
      category: row.category,
      sub_category: row.sub_category,
      product_type: row.product_type,
      image_url: row.image_url,
      brand_logo: row.brand_logo,
      variant_type: row.variant_type,
      closes_at: row.closes_at,
      price: row.price,
      position: row.position,
      featured: row.featured,
      status: row.status,
    };
  });
}

export function searchMarkets(markets: Market[], query: string): Market[] {
  const q = query.trim().toLowerCase();
  if (!q) return markets;
  return markets.filter((m) => {
    const hay = `${m.brand} ${m.title} ${m.priceLabel} ${m.brand_name ?? ""} ${m.category ?? ""}`.toLowerCase();
    return hay.includes(q);
  });
}

// MVP local favorites
const FAV_KEY = "muse_favs_v1";

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(marketId: string): string[] {
  const current = new Set(getFavorites());
  if (current.has(marketId)) current.delete(marketId);
  else current.add(marketId);
  const next = Array.from(current);
  localStorage.setItem(FAV_KEY, JSON.stringify(next));
  return next;
}

export async function submitVote(userId: string, marketId: string, optionId: string) {
  const r = await fetch("/api/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, marketId, optionId }),
  });
  return r.json();
}

/**
 * Insert a vote directly into the Supabase votes table.
 * Also increments the votes count on the variant_names row.
 * @param authUserId - the auth.users.id (from supabase.auth.getUser())
 */
export async function insertVote(authUserId: string, variantTypeId: string, variantNameId: string) {
  // Look up the public.users row by auth_id
  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", authUserId)
    .single();

  if (userError || !userRow) throw new Error(userError?.message ?? "User not found in public.users");

  // Insert into votes table
  const { data, error } = await supabase
    .from("votes")
    .upsert(
      {
        user_id: userRow.id,
        variant_type_id: variantTypeId,
        votes: 1,
        created_at: new Date().toISOString(),
      },
      { onConflict: "user_id,variant_type_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Increment the votes count on variant_names so the UI reflects the new total
  await supabase.rpc("increment_variant_votes", { row_id: variantNameId });

  return data;
}

export async function submitPredict(userId: string, marketId: string, optionId: string, qty = 1) {
  const r = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, marketId, optionId, qty }),
  });
  return r.json();
}
