const validator = function(){
	this.checkEmpty = function(input){
		const inputVal = input.trim();
		
		if(inputVal.length === 0 || inputVal === '' || input === null){
			return ['Required', false];
		}else{
			return [inputVal, true];
		}
	}
	
	this.mailValidator = function(input){
		const inputVal = input.trim();
		
		const threeDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
		const oneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
		const twoDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
		
		const threeDotFormat = threeDot.test(inputVal);
		const oneDotFormat = oneDot.test(inputVal);
		const twoDotFormat = twoDot.test(inputVal);
		const emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
		
		if(inputVal.length === 0 || inputVal === '' || input === null){
			return ['Required', false];
		}else if(!emailFormats){
			return ['Invalid', false];
		}else{
			return [inputVal, true];
		}
	}
	
	this.telValidator = function(input){
		const inputVal = input.trim();
		const telFormat = /^((\+|00|09)\d{2,3}|0)\d{9}$/;
		const formatTest = telFormat.test(inputVal);
		
		if(inputVal.length === 0 || inputVal === '' || input === null){
			return ['Required', false];
		}else if(!formatTest){
			return ['Invalid', false];
		}else{
			return [inputVal, true];
		}
	}
	
	this.newPwdValidatior = function(pwd, confPwd){
		const pwdVal = pwd.trim();
		const confPwdVal = confPwd.trim();
		
		if(pwdVal.length > 0 && pwdVal.length < 6){
			return false;
		}
		
		if(pwdVal.length > 0 &&  pwdVal.search(/[a-z]/) === -1){
			return false;
		}
		
		if(pwdVal.length > 0 &&  pwdVal.search(/[A-Z]/) === -1){
			return false;
		}
		
		if(pwdVal.length > 0 &&  (pwdVal.search(/\d/) === -1 || pwdVal.search(/[\W_]/) === -1)){
			return false;
		}
		
		if((confPwdVal.length > 0 || pwdVal.length > 0) && pwdVal !== confPwdVal){
			return false;
		}
	}
}

const fieldValidator = new validator();

module.exports = {
	fieldValidator
}