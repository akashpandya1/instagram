var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('InstaDB.sqlite');



dbSelectUserProfile(db,4);
function dbSelectUserProfile(db,UserId){
    return new Promise(function (resolve,reject) {
        db.each("Select U.Name, U.ProfilePic, p.PostCount, f.FollowerCount, fe.FolloweeCount from User U,(select count(PosterId) as PostCount from Post where PosterId='"+UserId+"') as p,(select count(FollowerId) as FollowerCount from Following where FollowerId='"+UserId+"') as f,(select count(FolloweeId) as FolloweeCount from Following where FolloweeId='"+UserId+"') as fe where U.PK_user = '"+UserId+"'", function (err, row) {
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

dbSelectMyPosts(db,1)
function dbSelectMyPosts(Db,UserId){
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
