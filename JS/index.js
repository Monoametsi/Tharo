let isOpen;

const hideOverflow = () => {
	const body = document.body;
	const html = document.documentElement;
	
	if(isOpen){
		body.classList.add('hide-overflow');
		html.classList.add('hide-overflow');
	}else{
		body.classList.remove('hide-overflow');
		html.classList.remove('hide-overflow'); 
	}
}

const preloaderObj = function(){
	const preloaderCont = document.getElementById('preloader-cont');
	const homeVid = document.getElementById("home-page-vid");
	
	this.end_preloader = () => {
		const body = document.body;
		const html = document.documentElement;
		
		const endPreloader = () => {
			html.scrollTop = body.scrollTop = 0;
			preloaderCont.classList.add('slow-out');
			setTimeout(() => {
				hideOverflow();
				preloaderCont.style.display = 'none';
			}, 300);
		}
		
		if(window.getComputedStyle(homeVid, null).display !== 'none'){
			homeVid.addEventListener('play', endPreloader);
			window.addEventListener('load', () => {
				html.scrollTop = body.scrollTop = 0;
			});
		}else{
			window.addEventListener('load', endPreloader);
		}
	}
}

const preloader = new preloaderObj();

/* preloader.run_preloader(); */
preloader.end_preloader();

const bg_color_changer = () => {
	const { body } = document;
	const nav = document.getElementById('nav');
	const navCont = nav.parentElement;
	const borderClassName = 'add-border';
	const main_color = document.getElementById('main-color');
	const colors = document.getElementsByClassName('bg-color-toggle');
	const contactForm = document.getElementById('contact-form');
	const { parentElement } = colors[0];
	const { nextElementSibling } = parentElement.parentElement;
	
	const menuToggler = () => {
		nextElementSibling.classList.toggle('change-toggle');
		const checkIfClassExists = nextElementSibling.classList.contains('change-toggle');
		
		if(checkIfClassExists){
			isOpen = true;
			hideOverflow();
			navCont.classList.add('dropdown')
		}else{
			navCont.classList.add('remove-nav');
			setTimeout(() => {
				isOpen = false;
				hideOverflow();
				navCont.classList.remove('remove-nav', 'dropdown');
			}, 600)
		}
	}
	
	const logoChanger = (doesClassExist, elem) => {
		const logo1 = elem.children[0];
		const logo2 = elem.children[1];
		
		if(doesClassExist){
			logo1.classList.add('hide-logo');
			logo2.classList.remove('hide-logo');
		}else{
			logo1.classList.remove('hide-logo');
			logo2.classList.add('hide-logo');
		}
	}
	
	const changeBodyColor = () => {
		const doesClassExist = body.classList.contains('caramel') || body.classList.contains('green-ash') || body.classList.contains('light-bg-color ');
		const headerLogo = document.getElementById('logo');
		const navLogo = document.getElementById('dog-icon-cont');
		
		if(doesClassExist){
			body.classList.add('light-bg-color');
			nav.classList.add('light-bg-color');
			main_color.classList.add('light-bg-color');
		}else{
			body.classList.remove('light-bg-color');
			nav.classList.remove('light-bg-color');
			main_color.classList.remove('light-bg-color');
		}
		
		logoChanger(doesClassExist, headerLogo);
		logoChanger(doesClassExist, navLogo);
	}
	
	const hideBorder = () => {
		for(let j = 0; j < colors.length; j++){
			const color = colors[j];
			let { className } = color;
			const classArr = className.split(' ');
			nextElementSibling.classList.remove('light-bg-color');
			parentElement.classList.remove('light-bg-color');
			color.classList.remove(borderClassName);
			body.classList.remove(classArr[1]);
			main_color.classList.remove(classArr[1]);
			contactForm.classList.remove(classArr[1]);
		}
	}
	
	for(let i = 0; i < colors.length; i++){
		const color = colors[i];
		let { className } = color;
		const classArr = className.split(' ');
		
		const addBorder = function(){
			hideBorder();
			if(classArr[1] === 'caramel' || classArr[1] === 'green-ash'){
				parentElement.classList.add('light-bg-color');
				nextElementSibling.classList.add('light-bg-color');
			}
			
			color.classList.add(borderClassName);
			body.classList.add(classArr[1]);
			main_color.classList.add(classArr[1]);
			contactForm.classList.add(classArr[1]);
			changeBodyColor();
		}
		
		color.addEventListener('click', addBorder)
	}
	
	nextElementSibling.addEventListener('click', menuToggler);
}

bg_color_changer();

const smoothBookMarker = () => {
	const navLinks = document.querySelectorAll('.link');
	
	for(let i = 0; i < navLinks.length; i++){
		const navLink = navLinks[i];
		const navLinkName = navLink.hash;
		
		const sectionScroller = function(event){
			event.preventDefault();
			
			document.querySelector(navLinkName).scrollIntoView({
				behavior: 'smooth'
			});
		}
		
		navLink.addEventListener('click', sectionScroller)
	}
}

window.addEventListener('load', smoothBookMarker);

const vid_elem_displayer = function() {
	let index = 0;
	const homeVid = document.getElementById("home-page-vid");
	const abtUsVid = document.getElementById("abt-us-page-vid");
	const vidTitle = document.getElementById("video-title-cont");
	const abtUsTitle = document.getElementById("about-us-video-title-cont");
	const nav = document.getElementById("nav-cont");
	const header = document.getElementById("header-cont");
	
	this.typeEffectCreator = function(){
		const typeEffectorGroupFunc = () => {
			const typeEffectInterval = setInterval(typeEffect, 60);
			
			function typeEffect(){
				const typeElem = document.getElementById("intro-msg");
				const typeMsg = `Hi there! Lovely to meet you, my name is Tharo, and am looking for a place to call home, 
				lets take a trip down this page so I that can tell you a little about myself.`;
				
				if(index < typeMsg.length){
					typeElem.innerHTML += typeMsg.charAt(index);
				}else{
					clearInterval(typeEffectInterval);
				}
				
				index++;
			}
		}
		
		setTimeout(typeEffectorGroupFunc, 2100);
	}
	
	this.homeVidStyling = function() {
		this.displayVidElem = function() {
			homeVid.classList.add('add-filter');
			header.style.display = 'initial';
			nav.style.display = 'flex';
			vidTitle.style.display = 'flex';
			vidElemDisplayer.typeEffectCreator();
		}
		
		this.addVidStyling = function(){
			const vidElemDisplayer = new vid_elem_displayer();
			const homeVidStyler = new vidElemDisplayer.homeVidStyling();
			homeVid.addEventListener('ended', homeVidStyler.displayVidElem);
		}
	}
	
	this.abtUsVidStyling = function(){
		this.displayVidElem = function() {
			abtUsTitle.style.display = 'flex';
		}
		
		this.addVidStyling = function(){
			const vidElemDisplayer = new vid_elem_displayer();
			const abtUsVidStyler = new vidElemDisplayer.abtUsVidStyling();
			abtUsVid.addEventListener('ended', abtUsVidStyler.displayVidElem);
		}
	}
	
	this.elemDisplayer = function(){
		const homeVidStyler = new this.homeVidStyling();
		const abtUsVidStyler = new this.abtUsVidStyling();
		
		if(window.getComputedStyle(homeVid, null).display !== "none"){
			homeVidStyler.addVidStyling();
		}else{
			if(document.readyState === 'complete'){
				homeVidStyler.displayVidElem();
			}else{
				window.addEventListener('load', homeVidStyler.displayVidElem)
			}
			
		}
		
		if(window.getComputedStyle(abtUsVid, null).display !== "none"){
			abtUsVidStyler.addVidStyling();
		}else{
			if(document.readyState === 'complete'){
				abtUsVidStyler.displayVidElem();
			}else{
				window.addEventListener('load', abtUsVidStyler.displayVidElem);
			}
		}
	}
}

const vidElemDisplayer = new vid_elem_displayer();
vidElemDisplayer.elemDisplayer();

window.addEventListener('resize', () => { 
	if(document.readyState === 'complete'){
		window.addEventListener('resize', () => { 
			vidElemDisplayer.elemDisplayer() 
		});
	}
});

const videos = document.getElementsByClassName('video-player-cont');
const dots = document.getElementsByClassName('dot-cont');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
let vidIndex = 1;

const hideElems = () => {
	for(let dotIndex = 0; dotIndex < dots.length; dotIndex++){
		dots[dotIndex].classList.remove('enlargePic');
	}
	
	for(let vidIndex = 0; vidIndex < videos.length; vidIndex++){
		videos[vidIndex].style.display = 'none';
		videos[vidIndex].children[0].pause();
		videos[vidIndex].classList.remove('in-left', 'in-right', 'out-left', 'out-right');
	}
}

const vidSlideShow = () => {
	hideElems();
	
	if(vidIndex > videos.length){
		vidIndex = 1;
	}
	
	if(vidIndex < 1){
		vidIndex = videos.length;
	}
	
	videos[vidIndex - 1].style.display = 'flex';
	dots[vidIndex - 1].classList.add('enlargePic');
}

vidSlideShow();

rightArrow.onclick = () => {
	
	videos[vidIndex - 1].classList.remove('in-left', 'in-right', 'out-right');
	videos[vidIndex - 1].classList.add('out-left');
	vidIndex++;
	setTimeout(() => {
		vidSlideShow();
		videos[vidIndex - 1].classList.add('in-left');
	},300);
	
}

leftArrow.onclick = () => {
	
	videos[vidIndex - 1].classList.remove('in-left', 'in-right', 'out-left');
	videos[vidIndex - 1].classList.add('out-right');
	vidIndex--;
	setTimeout(() => {
		vidSlideShow();
		videos[vidIndex - 1].classList.add('in-right');
	},300);
	
}

const dotSlideShow = () => {
	let currentImg = 0;
	let nxtImg = 0;
	for(let dotPos = 0; dotPos < dots.length; dotPos++){
		dots[dotPos].onclick = function(){
			
			currentImg = dotPos;
			nxtImg = vidIndex - 1;
			
			if(currentImg > nxtImg){
				videos[nxtImg].classList.remove('in-left', 'in-right', 'out-right');
				videos[nxtImg].classList.add('out-left');
				setTimeout(() => {
					hideElems();
					this.classList.add('enlargePic');
					videos[dotPos].classList.add('in-left');
					videos[dotPos].style.display = 'flex';
				},300);
			}else if(currentImg === nxtImg){
				videos[dotPos].style.display = 'flex';
				return false;
			}else{
				videos[nxtImg].classList.remove('in-left', 'in-right', 'out-left');
				videos[nxtImg].classList.add('out-right');
				setTimeout(() => {
					hideElems();
					this.classList.add('enlargePic');
					videos[dotPos].classList.add('in-right');
					videos[dotPos].style.display = 'flex';
				},300);
			}
			
			vidIndex = dotPos + 1;
		}
	}
}

dotSlideShow();

let picIndex = 1;
const picModal = document.getElementsByClassName('pic-modal-cont');

const modalExit = function(){
	this.closeModal = (addElemAnime, removeElem) => {
		addElemAnime();
		isOpen = false;
		setTimeout(() => {
			removeElem();
			hideOverflow();
		},300);
	}
	
	this.closer = (elem, addElemAnime, removeElem) => {
		const modalHider = () => {
			this.closeModal(addElemAnime, removeElem);
		}
		
		elem.addEventListener('click', modalHider);
	}
	
	this.animeChangerSlider = (modal) => {
		const elementAnimation = () => {
			modal.classList.add('slow-out');
		}
		
		const elementRemoval = () => {
			modal.classList.remove('slow-out');
			modal.style.display = 'none';
		}
		
		return [elementAnimation, elementRemoval]
	}
	
	this.windowSliderCloser = (modal) => {
		const values = this.animeChangerSlider(modal);
		const elementAnimation = values[0];
		const elementRemoval = values[1];
			
		this.closeModal(elementAnimation, elementRemoval);
		
	}
	
	this.sliderModal = function(modal, elem){
		const values = this.animeChangerSlider(modal);
		const elementAnimation = values[0];
		const elementRemoval = values[1];
		
		this.closer(elem, elementAnimation, elementRemoval);
	}
	
	this.animeChangerForm = (modal, elem, preLoader, modalContent, outcome) => {
		const elementAnimation = () => {
			modal.classList.add('slow-out');
		}
		
		const elementRemoval = () => {
			modal.classList.remove('slow-out');
			modal.style.display = 'none';
			preLoader.style.display = 'none';
			modalContent.style.display = 'none';
			outcome.style.display = 'none';
		}
		
		return [elementAnimation, elementRemoval];
	}
	
	this.modalForm = function(modal, elem, preLoader, modalContent, outcome){
		const values = this.animeChangerForm(modal, elem, preLoader, modalContent, outcome);
		const elementAnimation = values[0];
		const elementRemoval = values[1];
		
		this.closer(elem, elementAnimation, elementRemoval);
	}
	
	this.windowModalFormCloser = function(modal, elem, preLoader, modalContent, outcome){
		const values = this.animeChangerForm(modal, elem, preLoader, modalContent, outcome);
		const elementAnimation = values[0];
		const elementRemoval = values[1];
		
		this.closeModal(elementAnimation, elementRemoval);
	}
}

const modal_exit = new modalExit();

const modalActivator = () => {
	const modal = document.getElementById('modal-cont');
	const imageCollage = document.getElementsByClassName('pic-cont');
	const collageSection = document.getElementById('picture-collage-modal-section');
	const collageModal = document.getElementById('picture-collage-modal-cont');
	const modalCloser = document.getElementById('modal-closer');
	const picModal = document.getElementById('pic-modal');
	
	for(let i = 0; i < imageCollage.length; i++){
		const Image = imageCollage[i];
		
		Image.onclick = function(){
			picIndex = i + 1;
			isOpen = true;
			hideOverflow();
			modal.style.display = 'flex';
			modalSlider();
		}
	}
	
	modal_exit.sliderModal(modal, modalCloser);
	
	const windowModalCloser = (event) => {
		if(event.target.id === modal.id || event.target.id === collageSection.id || event.target.id === collageModal.id){
			modal_exit.windowSliderCloser(modal);
		}
	}
	
	window.addEventListener('click', windowModalCloser);
}

modalActivator();

function modalSlider(){
	const imgCounter = document.getElementById('img-counter');
	
	const hideModalElems = () => {
		for(let picIndex = 0; picIndex < picModal.length; picIndex++){
			picModal[picIndex].style.display = 'none';
			picModal[picIndex].classList.remove('in-left', 'in-right', 'out-left', 'out-right');
		}
	}
	
	hideModalElems();
	
	if(picIndex > picModal.length){
		picIndex = 1;
	}
	
	if(picIndex < 1){
		picIndex = picModal.length;
	}
	
	imgCounter.innerHTML = `${ picIndex } of ${ picModal.length }`;
	picModal[picIndex - 1].style.display = 'flex';
}

const leftModalArrow = document.getElementById('left-modal-arrow');
const rightModalArrow = document.getElementById('right-modal-arrow');

leftModalArrow.onclick = () => {
	
	picModal[picIndex - 1].classList.remove('in-left', 'in-right', 'out-right');
	picModal[picIndex- 1].classList.add('out-left');
	picIndex--;
	setTimeout(() => {
		modalSlider();
		picModal[picIndex - 1].classList.add('in-left');
	},300);
	
}

rightModalArrow.onclick = () => {
	
	picModal[picIndex - 1].classList.remove('in-left', 'in-right', 'out-left');
	picModal[picIndex - 1].classList.add('out-right');
	picIndex++;
	setTimeout(() => {
		modalSlider();
		picModal[picIndex - 1].classList.add('in-right');
	},300);
	
}