var items = document.querySelectorAll('[data-async-rclass="search"] .rlfl__tls > div[jstcache]');

window.list = window.list || [];

function normalize(text){
    return text.replace(/\n/g, '').trim()
}

items.forEach(function(item){
    var heading = normalize(item.querySelector("[role=heading]").innerText);
    var location = normalize(item.querySelectorAll(".rllt__details > div")[2].innerText);
    var phone = normalize(item.querySelectorAll(".rllt__details > div")[3].innerText);

    window.list.push(heading + ", " + location + ", " + phone)
});
