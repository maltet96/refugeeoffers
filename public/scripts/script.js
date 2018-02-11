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

// color offerings in an alternating fashion
var colors = ["rgba(157, 57, 57, 0.6)", "rgba(221, 136, 56, 0.6)", "rgba(69, 144, 173, 0.6)"]

$(".firstcategory").each(function(index, value){
    $(this).css("border-color", colors[index % 3]);
    var link_wo_color = $(this).parent().attr("href");
    $(this).parent().attr("href", link_wo_color + "&color=" + (index % 3).toString());
})