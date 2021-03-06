const form_val_func = require("./form-val.js");
const { fieldValidator } = form_val_func;
const siteOwner = require('../Model/user.js')
const { userModel } = siteOwner;
const bcrypt = require('bcrypt');

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
	createPasswordGet,
	createPasswordPost,
	resetPasswordGet,
	resetPasswordPost
}