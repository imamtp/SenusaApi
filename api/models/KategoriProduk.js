/**
 * KategoriProduk.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
     name: { type: 'string' },
     kode: { type: 'string' }
  },
  addkategori: function (inputs, cb){
    KategoriProduk.create({
      name: inputs.name,
      kode: inputs.kode
    })
   .exec(cb);
  }
};

