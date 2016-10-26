/*
 * InfoHargaKKPController
 *
 * @description :: Server-side logic for managing Infohargakkps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Q = require('q');
var moment = require('moment');

var InfoHargaKKPController = {
	save: function (req, res){
		InfoHargaKKP.save({
			kode_provinsi: req.param('kode_provinsi'),
			kode_kabupaten: req.param('kode_kabupaten'),
			kode_komoditas : req.param('kode_komoditas'),
		  	tanggal : req.param('tanggal'),
		  	harga_produsen : req.param('harga_produsen'),
		  	harga_grosir : req.param('harga_grosir'),
		  	harga_eceran : req.param('harga_eceran')
		}, function (err, infohargakkp){
			if(err){
				res.send('500', {success: false, message: err.message});
			} else {
				res.send('200', {success: true, message: 'Save Info Harga KKP Successfully'});
			}
		});
	},
	find: function (req, res){
		var queryInfoHargaKKP = InfoHargaKKP.find(),
			tgl1 = req.param('tgl1'),
			tgl2 = req.param('tgl2'),
			start = req.param('start'),
			length = req.param('length'),
			kode_provinsi = req.param('kode_provinsi'),
			kode_kabupaten = req.param('kode_kabupaten'),
			kode_komoditas = req.param('kode_komoditas');
		
		queryInfoHargaKKP = InfoHargaKKP.find();

		if(kode_provinsi != 'all' && kode_provinsi!=undefined && kode_provinsi!=null){
			Provinsi.findOne({kode_provinsi:kode_provinsi}).exec(function(err, prov){
					if(err){
						res.serverError(err)
					}
					if(!prov){
						res.notFound('Provinsi not found')
					}
					queryInfoHargaKKP.where({'provinsi':prov.nama_provinsi})
				})
		}

		if(kode_kabupaten != 'all' && kode_kabupaten!=undefined && kode_kabupaten!=null){
			Kabupaten.findOne({kode_kabupaten:kode_kabupaten}).exec(function(err, kab){
					if(err){
						res.serverError(err)
					}
					if(!kab){
						res.notFound('Kabupaten not found')
					}
					queryInfoHargaKKP.where({'kabupaten':kab.nama_kabupaten})
				})
		}

		if(kode_komoditas != 'all' && kode_komoditas!=undefined && kode_komoditas!=null){
			Provinsi.findOne({kode_komoditas:kode_komoditas}).exec(function(err, kom){
					if(err){
						res.serverError(err)
					}
					if(!kom){
						res.notFound('Komoditas not found')
					}
					queryInfoHargaKKP.where({'komoditas':kom.nama_komoditas})
				})
		}
		
		queryInfoHargaKKP.where({'tanggal': {'>': tgl1, '<': tgl2}})
		queryInfoHargaKKP.sort('tanggal DESC')
		queryInfoHargaKKP.skip(start)
		queryInfoHargaKKP.limit(length)
		queryInfoHargaKKP.then(function (infohargakkp){
			if(infohargakkp===undefined){
				res.json('500', {success:false, message: 'Empty Data!'});
			} else {
				res.json('200', {success:true, message: 'Get Info Harga KKP successfully', results:infohargakkp});
			}
		})
	},
	initinfohargakkp: function(req, res){
		tgl1 = req.param('tgl1');
		tgl2 = req.param('tgl2');
		kode_provinsi = req.param('kode_provinsi');
		kode_kabupaten = req.param('kode_kabupaten');
		kode_komoditas = req.param('kode_komoditas');
		
		//delete curent data
		InfoHargaKKP.destroy({}).exec(function(err){
			if(err){
				res.json('500', {success:false, message:err.message})
			}
		})

		if(tgl1===undefined || tgl1==null || tgl2===undefined || tgl2==null){
			res.json('500', {success:false, message:'Init info harga failed. Pleas insert parameters of "tgl1" and/or "tgl2"'})
		}else{

			req['param']['tgl1']=tgl1;
			req['param']['tgl2']=tgl2;
			req['param']['prov']=kode_provinsi;
			req['param']['kab']=kode_kabupaten;
			req['param']['kom']=kode_komoditas;

			InfoHargaKKPController.requestinfoharga(req, function (err, results){
				if(err){
					res.json('500', {success:false, message:'Init info harga failed.', errors:err.message})
				}else{
					if(Object.keys(results.data).length != 0){
						var promises = []
						results.data.forEach(function(infoharga){
							promises.push(InfoHargaKKP.create({
								tanggal: moment(infoharga[0]).format('YYYY-MM-DD'), //new Date(infoharga[0]).getTime(),
								provinsi: infoharga[1],
								kabupaten: infoharga[2],
								komoditas: infoharga[3],
								harga_produsen: infoharga[4].replace(',',''),
								harga_grosir: infoharga[5].replace(',',''),
								harga_eceran: infoharga[6].replace(',','')
							}))
						})
						Q.all(promises)
						.then(function(results){
							res.json('200', {success:true, message:'Init info harga successfully', results:results})
						})
						.fail(function(reasons){
							res.json('500', {success:false, message:'Init info harga failed.', reasons:reasons})
						})
					}
				}
			})
		}
	},
	updateinfoharga: function(req, res){

	},
	requestinfoharga: function(req, res){
		var request = require('request'),
			url = 'http://www.wpi.kkp.go.id/info_harga_ikan/server.php',
			tgl1 = req['param']['tgl1'],
			tgl2 = req['param']['tgl2'],
			prov = req['param']['prov'],
			kab = req['param']['kab'],
			kom = req['param']['kom'],
			formData =  {
				tgl1: tgl1,
				tgl2: tgl2,
				prov: prov,
				kab: kab,
				kom: kom,
				column: [
					{data:0},
					{data:1},
					{data:2},
					{data:3},
					{data:4},
					{data:5},
					{data:6},
					],
				start: 0,
				length: 999999
			};
		request({
			uri: url,
			qs: formData,
			timeout: 100000 * 60,
			method: 'GET'
		},
		function(err, response, results){
			if(err){
				return res(err)
			}else{
				if(response.statusCode != '200'){
					return res({status:response.statusCode, message:'Errors was ocured'})
				}else{
					var pattern = new RegExp(/^Notice:(.*)\n|\n/);
					while(pattern.exec(results)){
						results = results.replace(pattern, '');
					}
					results = JSON.parse(results);
					return res(null, results)

					// return res(null, {kode_provinsi:prov, kode_kabupaten:kab, kode_komoditas:kom}, results)
				}
			}			
		});
	}
}
module.exports = InfoHargaKKPController;
