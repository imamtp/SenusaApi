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
		KategoriProduk.findOne({id:req.param('id')})
		.populate('products', {
			sort:'createdAt DESC',
			skip:req.param('start'),
			limit:req.param('length')
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

