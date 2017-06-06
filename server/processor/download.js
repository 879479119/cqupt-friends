let Promise = require('bluebird')
let http = require("http")
let iconv = require('iconv-lite')
let fs = require('fs')

function getPageInHtml(relativeUrl = "/"){

	let option = {
		hostname: "jwzx.cqupt.edu.cn",
		path: relativeUrl
	}

	return new Promise(function (resolve, reject) {
		let html = ""
		let req = http.request(option, function(res) {
			res.on("data", function(chunk) {
				html += iconv.decode(chunk, "utf8")
				console.log(Date.now())
			}).on("end", function () {
				resolve(html)
			})
		}).on("error", function(e) {
			reject(e.message)
		})
		req.end()
	}).then(function (html) {
		let file = relativeUrl.match(/^((\/[\w-]+)+)/)
		if(file === null) throw Error("url should looks like '/a/b', but even '/a/a/a-c/s/?p=1#2222' works")
		// let param = relativeUrl.split('?')[1]
		// let write = fs.createWriteStream(`../store${file[2] + (param || "")}.html`)
		// write.write(html)
		// console.log("Over")
		// write.close()
		return html
	})

}

module.exports = getPageInHtml

// getPageInHtml("/jwzxtmp/showBjStu.php?bj=0111301").then(function (e) {
// 	console.log(e)
// })