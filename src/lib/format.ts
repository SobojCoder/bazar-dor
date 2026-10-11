import { IProduct } from "@/Type/product.type";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
  hali: "হালি",
};

export const formatUnit = (unit: string) => unitBn[unit?.toLowerCase()] ?? unit;

// 1850 -> ১,৮৫০
export const toBn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

export const formatTaka = (n: number) => `${toBn(n)} টাকা`;

export type Trend = "up" | "down" | "flat";

export const getTrend = (p: IProduct): Trend =>
  !p.change || p.change.pct === 0 ? "flat" : p.change.dir;

// 2.1 -> ২.১
export const formatPct = (p: IProduct) =>
  Math.abs(p.change?.pct ?? 0).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

export const topMovers = (products: IProduct[], trend: Trend, n = 6) =>
  products
    .filter((p) => getTrend(p) === trend)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, n);