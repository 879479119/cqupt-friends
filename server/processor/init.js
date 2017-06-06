let fs = require('fs')
const cheerio = require('cheerio')

/**
 *
 * @return {Array}
 */
module.exports = function () {

	let content = fs.readFileSync('../store/pubBjsearchaction=bjStu.html', 'utf8')

	let $ = cheerio.load(content)
//get departments array
	let departments = $('h3').map((index, item)=>{
		return $(item).text()
	})

//get each special

	let k = []
	$('table').find('tbody').map((index, item)=>{
		let p = []
		let r = {}
		$(item).find('tr').map((i, t)=>{
			let row = {}, classes = []
			$(t).find('td').map((x, y)=>{
				if(x === 0) row.name = $(y).text()
				else classes.push($(y).text())
			})
			row.cls = classes.join('').match(/(\w+)\((\d+)人\)/g)
			p.push(row)
		})
		k.push({
			depart: departments[index],
			special: p
		})
	})

	return k
}