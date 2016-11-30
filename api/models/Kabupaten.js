/**
 * Kabupaten.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {type:'string', required:true},
  	upline: {model:'provinsi'}
  },
  save: function(inputs,cb){
  	Kabupaten.create({
  		name: inputs.name,
  		kode_provinsi: inputs.kode_provinsi
  	})
  	.exec(cb);
  }
};

