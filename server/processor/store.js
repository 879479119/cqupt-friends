let getJSON = require('./init')
let mysql = require('mysql')

let conn = mysql.createConnection({
	user: 'root',
	password: '123456',
	host: '120.24.49.153',
	port: '3306',
	database: 'mydata'
})

let schoolData = getJSON()

schoolData.map((item, index)=>{

	item.special.map((t, i)=>{
		conn.query('insert into special VALUES (NULL, NULL , ?, ?)',[t.name, item.depart],(err, res)=>{

		})
		t.cls.map((x,y)=>{
			let r = x.match(/(\w+)\((\d+)人\)/)
			conn.query('insert into class VALUES (NULL, ?, ?, ?)',[r[1], r[2], t.name],(err, res)=>{

			})
		})
	})
})
