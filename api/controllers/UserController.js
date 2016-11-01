/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
		}, 
		function (err, user) {
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
			if(user===undefined){
				res.send('200',{success:false, message: 'Mobile Number/Password is invalid!'});
			} else {
				res.send('200', {success:true, message: 'Login successfully!', name_user:user.name, phone:user.phone, address:user.address});
			}
		});
	},
	updateuser: function(req, res){
		User.update(
			{id: req.param('id')},
			{
				name: req.param('name'),
				phone: req.param('phone'),
				password: req.param('password'),
				email: req.param('email')
			}
		).exec(function (err, updated){
			if(err){
				return res.json('500', {success:false, message:err.message})
			}

			if(updated === undefined){
				return res.json('400', {success:false, message:'User tidak terdaftar'})
			}

			else return res.json('200', {success:true, updated})
		})
	},
	deleteuser: function(req, res){
		User.destroy({id: req.param('id')})
		.exec(function(err){
			if(err){
				return res.json('500', {success:false, message:err.message})
			}
			
			else return res.json('200', {success:true, message:'User berhasil dihapus'})
		})
	}
};