var memeDisplay = $("#meme-display");
var generatorButton = $("#generator-button");
var searchTopic = "testing";
var results = [];
//var promises = [];

function fetchGIF(topic){
    /* TO DO
    get gif from giphy using topic
    create HTML <img> element with JQuery using gif as src. 
    flip a coin (random # between 0 and 1) to determine if gif or still frame? **MAYBE!!! 
    return <img> element
    */
}

function captionTest(topic){
    return new Promise((resolve, reject)=>{
        var queryURL = "http://www.reddit.com/search.json?q=" + topic + "&sort=comments&limit=10";
        var posts = [];
        var urls = [];
        var promises = [];

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            posts = response.data.children;
        }).then(function(response){
            for(var i = 0; i < posts.length; i++){
                var id = posts[i].data.id;
                var sub = posts[i].data.subreddit;
                queryURL = "http://www.reddit.com/r/" + sub + "/comments/" + id + ".json?";
                urls.push(queryURL);
            }
            for(var i = 0; i < urls.length; i++){
                promises.push(captionTestPartTwo(urls[i]));
            }
            resolve(promises);
        });
    })

}

function captionTestPartTwo(queryURL){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var item = response[1].data.children;
            for(var i = 0; i < item.length; i++){
                if(item[i].data.body){
                    var text = item[i].data.body;
                    if(text.length < 60){
                        if(text != "[removed]" && text != "[deleted]"){
                            results.push(item[i].data.body);
                        }
                    }
                }
            }
            console.log(results);
            resolve("true");
        });
    })
}

function fetchCaption(topic){
    var caption;
    var heading = $("<h3>");
    if(results.length > 1){
        var selection = Math.floor((Math.random() * results.length));
        caption = results[i].trim();
        heading.text(caption);
    } else {
        caption = topic + " be like";
        heading.text(caption);
    }
    return heading;
}



function generateMeme(topic){
    //var gif = fetchGIF(topic);
    var caption = fetchCaption(topic);
    
    var gif = $("<img>").attr("src", "assets/images/test.gif");
    //var caption = $("<h3>").text(topic);

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


var promises = captionTest("your mom");
Promise.all(promises).then(()=>{

}).catch((e)=>{
    
});

/*
var promises = [];
for(i=0;i<5;i+){
    promises.push(doSomeAsyncStuff());
}
Promise.all(promises)
    .then(() => {
        for(i=0;i<5;i+){
            doSomeStuffOnlyWhenTheAsyncStuffIsFinish();    
        }
    })
    .catch((e) => {
        // handle errors here
    });
*/