const age_calculator = require("./age-calculator.js");
const { displayLaspedTime } = age_calculator;
const form_val_func = require("./form-val.js");
const { fieldValidator } = form_val_func;

const index_get = (req, res) => {
	const formData = { 
		name: undefined, 
		surname: undefined,
		email: undefined, 
		tel: undefined, 
		message:  undefined
	};
	
	res.render('index', { displayLaspedTime, fieldValidator, formData, req });
}

const index_post = (req, res) => {
	const formData = req.body;
	const { name, surname, email, tel, message } = formData;
	const findErr = fieldValidator.checkEmpty(name)[1] === false || fieldValidator.checkEmpty(message)[1] === false || fieldValidator.mailValidator(email)[1] === false || fieldValidator.telValidator(tel)[1] === false;
	
	if(findErr){
		return res.render('index', { displayLaspedTime, fieldValidator, formData, req });
	}else{
		return res.redirect('/');
	}
}

module.exports = {
	index_post,
	index_get
}