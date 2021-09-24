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

const vidStarterCont = document.getElementById('start-vid-cont');

const toggleFunct = (play_btn, pause_btn) => {
	if(window.getComputedStyle(play_btn, null).display !== 'none'){
		play_btn.style.display = 'none';
		pause_btn.style.display = 'flex';
		return true;
	}else{
		play_btn.style.display = 'flex';
		pause_btn.style.display = 'none';
		return false;
	}
}

vidStarterCont.onclick = function(){
	const video = this.parentElement.nextElementSibling;
	const play_btn = this.children[0];
	const pause_btn = this.children[1];
	
	if(toggleFunct(play_btn, pause_btn)){
		video.play();
	}else{
		video.pause();
	}
	
}

const muteBtnCont = document.getElementById('volume-cont');

muteBtnCont.onclick = function(){
	const unMuteBtn = this.children[0];
	const muteBtn = this.children[1];
	const video = this.parentElement.parentElement.nextElementSibling;
	
	if(toggleFunct(unMuteBtn, muteBtn)){
		video.muted = true;
	}else{
		video.muted = false;
	}
}

const fullScreenCont = document.getElementById('full-screener-cont');
let isScreenMax = false;
const doc = document.documentElement;
const body = document.body;

const switchToFullScreen = () => {
	isScreenMax = true;
	doc.requestFullscreen();
	//console.log(doc.requestFullscreen);
}

const minimizeScreen = () => {
	isScreenMax = false;
	document.exitFullscreen();
	//console.log(document.exitFullscreen);
}

fullScreenCont.onclick = function(){
	const controls = this.parentElement.parentElement;
	const video = this.parentElement.parentElement.nextElementSibling;
	
	doc.classList.toggle('hide-overflow');
	body.classList.toggle('hide-overflow');
	controls.classList.toggle('full-screen-converter');
	controls.classList.toggle('add-overlay');
	video.classList.toggle('full-screen-converter');
	fullScreenCont.classList.toggle('minimize-screen');
	
	if(isScreenMax){
		minimizeScreen();
	}else{
		switchToFullScreen();
	}
}

window.onkeydown = (event) => {
	const controls =  document.getElementById('controls-cont');
	const video =  document.getElementById('video-cont');
	console.log(doc.requestFullscreen);
	if(event.keyCode === 122 || event.keyCode === 27){
		isScreenMax = false;
		doc.classList.remove('hide-overflow');
		body.classList.remove('hide-overflow');
		controls.classList.remove('full-screen-converter');
		controls.classList.remove('add-overlay');
		video.classList.remove('full-screen-converter');
		fullScreenCont.classList.remove('minimize-screen');
	}
}