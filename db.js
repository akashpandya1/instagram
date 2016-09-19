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

exports.AuthenticateUser = AuthenticateUser;
function AuthenticateUser(obj){
    return new Promise(
       (resolve, reject) => {
           //logic
           var table = "User";
           var where = " WHERE Name = '" + obj + "'";
           var sql = "SELECT PK_User, Name FROM " + table + where + ";";
           //console.log(sql);
           db.all(sql, function (err, rows) {
               if (err) {
                   //console.log(err);
                   reject("failed!");
                   return;
               }
               //console.log("typeof rows " + (typeof rows[0]));
               if(typeof rows[0] === "undefined"){
                   reject("failed!");
                   return;
               }else{
                   // console.log("PK_User " + rows[0].PK_User);
                   // console.log("Name " + rows[0].Name);
                   // console.log("obj " + obj);
                   
                   if(rows[0].Name == obj){
                       // console.log("row id" + rows.PK_User);
                       // console.log("username " +rows.Name  + " pk " + rows.PK_User);
                       resolve(rows[0].PK_User);
                       return;
                   }else{
                       reject("failed!");
                       return;
                   }

               }
               
               //console.log(rows);
               //resolve(row);
           });
       });
};



exports.selectHomeFeed =selectHomeFeed;
function selectHomeFeed(userId) {
    return new Promise(
        (resolve, reject) => {          
           db.all("select u.name, u.pk_user, p.postpic, p.posttime, c.text  from user u, post p, comment c " + 
             "where u.pk_user = p.posterid and  u.pk_user =c.commenterid and p.pk_post = c.postid and " + 
             "u.pk_user in ( select followeeId from following where followerId = ?) ", userId,
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


exports.dbAddToCommentTable=dbAddToCommentTable;
function dbAddToCommentTable(jsonStr) {
    return new Promise(function (resolve, reject) {
        var sqlJson = JSON.parse(jsonStr);
        console.log("postid:"+sqlJson[0].postUser+"PostPic:"+sqlJson[0].postData+"PostComment:"+sqlJson[0].postComment);
        db.run("Insert into Comment (CommenterId, PostId, Text) values (?,(Select PK_Post from Post where posterid=? and postpic=?),?);",
            sqlJson[0].postUser, sqlJson[0].postUser, sqlJson[0].postData,sqlJson[0].postComment,  function (err) {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    console.log("success");
                    resolve();

                }
            });
    });
}

exports.dbAddToPostsTable=dbAddToPostsTable;
function dbAddToPostsTable(jsonStr) {
    return new Promise(function (resolve, reject) {
        var sqlJson = JSON.parse(jsonStr);
        console.log("postid:"+sqlJson[0].postUser+"PostPic:"+sqlJson[0].postData);
        db.run("Insert into Post (PosterId, PostPic) values (?,?)",
            sqlJson[0].postUser, sqlJson[0].postData,  function (err) {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                else {
                    console.log("success");
                    resolve();

                }
            });
    });
}
