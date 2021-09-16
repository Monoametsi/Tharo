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