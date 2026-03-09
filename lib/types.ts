export type Option = {
  id: string;
  name: string;
  colorHex?: string;
  votes: number;
  preorders: number;
  variantType?: string;
  variantTypeId?: string;
};

export type Market = {
  id: string;
  brand: string;
  title: string;
  description?: string;
  priceLabel: string;
  imageUrl: string;
  options: Option[];
  weight: number;
  endsAtISO: string;
  closes_at?: string;
  // Database fields
  brand_name?: string;
  category?: string;
  sub_category?: string;
  product_type?: string;
  image_url?: string;
  brand_logo?: string;
  variant_type?: string;
  price?: number;
  position?: number;
  featured?: boolean;
  status?: string;
};

export type UserPick = {
  id: string;
  userId: string;
  marketId: string;
  optionId: string;
  kind: "VOTE" | "PREDICT";
  createdAtISO: string;
};

export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };
