CREATE EXTENSION "pgcrypto";

create table cleanarch.item (
  id uuid default gen_random_uuid (), 
  description text,
  price double precision,
  weight double precision,
  width double precision,
  height double precision,
  length double precision,
  primary key (id)
)

insert into cleanarch.item (id,description, price, width, height, length, weight) values ('37341e45-afb0-4421-b0be-765cb4c85c47','Guitarra', 1000, 100, 50, 15, 3);
insert into cleanarch.item (id,description, price, width, height, length, weight) values ('530c130b-41c3-427f-abef-9c631eb05ce9','Amplificador', 5000, 50, 50, 50, 22);
insert into cleanarch.item (id,description, price, width, height, length, weight) values ('eaa6dc14-6563-489f-b8ae-fecbbedaa48a','Cabo', 30, 10, 10, 10, 1);


