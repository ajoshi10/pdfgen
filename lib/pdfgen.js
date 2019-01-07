const pdfmake = require('pdfmake')

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
}

class pdfGen {
init(){
    this.docHeader=require('../templates/docHeader.json')
    this.docStyles=require('../templates/styles.json')
}

generatePdf() {
        return new Promise((resolve,reject)=>{

            let pdfPrinter = new pdfmake(fonts)
            
            let docDef = []
            docDef['header'] = this.docHeader;
            docDef['styles'] = this.docStyles;
            docDef['pageMargins'] = [30,60,30,100]
            docDef['content'] = [{ "text": "asdfasfd" }]
            docDef['footer'] = function(currentPage, pageCount, pageSize){
                return[{
                    "canvas": [{"type":"line", "x1":30, "y1": 30 , "x2": 810, "y2": 30, "lineWidth": 0.5}]
                },
                {
                    "text": "Some footer text",
                    "style": "pagefooter"
                },
                {
                    "text": `Page ${currentPage.toString()} of ${pageCount.toString()}`,
                    "style": "pagefooter"
                }
            ]
            }
           
    
            let pdfDoc = pdfPrinter.createPdfKitDocument(docDef)
            let chunks = []
            let pdfRes
    
            pdfDoc.on('data', function (chunk) {
                chunks.push(chunk)
            })
    
            pdfDoc.on('end', function (err) {
                if (err) {
                    reject(err)    
                } else {
                    pdfRes = Buffer.concat(chunks)
                    resolve(pdfRes)
                }
            })
            pdfDoc.end();
        
        })
    }
}

module.exports = new pdfGen;