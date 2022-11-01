CREATE DATABASE Blog_DB;
USE Blog_DB;

CREATE TABLE IF NOT EXISTS Users (
	id int not null auto_increment,
	username varchar(100) not null unique,
	password varchar(255) not null,
	full_name varchar(255) not null,
	profile_img varchar(255),
	email varchar(255) not null unique,
	phone_number varchar(15) not null,
	country varchar(30) not null,
	dob date not null,
	date_created timestamp default current_timestamp,
	role_id int default 2,
    refresh_token varchar(255),

	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Roles(
	id int not null auto_increment,
	role_name varchar(15) not null,

	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Permision(
	per_id int not null auto_increment,
	per_name varchar(50) not null,

	PRIMARY KEY (per_id)
);

CREATE TABLE IF NOT EXISTS Permision_Roles(
	id int not null auto_increment,
	role_id int not null,
	per_id int not null,
	isLicensed boolean default false,

	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Balances(
	user_id int not null,
	coin float not null default 0,
	sub_balances float not null default 0,

	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS Blog(
	blog_id int not null auto_increment,
	author_id int not null,
	title varchar(255) not null,
	content text not null,
	image varchar(255),
	category_id int not null,
	total_rate int not null default 0,
	date_created timestamp default current_timestamp,

	PRIMARY KEY (blog_id)
);

CREATE TABLE IF NOT EXISTS Category(
	id int not null auto_increment,
	cate_name varchar(50) not null,

	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Rate(
	rate_id int not null auto_increment,
	blog_id int not null,
	user_id int not null,
	rating int not null default 0,
	isRating boolean default false,

	PRIMARY KEY (rate_id)
);

CREATE TABLE IF NOT EXISTS Comment(
	id int not null auto_increment,
	user_id int not null,
	blog_id int not null,
	content text not null,
	date_created timestamp default current_timestamp,
	total_like int default 0,

	PRIMARY KEY (id)
); 

CREATE TABLE IF NOT EXISTS LikeComment(
	id int not null auto_increment,
	comment_id int not null,
	user_id int not null,
	isLiked boolean,

	PRIMARY KEY (id)
);

ALTER TABLE Users ADD FOREIGN KEY (role_id) REFERENCES Roles (id)  ON DELETE CASCADE;

ALTER TABLE Permision_Roles ADD FOREIGN KEY (role_id) REFERENCES Roles (id)  ON DELETE CASCADE;
ALTER TABLE Permision_Roles ADD FOREIGN KEY (per_id) REFERENCES Permision (per_id)  ON DELETE CASCADE;

ALTER TABLE Blog ADD FOREIGN KEY (author_id) REFERENCES Users (id)  ON DELETE CASCADE;
ALTER TABLE Blog ADD FOREIGN KEY (category_id) REFERENCES Category (id)  ON DELETE CASCADE;

ALTER TABLE Rate ADD FOREIGN KEY (blog_id) REFERENCES Blog (blog_id)  ON DELETE CASCADE;
ALTER TABLE Rate ADD FOREIGN KEY (user_id) REFERENCES Users (id)  ON DELETE CASCADE;

ALTER TABLE Comment ADD FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE;
ALTER TABLE Comment ADD FOREIGN KEY (blog_id) REFERENCES Blog (blog_id) ON DELETE CASCADE;

ALTER TABLE LikeComment ADD FOREIGN KEY (comment_id) REFERENCES Comment (id) ON DELETE CASCADE;
ALTER TABLE LikeComment ADD FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE;


INSERT INTO Users (username, password, full_name, profile_img, email, phone_number, country, dob, role_id) VALUES ('Longlq2', '123456789', 'Le Quang Long', 'myLinkImage', 'lqlong@gmail.com','021 123 0125','Viet Nam', '2001-01-01',2);
INSERT INTO Users (username, password, full_name, email, phone_number, country, dob, role_id) VALUES ('admin', '123456789', 'Admintrator', 'admin@gmail.com','054 012 4562','Viet Nam', '2001-01-01',1);

INSERT INTO Category (cate_name) VALUES ('Foods');
INSERT INTO Category (cate_name) VALUES ('Travels');
INSERT INTO Category (cate_name) VALUES ('Healthy');
INSERT INTO Category (cate_name) VALUES ('Lifestyle');
INSERT INTO Category (cate_name) VALUES ('Fashion & beauty');
INSERT INTO Category (cate_name) VALUES ('Persional');
INSERT INTO Category (cate_name) VALUES ('Study');

INSERT INTO Blog (author_id, title, content, category_id) VALUES (4,'EXPERIENCE “DEATH” SWING IN VIETNAM', 'Many people once dreamed of experiencing the “death” Bali Swing hovering in Indonesia without knowing that even in Vietnam you can also try this free flying feeling. 
Located on a farm named Bong Lai Swing Nature Farm, about 40 km from Dong Hoi airport, Quang Binh province, this “death” swing is attracting a lot of visitors to come here to challenge yourself.
The farm is located among flower gardens, guava gardens surrounded by immense hills and mountains. Right below is a cool, wild, beautiful stream as in the fairy-tales. This type of amusement was operated by the owner 2 years ago and is increasingly attracting more and more visitors to Quang Binh. The swing is pulled by a 7.5 m long rope connected from two ancient cajuput trees planted 10 years ago.
The swing can fly about 15 meters above the water of the stream, making visitors feel completely suspended in the blue sky. You will be securely attached to the chair by a protective belt and pushed by a farm worker to create momentum.',2);

INSERT INTO Roles (role_name) VALUES ("Admintrator");
INSERT INTO Roles (role_name) VALUES ("Normal user");

INSERT INTO Permision (per_name) VALUES ("View");
INSERT INTO Permision (per_name) VALUES ("Post");
INSERT INTO Permision (per_name) VALUES ("Update");
INSERT INTO Permision (per_name) VALUES ("Delete");

INSERT INTO Permision_Roles (role_id, per_id, isLicensed) VALUES (1,1,true);
INSERT INTO Permision_Roles (role_id, per_id, isLicensed) VALUES (1,2,true);
INSERT INTO Permision_Roles (role_id, per_id, isLicensed) VALUES (1,3,true);
INSERT INTO Permision_Roles (role_id, per_id, isLicensed) VALUES (1,4,true);
INSERT INTO Permision_Roles (role_id, per_id, isLicensed) VALUES (2,1,true);







