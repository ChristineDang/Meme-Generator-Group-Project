var memeDisplay = $("#meme-display");
var generatorButton = $("#generator-button");
var searchTopic = "testing";

function fetchGIF(topic){
    /* TO DO
    get gif from giphy using topic
    create HTML <img> element with JQuery using gif as src. 
    flip a coin (random # between 0 and 1) to determine if gif or still frame? **MAYBE!!! 
    return <img> element
    */
}

function fetchCaption(topic){
    /* TO DO
    get list of posts from reddit
    retrieve random comment from random post in list of posts
    create heading element with Jquery
    return heading element
    */
}

function generateMeme(topic){
    //var gif = fetchGIF(topic);
    //var caption = fetchCaption(topic);

    var gif = $("<img>").attr("src", "assets/images/test.gif");
    var caption = $("<h3>").text(topic);

    var newCard = $("<div>").addClass("card card-default");

    var newHeader = $("<div>").addClass("card-header");
    newHeader.append(caption);

    var newBody = $("<div>").addClass("card-body");
    newBody.append(gif);


    newCard.append(newHeader).append(newBody);
    $("#meme-display").empty();
    $("#meme-display").append(newCard);

}

function validateForm(){
    searchTopic = $("#topic").val().trim();
    if(searchTopic == ""){
        alert("Enter Search Query");
    } else {
        generateMeme(searchTopic);
    }
}
