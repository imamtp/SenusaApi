/**
 * LogCallController
 *
 * @description :: Server-side logic for managing logcalls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

moment = require('moment')
var LogCallController = {
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
	log: function(req, res){
		LogCall.log({user_id:req.user_id}, function(err){
			if(err){
				return res.json('500', {success:false, message:err.message})
			}

			else return res.json('200', {success:true})
		})
	},
	numofcalltoday: function(req, res){
		today = LogCallController.gettoday()
		tomorrow = LogCallController.adddate(today, 1)
		LogSignin.query('SELECT COUNT(id) AS calltoday FROM logcall WHERE datetime BETWEEN FROM_UNIXTIME('+today.getTime()/1000+') AND FROM_UNIXTIME('+tomorrow/1000+')', function(err, logs){
			if(err){
				return res.json('500', {success:false, message:err.message})
			}

			else return(res.json('200', {success:true, calltoday:logs[0].calltoday}))
		})
	},
}

module.exports = LogCallController

