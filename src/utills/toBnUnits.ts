const unitMap: Record<string, string> = {
  kg: "কেজি",
  gram: "গ্রাম",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  hali: "হালি",
};

export const toBnUnit = (unit: string) =>
  unitMap[unit.toLowerCase()] ?? unit;