/**
 * CounterController
 *
 * @description :: Server-side logic for managing counters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

moment = require('moment-timezone')
var CounterController = {
	gettoday: function(){
		today = new Date()
		today.setHours(0)
		today.setMinutes(0)
		today.setSeconds(0)
		today.setMilliseconds(0)
		return today
	},
	gettomorrow: function(){
		tomorrow = new Date()
		tomorrow.setHours(0)
		tomorrow.setMinutes(0)
		tomorrow.setSeconds(0)
		tomorrow.setMilliseconds(0)
		tomorrow.setDate(today.getDate()+1)
		return tomorrow
	},
	countertoday: function(req, res){
		today = CounterController.gettoday()
		tomorrow = CounterController.gettomorrow()
		Counter.findOne({
			where: {date: {'>=':today, '<':tomorrow}}
		})
		.then(function(counters){
			if(counters===undefined){
				return res.json('500', {success:false, messsage:'Data counter kosong'})
			}

			else if(req.param('type') == 'online'){
				return res.json('200', {success:true, online:counters.online})
			}

			else if(req.param('type') == 'call'){
				return res.json('200', {success:true, call:counters.call})
			}
		})
	},
	increase: function(req, res){
		today = CounterController.gettoday()
		tomorrow = CounterController.gettomorrow()
		
		Counter.findOne({
			where: {date: {'>=':today, '<':tomorrow}}
		})
		.then(function(counter){
			if(counter===undefined){
				//create new record
				Counter.create({
					date: new Date(),
					online: 1
				})
				.exec(function(err, counter){
					if(err){
						return res.json('500', {success:false, messsage:err.messsage})
					}
					
					else return res.json('200', {success:true, counter})
				})
			}else{
				//increase the number of online user
				
				data = {updatedAt: moment(new Date()).format('YYYY-MM-DD H:m:s')}
				if(req.param('type') == 'online'){
					data['online'] = counter.online+1
				}

				else if(req.param('type') == 'call'){
					data['call'] = counter.call+1
				}
				Counter.update({id:counter.id},	data)
				.exec(function(err, updated){
					if(err){
						return res.json('500', {success:false, message:err.messsage})
					}

					else return res.json('200', {success:true, updated, data})
				})
			}
		})
	}
}
module.exports = CounterController

