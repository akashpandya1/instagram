Select U.Name, U.ProfilePic, p.Posts, f.Followers, fe.Followee from User U,(select count(PosterId) as Posts from Post, User U where U.PK_user=PosterId) as p,(select count(FollowerId) as Followers from Following, User U where U.PK_user=FollowerId) as f,(select count(FolloweeId) as Followee from Following, User U where U.PK_User=FolloweeId) as fe where U.Name = 'LindseyLow'

select count(U.name) from User U where name='LindseyLow'

select U.name from User where name='LindseyLow'


select * from Post

select * from following

--count posts
--count followers
--count following

ALTER TABLE Comment
 ADD Text Text
 
 ALTER TABLE Post DROP COLUMN PostDesc
 
 select * from Comment


