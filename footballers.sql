drop table if exists 
	season_2009, 
	season_2010, 
	season_2011, 
	season_2012, 
	season_2013, 
	season_2014, 
	season_2015,
	season_2016, 
	season_2017,
	season_2018,
	season_2019,
	season_2020,
	users;
	
-- drop tables
drop table if exists users cascade;
drop table if exists teams cascade;
drop table if exists favorites cascade;

-- create user table
create table users (
    user_id serial primary key,
    user_email text,
    user_password text
);
insert into users (user_email, user_password) values ('bugs@gmail.com', 'carrots');
select * from users;

-- create teams table
create table teams(
	team_id serial primary key,
	team_name text
);
insert into teams (team_name) values ('Atletico Madrid');
insert into teams (team_name) values ('Barcelona');
select * from teams;

-- create favorites table
create table favorites(
	favorite_id serial primary key,
	user_id integer references users(user_id),
	team_id integer references teams(team_id)
);
insert into favorites (user_id, team_id) values ('1', '1');
insert into favorites (user_id, team_id) values ('1', '2');
select * from favorites;

-- use a join 
select users.user_email, 
	users.user_id, 
	teams.team_id, 
	teams.team_name from users
	join favorites on favorites.user_id = users.user_id
	join teams on teams.team_id = favorites.team_id;
