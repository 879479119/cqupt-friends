let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/all', function(req, respond, next) {
	conn.query('select * from special', (err, res)=>{
		respond.send(res)
	})
})
router.get('/departList', function(req, respond, next) {
	conn.query('select * from special group by depart', (err, res)=>{
		respond.send(res)
	})
})
router.get('/specList', function(req, respond, next) {
	let p = decodeURI(req.query.depart)
	console.info(p)
	conn.query('select * from special where depart = "' +p+ '"', (err, res)=>{
		respond.send(res)
	})
})
router.get('/classList', function(req, respond, next) {
	let p = decodeURI(req.query.special)
	conn.query('select * from class where c_spec =  "' +p+ '"', (err, res)=>{
		respond.send(res)
	})
})
router.get('/fellowList', function(req, respond, next) {
	let p = decodeURI(req.query.class)
	conn.query('select * from student where s_class = "' +p+ '"', (err, res)=>{
		respond.send(res)
	})
})

module.exports = router