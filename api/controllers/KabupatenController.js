/**
 * KabupatenController
 *
 * @description :: Server-side logic for managing kabupatens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Q = require('q');

var KabupatenController = {
	find: function(req, res){
		kd_prov = req.param('kode_provinsi');
		
		queryKabupaten = Kabupaten.find({kode_provinsi:kd_prov});
		queryKabupaten.sort('nama_kabupaten ASC');
		if(kd_prov == 'all' || kd_prov === undefined){
			queryKabupaten = Kabupaten.find()
			queryKabupaten.sort('kode_provinsi ASC')
		}
		queryKabupaten.exec(function(err, kab){
			if(err || kab===undefined){
				res.json('500', {success:false, message:'Data is empty!', errors:err.message});
			}else{
				res.json('200', {success:true, message:'Get Kabupaten Successfully!', results:kab});
			}
		});
	},
	initkab: function(req, res){
		//destroy current data
		Kabupaten.destroy({}).exec(function(err){
			if(err){
				return res.json('500', {success:false, message:err.message});
			}
		});

		//get kabupaten per-provinsi
		Provinsi.find().then(function(provinsi){
			if(provinsi===undefined){
				res.json('500', {success:false, message:'Provinsi is empty!'});
			}else{
				var promises = [];
				provinsi.forEach(function(prov){
					req['kode_provinsi']=prov.kode_provinsi;
					var deferred = Q.defer();
					KabupatenController.scrappkab(req, function(err, kabupaten){
						var promises_2 = []
						kabupaten.forEach(function(kab){
							promises_2.push(Kabupaten.create({
								id: kab[0],
								name: kab[1],
								upline: kab[2]
							}));
						})
						Q.all(promises_2)
						.then(function(results){
							deferred.resolve(results);
							results.forEach(function(result){
								console.log(result);
							})
						})
						.fail(function(results){
							deferred.reject(results);
							results.forEach(function(result){
								console.log(result)
							})
						})
					});
					promises.push(deferred.promise);
				})
				Q.allSettled(promises)
				.then(function(results){
					res.json('200', {success:true, message:'Init Kabupaten Successfully', results:results})
				})
				.fail(function(err){
					res.json('500', {success:false, message:err.message})
				})
			}
		});
	},
	scrappkab: function (req, res){
		var request = require('request'),
			cheerio = require('cheerio'),
			querystring = require('querystring'),
			url = 'http://www.wpi.kkp.go.id/info_harga_ikan/z2.php',
			kode_provinsi = req['kode_provinsi'];
			formData = querystring.stringify({prov:kode_provinsi, isall:true}),
			results = [];

		request({
			headers: {
				'Content-type':'application/x-www-form-urlencoded',
			},
			uri: url, 
			body: formData,
			method: 'POST'
		},function(err, response, html){
			if(!err && response.statusCode==200){
				var $ = cheerio.load(html);

				$('option').each(function(i, opt){
					results.push([$(opt).attr('value'), $(opt).text(), [kode_provinsi]]);
				});
				results=results.slice(1,results.length)
				res(null, results);
			}else{
				res(err);
			}
			results = [];
		})
	}
}

module.exports = KabupatenController;