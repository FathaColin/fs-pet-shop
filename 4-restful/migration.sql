DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    name varchar(20),
    kind varchar(20),
    age int
);

INSERT INTO pets (name, kind, age) VALUES ('bobby', 'dog', 20);
INSERT INTO pets (name, kind, age) VALUES ('jesus', 'snake', 2);
INSERT INTO pets (name, kind, age) VALUES ('billy', 'rat', 45);