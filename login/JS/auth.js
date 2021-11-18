const formValidation = function(){
	const label = document.getElementsByTagName('label');
	
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
			
			inputField.oninput = function(){
				labelDisplayer();
			}
		}
	}
	
	this.formVal = function(){
		const inputFields = document.querySelectorAll('.input-styling');
		const subBtn = document.querySelector('#sub-btn');
		
		for(let i = 0; i < inputFields.length; i++){
			const inputField = inputFields[i];
			const errMsg = inputField.nextElementSibling.nextElementSibling;
			
			const onBlur = function(){
				const inputFieldVal = inputField.value.trim();
				if(inputFieldVal.length === 0){
					inputField.classList.add('red-border');
					errMsg.style.display = 'flex';
					errMsg.innerText = 'Required';
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
}

const form_validation = new formValidation();
form_validation.labelRenderer();
form_validation.formVal();