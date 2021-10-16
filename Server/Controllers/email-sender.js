const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const dotenv = require('dotenv');
const dirname = __dirname.slice(0, __dirname.search(/Controllers/i) - 1)

dotenv.config({ 
	path: path.join(dirname, '.env') 
});

const Client_ID = process.env.CLIENT_ID.toString();
const Client_Secret = process.env.CLIENT_SECRET.toString();
const Redirect_Url = process.env.REDIRECT_URL.toString();
const Refresh_Token = process.env.REFRESH_TOKEN.toString();
const Email = process.env.EMAIL.toString();

const oAuth2Client = new google.auth.OAuth2(Client_ID, Client_Secret, Redirect_Url);
oAuth2Client.setCredentials({ refresh_token: Refresh_Token });

const accessToken = async () => {
	try{
		const accessToken = await oAuth2Client.getAccessToken();
		return accessToken;
	}catch(err){
		return err
	}
}

const transport = {
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: Email,
		clientId: Client_ID,
		clientSecret: Client_Secret,
		refreshToken: Refresh_Token,
		accessToken: accessToken()
	}
}

const transporter = nodemailer.createTransport(transport);

const mailDeliverySys = async (formData) => {
	
	try{
		const { name, surname, email, tel, message } = formData;
		
		const emailMsg = `<p>Name: ${ name }</p>
		<p>Surname: ${ surname }</p>
		<p>Email: ${ email }</p>
		<p>Telephone or Cell Phone or Whatsapp: ${ tel }</p>
		<p>Message: ${ message }</p><br>
		<b>The MJ Solutions team</b><br>
		Copyright &copy; MJ Solutions All rights reserved.`
		
		const mailInfo = {
			from: Email,
			to: Email,
			subject: 'New Form Submission',
			html: emailMsg
		}
		
		const mailDeliverer = await transporter.sendMail(mailInfo);
		
		return mailDeliverer;
	} catch(err) {
		return err;
	}
	
}

module.exports = {
	mailDeliverySys
}