/**
 * KategoriProdukController
 *
 * @description :: Server-side logic for managing kategoriproduks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		KategoriProduk.find()
		.sort('name ASC')
		.then(function(kategoriproduk){
			if(kategoriproduk === undefined){
				return res.json('200', {success:false, message:'Kategori produk kosong'})
			}

			else return res.json('200', {success:true, kategoriproduk})
		})
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

		KategoriProduk.findOne({id:req.param('id')})
		.populate('products', {
 			where: {
 				name: {'like': '%'+name+'%'}
 			},
 			sort: sort +' '+direction, 
 			skip: start, 
 			limit: length
		})
		.exec(function(err, kategoriproduk){
			if(err){
				return res.json('500', {success:false, message:err.message})
			}
			
			if(kategoriproduk === undefined){
				return res.json('500', {success:false, message:'Id Kategori tidak terdaftar'})
			}
			
			else return res.json('200', {
				success:true, 
				category:kategoriproduk.name,
				products:kategoriproduk.products
			})
		})
	}
};

