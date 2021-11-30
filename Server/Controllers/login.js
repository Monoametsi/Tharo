const form_val_func = require("./form-val.js");
const { fieldValidator } = form_val_func;
const siteOwner = require('../Model/user.js')
const { userModel } = siteOwner;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname, '.env')});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: maxAge
	});
}

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
			if(err){
				console.log(err);
				return res.redirect('/login');
			}else{
				console.log(decodedToken);
				next();
			}
		})
	}else{
		res.redirect('/login');
	}
}

const loginGet = (req, res) => {
	const formData = {
		name: undefined,
		password: undefined
	}
	
	let userFound = undefined;
	
	return res.status(200).render('login', { formData, userFound });
}

const loginPost = async (req, res) => {
	const formData = req.body;
	const { name, password } = formData;
	let userFound = undefined;
	
	if(name.trim().length === 0 || password.trim().length === 0){
		return res.status(200).render('login',  { formData, userFound });
	}else{
		const findOwner = await userModel.findOne({ Name: name }).exec();
		
		if(findOwner){
			const { Password } = findOwner;
			if(Password.length === 0){
				userFound = false;
				return res.status(200).render('login',  { formData, userFound });
			}else{
				const passwordMatch = await bcrypt.compare(password.trim(), Password);
				
				if(passwordMatch){
					const token = createToken(findOwner._id);
					res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
					return res.redirect('/dashboard');
				}else{
					userFound = false;
					return res.status(200).render('login',  { formData, userFound });
				}
				
			}
		
		}else{
			userFound = false;
			return res.status(200).render('login',  { formData, userFound });
		}
	}
}

const logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	return res.redirect('/login');
}

const checkUser = async (req, res, next) => {
	const token = req.cookies.jwt;
	
	if(token){
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if(err){
				console.log(err);
				res.locals.user = null;
				next();
			}else{
				console.log(decodedToken);
				let user = await userModel.findOne({ _id: decodedToken.id }).exec();
				res.locals.user = user;
				next();
			}
		})
	}else{
		res.locals.user = null;
		next();
	}
}

module.exports = {
	loginGet,
	loginPost,
	requireAuth,
	logout,
	checkUser
}