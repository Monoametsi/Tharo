let i = 0;

let typeEffector = () => {
	let typeElem = document.getElementById("intro-msg");
	let typeMsg = `Hi there!! Lovely to meet you, my name is Tharo, and am looking for a place to call home, 
				  lets take a trip down this page so I that can tell you a little about myself.`;
	
	if(i < typeMsg.length){
		typeElem.innerHTML += typeMsg.charAt(i);
    }
	
    i++;
    setTimeout(typeEffector, 50);
}

let homeVid = document.getElementById("home-page-vid");
let vidTitle = document.getElementById("video-title-cont");

homeVid.onended = function(){
	
	if(homeVid.ended){
		vidTitle.style.display = 'flex';
		setTimeout(typeEffector, 3000);
	}
	
}