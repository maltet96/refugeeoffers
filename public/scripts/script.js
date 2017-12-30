
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

if(!found){
    $(".language:contains(de)").addClass("highlighted");
}

$(".offeringfirst").each(function(){$(this).hide()})

$(".search > input").keyup(function(){
    let that = $(this)

    $(".offeringName").each(function(){
        $(this).text().toLocaleLowerCase().indexOf(that.val().toLocaleLowerCase()) != -1 ? $(this).parent().show() : $(this).parent().hide() 
    })
})

// hide optional description elements
$(".offeringDescription").each(function(){
    if($(this).html() == ""){
        $(this).hide()
    }
})

$(".culturepic").each(function(){
    if($(this).attr("src") == ""){
        $(this).hide()
    }
})