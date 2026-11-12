// Collection points shown on the map and in the order form. Add a point by copying the example below.
//
// {
//   province: "Gauteng",
//   name: "DTF Nation Pretoria East",
//   address: "12 Example Street, Pretoria",
//   phone: "012 345 6789",
//   hours: "Mon–Fri 08:00–17:00, Sat 08:00–12:00",
//   mapsUrl: "https://maps.google.com/?q=12+Example+Street+Pretoria",
// },

export const PROVINCES = [
  "Gauteng",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Western Cape",
  "Northern Cape",
] as const;

export type Province = (typeof PROVINCES)[number];

export type CollectionPoint = {
  province: Province;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapsUrl: string;
};

export const COLLECTION_POINTS: CollectionPoint[] = [];

export const pointsIn = (province: Province) => COLLECTION_POINTS.filter((p) => p.province === province);
