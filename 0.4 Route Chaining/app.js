const express = require("express");

const PORT = 3100;
const DATA = [
	{ id: 1, name: "Apfel", color: "gelb,rot" },
	{ id: 2, name: "Birne", color: "gelb,grün" },
	{ id: 3, name: "Banane", color: "gelb" },
];
let firstLoggingSent = false
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Logging
app.all(/.*/, (req, res, next) => {
	if (!firstLoggingSent) {
		console.log('Console will log:\nreq.methode req.url req.body')
		firstLoggingSent = true
	}
	console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
	next();
});

// TODO: Chained endpoints
app.route("/fruits")
	.get((req, res) => {
		res.send(DATA);
	})
	.post((req, res) => {
		const { name, color } = req.body;
		if (DATA.some(fruit => fruit.name === name)) {
			res.status(400).send("Duplicate name. Nothing inserted");
		} else {
			const id = Math.max(...DATA.map((o) => o.id)) + 1;
			const fruit = { id, name, color };
			DATA.push(fruit);
			res.send(fruit);
		}
	});

app.route("/fruits/:id")
	.get((req, res) => {
		const id = parseInt(req.params.id)
		const fruit = DATA.find(fruit => fruit.id === id)
		res.send(fruit)
	})
	.put((req, res) => {
		const id = parseInt(req.params.id)
		const index = DATA.findIndex(fruit => fruit.id === id)
		if (index === -1)
			res.status(400).send("Unknown id")
		else {
			DATA.splice(index, 1, { id, ...req.body })
			res.send(DATA[index])
		}
	})
	.patch((req, res) => {
		const id = parseInt(req.params.id)
		const index = DATA.findIndex(fruit => fruit.id === id)
		if (index === -1)
			res.status(400).send("Unknown id")
		else {
			Object.assign(DATA[index], req.body)
			res.send(DATA[index])
		}
	})
	.delete((req, res) => {
		const id = parseInt(req.params.id)
		const index = DATA.findIndex(fruit => fruit.id === id)
		if (index === -1) 
			res.status(400).send("Unknown id")
		else {
			DATA.splice(index, 1)
			res.send(DATA)
		}
	})


app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
