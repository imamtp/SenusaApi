/**
 * LogSignin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
moment = require('moment')
module.exports = {

	attributes: {
		datetime: {type: 'datetime', defaultsTo: moment().format('YYYY-MM-DD HH:mm:ss')},
		user: {model: 'user'}
	},
	log: function(inputs, cb){
		LogSignin.create({
			user: inputs.user_id
		})
		.exec(cb)
	}
};