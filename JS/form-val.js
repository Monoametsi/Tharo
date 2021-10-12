const validator = function(){
	this.checkEmpty = function(input){
		const inputVal = input.value.trim();
		const errMsg = input.nextElementSibling;
		
		if(inputVal.length === 0 || inputVal === '' || input === null || input === undefined){
			errMsg.style.display = 'flex';
			errMsg.innerHTML = 'Required';
			input.classList.add('redBox');
			return false
		}else{
			errMsg.style.display = 'none';
			errMsg.innerHTML = '';
			input.classList.remove('redBox');
			return inputVal;
		}
	}
	
	this.mailValidator = function(input){
		const inputVal = input.value.trim();
		const errMsg = input.nextElementSibling;
		
		const threeDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,15}\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
		const oneDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2,3}$/;
		const twoDot = /^\w+([.!#$%&'*+-/=?^_`{|}~]?\w+)*@[A-Za-z0-9]+[-]?[A-Za-z0-9]+\.[A-Za-z]{2}\.[A-Za-z]{2}$/;
		
		const threeDotFormat = threeDot.test(inputVal);
		const oneDotFormat = oneDot.test(inputVal);
		const twoDotFormat = twoDot.test(inputVal);
		const emailFormats = threeDotFormat || twoDotFormat || oneDotFormat;
		
		if(inputVal.length === 0 || inputVal === '' || input === null || input === undefined){
			errMsg.style.display = 'flex';
			errMsg.innerHTML = 'Required';
			input.classList.add('redBox');
			return false;
		}else if(!emailFormats){
			errMsg.style.display = 'flex';
			errMsg.innerHTML = 'Invalid';
			input.classList.add('redBox');
			return false;
		}else{
			errMsg.style.display = 'none';
			errMsg.innerHTML = '';
			input.classList.remove('redBox');
			return inputVal;
		}
	}
	
	this.telValidator = function(input){
		const inputVal = input.value.trim();
		const errMsg = input.nextElementSibling;
		const telFormat = /^((\+|00|09)\d{2,3}|0)\d{9}$/;
		const formatTest = telFormat.test(inputVal);
		
		if(inputVal.length === 0 || inputVal === '' || input === null || input === undefined){
			errMsg.style.display = 'flex';
			errMsg.innerHTML = 'Required';
			input.classList.add('redBox');
			return false;
		}else if(!formatTest){
			errMsg.style.display = 'flex';
			errMsg.innerHTML = 'Invalid';
			input.classList.add('redBox');
			return false;
		}else{
			errMsg.style.display = 'none';
			errMsg.innerHTML = '';
			input.classList.remove('redBox');
			return inputVal;
		}
	}
}

const name = document.getElementById('name');
const surname = document.getElementById('surname');
const msg = document.getElementById('message');
const email = document.getElementById('email');
const tel = document.getElementById('tel');

const inputValidator = new validator();

const input_validator = function(){
	inputValidator.checkEmpty(this)
}

const email_validator = function(){
	this.addEventListener('focusout', function(){ 
		inputValidator.mailValidator(this);
	});
}

const tel_validator = function(){
	this.addEventListener('focusout', function(){ 
		inputValidator.telValidator(this);
	});
}

name.addEventListener('input', input_validator);

msg.addEventListener('input', input_validator);

email.addEventListener('input', email_validator);

tel.addEventListener('input', tel_validator);