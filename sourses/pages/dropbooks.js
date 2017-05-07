var client = require('cheerio-httpcli')
var images = [],pages=1;

module.exports = function(URL){
	if(/^http:\/\/dropbooks\.tv\/detail\/.+/.test(URL)){
		return new Promise(function(resolve, reject){
			client.fetch(URL ,
				function(err, $, res){
					if(err) return reject(err);
					var all_page = $("#page_list").children().length
					var match = $('#thumbnail1').attr('src').match(/(http.+\/)(\d{5})\.(jpg|jpeg|gif|png)/i);
					for(var i=1; i <= all_page ; i++) {
						images[i-1] = match[1] + ('00000' + i).slice(-5) + '.' + match[3]
						if(i == all_page) resolve()
					}
				}
			)
		})
	} else {
		return undefined
	}
}