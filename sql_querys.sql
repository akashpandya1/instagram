Select U.Name, U.ProfilePic, p.Posts, f.Followers from User U, (select count(*) as Posts from Post) as p, (select count(FollowerId) as Followers from Following, User U where U.PK_user=FollowerId) as f where U.Name = 'LindseyLow'

select count(U.name) from User U where name='LindseyLow'

select U.name from User where name='LindseyLow'


select * from Post

select * from following

--count posts
--count followers
--count following


