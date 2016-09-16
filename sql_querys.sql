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
 
 Insert into Post (PosterId, PostPic) values ('4','fatcat')
 
 Select * from Post
 where posterid='4' and postpic='fatcat'
 
 Insert into Comment (CommenterId, PostId, Text) values ('4',(Select PK_Post from Post
 where posterid='4' and postpic='fatcat'),'i love my fat cat')
 
 select * from comment
 
 
 INSERT INTO [DB_A].[dbo.a_test](a,b,c, d)
    select p.product_info, p.product_date, p.smth, pr.program_name, pr.program_smth
    FROM [DB_B].dbo.products p LEFT JOIN
         [DB_B].dbo.program pr
         ON p.program_name = pr.product_info;


