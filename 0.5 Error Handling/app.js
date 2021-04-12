const Joi = require('joi')
const express = require('express')
const validator = require('express-joi-validation').createValidator({})

const PORT = 3100
const DATA = [
    { id: 1, name: 'Apfel', color: 'gelb,rot' },
    { id: 2, name: 'Birne', color: 'gelb,grün' },
    { id: 3, name: 'Banane', color: 'gelb' },
]
let firstLoggingSent = false
const app = express()

// validation
const queryFruit = Joi.object({
    name: Joi.string().alphanum().required(),
    color: Joi.string(),
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TODO: Logging
app.use((req, res, next) => {
    if (!firstLoggingSent) {
        console.log('Console will log:\nreq.methode req.url req.body')
        firstLoggingSent = true
    }
    console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`)
    next()
})

// TODO: Chained endpoints

app.route('/fruits')
    .get((req, res, next) => {
        try {
            res.send(DATA)
        } catch (error) {
            next(error)
        }
    })
    .post(validator.body(queryFruit), (req, res, next) => {
        try {
            const { name, color } = req.body
            if (DATA.some((fruit) => fruit.name === name)) {
                res.status(400).send('Duplicate name. Nothing inserted')
            } else {
                const id = Math.max(...DATA.map((o) => o.id)) + 1
                const fruit = { id, name, color }
                DATA.push(fruit)
                res.send(fruit)
            }
        } catch (error) {
            next(error)
        }
    })

app.route('/fruits/:id')
    .get((req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            const fruit = DATA.find((fruit) => fruit.id === id)
            res.send(fruit)
        } catch (error) {
            next(error)
        }
    })
    .put((req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            const index = DATA.findIndex((fruit) => fruit.id === id)
            if (index === -1) res.status(400).send('Unknown id')
            else {
                DATA.splice(index, 1, { ...req.body, id })
                res.send(DATA[index])
            }
        } catch (error) {
            next(error)
        }
    })
    .patch((req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            const index = DATA.findIndex((fruit) => fruit.id === id)
            if (index === -1) res.status(400).send('Unknown id')
            else {
                Object.assign(DATA[index], req.body)
                res.send(DATA[index])
            }
        } catch (error) {
            next(error)
        }
    })
    .delete((req, res, next) => {
        try {
            const id = parseInt(req.params.id)
            const index = DATA.findIndex((fruit) => fruit.id === id)
            if (index === -1) res.status(400).send('Unknown id')
            else {
                DATA.splice(index, 1)
                res.sendStatus(204)
            }
        } catch (error) {
            next(error)
        }
    })

app.get('/error', (req, res, next) => {
    try {
        throw new Error('Test error')
    } catch (error) {
        next(error)
    }
})

app.use((req, res, next) => {
    res.status(404).send({ message: '404 - Not found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: '500 - Internal Error' })
    console.log(err)
})

app.listen(PORT)
console.log(`Server listening on port ${PORT}`)
