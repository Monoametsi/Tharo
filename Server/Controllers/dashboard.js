const dashboardGet = (req, res) => {
	return res.status(200).render('dashboard');
}

const myPictures = (req, res) => {
	return res.status(200).render('pictures')
}

const uploadPictures = (req, res) => {
	return res.status(200).render('file-uploader')
}

module.exports = {
	dashboardGet,
	myPictures,
	uploadPictures
}