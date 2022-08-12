require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false
		}
	}
});

const debug = require("debug")("zack")

module.exports = {
	getInputs: (req, res) => {
		if (process.env.DEBUG = 'zack') debug("hello from debug")
		sequelize
			.query(`select * from input;`)
			.then(dbRes => res.status(200).send(dbRes[0]))
			.catch(err => console.log("GETTING", err));
	},
	createInput: (req, res) => {
		const { text } = req.body;

		sequelize
			.query(
				`insert into input (text)
            values ('${text}');`
			)
			.then(dbRes => res.status(200).send(dbRes[0]))
			.catch(err => console.log("POSTING", err));
	}
};
