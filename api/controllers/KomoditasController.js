/**
 * KomoditasController
 *
 * @description :: Server-side logic for managing komoditas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Q = require('q');

module.exports = {
	find: function(req, res){
		Komoditas.find().then(function(kom){
			if(kom==undefined){
				res.json('500', {success:false, message:'Empty Data!'});
			}else{
				res.json('200', {success:true, message:'Get Komoitas Successfully!', results:kom});
			}
		});
	},
	initkom: function(req, res){
		var komoditas = JSON.parse('[["292","Albakora"],["37","Alu-alu"],["636","Bakso Ikan Tuna"],["381","Bambangan"],["613","Bandeng"],["441","Banyar"],["40","Baronang"],["142","Bawal Hitam"],["12","Bawal Putih"],["15","Belanak"],["260","Beloso"],["220","Bentong"],["614","Betutu"],["374","Biji Nangka"],["632","Bulu Ayam Asin"],["155","Cakalang"],["633","Cakalang Asap"],["206","Cendro"],["218","Cucut "],["166","Cumi-cumi"],["634","Cumi-cumi Asin"],["375","Ekor Kuning"],["615","Gabus"],["201","Gerot-gerot"],["370","Golok-golok"],["254","Gulamah/Tigawaja"],["616","Gurami"],["55","Gurita"],["579","Hiu"],["617","Ikan Mas"],["106","Ikan pedang"],["1","Ikan sebelah"],["580","Japuh"],["618","Jelawat"],["36","Julung-julung"],["523","Kacangan"],["581","Kaci"],["64","Kakap Merah"],["371","Kakap Putih"],["198","Kambing-kambing"],["470","Kapas-kapas"],["20","Kembung"],["635","Kembung Asin"],["25","Kepiting"],["397","Kerang Darah"],["583","Kerang Hijau"],["308","Kerapu"],["61","Kerong-kerong"],["582","Kuniran"],["584","Kurisi"],["16","Kuro/Senangin"],["252","Kuwe"],["34","Layang"],["287","Layaran"],["22","Layur"],["619","Lele"],["586","Lemadang"],["585","Lemuru"],["587","Lencam"],["203","Lidah"],["501","Lisong"],["588","Lobster"],["589","Lolosi Biru"],["284","Madidihang"],["2","Manyung"],["590","Marlin"],["592","Meka"],["620","Mujair"],["621","Nila"],["622","Nilem"],["593","Pari"],["623","Patin"],["59","Petek/Peperek"],["595","Pisang-pisang"],["24","Rajungan"],["638","Rajungan Kaleng"],["68","Remang"],["596","Remis"],["625","Rumput Laut E.Cottonii (Kering"],["624","Rumput Laut Gracia (Kering)"],["597","Samge"],["531","Sardine"],["598","Sawo/Kakap Batu"],["599","Selanget"],["13","Selar"],["600","Selengseng"],["601","Setuhuk Biru"],["286","Setuhuk hitam"],["602","Setuhuk Loreng"],["626","Sidat"],["603","Simping"],["194","Siro"],["32","Sotong"],["362","Sunglir"],["591","Swangi/Mata Besar"],["232","Talang-Talang"],["627","Tawes"],["18","Tembang"],["565","Tenggiri Bulat"],["555","Tenggiri papan"],["604","Terbang"],["17","Teri"],["637","Teri Asin"],["606","Teripang"],["605","Terubuk"],["150","Tetengkek"],["607","Tiram"],["628","Toman"],["161","Tongkol"],["497","Tuna  Mata Besar"],["608","Tuna S Biru Selatan"],["611","Ubur-ubur"],["609","Udang Barong"],["183","Udang Dogol"],["629","Udang Galah"],["554","Udang Jerbung"],["74","Udang Krosok"],["630","Udang Putih"],["610","Udang Putih/Vaname"],["631","Udang Windu"],["27","Udang windu"]]');

		//destroy current data
		Komoditas.destroy({}).exec(function(err){
			if(err){
				return res.json('500', {success:false, message:err.message});
			}
		});

		//insert data komoditas
		var promises = [];
		komoditas.forEach(function(kom){
			promises.push(Komoditas.create({
				kode_komoditas: kom[0],
				nama_komoditas: kom[1]
			}));
		});
		Q.allSettled(promises)
		.then(function(results){
			res.json('200', {success:true, message:'Init Komoditas Successfully', results:results});
		})
		.fail(function(err){
			res.json('500', {success:false, message:'Init Komoditas Fail!', errors:err.message});
		})
	},

};

