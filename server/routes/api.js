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
router.get('/randomDetails', function(req, respond, next) {
	let p = decodeURI(req.query.stu)
	conn.query(`SELECT * FROM random WHERE s_num = ${p}`, (err, res0)=>{
		respond.send(res0)
	})
})

/**
 * change user state
 */

router.get('/getRandomByClass', function(req, respond, next) {
	let p = req.query.class
	let num = req.query.num
	new Promise((resolve, reject)=>{
		conn.query('select * from student where s_class = "' +p+ '"', (err, res)=>{
			// respond.send(res)
			resolve(res)
		})
	}).then(res => {
		if(res.length === 0) throw Error(0)
		if(res.length < num) throw Error(0)
		let users = [], feedback = []
		for(let i = 0;i < num;i ++){
			let index = (Math.random()*res.length) >>> 0,
				data = res.splice(index, 1)[0]
			users.push(data['s_num'])
			feedback.push(data)
		}

		return new Promise((resolve, reject)=>{
			let str = 'insert into random VALUES '
			let d = new Date().getTime()
			users.map((item, index)=>{
				str += `(NULL, ${item}, '${d}', 0),`
				conn.query(`UPDATE student SET r_count = r_count + 1 WHERE s_num = ${item}`, (err, res1)=>{
					console.info('update' + item)
				})
			})
			str = str.slice(0,-1)
			conn.query(str, (err, res0)=>{
				if(err) console.info(err)
				respond.send({
					code: 100,
					data: feedback,
					_: '' + d
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

router.get('/updatePresent', function(req, respond, next) {
	let _ = req.query._
	let list = req.query.list.split(',').map(t=>+t)
	console.info(_, list)

	for(let i = 0;i < list.length;i ++){
		((i)=>{
			conn.query(`UPDATE random SET r_present = 1 WHERE s_num = ${list[i]} AND r_date = "${_}"; `, (err, res0)=>{
				if(err) console.info(err)

			})
			conn.query(`UPDATE student SET r_present = r_present + 1 WHERE s_num = ${list[i]}`, (err, res0)=>{
				if(err) console.info(err)

			})
		})(i)
	}
	respond.send({
		code: 100
	})
})



module.exports = router