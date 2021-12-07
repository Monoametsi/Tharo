const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const age_calculator = require("./Controllers/age-calculator.js");
const { displayLaspedTime } = age_calculator;
const login = require("./Controllers/login.js");
const { loginGet, loginPost, requireAuth, logout, checkUser } = login;
const passwordAuth = require("./Controllers/password.js");
const { createPasswordGet, createPasswordPost, resetPasswordGet, resetPasswordPost } = passwordAuth;
const indexPost = require("./Controllers/post-form.js");
const { index_post, index_get } = indexPost;
const dashboard = require("./Controllers/dashboard.js");
const { dashboardGet, myPictures, uploadPictures } = dashboard;
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.disable('etag');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirname)));
app.use(express.static(path.join(dirname, 'submission-results')));
app.use(express.static(path.join(dirname, 'login')));
app.use(express.static(path.join(dirname, 'dashboard')));
app.use(express.static(path.join(dirname, 'dashboard', 'main-page')));
app.use(express.static(path.join(dirname, 'dashboard', 'my-videos')));
app.use(express.static(path.join(dirname, 'dashboard', 'my-pictures')));
app.use(express.static(path.join(dirname, 'dashboard', 'file-uploader')));
app.use(express.static(path.join(dirname, 'media', 'Images')));
app.use(express.static(path.join(dirname, 'media', 'videos')));
app.use(cookieParser());
dotenv.config({path: path.join(__dirname, '.env')});
app.set('view engine', 'ejs');

app.use('*', checkUser);

app.use('*', (req, res, next) => {
	res.locals.req = req;
	next();
});

app.get('/', index_get);

app.post('/', index_post);

app.get('/submission-success', (req, res) => {
	res.status(200).render('submission-results')
});

app.get('/submission-failure', (req, res) => {
	res.status(500).render('submission-results')
});

app.get('/password-created-success', (req, res) => {
	res.status(200).render('submission-results')
});

app.get('/password-created-failure', (req, res) => {
	res.status(500).render('submission-results')
});

app.get('/password-reset-success', (req, res) => {
	res.status(200).render('submission-results')
});

app.get('/password-reset-failure', (req, res) => {
	res.status(500).render('submission-results')
});

app.get('/login', loginGet);

app.post('/login', loginPost);

app.get('/logout', logout);

app.get('/create-password', createPasswordGet);

app.post('/create-password', createPasswordPost);

app.get('/reset', resetPasswordGet);

app.post('/reset', resetPasswordPost);

/* app.get('/dashboard', requireAuth, dashboardGet); */
app.get('/dashboard', dashboardGet);

app.get('/pictures', myPictures);

app.get('/upload-pictures', uploadPictures);

const PORT = process.env.PORT;
const db_url = process.env.DATABASE;

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
	app.listen(PORT, () => {
		console.log(`Live at port ${PORT}`);
	})
}).catch((err) => {
	console.log(err);
})