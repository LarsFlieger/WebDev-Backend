const fs = require('fs')
const http = require('http')
const { join, extname } = require('path')

const app = http.createServer(async (req, res) => {
    let status, content, contentType = 'text/html'
    try {
        const data = await fs.promises.readFile(join(__dirname, 'htdocs', req.url !== '/' ? req.url : 'index.html'))
        switch(extname(req.url)) {
            case '.js':
                contentType = 'text/javascript'
            break;
            case '.css': 
                contentType = 'text/css'
            break;
            default:
                contentType = 'text/html'
        }
        status = 200
        content = data.toString()
    } catch (error) {
        status = 400
        content = error.message
    }

    console.log(status, req.url)

    res.writeHead(status, {
        'Content-type': contentType
    })
    res.write(content)
    res.end()
})

app.listen(3000)
console.log("Listing on localhost:3000....")