/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function (req, res){
		User.findOne({ 
			phone: req.param('phone'), 
			password: req.param('password') 
		})
		.then(function(user){
			if(user===undefined){
				return res.json('500',{success:false, message: 'Nomor HP/Password salah'});
			}
			
			else return res.json('200', {success:true, name:user.name, phone:user.phone, address:user.address, email:user.email, id:user.id});
			
		});
	},
	register: function (req, res) {
		User.signup({
			name: req.param('name'),
			phone: req.param('phone'),
			password: req.param('password')
		}, 
		function (err, user) {
			if (err && err.code === 'E_VALIDATION'){
				return res.badRequest(err)//res.json('500',{success:false, message:err.message});
			}

			if (err){
				return res.json('500', {success:false, message:err.message})
			}

			else return res.json('201', {success:true, message:'Registrasi berhasil'});
			
		});
	},
	showproduk: function(req, res){
		name = ''
		sort = 'createdAt'
		direction = 'DESC'
		start = 0
		length = 10

		if(req.param('name')) name = req.param('name');

		if(req.param('sort')) sort = req.param('sort');

		if(req.param('direction')) direction = req.param('direction');

		if(req.param('start')) start = req.param('start');

		if(req.param('length')) length = req.param('length');

 		User.findOne({id:req.param('id')})
 		.populate('products', {
 			where: {
 				name: {'like': '%'+name+'%'}
 			},
 			sort: sort +' '+direction, 
 			skip: start, 
 			limit: length
 		})
 		.exec(function(err, user){
 			if(err){
 				return res.json('500', {success:false, message:err.message})
 			}

			if(user === undefined){
				return res.json('500', {success:false, message:'Id User tidak terdaftar!'})
			}
			
			else return res.json('200', {
				success: true,
				name: user.name,
				phone: user.phone,
				email: user.email,
				address: user.address,
				products: user.products
			})
 		})
 	},
 	update: function(req, res){
 		moment = require('moment')
 		User.update(
 			{id: req.param('id')},
 			{
 				name: req.param('name'),
 				phone: req.param('phone'),
 				email: req.param('email'),
 				address: req.param('address'),
 				password: req.param('password'),
 				updatedAt: moment(new Date()).format('YYYY-MM-DD H:m:s')
 			}
 		).exec(function(err, updated){
 			if(err){
 				return res.json('500', {success:false, message:err.message})
 			}

 			if(updated.length == 0){
 				return res.json('400', {success:false, message:'User tidak terdaftar'})
 			}

 			else return res.json('200', {success:true, updated})
 		})
 	},
 	remove: function(req, res){
 		User.destroy({id: req.param('id')})
 		.exec(function(err){
 			if(err){
 				return res.json('500', {success:false, message:err.message})
 			}

 			else return res.json('200', {success:true, message:'User berhasi dihapus'})
 		})
 	}
};
