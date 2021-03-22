const express = require('express')
const app = express()
const {join} = require('path')

app.use('/', express.static(join(__dirname, 'htdocs')))

app.listen(3000)
console.log('Listen for localhost:3000 ....')