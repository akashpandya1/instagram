var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./InstaDB.sqlite');

//SelectUserProfile(db,4);
/*
SelectUserProfile(db, 'UserId');
function SelectUserProfile(UserId){
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

exports.AuthenticateUser = AuthenticateUser;