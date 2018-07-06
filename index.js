
var instance = null;

console.log('Init Scraping');

function scraping(){
    instance = document.querySelector('[data-async-rclass="search"] .rlfl__tls')
    var items = document.querySelectorAll('[data-async-rclass="search"] .rlfl__tls > div[jstcache]');

    window.list = window.list || [];

    function normalize(text){
        return text.replace(/\n/g, '').trim()
    }

    items.forEach(function(item){
        try {
            var heading = normalize(item.querySelector("[role=heading]").innerText);
            var location = normalize(item.querySelectorAll(".rllt__details > div")[2].innerText);
            var phone = normalize(item.querySelectorAll(".rllt__details > div")[3].innerText);
        } catch (e) {
            console.log("error:", e);
            console.log(item);
            return;
        }

        console.log(heading + "; " + location + "; " + phone);
        window.list.push(heading + "; " + location + "; " + phone)
    });

    var time = setInterval(function(){
        if(document.querySelector('[data-async-rclass="search"] .rlfl__tls') !== instance){
            scraping();
        }
    }, 1000);


    document.querySelector("[role=presentation] td.cur").nextElementSibling.querySelector('a').click();
}


scraping();
