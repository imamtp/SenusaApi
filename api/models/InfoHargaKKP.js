/**
 * InfoHargaKKP.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	tanggal : {type : 'datetime'},
  	provinsi : {type : 'string'},
    kabupaten : {type : 'string'},
    komoditas : {type : 'string'},
    harga_produsen : { type : 'string'},
  	harga_grosir : { type : 'string'},
  	harga_eceran : { type : 'string'}
  },
  save: function (inputs, cb){
  	InfoHargaKKP.create({
  		kode_provinsi : inputs.kode_provinsi,
  		kode_kabupaten : inputs.kode_kabupaten,
  		kode_komoditas : inputs.kode_komoditas,
  		tanggal : inputs.tanggal,
  		harga_produsen : inputs.harga_produsen,
      harga_grosir : inputs.harga_grosir,
  		harga_eceran : inputs.harga_eceran
  	})
  	.exec(cb);
  }
};

