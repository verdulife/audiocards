import type { cardDataType } from "./types";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { CARD_SIZE, MM_TO_POINTS } from "@/lib/constants";
import template from "@/assets/template.pdf";

function formatPhone(phone: string) {
  return phone
    .trim()
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

export async function generateCard(
  cardData: cardDataType,
  frontImg: string,
  backImg: string,
) {
  const pdfBuffer = await fetch(template).then((res) => res.arrayBuffer());
  const doc = await PDFDocument.load(pdfBuffer);
  const page = doc.getPage(0);
  const { name, phone, city, address } = cardData;

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  page.drawText(name, {
    x: CARD_SIZE.margin + 4 * MM_TO_POINTS,
    y: CARD_SIZE.margin + 26 * MM_TO_POINTS,
    size: 11,
    maxWidth: CARD_SIZE.width,
    font: bold,
  });

  page.drawText(
    `(+34) ${formatPhone(phone)}\n${city.toLowerCase()}@elaudiolibrodetudia.com\n${city.toLowerCase()}.elaudiolibrodetudia.com\n${address}`,
    {
      x: CARD_SIZE.margin + 7.5 * MM_TO_POINTS,
      y: CARD_SIZE.margin + 15.75 * MM_TO_POINTS,
      maxWidth: CARD_SIZE.width,
      size: 7,
      font: regular,
      lineHeight: 11,
    },
  );

  const pdfBytes = await doc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const blobUri = URL.createObjectURL(pdfBlob);

  return blobUri;
}
