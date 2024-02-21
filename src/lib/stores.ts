import { readable, writable } from "svelte/store";
import { CARD_SIZE } from "./constants";

export const previewData = writable("");

export const pdfOptions = readable({
  orientation: "p",
  unit: "mm",
  format: [CARD_SIZE.width, CARD_SIZE.height],
  putOnlyUsedFonts: true,
});

export const cardData = writable({
  name: "Albert Verdú",
  phone: "600600600",
  city: "sitges",
  address: "Calle falsa 123",
});
