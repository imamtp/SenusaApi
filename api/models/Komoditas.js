/**
 * Komoditas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	kode_komoditas	: {type:'string'},
  	nama_komoditas	: {type:'string'}
  },
  save: function(inputs, cb){
  	Komoditas.create({
  		kode_komoditas: inputs.kode_komoditas,
  		nama_komoditas: inputs.nama_komoditas
  	})
  	.exec(cb);
  }
};

