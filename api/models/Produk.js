/**d
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		name: { type: 'string', required:true},
		desc: { type: 'string' },
		retail_price: { type: 'integer' },
		kilos_price: { type: 'integer' },
		url_photo: { type: 'string' },
		date_time: { type: 'string' },
		owner:{ model: 'user'},
		category: { model: 'kategoriproduk' }
	},
	save: function (inputs, cb) {
		Produk.create({
			name: inputs.name,
			desc: inputs.desc,
			retail_price: inputs.retail_price,
			kilos_price: inputs.kilos_price,
			url_photo: inputs.url_photo,
			date_time: inputs.date_time,
			category: inputs.category,
			owner: inputs.owner
		}).exec(cb);
	}
};

