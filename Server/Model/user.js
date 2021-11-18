const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const userSchema = new Schema({
	
	_id: {
		type: String,
		default: uuid.v4(),
		required: false
	},
	Name: {
		type: String,
		required: true
	},
	User_Id: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		default: '',
		required: false
	},
	Uploaded_Videos: {
		type: Array,
		default: [],
		required: false
	},
	Uploaded_Images: {
		type: Array,
		default: [],
		required: false
	}
	
});

const userModel = mongoose.model('owners', userSchema);

const saveOwnerInfo = async () => {
	try{
		const user = new userModel({
			Name: 'Monoametsi Junior',
			User_Id: '9605085292081'
		});
		
		userModel.countDocuments({}, async (err, count) => {
			if(count === 0){
				await user.save();
			}
		});
	}catch(err){
		console.log(err);
	}
}

saveOwnerInfo();

module.exports = {
	userModel
}