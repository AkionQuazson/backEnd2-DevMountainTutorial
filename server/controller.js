const { truncateSync } = require('fs');
const { hostname } = require('os');
const houses = require('./db.json');
let globalId = 4;

module.exports = {
	getHouses: (req, res) => {
		res.status(200).send(houses);
	},

	deleteHouse: (req, res) => {
		const {id} = req.params
		for(let i = 0; i < houses.length; i++) {
			if (houses[i].id === +id) {
				houses.splice(i, 1);
				return res.status(200).send(houses);
			}
		}
		res.status(400).send(houses);
	},

	createHouse: (req, res) => {
		const { address, price, imageURL } = req.body;
		houses.push({
			address,
			price,
			imageURL,
			id: globalId++
		})
		res.status(200).send(houses);
	},

	updateHouse: (req, res) => {
		const {id} = req.params;
		const {type} = req.body;
		const houseIndex = houses.findIndex((house) => house.id === +id);
		const chosenHouse = houses[houseIndex];

		if (type === 'plus') {
			chosenHouse.price += 10000;
		}
		else if (type === 'minus' && chosenHouse.price > 10000) {
			chosenHouse.price -= 10000;
		}
		res.status(200).send(houses);
	}
}