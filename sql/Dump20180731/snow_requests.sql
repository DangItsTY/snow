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
  `requested` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `state` int(11) NOT NULL DEFAULT '0',
  `status` varchar(45) NOT NULL DEFAULT 'requested',
  `by` timestamp NULL DEFAULT NULL,
  `delivery` timestamp NULL DEFAULT NULL,
  `received` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `requestor_idx` (`requestor`),
  KEY `item_idx` (`requested`),
  CONSTRAINT `requested` FOREIGN KEY (`requested`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `requestor` FOREIGN KEY (`requestor`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'2018-05-17 12:18:24','2018-05-17 12:23:37',20,25,0,2,'received','2018-05-18 04:00:00',NULL,'2018-05-17 16:23:37'),(2,'2018-05-17 12:18:54','2018-05-17 12:18:59',20,26,3,0,'requested',NULL,NULL,NULL),(3,'2018-05-17 12:19:05','2018-05-17 12:19:05',20,27,3,0,'requested',NULL,NULL,NULL),(4,'2018-05-17 22:21:13','2018-05-17 22:25:07',20,28,2,2,'received','2018-05-19 04:00:00',NULL,'2018-05-18 02:25:07'),(5,'2018-05-19 19:19:52','2018-05-19 19:19:52',23,25,1,0,'requested',NULL,NULL,NULL),(6,'2018-05-19 21:39:38','2018-05-19 21:39:38',20,29,1,0,'requested',NULL,NULL,NULL),(10,'2018-07-29 13:23:13','2018-07-29 14:17:47',20,32,1,2,'received','2018-07-30 04:00:00',NULL,'2018-07-29 18:17:47'),(14,'2018-07-29 14:17:47','2018-07-29 14:18:48',20,32,3,2,'received','2018-07-31 04:00:00',NULL,'2018-07-29 18:18:48'),(15,'2018-07-29 14:18:48','2018-07-29 14:18:48',20,32,3,0,'requested',NULL,NULL,NULL),(16,'2018-07-29 14:19:56','2018-07-29 14:19:56',20,34,1,0,'requested',NULL,NULL,NULL);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
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
