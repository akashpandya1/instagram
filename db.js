"use strict";

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('InstaDB.sqlite');


SelectUserProfile(db,4);
function SelectUserProfile(db,UserId){
    return new Promise(function (resolve,reject) {
        db.each("Select U.Name, U.ProfilePic, p.Posts, f.Followers, fe.Followee from User U,(select count(PosterId) as Posts from Post, User U where "+UserId+"=PosterId) as p,(select count(FollowerId) as Followers from Following, User U where "+UserId+"=FollowerId) as f,(select count(FolloweeId) as Followee from Following, User U where "+UserId+"=FolloweeId) as fe where U.PK_user = "+UserId+"", function (err, row) {
            if (err) {
                reject(err);
                console.log(err);

            }else {

                var profileResult=JSON.stringify(row);
                console.log(profileResult);
                return profileResult;
                resolve();
            }
        });
    });
}
