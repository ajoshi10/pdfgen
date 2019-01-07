const bodyParser = require('body-parser');
const express = require('express');
const pdfgen = require('./lib/pdfgen');

const app = express()
const port = 8000;

app.get('/', function (req, res) {
  pdfgen.init()
pdfgen.generatePdf().then((pdfRes)=>{
  res.writeHead(200, {
    'content-type': 'application/pdf'
});
res.end(pdfRes)
})
})

var server = app.listen(8081, function () {
  console.log("Example app listening at 8081")
})
