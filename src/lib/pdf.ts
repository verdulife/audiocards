import { jsPDF, type jsPDFOptions } from "jspdf";
import { CARD_SIZE } from "@/lib/constants";
import "@/assets/icons";
import "@/assets/inter-bold";
import "@/assets/inter-regular";
import type { cardDataType } from "./types";

function formatPhone(phone: string) {
  return phone
    .trim()
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

export function generateCard(
  pdfOptions: jsPDFOptions,
  cardData: cardDataType,
  frontImg: string,
  backImg: string,
) {
  const { name, phone, city, address } = cardData;
  const doc = new jsPDF(pdfOptions);

  /* PAGE 1 */
  doc.addImage(backImg, "JPEG", 0, 0, CARD_SIZE.height, CARD_SIZE.width);

  doc
    .setFont("inter", "normal", "bold")
    .setFontSize(10)
    .text(name, CARD_SIZE.margin, 60, {
      maxWidth: CARD_SIZE.margin * 2 - CARD_SIZE.width,
    });

  doc
    .setFont("inter", "normal", "normal")
    .setFontSize(8)
    .text(
      `(+34) ${formatPhone(phone)}
${city.toLowerCase()}@elaudiolibrodetudia.com
${city.toLowerCase()}.elaudiolibrodetudia.com
${address}`,
      CARD_SIZE.margin + 3.5,
      69,
      {
        maxWidth: CARD_SIZE.margin * 2 - CARD_SIZE.width,
        lineHeightFactor: 1.4,
      },
    );

  /* PAGE 2 */
  doc.addPage();
  doc.addImage(frontImg, "JPEG", 0, 0, CARD_SIZE.height, CARD_SIZE.width);

  return doc.output("datauristring");
}
