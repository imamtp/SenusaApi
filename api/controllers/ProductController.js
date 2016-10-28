/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveproduct: function (req, res) {
	 	Product.simpan({
            kode: req.param('kode'),
            judul: req.param('judul'),
            deskripsi_produk: req.param('deskripsi_produk'),
            kategori_produk: req.param('kategori_produk'),
            harga_eceran: req.param('harga_eceran'),
            harga_kiloan: req.param('harga_kiloan'),
            id_user: req.param('id_user'),
            url_foto: req.param('url_foto'),
            date_time: req.param('date_time')

	 }, function (err, user) {
			if (err) {
				//  return res.negotiate(err);
				res.json('200',{success:false, message: err.message});
	 	 	} else {
	 		 res.json('200', {success:true, message: 'Simpan Data Berhasil!'});
	 	 	}
  	   	});
     },

    detailproduct: function (req, res) {
	 	Product.findOne({ id: req.param('id')})
		.then(function(product) {
			if(product===undefined)	{
				res.json('500',{success:false, message: 'Empty Data!'});
			} else {
				res.json('200', {success:true, message: 'Get All Product successfully!', 
                product:product});
			}
		});
 	},

	allproduct: function (req, res) {
	 	Product.find({ kategori_produk: req.param('kategori_produk')}).sort('createdAt DESC')
		.then(function(product) {
		  	if(product===undefined){
				res.json('500',{success:false, message: 'Empty Data!'});
			} else {
				res.json('200', {success:true, message: 'Get All Product successfully!', 
				product: product});
			}
		});
	},

	semuaproduct: function (req, res) {
		Product.find().sort('createdAt DESC')
		.then(function(product) {
		  	if(product===undefined){
				res.json('500',{success:false, message: 'Empty Data!'});
			} else {
				res.json('200', {success:true, message: 'Get Semua Product successfully!', 
				product: product});
			}
		});
	},


	findproductbyjudul: function (req, res) {
		Product.find({judul:{'like': '%'+req.param('judul')+'%'}})
		.then(function(product) {
			if(product===undefined){
				res.json('500',{success:false, message: 'Empty Data!'});
			} else {
				res.json('200', {success:true, message: 'Get Find Product successfully!', 
				product: product});
			}
		});
	},

	findproductbyphone: function(req, res){
		Product.find({id_user:req.param('phone')})
		.sort('createdAt DESC')
		.then(function(product){
			if(product === undefined){
				res.json('500', {success:false, message: 'Empty Data!'})
			}else{
				res.json('200', {success:true, message: 'Get Find Product successfully!', product:product})
			}
		})
	},

	updateproduct: function(req, res){
		Product.update(
	        {id:req.param('id')},
	        {
	        	kode: req.param('kode'),
		        judul: req.param('judul'),
				deskripsi_produk: req.param('deskripsi_produk'),
				kategori_produk: req.param('kategori_produk'),
				harga_eceran: req.param('harga_eceran'),
				harga_kiloan: req.param('harga_kiloan'),
				id_user: req.param('id_user'),
				url_foto: req.param('url_foto'),
				date_time: req.param('date_time')
	        }
	    ).exec(function(err, product){
	    	if(err){
	    		res.json('500', {success:false, message:err.message})
	    	}else{
	    		res.json('200', {success:true, message:'Update product successfully', product:product})
	    	}
	    })
	},
	deleteproduct: function(req, res){
		Product.destroy({id:req.param('id')})
		.exec(function(err){
			if(err){
				res.json('500', {success:false, message:err.message})
			}else{
				res.json('200', {success:true, message:'Data produk berhasil dihapus'})
			}
		})
	}
};