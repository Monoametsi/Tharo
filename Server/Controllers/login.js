const siteOwner = require('../Model/user.js')
const { userModel } = siteOwner;

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
			}
			
		}else{
			userFound = false;
			return res.status(200).render('login',  { formData, userFound });
		}
	}
}

const createPasswordGet = (req, res) => {
	return res.status(200).render('create-password');
}

module.exports = {
	loginGet,
	loginPost,
	createPasswordGet
}