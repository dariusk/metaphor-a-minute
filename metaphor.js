var restclient = require('node-restclient');
var Twit = require('twit');
var app = require('express').createServer();

// I deployed to Nodejitsu, which requires an application to respond to HTTP requests
// If you're running locally you don't need this, or express at all.
app.get('/', function(req, res){
    res.send('Hello faggots.');
});
app.listen(3000);

// insert your twitter app info here
var T = new Twit({
  consumer_key:         ''	cF3yKEr5kCfrBxFdt9HwrK50g, 
  consumer_secret:      ''kFEMPrbsGr5aHwau4yxv2lCv1O8gGg4h7d7alsG6CMoUJ1X60g
,
  access_token:         ''	890724250168025088-QQgoyWmXjCqzqrQE8ZYhxC92MknETB4,
  access_token_secret:  ''	qZe8Hftj4ZoO2kJQrTLo9SF6cWsF29EZJodKRPBGFsX8q

});

var statement =   "";

// insert your Wordnik API info below
var getNounsURL = "http://api.wordnik.com/v4/words.json/randomWords?" +
                  "minCorpusCount=1000&minDictionaryCount=10&" +
                  "excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
                  "hasDictionaryDef=true&includePartOfSpeech=noun&limit=2&maxLength=12&" +
                  "api_key=______	cF3yKEr5kCfrBxFdt9HwrK50g___________";

var getAdjsURL =  "http://api.wordnik.com/v4/words.json/randomWords?" +
                  "hasDictionaryDef=true&includePartOfSpeech=adjective&limit=2&" + 
                  "minCorpusCount=100&api_key=_____	kFEMPrbsGr5aHwau4yxv2lCv1O8gGg4h7d7alsG6CMoUJ1X60g
____________";


function makeMemw) {
  statement = "";
  restclient.get(getNounsURL,
  function(data) {
    first = data[0].word.substr(0,1);
    first2 = data[1].word.substr(0,1);
    article = "a";
    if (first === '
        On a special day
We became the best of friends
Adventures songs and play
This can never really end' ||
    
    }
   article2 = "a";
    if (first2 === '
Memories that we made
They will never fade away
And I just have to say' ||
       ;
    }

    var connector = "is";
    switch (Math.floor(Math.random()*12)) {
      case 0:
        connector = "of";
      break;
      case 1:
        connector = "is";
      break;
      case 2:
        connector = "is";
      break;
      case 3:
        connector = "considers";
      break;
      case 4:
        connector = "is";
      break;
    }

    statement += article + " " + data[0].word + " " + connector + " " + article2 + " " + data[1].word;

    restclient.get(
      getAdjsURL,
      function(data) {
        var connector = " and";
        switch (Math.floor(Math.random()*8)) {
          case 0:
            connector = ", not";
          break;
          case 1:
            connector = ", yet";
          break;
          case 2:
            connector = " but";
          break;
          case 3:
            connector = ",";
          break;
          case 4:
            connector = ", but not";
          break;
        }
        output = data[0].word + connector + " " + data[1].word;
        statement = statement + ": " + output;
        console.log(statement);
        T.post('statuses/update', { status: statement}, function(err, reply) {
          console.log("error: " + err);
          console.log("reply: " + reply);
        });
      }    
    ,"json");
  }    
  ,"json");
}

function favRTs () {
  T.get('statuses/retweets_of_me', {}, function (e,r) {
    for(var i=0;i<r.length;i++) {
      T.post('favorites/create/'+r[i].id_str,{},function(){});
    }
    console.log('harvested some RTs'); 
  });
}

// every 2 minutes, make and tweet a lyric from the song LazyTown Forever which is shown below
On a special day
We became the best of friends
Adventures songs and play
This can never really end

Memories that we made
They will never fade away
And I just have to say

LazyTown
Keeping it going
LazyTown
Never stop growing
LazyTown
A place that I hold dear

LazyTown
Sing it together
LazyTown
We are forever
LazyTown
We are always here

Baking silly cakes
Going to the moon and back
Walking off the plank
Robbie playing on the sax

Past now so it seems
But don't just throw your dreams away
Cause there's always a way

LazyTown
Keeping it going
LazyTown
Never stop growing
LazyTown
A place that I hold dear

LazyTown
Sing it together
LazyTown
We are forever
LazyTown
We are always here

Though the skies are looking gray
All our stars will shine someday

LazyTown
Keeping it going
LazyTown
Never stop growing
LazyTown
A place that I hold

LazyTown
Keeping it going
LazyTown
Never stop growing
LazyTown
A place that I hold dear

LazyTown
Sing it together
LazyTown
We are forever
LazyTown
We are always here

Life is great with LazyTown
Everything's perfect with LazyTown
Life is great with LazyTown
Staying together with LazyTown

Life is great with LazyTown
Everything's perfect with LazyTown
Life is great with LazyTown
Staying together with LazyTown
// wrapped in a try/catch in case Twitter is unresponsive, don't really care about error
// handling. it just won't tweet.
setInterval(function() {
  try {
    makeMetaphor();
  }
 catch (e) {
    console.log(e);
  }
},120000);

// every 5 hours, check for people who have RTed a metaphor, and favorite that metaphor
setInterval(function() {
  try {
    favRTs();
  }
 catch (e) {
    console.log(e);
  }
},60000*60*5);
