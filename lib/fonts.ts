import { Archivo, Geist_Mono, Instrument_Serif } from "next/font/google";

// Three voices: condensed stencil caps (Archivo wdth), an italic-capable display serif, and a mono for catalogue labels.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
