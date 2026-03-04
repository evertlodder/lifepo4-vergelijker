export interface Product {
  id: string;
  name: string;
  brand: 'litime' | 'redodo' | 'rebelcell' | 'powerlit';
  terminal: string;
  voltage: string;
  cap: number;
  price: number;
  priceBol: number | null;
  priceAmz: number | null;
  weight: number;
  dims: [number, number, number] | null;
  dod: number;
  cycles: number;
  bt: boolean;
  lt: boolean;
  heat: boolean;
  can: boolean;
  flex: boolean;
  sp: boolean;
  apps: string[];
  warranty: number;
  desc: { nl: string; de: string };
  img: string;
  bol: string | null;
  amz: string | null;
}

export type Locale = 'nl' | 'de';
