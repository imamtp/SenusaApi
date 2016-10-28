/**
 * KategoriProdukController
 *
 * @description :: Server-side logic for managing kategoriproduks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	savekategori: function (req, res){
        KategoriProduk.addkategori({
            name: req.param('name'),
            kode: req.param('kode')
        },
        function (err, kategoriproduk){
            if (err) {
			 //  return res.negotiate(err);
			 res.send('500',{success:false, message: err.message});
            } else {
                res.send('200', {success:true, message: 'Success Add Kategori!'});
            }
        });
    }
};