var client = require('cheerio-httpcli')
var images = [],pages=1;

module.exports = function(URL){
	if(/^https:\/\/e-hentai\.org\/g\/.+\/.+/.test(URL)){
		return new Promise(function(resolve, reject){
			client.fetch(URL ,
   				function(err, $, res){
       				if(err) return  reject(err)
       				var len = $('.gdtm').length
       				$('.gdtm').each(
           				function(idx){
               				var image_url = $(this).children('div').children('a').attr('href')
               				client.fetch(image_url,
                   				function(err, $, res){
                       				if(err) return  console.log(err)
                       				images[idx] = $('#img').attr("src")
                       				if(len == pages) resolve(images);
                       				pages++
                   				}
							)
           				}
       				)
   				}
			)
		})
	}　else {
		return undefined
	}
}