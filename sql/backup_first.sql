CREATE DATABASE  IF NOT EXISTS `snow` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `snow`;
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
  `description` varchar(45) DEFAULT NULL,
  `price` decimal(13,4) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `owner_idx` (`owner`),
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'gachapon','2018-01-14 21:43:32','2018-01-14 21:47:57',1,NULL,NULL,NULL),(6,'gogacha','2018-01-14 21:53:35','2018-01-14 21:53:35',1,NULL,NULL,NULL),(7,'gogacha','2018-01-14 21:53:45','2018-01-14 21:53:45',1,NULL,NULL,NULL),(10,'yoyo','2018-01-15 06:10:56','2018-01-15 06:10:56',1,NULL,NULL,NULL),(11,'yoyo','2018-01-15 06:16:37','2018-01-15 06:16:37',1,'undefined',1.0000,NULL),(12,'ty','2018-01-21 21:45:16','2018-01-21 21:45:16',1,'a test',1.0000,NULL),(13,'Basic Item','2018-03-10 16:11:06','2018-03-10 16:11:06',3,'A basic item that provides value to customers',3.9900,NULL),(14,'item','2018-03-10 17:04:29','2018-03-10 17:04:29',1,'an item',2.9000,'C:projectssnow/images/background.png'),(15,'item2','2018-03-10 17:06:32','2018-03-10 17:09:08',3,'anitem2',2.9000,'/images/background.png'),(16,'Green Tea','2018-03-10 19:12:28','2018-03-10 19:12:28',3,'Yummy',5.9900,'/images/greentea.jpg'),(17,'cheese','2018-03-10 19:50:19','2018-03-10 19:50:19',4,'mmm',1.9900,'/images/mango.jpg'),(18,'Brick','2018-03-10 20:39:32','2018-03-10 20:39:32',5,'Its a brick',4.9900,'/images/strawberry.jpg'),(19,'Mulch','2018-03-10 20:40:21','2018-03-10 20:40:21',5,'tiny trees',500.0000,'/images/coffee.jpg'),(20,'coffee','2018-03-11 16:38:53','2018-03-11 16:38:53',3,'delicious',1.9900,'/images/coffee.jpg'),(21,'Carpet','2018-03-11 19:34:54','2018-03-11 19:34:54',3,'Home',199.9900,'/images/15207968746786527425665224216320.jpg'),(22,'Water','2018-03-13 02:08:50','2018-03-13 02:08:50',13,'Home',2.0000,'/images/15209068594485352251608891446552.jpg'),(23,'Icecream','2018-03-13 22:19:50','2018-03-13 22:19:50',13,'Creamy',2.9900,'/images/15209795605309059598918600431985.jpg'),(24,'Basic Item','2018-04-27 23:50:14','2018-04-27 23:50:14',3,'A basic item that provides value to customers',3.9900,NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `requestor` int(11) NOT NULL,
  `item` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT '0',
  `status` varchar(45) NOT NULL DEFAULT 'requested',
  `by` timestamp NULL DEFAULT NULL,
  `delivery` timestamp NULL DEFAULT NULL,
  `received` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `requestor_idx` (`requestor`),
  KEY `item_idx` (`item`),
  CONSTRAINT `requested` FOREIGN KEY (`item`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `requestor` FOREIGN KEY (`requestor`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'2018-04-03 01:44:35','2018-04-03 01:44:35',4,1,1,0,'requested',NULL,NULL,NULL),(4,'2018-04-06 21:58:51','2018-04-06 22:06:59',4,22,4,0,'requested',NULL,NULL,NULL),(5,'2018-04-06 22:14:05','2018-04-06 22:14:05',4,22,5,0,'requested',NULL,NULL,NULL),(6,'2018-04-07 16:22:28','2018-04-07 16:22:28',4,22,4,0,'requested',NULL,NULL,NULL),(7,'2018-04-07 16:25:24','2018-05-13 17:02:18',4,22,2,2,'received','2018-04-30 04:00:00',NULL,'2018-05-13 21:02:18'),(8,'2018-04-07 16:26:38','2018-04-28 18:01:41',4,23,2,2,'received','2018-04-25 04:00:00',NULL,'2018-04-28 22:01:41');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subscriber` int(11) NOT NULL,
  `subscribed` int(11) NOT NULL,
  `request` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subscriber_idx` (`subscriber`),
  KEY `item_idx` (`subscribed`),
  KEY `request_idx` (`request`),
  CONSTRAINT `request` FOREIGN KEY (`request`) REFERENCES `requests` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `subscribed` FOREIGN KEY (`subscribed`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `subscriber` FOREIGN KEY (`subscriber`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,'2018-03-11 15:19:27','2018-04-03 01:47:17',4,1,1),(8,'2018-04-06 21:58:51','2018-04-07 16:25:24',4,22,7),(9,'2018-04-07 16:26:38','2018-04-07 16:26:38',4,23,8);
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `storename` varchar(45) NOT NULL,
  `storeaddress` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `supplier` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2018-01-14 21:33:44','2018-01-14 21:36:50','','','','','','','','',0),(2,'2018-01-23 02:57:39','2018-01-23 02:57:39','j','j','j','j','j','j','j','j',0),(3,'2018-03-10 16:06:45','2018-03-11 15:48:33','Bob','Smith','bobsmith@email.com','1234567890','Bob Smith Store','123 Street, City, State 12345','bobsmith','password',0),(4,'2018-03-10 19:48:41','2018-03-10 19:48:41','Taco','Bell','tacobell@email.com','1234567890','Hard Shells','1234 Street','tacobell','password',0),(5,'2018-03-10 20:37:55','2018-03-10 20:37:55','Bob','Builder','bobthebuilder@email.com','1234567890','BuildingBlocks','Brick Road 1234','BobTheBuilder','bob',0),(6,'2018-03-10 20:37:56','2018-03-10 20:37:56','Bob','Builder','bobthebuilder@email.com','1234567890','BuildingBlocks','Brick Road 1234','BobTheBuilder','bob',0),(7,'2018-03-10 20:38:17','2018-03-10 20:38:17','Bob','Builder','bobthebuilder@email.com','1234567890','BuildingBlocks','Brick Road 1234','BobTheBuilder','bob',0),(8,'2018-03-10 20:44:32','2018-03-10 20:44:32','a','b','c','d','e','f','g','h',0),(9,'2018-03-10 20:46:20','2018-03-10 20:46:20','a','a','a','a','a','a','a','a',0),(10,'2018-03-10 20:47:13','2018-03-10 20:47:13','a','b','c','d','a','a','a','a',0),(11,'2018-03-10 20:47:22','2018-03-10 20:47:22','a','b','c','d','a','a','a','a',0),(12,'2018-03-11 19:41:16','2018-03-11 19:41:16','supplier','a','a','a','a','a','supplier','a',0),(13,'2018-03-11 19:51:03','2018-05-14 00:27:28','supplier2','a','a','a','The Amazing Store','a','supplier2','a',1),(14,'2018-03-11 19:57:13','2018-03-11 19:57:13','normal','a','a','a','a','a','normal','a',0),(15,'2018-03-11 19:57:49','2018-03-11 19:57:49','supplier3','a','a','a','a','a','supplier3','a',1),(16,'2018-03-11 20:00:17','2018-03-11 20:00:17','supplier4','a','a','a','a','a','supplier4','a',1),(17,'2018-03-11 20:00:43','2018-03-11 20:00:43','buyer2','a','a','a','a','a','buyer2','a',0),(18,'2018-03-13 22:18:00','2018-03-13 22:18:00','Qisong','Lin','s','4','D','F','Johnny1888','zxcvbnm',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-15 17:59:09
