/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs				:: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		name: { type:'string', required:true},
		phone: { type:'string', unique:true, required:true},
		password: { type:'string', required:true},
		address: { type:'string' },
		email: { type:'string' },
		products: {collection: 'produk', via:'owner'}
 	},
	signup: function (inputs, cb) {
		User.create({
			name: inputs.name,
			phone: inputs.phone,
			password: inputs.password,
			address: inputs.address,
			email: inputs.email
		})
		.exec(cb);
 	}
 	/*,
 attemptLogin: function (inputs, cb) {
		//user Check
	//	User.findOne({
	//		mobileNumber: inputs.mobileNumber,
	//		password: inputs.password
	//	})
	//	.exec(cb);

	//	User.query({
	//			text: 'SELECT mobileNumber FROM user WHERE user.mobileNumber = $1 and user.password = $2',
	//			values: [ inputs.mobileNumber , inputs.password]
	//		}, function(err, results) {
	//		if (err) return res.serverError(err);
	//		return res.ok(results.rows);
	// });

 }*/

};
