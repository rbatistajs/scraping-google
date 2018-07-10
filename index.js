
var instance = null;
window.list = window.list || [['Name', 'Location', 'Phone', 'site']];

console.log('Init Scraping');

function scraping(){
    instance = document.querySelector('[data-async-rclass="search"] .rlfl__tls')
    var items = document.querySelectorAll('[data-async-rclass="search"] .rlfl__tls > div[jstcache]');


    function normalize(text){
        return text.replace(/\n/g, '').trim()
    }

    items.forEach(function(item){
        try {
            var heading = normalize(item.querySelector("[role=heading]").innerText);
            var location = normalize(item.querySelectorAll(".rllt__details > div")[2].innerText);
            var phone = normalize(item.querySelectorAll(".rllt__details > div")[3].innerText);
            var site = "";
            if(item.querySelector("a[ping]")){
                site = item.querySelector("a[ping]").getAttribute("href");
            }
        } catch (e) {
            console.log("error:", e);
            console.log(item);
            return;
        }

        window.list.push([heading, location, phone, site])
    });

    if(
        document.querySelector("[role=presentation] td.cur") &&
        document.querySelector("[role=presentation] td.cur").nextElementSibling &&
        document.querySelector("[role=presentation] td.cur").nextElementSibling.querySelector('a')
    ){
        var time = setInterval(function(){
            if(document.querySelector('[data-async-rclass="search"] .rlfl__tls') !== instance){
                scraping();
            }
        }, 1000);

        document.querySelector("[role=presentation] td.cur").nextElementSibling.querySelector('a').click();
    }else{
        console.log('Finish Scraping');

        const rows = window.list;
        let csvContent = "data:text/csv;charset=utf-8,";

        rows.forEach(function(rowArray){
           let row = rowArray.join(";");
           csvContent += row + "\r\n";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "list.csv");
        link.innerHTML= "Click Here to download";
        document.body.appendChild(link);

        link.click();
    }

}


scraping();
