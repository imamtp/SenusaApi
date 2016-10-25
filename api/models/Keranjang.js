/**
 * Keranjang.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_produk: { type: 'string' },
    id_user: { type: 'string' },
    jumlah: { type: 'string' },
    harga: { type: 'string' },
    date_time: { type: 'string' }
  },
  simpan: function (inputs, cb){
    Keranjang.create({
      id_produk: inputs.id_produk,
      id_user: inputs.id_user,
      jumlah: inputs.jumlah,
      harga: inputs.harga,
      date_time: inputs.date_time
    })
   .exec(cb);
  }
};

