create table shoecategories (
                       id serial not null primary key,
                       nameOfCategory varchar(255) not null
);
insert into shoecategories (nameOfCategory) values ('Male');
insert into shoecategories (nameOfCategory) values ('Female');
create table shoes (
                       id serial not null primary key,
                       nameOfShoe varchar(255) not null,
                       priceOfShoe int not null,
                       sizeOfShoe int not null,
                       colorOfShoe varchar(255) not null,
                       quantityOfShoe int not null,
                       linkToImage varchar(255) not null,
                       categoryOfShoe text not null
);
create table users (
                       id serial not null primary key,
                       username text unique not null,
                       password text unique not null,
                       createdAt text NOT NULL,
                       active boolean not null DEFAULT false
);
