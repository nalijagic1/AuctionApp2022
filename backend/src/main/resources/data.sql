INSERT INTO category VALUES (1,'Fashion'),
                            (2,'Accesories'),
                            (3,'Jewlery'),
                            (4,'Shoes'),
                            (5,'Sportwere'),
                            (6,'Home'),
                            (7,'Electronics'),
                            (8,'Mobile'),
                            (9,'Computer');
COMMIT;
INSERT INTO product (id,name,description,starting_date,ending_date,starting_price) VALUES (1,'Lead Hook Jigging Lures Bait Feather Jig Fish Head','They create lifelike swimming actions in water. 3D eyes make it a powerful catching tool. Bright colors to attract big fish','2022-06-15','2022-07-15',13),
                                                                                          (2,'Ageless Real Eye Cream for face','Korea cosmetic. Multi function, All in one Cream : Eye treatment, Facial treatment.','2022-07-03','2022-07-12',15),
                                                                                          (3,'New Balance 997H Mens Running Sport Lifestyle Shoes','Synthetic upper.Lightweight injection-molded EVA foam midsole provides lightweight cushioning. Rubber outsole','2022-07-04','2022-07-27',50),
                                                                                          (4,'Morgan Silver Dollar San Francisco First Strike Label ','High Grade 1885 Morgan Silver Dollar PCGS 66+, Oh so Close to 67!','2022-07-06','2022-07-12',100),
                                                                                          (5,'Iron Man Avengers Endgame Marvel Action Figure','Size: approx 7 inch.Package: 1x action figure ( Including accessories show in pictures)','2022-07-05','2022-07-19',22.3),
                                                                                          (6,'Rare YAMAHA YP-450 (1975) Turntable In Excellent Condition.','It’s extremely well built and extraordinarily elegant. This is a fully manual, high end belt drive with a nice, thick platter and a lovely S-type tonearm. ','2022-05-03','2022-07-30',75),
                                                                                          (7,'Antique Art Deco Washington Silverplated Bowl With Markings','Size - about 3 inches height - 4 inches diameter, 7cm height - 10cm diameter. Condition - got dents, scratches and damages on the plating, need of cleaning.','2022-07-05','2022-07-24',30.89),
                                                                                          (8,'RARE ANTIQUE DUTCH GRANDFATHER CLOCK PORTRE','One of a kind early 1800s burled walnut portre montre shaped like a Dutch grandfather clock. With claw feet and a brass front. In the centre hangs the pocket watch.The clock runs great.','2022-06-30','2022-09-19',79),
                                                                                          (9,'SONY PSP Playstation Portable Console Only+ Battery Various colors Used','condition is good. It is a warehouse storage item. There may be some scratches during storage.','2022-07-06','2022-07-18',30);
COMMIT;
INSERT INTO picture VALUES (1,'https://i.ebayimg.com/images/g/nMEAAOSwZ6lixPMT/s-l500.png',1),
                           (2,'https://i.ebayimg.com/images/g/yDEAAOSwjwJgPHFr/s-l1600.jpg',2),
                           (3,'https://i.ebayimg.com/images/g/kZ4AAOSwyDJivWLP/s-l1600.jpg',3),
                           (4,'https://i.ebayimg.com/images/g/EqwAAOSwBX1hykrg/s-l500.jpg',4),
                           (5,'https://i.ebayimg.com/images/g/BSoAAOSwKPdhXxme/s-l500.jpg',5),
                           (6,'https://i.ebayimg.com/images/g/hfkAAOSwXBdis81I/s-l500.jpg',6),
                           (7,'https://i.ebayimg.com/images/g/Yl8AAOSwB3BaCF~W/s-l500.jpg',7),
                           (8,'https://i.ebayimg.com/images/g/X2MAAOSwY1Vhk9Yo/s-l500.jpg',8),
                           (9,'https://i.ebayimg.com/images/g/HfcAAOSwOAViGkIb/s-l500.jpg',9)
