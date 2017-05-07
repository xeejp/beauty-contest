var client = require('cheerio-httpcli')
var images = [],pages=1;

module.exports = function(URL){
	if(/^http:\/\/d-upp\.com\/books\/.+/.test(URL)){
		return new Promise(function(resolve, reject){
			client.fetch(URL ,
				function(err, $, res){
					if(err) return reject(err)
					var all_page = parseInt($('article>div.img_info>div.box>table>tr>td>span')[1].children[0].data)
					var urls = []
					for(var i=1; i <= all_page ; i++) urls[i] = URL + i + '.html'
					urls.forEach((value,idx) => {
						client.fetch(value,
							function(err,$,res){
								if(err) return  console.log(err)
								images[idx-1] = ($("#img>div>a>img").attr("src"))
								if(all_page == pages) resolve();
								pages++;
							}                
						)
					})
				}
			)
		})
	}else {
		return undefined
	}
}