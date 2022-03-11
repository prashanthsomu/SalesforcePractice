import { LightningElement } from 'lwc';
import PDF_LIB from '@salesforce/resourceUrl/pdfCreator';
import { loadScript } from 'lightning/platformResourceLoader';


export default class CustomPDF extends LightningElement {


      renderedCallback() {
          loadScript(this, PDF_LIB).then(() => { });
    }

    async pdfCreation() {
        const pdfDoc = await PDFLib.PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman)

        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30
        page.drawText('Creating PDF', {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: PDFLib.rgb(0, 0.53, 0.71),
        })

        const pdfBytes = await pdfDoc.save()
        this.savePdf('My PDF',pdfBytes)
    }

    savePdf(pdfName, byte) {
        let blob = new blob([byte], { type: "application" / pdf });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        let fileName = pdfName;
        link.download = fileName;
        link.click();
    }


}