dropbooks = require('./pages/dropbooks')
d_upp = require('./pages/d-upp')
Hhentai = require('./pages/Hhentai')
$ = require('jquery')
var URL = location.href

switch(true){
    case /^https:\/\/e-hentai\.org\/g\/.+\/.+/.test(URL):
        promise = Hhentai(URL)
        break;
    case /^http:\/\/d-upp\.com\/books\/.+/.test(URL):
        promise = d_upp(URL)
        break;
    case /^http:\/\/dropbooks\.tv\/detail\/.+/.test(URL):
        promise = dropbooks(URL)
        break;
}

if(promise){
    promise.then(function(images){
        $("body>*:not(#Hhentai_script)").remove()
        var len = images.length
        var html = ""
        for(var i=0;i < len; i++){
            html += '<li/><img src="' + images[i] + '" /><br><p>' + (i+1) + '/' + (len+1) + '</p><br></li>'
        }
        $("body").append(html)
        $("li").wrapAll('<div style="text-align:center">')
    })
}