const morgan = require("morgan");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { getInputs, createInput } = require("./controller");

////////////////////////////////// middleware

if (process.env.NODE_ENV === "development") {
	console.log("NODE_ENV:", process.env.NODE_ENV);
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

////////////////////////////////// endpoints

app.get("/api/info", getInputs);
app.post("/api/info", createInput);

////////////////////////////////// listener

const port = process.env.PORT || 3035;
app.listen(port, () => console.log(`Server app listening on ${port}`));
