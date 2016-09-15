"use strict";

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('InstaDB.sqlites');


SelectUserProfile(db, 'UserId');
function SelectUserProfile(db,UserId){
    return new Promise(function (resolve,reject) {
        db.each("SELECT name, profile, T.Text from User U join Tweet T where U.Name=T.Author and U.Name='"+UserId+"'", function (err, row) {
            if (err) {
                reject(err);
                console.log(err);

            }else {
                console.log(row);
                resolve();
            }
        });
    });
}
