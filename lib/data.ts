import { Market, UserPick } from "./types";

export const db = {
  markets: [
    {
      id: "m_alo_red",
      brand: "alo",
      title: "Trending color: Bright Red",
      priceLabel: "$78-$134",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
      weight: 7,
      endsAtISO: new Date(Date.now() + 6 * 864e5).toISOString(),
      variant_type: "Color",
      options: [
        { id: "o_red", name: "Bright Red", votes: 45, preorders: 15, colorHex: "#D61F2C" },
        { id: "o_pink", name: "Candy Pink", votes: 60, preorders: 5, colorHex: "#F7A3C6" },
        { id: "o_rose", name: "Wild Rose", votes: 20, preorders: 6, colorHex: "#B85D7A" },
      ],
    },
    {
      id: "m_nike_dunk",
      brand: "nike",
      title: "Next Dunk colorway",
      priceLabel: "$110-$150",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      weight: 5,
      endsAtISO: new Date(Date.now() + 3 * 864e5).toISOString(),
      variant_type: "Colorway",
      options: [
        { id: "o_ivory", name: "Ivory", votes: 80, preorders: 20, colorHex: "#FFFFF0" },
        { id: "o_peony", name: "Peony", votes: 35, preorders: 12, colorHex: "#DE6FA1" },
        { id: "o_sage", name: "Sage", votes: 50, preorders: 8, colorHex: "#9DC183" },
      ],
    },
    {
      id: "m_lulu_align",
      brand: "lululemon",
      title: "Align Tank: next print",
      priceLabel: "$58-$68",
      imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
      weight: 10,
      endsAtISO: new Date(Date.now() + 10 * 864e5).toISOString(),
      variant_type: "Print",
      options: [
        { id: "o_leopard", name: "Leopard", votes: 90, preorders: 30, colorHex: "#C19A6B" },
        { id: "o_marble", name: "Marble", votes: 55, preorders: 10, colorHex: "#E0DDD6" },
        { id: "o_camo", name: "Camo", votes: 40, preorders: 5, colorHex: "#4B5320" },
      ],
    },
    {
      id: "m_zara_coat",
      brand: "zara",
      title: "Oversized coat: trending shade",
      priceLabel: "$149-$199",
      imageUrl: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=300&fit=crop",
      weight: 8,
      endsAtISO: new Date(Date.now() + 5 * 864e5).toISOString(),
      variant_type: "Shade",
      options: [
        { id: "o_camel", name: "Camel", votes: 70, preorders: 18, colorHex: "#C19A6B" },
        { id: "o_charcoal", name: "Charcoal", votes: 55, preorders: 10, colorHex: "#36454F" },
        { id: "o_cream", name: "Cream", votes: 30, preorders: 4, colorHex: "#FFFDD0" },
      ],
    },
    {
      id: "m_aritzia_bag",
      brand: "aritzia",
      title: "It-bag silhouette poll",
      priceLabel: "$85-$120",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      weight: 6,
      endsAtISO: new Date(Date.now() + 4 * 864e5).toISOString(),
      variant_type: "Silhouette",
      options: [
        { id: "o_crescent", name: "Crescent", votes: 65, preorders: 14, colorHex: "#D4A76A" },
        { id: "o_baguette", name: "Baguette", votes: 42, preorders: 9, colorHex: "#8B6F47" },
        { id: "o_tote", name: "Mini Tote", votes: 38, preorders: 7, colorHex: "#2F2F2F" },
      ],
    },
    {
      id: "m_adidas_samba",
      brand: "adidas",
      title: "Samba OG: next drop color",
      priceLabel: "$100-$130",
      imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
      weight: 7,
      endsAtISO: new Date(Date.now() + 8 * 864e5).toISOString(),
      variant_type: "Colorway",
      options: [
        { id: "o_gum", name: "White / Gum", votes: 95, preorders: 25, colorHex: "#F5F5DC" },
        { id: "o_navy", name: "Navy", votes: 48, preorders: 11, colorHex: "#1B2A4A" },
        { id: "o_burgundy", name: "Burgundy", votes: 37, preorders: 8, colorHex: "#722F37" },
      ],
    },
  ] satisfies Market[],
  picks: [] as UserPick[],
};

export function getMarket(marketId: string) {
  return db.markets.find((m) => m.id === marketId) ?? null;
}

export function upsertPick(pick: UserPick) {
  db.picks.push(pick);
  return pick;
}
