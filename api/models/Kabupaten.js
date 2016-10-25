/**
 * Kabupaten.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	kode_kabupaten	: {type:'integer'},
  	nama_kabupaten	: {type:'string'},
  	kode_provinsi	: {type:'integer'}
  },
  save: function(inputs,cb){
  	Kabupaten.create({
  		kode_kabupaten: inputs.kode_kabupaten,
  		nama_kabupaten: inputs.nama_kabupaten,
  		kode_provinsi: inputs.kode_provinsi
  	})
  	.exec(cb);
  }
};

