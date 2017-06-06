let fs = require('fs')
const cheerio = require('cheerio')
let getHtml = require('./download')
let Promise = require('bluebird')
let mysql = require('mysql')

let conn = mysql.createConnection({
	user: 'root',
	password: '123456',
	host: '120.24.49.153',
	port: '3306',
	database: 'mydata'
})

conn.query('select c_name from class',(err, res)=>{

	res.map((item, index)=>{
		(function (item, index) {
			setTimeout(()=>{
				getHtml("/jwzxtmp/showBjStu.php?bj="+item.c_name).then(function (html) {
					let $ = cheerio.load(html)
					let data = []
					$('tr').map((i, t)=>{
						if(i === 0) return 0
						else{
							let user = []
							$(t).find('td').map((x,y)=>{
								if(x===1) user.push($(y).text())
								if(x===2) user.push($(y).text())
								if(x===3) user.push($(y).text())
								if(x===4) user.push($(y).text())
								if(x===9) user.push($(y).text())
							})
							data.push(user)
						}
					})

					let str = 'insert into student VALUES '
					data.map(t=>{
						str+=`(NULL, ${t[0]}, "${t[1]}", "${t[2]}", "${t[3]}", "${t[4]}"), `
					})
					str = str.slice(0,-2)
					console.info(str)
					conn.query(str, null, (err, res)=>{
						if(err) console.info(err)
					})
				})
			}, 100 * index)
		})(item, index)

	})
})

//

//
//
//
//
// /**
//  * @return {Array}
//  */
// module.exports = function () {
//
// 	let content = fs.readFileSync('../store/pubBjsearchaction=bjStu.html', 'utf8')
//
// 	let $ = cheerio.load(content)
// //get departments array
// 	let departments = $('h3').map((index, item)=>{
// 		return $(item).text()
// 	})
//
// //get each special
//
// 	let k = []
// 	$('table').find('tbody').map((index, item)=>{
// 		let p = []
// 		let r = {}
// 		$(item).find('tr').map((i, t)=>{
// 			let row = {}, classes = []
// 			$(t).find('td').map((x, y)=>{
// 				if(x === 0) row.name = $(y).text()
// 				else classes.push($(y).text())
// 			})
// 			row.cls = classes.join('').match(/(\w+)\((\d+)人\)/g)
// 			p.push(row)
// 		})
// 		k.push({
// 			depart: departments[index],
// 			special: p
// 		})
// 	})
//
// 	return k
// }