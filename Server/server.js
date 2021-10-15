const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const age_calculator = require("./Controllers/age-calculator.js");
const { displayLaspedTime } = age_calculator;
const indexPost = require("./Controllers/post-form.js");
const { index_post, index_get } = indexPost;
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
app.disable('etag');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname)));
dotenv.config({path: path.join(__dirname, '.env')});
app.set('view engine', 'ejs');

app.get('/', index_get);

app.post('/', index_post);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Live at port ${PORT}`);
})