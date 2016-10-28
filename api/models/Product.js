/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 attributes: {
    kode: { type: 'string' },
    judul: { type: 'string' },
    deskripsi_produk: { type: 'string' },
    kategori_produk: { type: 'string' },
    harga_eceran: { type: 'string' },
    harga_kiloan: { type: 'string' },
    id_user: { type: 'string' },
    url_foto: { type: 'string' },
    date_time: { type: 'string' }
   
 },
 simpan: function (inputs, cb) {
   Product.create({
     kode: inputs.kode,
     judul: inputs.judul,
     deskripsi_produk: inputs.deskripsi_produk,
     kategori_produk: inputs.kategori_produk,
     harga_eceran: inputs.harga_eceran,
     harga_kiloan: inputs.harga_kiloan,
     id_user: inputs.id_user,
     url_foto: inputs.url_foto,
     date_time: inputs.date_time
   })
   .exec(cb);
 }
};
