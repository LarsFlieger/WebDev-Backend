const http = require('http')
const fileserver = new (require('node-static').Server)()

const app = http.createServer(async (req, res) => {
    fileserver.serve(req, res)
})

app.listen(3000)
console.log("Listing on localhost:3000....")