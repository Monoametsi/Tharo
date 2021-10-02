let dateFormater = (time, timeType) => {
    
	if(time === 1){
	  return `${ time } ${ timeType } old `
	}else{
	  return `${ time } ${ timeType }s old`
	}
	
}

let displayLaspedTime = (postDate) => {

	let dateToday = new Date();
	let datePosted = new Date(postDate);
	let timeLaspsed = dateToday.getTime() - datePosted.getTime();

	let seconds = parseInt(timeLaspsed/1000);
	let minutes = parseInt(seconds/60);
	let hours = parseInt(minutes/60);
	let days = parseInt(hours/24);
	let weeks = parseInt(days/7);
	let months = parseInt(weeks/4);
	
	if(seconds >= 0 && seconds < 60){
		
	   return dateFormater(seconds, 'second');
		
	}else if(minutes >= 0 && minutes < 60){
		
	   return dateFormater(minutes, 'minute');
		
	}else if(hours >= 0 && hours < 24){

	   return dateFormater(hours, 'hour');
		
	}else if(days >= 0 && days < 7){

	   return dateFormater(days, 'day');
		
	}else if(weeks >= 0 && weeks < 4){

	   return dateFormater(weeks, 'week');
		
	}else if(months >= 0){
		return dateFormater(months, 'month');
	}

}

module.exports = {
	displayLaspedTime
}