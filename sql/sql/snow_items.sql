-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: snow
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (25,'Taco','2018-07-08 20:06:14','2018-07-20 00:10:42',19,'Mexican food',1.9900,'/images/tacodino.jpg',1,NULL),(26,'Shoe','2018-07-09 19:16:47','2018-07-22 18:57:29',20,'Footwear',29.9900,'/images/shoe.jpg',20,'Shoe'),(27,'Shoelaces','2018-07-09 19:17:44','2018-07-20 00:06:08',20,'Comes in many colors',9.9900,'/images/shoelaces.jpg',3,NULL),(28,'Shoe Cleaner','2018-07-09 19:18:14','2018-07-09 19:18:14',20,'Cleans shoes for that perfect shine',14.9900,'/images/shoecleaner.jpg',NULL,NULL),(29,'Gelato Spoon','2018-07-09 19:24:05','2018-07-09 19:24:05',21,'Spoons for gelato (bundle of 100)',6.0000,'/images/gelatospoon.jpg',NULL,NULL),(30,'Gelato Flavors','2018-07-09 19:27:45','2018-07-09 19:27:45',21,'24 gelato flavors',1500.0000,'/images/gelatoflavors.jpg',NULL,NULL),(31,'Paper Napkins','2018-07-09 19:34:46','2018-07-09 19:34:46',21,'(Bundle of 250) Disposable papers',8.9900,'/images/papernapkins.jpg',NULL,NULL),(32,'Guitar','2018-07-09 20:17:02','2018-07-09 20:17:02',22,'Anyways here\'s Wonderwall',149.9900,'/images/guitar.jpg',NULL,NULL),(33,'Guitar Strings','2018-07-09 20:17:45','2018-07-09 20:17:45',22,'7 sets of guitar strings',7.9900,'/images/guitarstrings.jpg',NULL,NULL),(34,'Guitar Amplifier','2018-07-09 20:18:24','2018-07-09 20:18:24',22,'LET THE WHOLE NEIGHBORHOOD HEAR US',83.9900,'/images/guitaramp.jpg',NULL,NULL),(35,'Silverfang','2018-07-17 23:27:19','2018-07-17 23:27:19',22,'Rework',10.0000,'/images/silverfang.png',NULL,NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-30 17:59:38
