express = require('express');
app = express();
sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('./InstaDB.sqlite');
fs = require('fs'); 
dbselectHomeFeed = require('./db.js').selectHomeFeed;  
bodyParser = require('body-parser');   
os = require('os');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
); 
 
 
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


app.get('/createPost/:postData/:postComment/:postUser', function (req, res) {
    console.log("createPost:" + req.params.postData + "," + req.params.postComment + "," + req.params.postUser);
    var createPost = {
        postData:  req.params.postData,
        postComment:  req.params.postComment,  
        postUser:  req.params.postUser 
     };
    console.log("createPost json obj:" + createPost.postData + "," + createPost.postComment + "," + createPost.postUser);
    jSONStr = '[' + JSON.stringify(createPost) + ']';
    console.log("jSONStr: " + jSONStr);
    dbCreatePost(jSONStr);
    res.end();        
});


app.get('/getFollowerPosts/:userId', function (req, res) {
    console.log("getFollowerPosts:" + req.params.userId); 
   var p = dbselectHomeFeed(req.params.userId);
    p.then(
        (val) => {            
          console.log("getFollowerPosts2 :" + val);
          res.send(val);
         
            }
        ).catch(
            (err) => {
            res.send(err);
        });       
});

/*
app.get('/getUserFeeds/:userId', function(req, res) {
     var useid = req.params.userId
     console.log("userid:" + useid);   
     var p = dbSelectUserFeeds(useid);
     p.then(
        (val) => {
            res.send(val);
            }
        ).catch(
            (err) => {
            res.send(err);
        });       
});



app.get('/getUserTweets/:userId/', function(req, res) {
     var userid = req.params.userId;     
     console.log("getUserTweets userid:" + userid);   
     var p = dbSelectUserTweets(userid);
     p.then(
        (val) => {
             fs.readFile('userTweet.html', 'utf-8', function(err, content) {
                if (err) {
                    res.end('error occurred');
                    return;
                } 
             var JSONStr = JSON.stringify(val);   
             //console.log("getUserTweets :" + JSONStr);  
            var renderedHtml = ejs.render(content, {userTweets: JSONStr});
            res.end(renderedHtml);  
            });
       });       
});


app.get('/hasReplies/:tweetID', function(req, res) {
     var tweetID = req.params.tweetID   
     var p = dbHasReplies(tweetID);
     p.then(
        (val) => {
            res.send(val);
          }
        ).catch(
            (err) => {
            res.send(err);
        });         
}); 

app.get('/getReplies/:tweetID', function(req, res) {
     var tweetID = req.params.tweetID  
     var p = dbGetReplies(tweetID);
     p.then(
        (val) => {
            res.send(val);
          }
        ).catch(
            (err) => {
            res.send(err);
        });         
}); 



app.post('/addUser', function(req, res) {
    console.log("adding user");     
     var newUser = {
         UserName: req.body.userName,
         UserProfile: req.body.userProfile        
     };
    jSONStr = '[' + JSON.stringify(newUser) + ']'; 
    dbAddUser(jSONStr);
    res.send('user added');        
});
 


app.post('/deletetweet', function (req, res) {
    console.log("deletetweet");

    var deleteTweet = {
        tweetid: req.body.tweetid
    };

    console.log("tweetid:" + deleteTweet.tweetid);

    var p = dbDeleteTweet(deleteTweet.tweetid);
    p.then(
        (val) => {
            res.send('Deleted!');
        }
    ).catch(
        (err) => {
            res.send(err);
        });
});


app.post('/selecttweet', function (req, res) {
    console.log("selecttweet");
    var p = dbAllTweets();
    p.then(
        (val) => {
            res.send('selected all tweets!');
        }
    ).catch(
        (err) => {
            res.send(err);
        });
});


app.post('/tweetLike', function (req, res) {
    console.log("tweetLike");
    var tweetLikeRec = {
        tweetid: req.body.tweetid,
        userid: req.body.userid
    };
    var p = updateAnyColumnWithExistingData('retweeter_userid', tweetLikeRec.tweetid, tweetLikeRec.userid);
    p.then(
        (val) => {
            res.send(true);
        }
    ).catch(
        (err) => {
            res.send(err);
        });
});


app.post('/selectRecForTweet', function (req, res) {
    console.log("selectRecForTweet");

    var selectTweetRec = {
        tweetid: req.body.tweetid
    };
    var p = dbSelectRecForTweet(selectTweetRec.tweetid);
    p.then(
        (val) => {
            res.send('selected tweet record!');
        }
    ).catch(
        (err) => {
            res.send(err);
        });
});

 app.get('/', function (req, res) {
    res.send(html);

});  

*/

 