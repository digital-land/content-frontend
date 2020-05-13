const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080

app.use('/content-frontend', express.static(path.join(__dirname, 'docs')))
app.listen(port)
console.log('content-frontend has been built to http://localhost:' + port + '/content-frontend')
