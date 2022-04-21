/* Database dump file */
/*add the following commands to your local postgresql*/

CREATE DATABASE timberapp;

/*hiker data only*/
CREATE TABLE hiker (
    hiker_userid integer,
    hiker_username varchar(255),
    hiker_password varchar(255),
    hiker_state varchar(255),
    PRIMARY KEY (hiker_userid)
);

INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(1, 'shairaalam', 'shairapw', 'tx');
INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(2, 'geneaguas', 'genepw', 'ca');
INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(3, 'arianabui', 'shairapw', 'az');
INSERT INTO hiker(hiker_userid, hiker_username, hiker_password, hiker_state) 
VALUES(4, 'airasanagustin', 'airapw', 'fl');