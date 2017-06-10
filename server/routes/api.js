let express = require('express');
let router = express.Router();
let Promise = require('bluebird')

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
	conn.query('select * from special where depart = "' +p+ '"', (err, res)=>{
		respond.send(res)
	})
})
router.get('/allSpecList', function(req, respond, next) {
	let p = decodeURI(req.query.depart)
	conn.query(`select * from class WHERE c_spec IN (
		select s_name from special where depart = "${p}")`, (err, res)=>{
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
	let p = decodeURI(req.query.cls)
	conn.query('select * from student where s_class = "' +p+ '"', (err, res)=>{
		respond.send(res)
	})
})
router.get('/student', function(req, respond, next) {
	let p = decodeURI(req.query.stu)
	conn.query('select * from student where s_num = "' +p+ '"', (err, res0)=>{

		conn.query(`SELECT * FROM class , special WHERE c_spec = s_name AND c_name = "${res0[0].s_class}"`, (err, res1)=>{
			respond.send(Object.assign({}, res1[0], res0[0]))
		})
	})
})

/**
 * change user state
 */

router.get('/getRandomByClass', function(req, respond, next) {
	let p = req.query.class
	let num = req.query.num
	new Promise((resolve, reject)=>{
		conn.query('select s_num from student where s_class = "' +p+ '"', (err, res)=>{
			// respond.send(res)
			resolve(res)
		})
	}).then(res => {
		if(res.length === 0) throw Error(0)
		if(res.length < num) throw Error(0)
		let users = []
		for(let i = 0;i < num;i ++){
			users.push(res.splice((Math.random()*res.length) >>> 0, 1)[0]['s_num'])
		}

		return new Promise((resolve, reject)=>{
			let str = 'insert into random VALUES '
			let d = new Date().getTime()
			users.map((item, index)=>{
				str += `(NULL, ${item}, '${d}'),`
			})
			str = str.slice(0,-1)
			conn.query(str, (err, res)=>{
				if(err) console.info(err)
				respond.send({
					code: 100,
					data: users
				})
			})
		})
	}).catch(error=>{
		respond.send({
			code: 0,
			msg: error
		})
	})
})



module.exports = router