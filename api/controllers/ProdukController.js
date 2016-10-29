/**
 * ProdukController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Q = require('q')
module.exports = {
	index: function(req, res){
		Produk.find()
		.sort('createdAt DESC')
		.skip(req.param('start'))
		.limit(req.param('length'))
		.then(function (produk){
			if(produk === undefined)
				return res.json('500', {success:false, message:'Data produk kosong'})
			
			res.json('200', {success:false, produk})
		})
	},
	detail: function(req, res){
		Produk.findOne({id:req.param('id')})
		.populate('owner')
		.populate('category')
		.then(function(produk){
			if(produk === undefined)
				return res.json('500', {success:false, message:'Produk tidak ditemukan'})
			
			res.json('200', {
				success:true, 
				name:produk.name,
				desc:produk.desc,
				retail_price:produk.retail_price,
				kilos_price:produk.kilos_price,
				url_photo:produk.url_photo,
				createdAt:produk.createdAt,
				updatedAt:produk.updatedAt,
				owner:[{
					name:produk.owner.name,
					phone:produk.owner.phone,
					email:produk.owner.email,
					address:produk.owner.address
				}],
				category:produk.category.name
			})
		})
	},
	find: function(req, res){
		Product.find({name:{'like': '%'+req.param('name')+'%'}})
		.then(function(produk) {
			if(produk === undefined){
				return res.json('500',{success:false, message: 'Produk tidak ditemukan'});
			}
			
			else return res.json('200', {success:true, produk});
		});
	},
	save: function(req, res){
		Produk.save({
			name : req.param('name'),
			desc : req.param('desc'),
			retail_price : req.param('retail_price'),
			kilos_price : req.param('kilos_price'),
			url_photo : req.param('url_photo'),
			category : req.param('category'),
			owner : req.param('owner')
		},
		function(err, produk){
			if(err && err.code ==='E_VALIDATION'){
				return res.badRequest(err)
			}

			if(err){
				return res.json('500', {success:false, message:err.message})
			}
			
			else return res.json('201', {success:true, produk})
			
		})
	}
};

