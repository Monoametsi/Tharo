const dashboardGet = (req, res) => {
	return res.status(200).render('dashboard');
}

const myPictures = (req, res) => {
	return res.status(200).render('pictures')
}

module.exports = {
	dashboardGet,
	myPictures
}