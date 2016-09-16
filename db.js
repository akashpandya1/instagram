var sqlite3 = require('sqlite3').verbose();
<<<<<<< HEAD
var db = new sqlite3.Database('InstaDB.sqlite');



dbSelectUserProfile(db,4);
function dbSelectUserProfile(db,UserId){
=======
var db = new sqlite3.Database('./InstaDB.sqlite');

//SelectUserProfile(db,4);
/*
SelectUserProfile(db, 'UserId');
function SelectUserProfile(UserId){
>>>>>>> ef80cb95077e59e6f529ea98edf474dd9f8aa162
    return new Promise(function (resolve,reject) {
        db.each("Select  * from user", function (err, row) {
       // db.each("Select U.Name, U.ProfilePic, p.PostCount, f.FollowerCount, fe.FolloweeCount from User U,(select count(PosterId) as PostCount from Post where PosterId='"+UserId+"') as p,(select count(FollowerId) as FollowerCount from Following where FollowerId='"+UserId+"') as f,(select  ///(FolloweeId) as FolloweeCount from Following where FolloweeId='"+UserId+"') as fe where U.PK_user = '"+UserId+"'", function (err, row) {
            if (err) {
                reject(err);
                console.log(err);

            }else {

                var profileResult=JSON.stringify(row);
                console.log(profileResult);                 
                resolve(profileResult);
            }
        });
    });
}
<<<<<<< HEAD

dbSelectMyPosts(db,1)
function dbSelectMyPosts(Db,UserId){
=======
*/
 
//selectHomeFeed(1); 
exports.selectHomeFeed =selectHomeFeed;
function selectHomeFeed(userId) {
    return new Promise(
        (resolve, reject) => {          
           db.all("select u.name, p.PostPic, lp.LikeCount, c.text, p.posttime from User as u, Post p, (select count(PostPicId) as LikeCount from LikePic where PostPicId='"+userId+"') as lp, Comment C where u.PK_User='"+userId+"' and u.PK_User=p.PosterId and C.PostId=P.PK_Post", 
           function (err, rows) {          
                    if (err) {
                        console.log(err);
                        reject(err);
                        return false;
                    }                    
                    resolve(rows);
                });
        }).then(
        (rows) => {
            console.log("selectUserFeeds rows: " + rows);
            var jsonrows = JSON.stringify(rows);
            console.log("selectUserFeeds json: " + jsonrows);
            return jsonrows;
        }
        ).catch(
        (err) => {
            console.log(err);
        });
}
 
//SelectHomeFeed1(db,1)
function SelectHomeFeed1(Db,UserId){
>>>>>>> ef80cb95077e59e6f529ea98edf474dd9f8aa162
    return new Promise(function (resolve, reject) {
        db.each("select u.name, p.PostPic, lp.LikeCount, c.text from User as u, Post p, (select count(PostPicId) as LikeCount from LikePic where PostPicId='"+UserId+"') as lp, Comment C where u.PK_User='"+UserId+"' and u.PK_User=p.PosterId and C.PostId=P.PK_Post", function (err, row) {
            if (err) {
                reject(err);
                console.log(err);

            }else {
                var homeFeedResult=JSON.stringify(row);
                console.log(homeFeedResult);
                resolve(homeFeedResult);
            }
        });

    });
}

<<<<<<< HEAD
dbSelectHomeFeed(db,1)
function dbSelectHomeFeed(Db,UserId){
    return new Promise(function (resolve, reject) {
        db.each("select u.name, p.PostPic, lp.LikeCount, c.text from User as u, Post p, (select count(PostPicId) as LikeCount from LikePic where PostPicId='"+UserId+"') as lp, Comment C where u.PK_User='"+UserId+"' and u.PK_User=p.PosterId and C.PostId=P.PK_Post", function (err, row) {
            if (err) {
                reject(err);
                console.log(err);

            }else {
                var homeFeedResult=JSON.stringify(row);
                console.log(homeFeedResult);
                resolve(homeFeedResult);
            }
        });

    });
}
var jSONStr = '{'+'"name" : "Raj",'+'"age"  : 32,'+'"married" : false'
    +'}';
dbCreatePost(db, jSONStr);
function dbCreatePost(db, jSONStr){
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare("Insert into Post (PosterId, PostPic) values (?,?);  Insert into Comment (CommenterId, PostId, Text) values (?,(Select PK_Post from Post where posterid=? and postpic=?),?) ",function (err) {
            if (err) {
                reject(err);
                console.log(err);
            }else {
                var JsonRun = JSON.parse(jSONStr);
                stmt.run(JsonRun[0].postUser,JsonRun[0].postData,JsonRun[0].postComment);
                stmt.finalize();
            }
            });
    });
}
=======
 
>>>>>>> ef80cb95077e59e6f529ea98edf474dd9f8aa162
