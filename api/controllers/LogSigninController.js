/**
 * LogSigninController
 *
 * @description :: Server-side logic for managing Logsignins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

moment = require('moment')
var LogSigninController = {
	gettoday: function(){
		today = new Date()
		today.setHours(0)
		today.setMinutes(0)
		today.setSeconds(0)
		today.setMilliseconds(0)
		return today
	},
	adddate: function(date, num_of_date){
		new_date = new Date(date)
		return new_date.setDate(new_date.getDate() + num_of_date)
	},
	numofonlinetoday: function(req, res){
		today = LogSigninController.gettoday()
		tomorrow = LogSigninController.adddate(today, 1)
		LogSignin.query('SELECT COUNT(DISTINCT(user)) AS onlineusers FROM logsignin WHERE datetime BETWEEN FROM_UNIXTIME('+today.getTime()/1000+') AND FROM_UNIXTIME('+tomorrow/1000+')', function(err, logs){
			if(err){
				return res.json('500', {success:false, message:err.message})
			}
			
			else return(res.json('200', {success:true, onlineusers:logs[0].onlineusers}))
		})
	}
};

module.exports = LogSigninController

