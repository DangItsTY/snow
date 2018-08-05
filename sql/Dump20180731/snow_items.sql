-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: snow
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `owner` int(11) NOT NULL,
  `description` varchar(45) DEFAULT '',
  `price` decimal(13,4) DEFAULT '0.0000',
  `image` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT 'Items',
  `stock` int(11) NOT NULL DEFAULT '0',
  `barcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `owner_idx` (`owner`),
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (25,'Hammer','2018-05-16 02:01:58','2018-07-29 12:52:05',19,'The hammer of justice.',9.9900,'/images/hammer.png','Items',99,NULL),(26,'Belt','2018-05-16 02:02:36','2018-07-29 12:52:05',19,'Utility belts are always useful!',19.9900,'/images/belt.png','Items',99,NULL),(27,'Board','2018-05-16 02:03:18','2018-07-29 12:52:05',19,'Fortify your building with boards',5.9900,'/images/board.png','Items',99,NULL),(28,'ice','2018-05-17 21:29:01','2018-07-29 12:52:05',21,'',6.0000,'/images/taro.jpg','Items',99,NULL),(29,'barcode','2018-05-19 19:20:51','2018-07-29 12:52:05',23,'i have numbers',100.0000,'/images/image-001.jpg','Items',99,NULL),(30,'test','2018-05-19 19:23:30','2018-07-29 12:52:05',23,'test',1.0000,'/images/image-001.jpg','Items',99,NULL),(31,'test2','2018-05-19 19:26:48','2018-07-29 12:52:05',23,'test2',1.0000,'/images/image-001.jpg','Items',99,NULL),(32,'test4','2018-05-19 19:28:53','2018-07-29 12:52:05',23,'test4',1.0000,'/images/greentea.jpg','Items',99,NULL),(33,'test5','2018-05-19 19:30:37','2018-07-29 12:52:05',23,'test5',1.0000,'/images/hammer.png','Items',99,NULL),(34,'test6','2018-05-19 19:32:24','2018-07-29 12:52:05',23,'test6',1.0000,'/images/coffee.jpg','Items',99,NULL),(35,'test7','2018-05-19 19:34:44','2018-07-29 12:52:05',23,'test7',1.0000,'/images/board.png','Items',99,NULL),(36,'test8','2018-05-19 19:35:31','2018-07-29 12:52:05',23,'test8',1.0000,'/images/15209068594485352251608891446552.jpg','Items',99,NULL),(37,'test9','2018-05-19 19:38:57','2018-07-29 12:52:05',23,'test9',1.0000,'/images/car.png','Items',99,NULL),(38,'test9','2018-05-19 19:39:10','2018-07-29 12:52:05',23,'test9',1.0000,'/images/car.png','Items',99,NULL),(39,'test10','2018-05-19 19:41:25','2018-07-29 12:52:05',23,'test10',2.0000,'/images/background.png','Items',99,NULL),(40,'glue','2018-07-15 20:14:03','2018-07-29 12:52:05',19,'holds things together',1.9900,'/images/glue.png','Items',99,NULL),(41,'spoon','2018-07-29 14:30:35','2018-07-29 14:30:35',23,'useful',8.0000,'/images/gelatospoon.jpg','Items',0,NULL),(42,'spoon2','2018-07-29 14:34:10','2018-07-29 14:48:59',23,'',2.0000,'/images/gelatospoon.jpg','Items',0,NULL),(43,'spoon3','2018-07-29 14:36:35','2018-07-29 14:48:59',23,'',6.0000,'/images/gelatospoon.jpg','Items',0,NULL),(44,'spoon4','2018-07-29 14:37:51','2018-07-29 14:48:59',23,'',8.0000,'/images/gelatospoon.jpg','Items',0,NULL),(45,'spoon5','2018-07-29 14:39:14','2018-07-29 14:48:59',23,'',9.0000,'/images/gelatospoon.jpg','Items',0,NULL),(46,'spoon6','2018-07-29 14:40:48','2018-07-29 14:48:59',23,'',2.0000,'/images/gelatospoon.jpg','Items',0,NULL),(47,'spoon7','2018-07-29 14:41:23','2018-07-29 14:48:59',23,'',4.0000,'/images/gelatospoon.jpg','Items',0,NULL),(48,'spoon8','2018-07-29 14:42:07','2018-07-29 14:48:59',23,'',7.0000,'/images/gelatospoon.jpg','Items',0,NULL),(52,'spoon13','2018-07-29 15:46:18','2018-07-29 15:46:18',23,'',0.0000,'/images/gelatospoon.jpg','Items',0,NULL),(53,'spoon14','2018-07-29 16:02:00','2018-07-29 16:02:00',23,'',0.0000,'/images/gelatospoon.jpg','Items',0,NULL),(54,'spoon15','2018-07-29 16:05:22','2018-07-29 16:05:22',23,'',0.0000,'/images/gelatospoon.jpg','Items',0,'0001285112001000040801'),(55,'taco','2018-07-29 17:48:49','2018-07-29 17:48:49',23,'',0.0000,'/images/tacodino.jpg','Items',85,NULL);
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

-- Dump completed on 2018-07-31  5:49:27
