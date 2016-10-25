/**
 * KeranjangController
 *
 * @description :: Server-side logic for managing Keranjangs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	simpan: function (req, res){
        Keranjang.simpan({
            id_produk: req.param('id_produk'),
            id_user: req.param('id_user'),
            jumlah: req.param('jumlah'),
            harga: req.param('harga'),
            date_time: req.param('date_time')
        },
        function (err, keranjang){
            if (err) {
			 //  return res.negotiate(err);
			 res.send('500',{success:false, message: err.message});
            } else {
                res.send('200', {success:true, message: 'Success Add Keranjang!'});
            }
        });
    }
};

