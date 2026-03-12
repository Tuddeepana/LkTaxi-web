export const WHATSAPP_NUMBER = "94716520690";

export const ridePricing: Record<string, Record<string, number>> = {
  colombo_galle: { "MINI CAR": 12000, "SEDAN": 15000, "KDH": 20000, "KDH HIGHROOF": 23000 },
  colombo_kandy: { "MINI CAR": 10000, "SEDAN": 13000, "KDH": 18000, "KDH HIGHROOF": 21000 },
  colombo_airport: { "MINI CAR": 4000, "SEDAN": 5000, "KDH": 7000, "KDH HIGHROOF": 8000 },
  colombo_ella: { "MINI CAR": 18000, "SEDAN": 22000, "KDH": 28000, "KDH HIGHROOF": 32000 },
  colombo_sigiriya: { "MINI CAR": 14000, "SEDAN": 17000, "KDH": 22000, "KDH HIGHROOF": 25000 },
  airport_colombo: { "MINI CAR": 4000, "SEDAN": 5000, "KDH": 7000, "KDH HIGHROOF": 8000 },
  airport_kandy: { "MINI CAR": 12000, "SEDAN": 15000, "KDH": 20000, "KDH HIGHROOF": 23000 },
  airport_galle: { "MINI CAR": 14000, "SEDAN": 17000, "KDH": 22000, "KDH HIGHROOF": 25000 },
  kandy_ella: { "MINI CAR": 10000, "SEDAN": 13000, "KDH": 17000, "KDH HIGHROOF": 20000 },
  kandy_sigiriya: { "MINI CAR": 7000, "SEDAN": 9000, "KDH": 12000, "KDH HIGHROOF": 14000 },
};

export const tourPricing: Record<string, number> = {
  KDH: 24000,
  SEDAN: 13000,
};

export const locations = [
  "Colombo",
  "Airport (BIA)",
  "Kandy",
  "Galle",
  "Ella",
  "Sigiriya",
  "Nuwara Eliya",
  "Mirissa",
  "Trincomalee",
  "Jaffna",
  "Anuradhapura",
  "Polonnaruwa",
  "Dambulla",
  "Bentota",
  "Hikkaduwa",
  "Unawatuna",
  "Tissamaharama",
  "Yala",
  "Arugam Bay",
  "Negombo",
];

export const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Canada", "China", "Colombia", "Czech Republic", "Denmark",
  "Egypt", "Finland", "France", "Germany", "Greece", "Hungary", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines", "Poland",
  "Portugal", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "UAE", "UK",
  "Ukraine", "USA", "Vietnam",
];

export const vehicles = ["MINI CAR", "SEDAN", "KDH", "KDH HIGHROOF"] as const;

export function generateWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getRouteKey(pickup: string, drop: string): string {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '').replace('bia', 'airport');
  return `${normalize(pickup)}_${normalize(drop)}`;
}
