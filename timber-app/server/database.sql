/* Database dump file */
/*add the following commands to your local postgresql*/

CREATE DATABASE timberapp;

/* Destination Data */
CREATE TABLE destination (
    destination_name text,
    PRIMARY KEY (destination_name)
);

INSERT INTO destination(destination_name) VALUES ('Grand Canyon');
INSERT INTO destination(destination_name) VALUES ('Camelback Mountain');
INSERT INTO destination(destination_name) VALUES ('A Mountain at Hayden Butte');
INSERT INTO destination(destination_name) VALUES ('South Mountain');
INSERT INTO destination(destination_name) VALUES ('Zion National Park');
INSERT INTO destination(destination_name) VALUES ('Palo Duro Canyon');
INSERT INTO destination(destination_name) VALUES ('Enchanted Rock');
INSERT INTO destination(destination_name) VALUES ('Joshua Tree National Park');
INSERT INTO destination(destination_name) VALUES ('Yosemite National Park');
INSERT INTO destination(destination_name) VALUES ('Silver Falls State Park');


/* Hiker Data */
CREATE TABLE hiker (
    hiker_userid integer,
    hiker_username varchar(255),
    hiker_password varchar(255),
    hiker_state varchar(255),
    PRIMARY KEY (hiker_userid)
);

INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(1, 'shairaalam', 'shairapw', 'TX');
INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(2, 'geneaguas', 'genepw', 'CA');
INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(3, 'arianabui', 'shairapw', 'AZ');
INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(4, 'airasanagustin', 'airapw', 'FL');

/* Trail Data */
CREATE TABLE trail (
    trail_name text,
    trail_length double precision,
    trail_hoursOpen integer,
    trail_difficulty text,
    trail_elevationGain integer,
    PRIMARY KEY (trail_name)
);

INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Bright Angel Trail',12,NULL,'hard',4380);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Hermit Trail',17.5,NULL,'hard',5059);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Bright Angel Point Trail',0.5,NULL,'easy',144);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Transept Trail',3,NULL,'medium',282);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Bridle Trail',1.2,NULL,'easy',255);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Ken Patrick Trail',10,NULL,'hard',1236);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Uncle Jim Trail',5,NULL,'easy',731);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Widforss Trail',10,NULL,'medium',1036);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Cape Royal Trail',0.6,NULL,'easy',65);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Cliff Springs Trail',1,NULL,'easy',308);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Cape Final Trail',4,NULL,'easy',495);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Roosevelt Point Trail',0.2,NULL,'easy',13);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Point Imperial Trail',4,NULL,'easy',472);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Leonarad Monti Trail',0.9,NULL,'easy',232);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Echo Canyon Trail',2.5,NULL,'hard',1420);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Cholla Trail',2.6,NULL,'hard',1204);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain)
VALUES ('Kiwanis Trail',2.7,NULL,'medium',577);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Telegraph Pass Trail',2.3,NULL,'medium',492);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Pyramid Trail',6,NULL,'medium',1240);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Midlife Crisis Trail and National Trail Loop',5.3,NULL,'hard',1046);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Marcos de Niza & Pima',1.7,NULL,'medium',331);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Trail of Ten Falls',7.4,NULL,'medium',1151);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Angels Landing Trail',4.4,NULL,'hard',1604);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('The Zion Narrows Riverside Walk',1.9,NULL,'easy',193);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('The Watchman Trail',3.1,NULL,'medium',636);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('The Lighthouse Trail',5.8,NULL,'medium',521);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Rock Garden Trail',5,NULL,'medium',777);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Enchanted Rock Summit Trail',1.3,NULL,'medium',419);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Ryan Mountain Trail',3,NULL,'medium',1069);
INSERT INTO trail(trail_name,trail_length,trail_hoursOpen,trail_difficulty,trail_elevationGain) 
VALUES ('Upper Yosemite Falls Trail',7.6,NULL,'hard',3218);


/* Acessibility Data */
CREATE TABLE accessibility (
    trail_name text,
    acc_petFriendly text,
    acc_parkingCost double precision,
    PRIMARY KEY (trail_name),
    FOREIGN KEY (trail_name) REFERENCES trail ON DELETE CASCADE
);

INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Bright Angel Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Hermit Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Bright Angel Point Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Transept Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Bridle Trail','yes',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Ken Patrick Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Uncle Jim Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Widforss Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Cape Royal Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Cliff Springs Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Cape Final Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Roosevelt Point Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Point Imperial Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Leonarad Monti Trail','yes',2);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Echo Canyon Trail','no',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Cholla Trail','no',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Kiwanis Trail','yes',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Telegraph Pass Trail','yes',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Pyramid Trail','yes',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Midlife Crisis Trail and National Trail Loop','no',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Marcos de Niza & Pima','yes',0);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Trail of Ten Falls','no',5);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Angels Landing Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('The Zion Narrows Riverside Walk','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('The Watchman Trail','no',35);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('The Lighthouse Trail','yes',8);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Rock Garden Trail','yes',8);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Enchanted Rock Summit Trail','no',8);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Ryan Mountain Trail','no',30);
INSERT INTO accessibility(trail_name,acc_petFriendly,acc_parkingCost) VALUES ('Upper Yosemite Falls Trail','no',35);

/* Location Data */
CREATE TABLE location (
    location_coordinate text,
    location_state text,
    location_city text,
    location_zipcode integer,
    location_address text,
    PRIMARY KEY (location_coordinate)
) ;

INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('36.0544° N, 112.1401° W','AZ','Grand Canyon',86023,'Grand Canyon National Park, Grand Canyon, AZ 86023');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('33.5151° N, 111.9619° W','AZ','Phoneix',85018,'4925 E McDonald Dr, Phoenix, AZ 85018');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('33.4283° N, 111.9359° W','AZ','Tempe',85291,'E Rio Salado Pkwy & S Mill Ave, Tempe, AZ 85281');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('33.3335° N, 112.0622° W','AZ','Phoneix',85042,'10919 S Central Ave, Phoenix, AZ 85042');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('37.2982° N, 113.0263° W','UT','Springdale',84767,'1 Zion Park Blvd, Springdale, UT 84767');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('34.9373° N, 101.6589° W','TX','Canyon',79015,'11450 State Hwy Park Rd 5, Canyon, TX 79015');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('30.5066° N, 98.8189° W','TX','Fredericksburg',78624,'16710 Ranch Rd 965, Fredericksburg TX, 78624');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('33.8734° N, 115.9010° W','CA','Twentynine Palms',92277,'74485 National Park Drive, Twentynine Palms, CA 92277');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('37.8651° N, 119.5383° W','CA','Yosemite National Park',95389,'Tioga Rd Hwy 120 & Hwy 140 Yosemite National Park, CA 95389');
INSERT INTO location(location_coordinate,location_state,location_city,location_zipcode,location_address) 
VALUES ('44.8652° N, 122.6262° W','OR','Sublimity',97385,'20024 Silver Falls Hwy SE, Sublimity, OR 97385');

/* Climate Data */
CREATE TABLE climate (
    location_coordinate text,
    climate_season text,
    climate_rainChance double precision,
    climate_temp double precision,
    climate_humidity double precision,
    PRIMARY KEY (climate_season, location_coordinate),
    FOREIGN KEY (location_coordinate) REFERENCES location ON DELETE CASCADE
);

/* Favorites Data */
CREATE TABLE favorites (
    hiker_userid integer,
    destination_name text,
    PRIMARY KEY (hiker_userid, destination_name),
    FOREIGN KEY (hiker_userid) REFERENCES hiker ON DELETE CASCADE,
    FOREIGN KEY (destination_name) REFERENCES destination ON DELETE CASCADE
);

INSERT INTO favorites (hiker_userid,destination_name) VALUES(1,'Grand Canyon');
INSERT INTO favorites (hiker_userid,destination_name) VALUES(2,'Zion National Park');
INSERT INTO favorites (hiker_userid,destination_name) VALUES(3,'Camelback Mountain');
INSERT INTO favorites (hiker_userid,destination_name) VALUES(3,'Grand Canyon');
INSERT INTO favorites (hiker_userid,destination_name) VALUES(4,'Zion National Park');
INSERT INTO favorites (hiker_userid,destination_name) VALUES(4,'Camelback Mountain');
INSERT INTO favorites (hiker_userid,destination_name) VALUES(4,'Grand Canyon');

/* is_located Data */
CREATE TABLE is_located (
    destination_name text,
    location_coordinate text,
    PRIMARY KEY (destination_name),
    FOREIGN KEY (destination_name) REFERENCES destination ON DELETE CASCADE,
    FOREIGN KEY (location_coordinate) REFERENCES location ON DELETE CASCADE
);

INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Grand Canyon','36.0544° N, 112.1401° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Camelback Mountain','33.5151° N, 111.9619° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('A Mountain at Hayden Butte','33.4283° N, 111.9359° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('South Mountain','33.3335° N, 112.0622° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Zion National Park','37.2982° N, 113.0263° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Palo Duro Canyon','34.9373° N, 101.6589° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Enchanted Rock','30.5066° N, 98.8189° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Joshua Tree National Park','33.8734° N, 115.9010° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Yosemite National Park','37.8651° N, 119.5383° W');
INSERT INTO is_located(destination_name,location_coordinate) VALUES ('Silver Falls State Park','44.8652° N, 122.6262° W');

/* has_trail Data */
CREATE TABLE has_trail (
    trail_name text,
    destination_name text,
    PRIMARY KEY (trail_name),
    FOREIGN KEY (trail_name) REFERENCES trail ON DELETE CASCADE,
    FOREIGN KEY (destination_name) REFERENCES destination ON DELETE CASCADE
);

INSERT INTO has_trail(trail_name,destination_name) VALUES ('Bright Angel Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Hermit Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Bright Angel Point Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Transept Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Bridle Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Ken Patrick Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Uncle Jim Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Widforss Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Cape Royal Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Cliff Springs Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Cape Final Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Roosevelt Point Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Point Imperial Trail','Grand Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Leonarad Monti Trail','A Mountain at Hayden Butte');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Echo Canyon Trail','Camelback Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Cholla Trail','Camelback Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Kiwanis Trail','South Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Telegraph Pass Trail','South Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Pyramid Trail','South Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Midlife Crisis Trail and National Trail Loop','South Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Marcos de Niza & Pima','South Mountain');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Trail of Ten Falls','Silver Falls State Park');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Angels Landing Trail','Zion National Park');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('The Zion Narrows Riverside Walk','Zion National Park');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('The Watchman Trail','Zion National Park');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('The Lighthouse Trail','Palo Duro Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Rock Garden Trail','Palo Duro Canyon');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Enchanted Rock Summit Trail','Enchanted Rock');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Ryan Mountain Trail','Joshua Tree National Park');
INSERT INTO has_trail(trail_name,destination_name) VALUES ('Upper Yosemite Falls Trail','Yosemite National Park');

/*import csv to pgadmin*/
