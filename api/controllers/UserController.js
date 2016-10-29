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
 		User.findOne({id:req.param('id')})
 		.populate('products', {
 			sort:'createdAt DESC', 
 			skip:req.param('start'), 
 			limit:req.param('length')
 		})
 		.exec(function(err, user){
 			if(err){
 				return res.json('500', {success:false, message:err.message})
 			}

			if(user === undefined){
				return res.json('500', {success:false, message:'Id User tidak terdaftar!'})
			}
			
			else return res.json('200', {
				success:true,
				name:user.name,
				phone:user.phone,
				email:user.email,
				address:user.address,
				products:user.products
			})
 		})
 	}
};
