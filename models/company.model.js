const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	username: String, 
	password: String,
	name: String,
	email: String,
	keywords: [],
	description: String,
	administrator: Boolean,
	visible: Boolean
});

let Company = mongoose.model('Company', CompanySchema);
module.exports = Company;


