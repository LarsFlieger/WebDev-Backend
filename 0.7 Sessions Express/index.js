const express = require('express')
const session = require('express-session')

const PORT = 3100;
const RATE_LIMIT = 10;

const app = express()
app.use(session({
    secret: 'ygRdgzWJeiv8Bndub0cgi6ykH8odeoNDRqVRaVv2jJzGVmhCtunPO58OQTSVwyk',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }  
}))

app.use((req, res, next) => {
    if(req.session.counter)
        req.session.counter++
    else
        req.session.counter = 1
    
    next()
})

app.use((req, res, next) => {
    if(req.session.counter > RATE_LIMIT)
        res.send({
            message: 'Limit reached',
            counter: req.session.counter
        }).status(405)
    else
        next()
})

app.get('/', (req, res) => {
    res.send({
        message: 'All good',
        counter: req.session.counter
    }).status(405)
})

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
