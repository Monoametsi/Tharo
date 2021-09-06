const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);
const dotenv = require("dotenv");

app.disable('etag');

app.use(express.static(path.join(dirname)));
dotenv.config({path: path.join(__dirname, '.env')});
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Live at port ${PORT}`);
})