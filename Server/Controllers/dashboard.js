const dashboardGet = (req, res) => {
	
	return res.json(req.cookies);
}

module.exports = {
	dashboardGet
}