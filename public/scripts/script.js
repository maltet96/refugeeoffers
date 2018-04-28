function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function closeOfferings(){
    $(".offeringfirst").each(function(){$(this).hide()})
    $(".offeringsFirst").show().hide()
    $(".categories").show()
    $(".close").hide()
    $(".search > input").val("");
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

$(".close").click(function(){
    closeOfferings();
})

$(".offeringfirst").each(function(){$(this).hide()})
$(".offeringsFirst").hide()
$(".close").hide()

$(".search > input").keyup(function(){
    if ($(this).val() == ""){
        closeOfferings()
        return
    }
    let that = $(this)
    $(".offeringsFirst").show()
    $(".categories").hide()
    $(".close").show()

    $(".searchParameter").each(function(){
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

var lang = getParameterByName("lang");

if (lang == "en"){
    $(".address").text("Address:")
    $(".opening").text("Opening hours:")
}
if (lang == "ar"){
    $(".address").text("عنوان:")
    $(".opening").text("مواعيد العمل:")
}
if (lang == "so"){
    $(".address").text("Cinwaan:")
    $(".opening").text("Wakhti lafuro:")
}

// color offerings in an alternating fashion
var colors = ["rgba(157, 57, 57, 0.6)", "rgba(221, 136, 56, 0.6)", "rgba(69, 144, 173, 0.6)"]

$(".firstcategory").each(function(index, value){
    $(this).css("border-color", colors[index % 3]);
    var link_wo_color = $(this).parent().attr("href");
    $(this).parent().attr("href", link_wo_color + "&color=color" + (index % 3).toString());
})
