﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('icons-normal.ttf', font);
this.addFont('icons-normal.ttf', 'icons', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])