/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 tesenv: function (req, res) {
	 res.send('200',{db_host:process.env.DB_HOST, db_name:process.env.DB_NAME, db_pass:process.env.DB_PASS, db_user:process.env.DB_USER});
 },
 login: function (req, res) {
	 User.findOne({ phone: req.param('phone'), password: req.param('password') })
			.then(function(user) {
			  if(user===undefined)
				{
					res.send('200',{success:false, message: 'Mobile Number/Password is invalid!'});
				} else {
					res.send('200', {success:true, message: 'Login successfully!', name_user:user.name, phone:user.phone, address:user.address, email:user.email, user_id:user.id});
				}
			});
 },
 register: function (req, res) {

	 User.signup({
		 name: req.param('name'),
		 phone: req.param('phone'),
		 password: req.param('password')
	 }, function (err, user) {
		 if (err) {
			 //  return res.negotiate(err);
			 res.send('200',{success:false, message: err.message});
	 	 } else {
	 		 res.send('200', {success:true, message: 'User registered!'});
	 	 }
	 });
 },
  getuser: function (req, res) {
	 User.findOne({ phone: req.param('phone') })
			.then(function(user) {
			  if(user===undefined)
				{
					res.send('200',{success:false, message: 'Mobile Number/Password is invalid!'});
				} else {
					res.send('200', {success:true, message: 'Login successfully!', name_user:user.name, phone:user.phone, address:user.address});
				}
			});
 },
};