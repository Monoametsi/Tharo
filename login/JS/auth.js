const formValidation = function(){
	const label = document.getElementsByTagName('label');
	const subBtn = document.querySelector('#sub-btn');
	
	this.labelRenderer = function(){
		for(let i = 0; i < label.length; i++){
			const inputLabel = label[i];
			const inputField = inputLabel.parentElement.children[0];
			
			const labelDisplayer = () => {
				const inputFieldVal = inputLabel.parentElement.children[0].value.trim();
				
				const onFocus = function(){
					inputLabel.classList.add('display-label');
				}
				
				inputField.addEventListener('focusin', onFocus);
				
				const onBlur =  function(){
					if(inputFieldVal.length > 0){
						inputLabel.classList.add('display-label');
					}else{
						inputLabel.classList.remove('display-label');
					}
				}
				
				inputField.addEventListener('focusout', onBlur);
			}
			
			labelDisplayer();
			
			inputField.addEventListener('input', labelDisplayer);
		}
	}
	
	this.formVal = function(){
		const inputFields = document.querySelectorAll('.input-styling');
		
		for(let i = 0; i < inputFields.length; i++){
			const inputField = inputFields[i];
			const errMsg = inputField.nextElementSibling.nextElementSibling;
			
			const onBlur = function(){
				const inputFieldVal = inputField.value.trim();
				if(inputFieldVal.length === 0){
					inputField.classList.add('red-border');
					errMsg.style.display = 'flex';
					errMsg.innerText = 'Required';
					
					if(i === 3){
						inputField.classList.remove('red-border');
						errMsg.style.display = 'none';
						errMsg.innerText = '';
					}
					
					return false;
				}else{
					inputField.classList.remove('red-border');
					errMsg.style.display = 'none';
					errMsg.innerText = '';
					return true;
				}
			}
			
			const formVal = function(){
				this.addEventListener('focusout', onBlur);
			}
			
			inputField.addEventListener('input', formVal);
			
			subBtn.addEventListener('click', (event) => {				
				if(!onBlur()){
					event.preventDefault();
				}
			});
		}	
	}
	
	this.newPwdValidatior = function(){
		const pwdField = document.querySelector('#pwd');
		const confPwdField = document.querySelector('#confirm');
		let pwdErr, confErr;
		
		if(!pwdField || !confPwdField){
			return;
		}
		
		const onFocus =  function(){
			const pwdReq = this.nextElementSibling.nextElementSibling.nextElementSibling;
			pwdReq.style.display = 'flex';
		}
		
		const onBlur =  function(){
			const pwdReq = this.nextElementSibling.nextElementSibling.nextElementSibling;
			pwdReq.style.display = 'none';
		}
		
		pwdField.addEventListener('focusin', onFocus);
		confPwdField.addEventListener('focusin', onFocus);
		
		pwdField.addEventListener('focusout', onBlur);
		confPwdField.addEventListener('focusout', onBlur);
		
		const onInputPwd = () => {
			const pwdFieldVal = pwdField.value.trim();
			const checkBox = document.querySelectorAll('.checkbox');
			
			if(pwdFieldVal.length > 6){
				checkBox[0].checked = true;
				pwdErr = false;
			}else{
				checkBox[0].checked = false;
				pwdErr = true;
			}
			
			if(pwdFieldVal.search(/[a-z]/) !== -1){
				checkBox[1].checked = true;
				pwdErr = false;
			}else{
				checkBox[1].checked = false;
				pwdErr = true;
			}
			
			if(pwdFieldVal.search(/[A-Z]/) !== -1){
				checkBox[2].checked = true;
				pwdErr = false;
			}else{
				checkBox[2].checked = false;
				pwdErr = true;
			}
			
			if(pwdFieldVal.search(/\d/) !== -1 || pwdFieldVal.search(/[\W_]/) !== -1){
				checkBox[3].checked = true;
				pwdErr = false;
			}else{
				checkBox[3].checked = false;
				pwdErr = true;
			}
		}
		
		const onInputConfirm = () => {
			const confPwdFieldVal = confPwdField.value.trim();
			const pwdFieldVal = pwdField.value.trim();
			const checkBox = document.querySelector('#checkbox');
			
			if(confPwdFieldVal.length > 0 && confPwdFieldVal === pwdFieldVal){
				checkBox.checked = true;
				confErr = false;
			}else{
				checkBox.checked = false;
				confErr = true;
			}
		}
		
		pwdField.addEventListener('input', onInputPwd);
		pwdField.addEventListener('input', onInputConfirm);
		confPwdField.addEventListener('input', onInputConfirm);
		
		subBtn.addEventListener('click', (event) => {
			const confPwdFieldVal = confPwdField.value.trim();
			const pwdFieldVal = pwdField.value.trim();
			const errMsg = document.getElementById('err-msg');
			onInputPwd();
			onInputConfirm();
			
			if(pwdErr || confErr){
				if(confPwdFieldVal.length > 0 || pwdFieldVal.length > 0){
					errMsg.innerHTML = 'Please provide a valid password.';
					errMsg.style.display = 'flex';
					event.preventDefault();
				}
			}else{
				errMsg.innerHTML = '';
				errMsg.style.display = 'none';
			}
		});
	}
}

const form_validation = new formValidation();
form_validation.labelRenderer();
form_validation.formVal();
form_validation.newPwdValidatior();                                                                                                                                                                                                                                                      