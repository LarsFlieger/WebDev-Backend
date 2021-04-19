const express = require('express')
const session = require('express-session')

const PORT = 3100
const RATE_LIMIT = 10
const TIME_LIMIT = 5000

const app = express()

// Cookie middleware
app.use(session({
    secret: 'ygRdgzWJeiv8Bndub0cgi6ykH8odeoNDRqVRaVv2jJzGVmhCtunPO58OQTSVwyk',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }  
}))

// Time check middleware
app.use((req, res, next) => {
    if(req.session.time && Date.now() - req.session.time < TIME_LIMIT) {
        res.send({
            message: 'You are to fast... Wait: ' + (TIME_LIMIT - (Date.now() - req.session.time))/1000 + ' Seconds'
        }).status(405)
    } else {
        req.session.time = Date.now()
        next()
    }
})

// Counter middleware
app.use((req, res, next) => {
    if(!req.session.counter)
        req.session.counter = 1

    console.log(req.session.counter)
    if(req.session.counter >= RATE_LIMIT)
        res.send({
            message: 'Limit reached',
            counter: req.session.counter
        }).status(405)
    else {
        req.session.counter++
        next()
    } 
})

app.get('/', (req, res) => {
    res.send({
        message: 'All good',
        counter: req.session.counter
    }).status(405)
})

app.listen(PORT)
console.log(`Server listening on port ${PORT}`)
