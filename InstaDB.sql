CREATE TABLE User(  
  PK_User INTEGER NOT NULL PRIMARY KEY,  
  Name  TEXT,
  ProfilePic TEXT 
);  
CREATE TABLE Post(
  PK_Post    INTEGER NOT NULL PRIMARY KEY,    
  PosterId  int,
  PostPic TEXT,    
  PostTime DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(PosterId) REFERENCES User(PK_User)  
);
Create Table Following(
PK_Following INTEGER NOT NULL PRIMARY KEY,
FollowerId int,
FolloweeId int,
FOREIGN KEY(FollowerId) REFERENCES User(PK_User),
FOREIGN KEY(FolloweeId) REFERENCES User(PK_User)
);
Create Table LikePic(
LikerId int,
PostPicId int,
FOREIGN KEY(LikerId) REFERENCES User(PK_User),
FOREIGN KEY(PostPicId) REFERENCES Post(PK_Post)
);

Create Table Comment(
PK_Comment Integer not null primary key,
CommenterId int,
PostId int,
Text TEXT,
CommTime DATETIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(CommenterId) REFERENCES User(PK_User),
FOREIGN KEY(PostId) REFERENCES Post(PK_Post)
);
