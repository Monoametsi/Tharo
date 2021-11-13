const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	
	Name: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: false
	},
	Uploaded_Videos {
		type: Array,
		required: false
	},
	Uploaded_Images {
		type: Array,
		required: false
	}
	
});

const userModel = mongoose.model('user', userSchema);
const user = new userModel({
	Name: 'Monoametsi Junior Mosemeng'
})

module.exports = {
	userModel
}