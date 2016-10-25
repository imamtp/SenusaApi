/**
 * Provinsi.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	kode_provinsi	: {type:'integer'},
  	nama_provinsi	: {type:'string'}
  },
  save:function(inputs, cb){
  	Provinsi.create({
  		kode_provinsi: inputs.kode_provinsi,
  		nama_provinsi: inputs.nama_provinsi
  	})
  	.exec(cb);
  }
};

