var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./InstaDB.sqlite');

//dbSelectUserProfile(4);
function dbSelectUserProfile(UserId){
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

exports.selectHomeFeed =selectHomeFeed;
function selectHomeFeed(userId) {
    return new Promise(
        (resolve, reject) => {          
           db.all("select u.name, u.pk_user, p.postpic, p.posttime, c.text  from user u, post p, comment c " + 
             "where u.pk_user = p.posterid and  u.pk_user =c.commenterid and p.pk_post = c.postid and " + 
             "u.pk_user in ( select followeeId from following where followerId = ?)", userId,
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
 


var jSONStr = '{'+'"name" : "Raj",'+'"age"  : 32,'+'"married" : false'
    +'}';

 //   dbCreatePost(db, jSONStr);
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