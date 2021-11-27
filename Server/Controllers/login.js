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
	res.redirect('/login');
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

const createPasswordGet = (req, res) => {
	const formData = {
		name: undefined,
		ID: undefined,
		password: undefined,
		confirm: undefined
	}
	
	let pwdErr = notFound = undefined;
	let isRegistered = false;
	
	return res.status(200).render('create-password', { formData, notFound, pwdErr, fieldValidator, isRegistered });
}

const createPasswordPost = async (req, res) => {
	const formData = req.body;
	const { name, ID, password, confirm } = formData;
	let pwdErr = notFound = undefined;
	let isRegistered = false;
	const errCheck = !fieldValidator.checkEmpty(name)[1] || !fieldValidator.checkEmpty(ID)[1];
	const errCheckPwd = !fieldValidator.checkEmpty(password)[1] || !fieldValidator.checkEmpty(confirm)[1] || fieldValidator.newPwdValidatior(password, confirm) === false;
	
	if(errCheck || errCheckPwd){
		
		if(fieldValidator.newPwdValidatior(password, confirm) === false){
			pwdErr = true;
		}
		
		return res.status(200).render('create-password', { formData, pwdErr, notFound, fieldValidator, isRegistered });
	}else{
		const findOwner = await userModel.findOne({ Name: name, User_Id: ID }).exec();
		
		if(findOwner){
			if(findOwner.Password.length === 0){
				const salt = await bcrypt.genSalt();
				const userName = { Name: findOwner.Name };
				let pwd = await bcrypt.hash(password, salt);
				pwd = { Password: pwd }
				
				const passwordInsert = userModel.findOneAndUpdate(userName, pwd, { new:true }, (err, result) => {
					if (err) return res.redirect('/password-created-failure');
					
					return res.redirect('/password-created-success');
				});
			}else{
				isRegistered = true;
				return res.status(200).render('create-password', { formData, pwdErr, notFound, fieldValidator, isRegistered });
			}
		}else{
			notFound = true;
			return res.status(200).render('create-password', { formData, pwdErr, notFound, fieldValidator, isRegistered });
		}
	}
}

const resetPasswordGet = (req, res) => {
	const formData = {
		name: undefined,
		ID: undefined,
		password: undefined,
		confirm: undefined
	}
	
	let pwdErr = notFound = passwordExist = undefined;
	
	return res.status(200).render('reset', { formData, pwdErr, fieldValidator, notFound, passwordExist });
}

const resetPasswordPost = async (req, res) => {
	const formData = req.body;
	const { name, ID, password, confirm } = formData;
	let pwdErr = notFound = passwordExist = undefined;
	const errCheck = !fieldValidator.checkEmpty(name)[1] || !fieldValidator.checkEmpty(ID)[1];
	const errCheckPwd = !fieldValidator.checkEmpty(password)[1] || !fieldValidator.checkEmpty(confirm)[1] || fieldValidator.newPwdValidatior(password, confirm) === false;
	
	if(errCheck || errCheckPwd){
		
		if(fieldValidator.newPwdValidatior(password, confirm) === false){
			pwdErr = true;
		}
		
		return res.status(200).render('reset', { formData, pwdErr, notFound, fieldValidator, passwordExist });
	}else{
		const findOwner = await userModel.findOne({ Name: name, User_Id: ID }).exec();
		
		if(findOwner){
			if(findOwner.Password.length === 0){
				passwordExist = false;
				return res.status(200).render('reset', { formData, pwdErr, notFound, fieldValidator, passwordExist });
			}else{
				const salt = await bcrypt.genSalt();
				const userName = { Name: findOwner.Name };
				let pwd = await bcrypt.hash(password, salt);
				pwd = { Password: pwd }
				
				const passwordInsert = userModel.findOneAndUpdate(userName, pwd, { new:true }, (err, result) => {
					if (err) return res.redirect('/password-reset-failure');
					
					return res.redirect('/password-reset-success');
				});
			}
		}else{
			notFound = true;
			return res.status(200).render('reset', { formData, pwdErr, notFound, fieldValidator, passwordExist });
		}
	}
	
}

module.exports = {
	loginGet,
	loginPost,
	createPasswordGet,
	createPasswordPost,
	resetPasswordGet,
	resetPasswordPost,
	requireAuth,
	logout,
	checkUser
}