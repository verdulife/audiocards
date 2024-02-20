import { jsPDF } from "jspdf";
import { CARD_SIZE } from "@/lib/constants";
import "@/assets/icons";
import "@/assets/inter-bold";
import "@/assets/inter-regular";

export function generateCard(pdfOptions, cardData, frontImg, backImg) {
  const doc = new jsPDF(pdfOptions);
  /* PAGE 1 */
  doc.addImage(backImg, "JPEG", 0, 0, CARD_SIZE.height, CARD_SIZE.width);

  doc
    .setFont("inter", "normal", "bold")
    .setFontSize(10)
    .text(cardData.name, CARD_SIZE.margin, 60, {
      maxWidth: CARD_SIZE.margin * 2 - CARD_SIZE.width,
    });

  doc
    .setFont("inter", "normal", "normal")
    .setFontSize(8)
    .text(
      `(+34) ${cardData.phone}
${cardData.city}@elaudiolibrodetudia.com
${cardData.city}.elaudiolibrodetudia.com
${cardData.address}`,
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
