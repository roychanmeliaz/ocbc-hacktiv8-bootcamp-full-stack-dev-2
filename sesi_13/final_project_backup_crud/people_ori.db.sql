BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "note" (
	"note_id"	INTEGER NOT NULL,
	"person_id"	INTEGER,
	"content"	VARCHAR NOT NULL,
	"timestamp"	DATETIME,
	PRIMARY KEY("note_id"),
	FOREIGN KEY("person_id") REFERENCES "person"("person_id")
);
CREATE TABLE IF NOT EXISTS "person" (
	"person_id"	INTEGER NOT NULL,
	"lname"	VARCHAR(32),
	"fname"	VARCHAR(32),
	"timestamp"	DATETIME,
	PRIMARY KEY("person_id")
);
INSERT INTO "note" VALUES (1,1,'Cool, a Hacktiv8 mini-blogging application!','2019-01-06 22:17:54.000000');
INSERT INTO "note" VALUES (2,1,'This could be useful','2019-01-08 22:17:54.000000');
INSERT INTO "note" VALUES (3,1,'Well, sort of useful','2019-03-06 22:17:54.000000');
INSERT INTO "note" VALUES (4,2,'I''m going to make really profound observations','2019-01-07 22:17:54.000000');
INSERT INTO "note" VALUES (5,2,'Maybe they''ll be more obvious than I thought','2019-02-06 22:17:54.000000');
INSERT INTO "note" VALUES (6,3,'Has anyone seen my eggs?','2019-01-07 22:47:54.000000');
INSERT INTO "note" VALUES (7,3,'I''m really late delivering these!','2019-04-06 22:17:54.000000');
INSERT INTO "person" VALUES (1,'Ardhi','Raka','2021-11-16 04:02:19.662551');
INSERT INTO "person" VALUES (2,'Anggie','Rinintha','2021-11-16 04:02:19.665197');
INSERT INTO "person" VALUES (3,'Wijaya','Safran','2021-11-16 04:02:19.665724');
COMMIT;
