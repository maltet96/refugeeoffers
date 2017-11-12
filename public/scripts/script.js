function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var found = false;

$(".language").each(function(){
    if(getParameterByName("lang")){
        if(getParameterByName("lang").includes($(this).text())){
            $(this).addClass("highlighted")
            found = true;
        }
    }
})


console.log($(".language:contains(de)"));
if(!found){
    $(".language:contains(de)").addClass("highlighted");
}