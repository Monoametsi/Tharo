/* let index = 0;

let typeEffector = () => {
	let typeElem = document.getElementById("intro-msg");
	let typeMsg = `Hi there! Lovely to meet you, my name is Tharo, and am looking for a place to call home, 
				  lets take a trip down this page so I that can tell you a little about myself.`;
	
	if(index < typeMsg.length){
		typeElem.innerHTML += typeMsg.charAt(index);
    }
	
    index++;
    setTimeout(typeEffector, 50);
}

let homeVid = document.getElementById("home-page-vid");
let abtUsVid = document.getElementById("abt-us-page-vid");
let vidTitle = document.getElementById("video-title-cont");
let abtUsTitle = document.getElementById("about-us-video-title-cont");
let nav = document.getElementById("nav-cont");
let header = document.getElementById("header-cont");

homeVid.onended = function(){
	
	if(homeVid.ended){
		header.style.display = 'initial';
		nav.style.display = 'flex';
		vidTitle.style.display = 'flex';
		setTimeout(typeEffector, 2100);
	}
	
}

abtUsVid.onended = function(){
	
	if(abtUsVid.ended){
		abtUsTitle.style.display = 'flex';
	}
	
} */

const videos = document.getElementsByClassName('video-player-cont');
const dots = document.getElementsByClassName('dots');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
let vidIndex = 1;

const hideElems = () => {
	for(let dotIndex = 0; dotIndex < dots.length; dotIndex++){
		dots[dotIndex].classList.remove('dot-background');
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
	dots[vidIndex - 1].classList.add('dot-background');
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
					this.classList.add('dot-background');
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
					this.classList.add('dot-background');
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

const modalActivator = () => {
	const modal = document.getElementById('modal-cont');
	const imageCollage = document.getElementsByClassName('pic-cont');
	const collageSection = document.getElementById('picture-collage-modal-section');
	const collageModal = document.getElementById('picture-collage-modal-cont');
	const modalCloser = document.getElementById('modal-closer');
	const picModal = document.getElementById('pic-modal');
	const body = document.body;
	const html = document.documentElement;
	
	for(let i = 0; i < imageCollage.length; i++){
		const Image = imageCollage[i];
		
		Image.onclick = function(){
			picIndex = i + 1;
			modal.classList.remove('slow-out');
			body.classList.add('hide-overflow');
			html.classList.add('hide-overflow');
			modal.style.display = 'flex';
			modalSlider();
		}
	}
	
	modalCloser.onclick = () => {
		modal.classList.add('slow-out');
		setTimeout(() => {
			modal.style.display = 'none';
			body.classList.remove('hide-overflow');
			html.classList.remove('hide-overflow');
		},300);
	}
	
	window.onclick = (event) => {
		if(event.target.id === modal.id || event.target.id === collageSection.id || event.target.id === collageModal.id){
			modal.classList.add('slow-out');
			setTimeout(() => {
				modal.style.display = 'none';
			},300);
		}
	}
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