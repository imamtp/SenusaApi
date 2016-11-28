/**
 * ProvinsiControllerPer-side logic for managing provinsis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Q = require('q');

var ProvinsiController = {
	find: function(req, res){
		var queryProvinsi = Provinsi.find();
		queryProvinsi.limit(34);
		queryProvinsi.sort('nama_provinsi ASC');
		queryProvinsi.then(function(prov){
			if(prov===undefined){
				res.json('500', {success:false, message:'Empty Data!'});
			}else{
				res.json('200', {success:true, message:'Get Provinsi Successfully!', results:prov})
			}
		});
	},
	initprov: function (req, res){
		var provinsi = JSON.parse('[["34","Aceh"],["50","Bali"],["47","Banten"],["40","Bengkulu"],["49","DI Yogyakarta"],["44","DKI Jakarta"],["62","Gorontalo"],["38","Jambi"],["45","Jawa Barat"],["46","Jawa Tengah"],["48","Jawa Timur"],["53","Kalimantan Barat"],["55","Kalimantan Selatan"],["54","Kalimantan Tengah"],["56","Kalimantan Timur"],["57","Kalimantan Utara"],["42","Kep. Bangka Belitung"],["43","Kepulauan Riau"],["41","Lampung"],["64","Maluku"],["65","Maluku Utara"],["51","Nusa Tenggara Barat"],["52","Nusa Tenggara Timur"],["66","Papua"],["67","Papua Barat"],["37","Riau"],["63","Sulawesi Barat"],["60","Sulawesi Selatan"],["59","Sulawesi Tengah"],["61","Sulawesi Tenggara"],["58","Sulawesi Utara"],["36","Sumatera Barat"],["39","Sumatera Selatan"],["35","Sumatera Utara"]]');
		
		//destroy current data
		Provinsi.destroy({}).exec(function (err){
			if(err){
				res.json('500', {success:false, message:err.message});
			}
		});

		//insert data provinsi
		var promises=[];
		provinsi.forEach(function(prov){
			promises.push(Provinsi.create({
				id: prov[0],
				name: prov[1]
			}));
		})
		Q.allSettled(promises)
		.then(function(results){
			res.json('200', {success:true, message:'Init Provinsi Successfully!', results:results});
		})
		.fail(function(err){
			res.json('500', {success:false, message:'Init Provinsi Fail!', errors:err.message});
		})
	}
}
module.exports = ProvinsiController;