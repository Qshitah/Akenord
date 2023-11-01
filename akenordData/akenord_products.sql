CREATE DATABASE  IF NOT EXISTS `akenord` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `akenord`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: akenord
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `sku` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT '0.00',
  `cost` decimal(10,2) NOT NULL,
  `username_user` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subcategory_id` bigint DEFAULT NULL,
  `images` json NOT NULL,
  `stars` int NOT NULL,
  `featured` tinyint DEFAULT NULL,
  `popular` tinyint DEFAULT NULL,
  `hot` tinyint DEFAULT NULL,
  `arrivals` tinyint DEFAULT NULL,
  `top` tinyint DEFAULT NULL,
  `trendy` tinyint DEFAULT NULL,
  `deals` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stock` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `index_name` (`name`),
  KEY `fk_products_subcategories` (`subcategory_id`),
  KEY `fk_products_users` (`username_user`),
  CONSTRAINT `fk_products_subcategories` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`),
  CONSTRAINT `fk_products_users` FOREIGN KEY (`username_user`) REFERENCES `users` (`username`),
  CONSTRAINT `chk_stock` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Smartphone X','S-X-123','High-end smartphone',799.99,699.99,500.00,'said',2,'[\"/img/product-1-1.jpg\", \"/img/product-1-2.jpg\"]',3,0,1,1,0,1,1,0,'2023-10-13 10:42:54',10),(2,'Laptop Y','L-Y-456','Powerful laptop',1199.99,1000.00,800.00,'said',3,'[\"/img/product-2-1.jpg\", \"/img/product-2-2.jpg\"]',2,1,1,1,0,1,0,1,'2023-10-13 10:42:54',3),(3,'Men\'s Shirt A','MS-A-789','Casual shirt for men',29.99,24.99,15.00,'said',1,'[\"/img/product-3-1.jpg\", \"/img/product-3-2.jpg\"]',1,1,0,1,0,1,0,0,'2023-10-13 10:42:54',0),(4,'Women\'s Dress B','WD-B-101','Elegant dress for women',49.99,0.00,30.00,'said',2,'[\"/img/product-4-1.jpg\", \"/img/product-4-2.jpg\"]',0,0,0,0,1,0,1,1,'2023-10-13 10:42:54',0),(5,'Cookware Set C','CW-C-112','Quality cookware set',79.99,69.99,50.00,'said',1,'[\"/img/product-5-1.jpg\", \"/img/product-5-2.jpg\"]',2,1,1,0,1,0,1,0,'2023-10-13 10:42:54',16),(8,'Summer Collection','summer-collection','',500.00,300.00,250.00,'said',3,'[\"/uploads/summer-collection/category-3.jpg\", \"/uploads/summer-collection/category-8.jpg\"]',0,1,0,1,0,0,0,0,NULL,15),(9,'jknkjn','nk','jnkj',500.00,400.00,200.00,'said',1,'[\"/uploads/jknkjn/category-4.jpg\", \"/uploads/jknkjn/category-5.jpg\"]',0,0,0,0,0,0,0,0,'2023-10-28 20:54:17',20),(13,'jufirogllk','nknjk','jnkj',500.00,400.00,200.00,'said',1,'[\"/uploads/jufirogllk/category-4.jpg\", \"/uploads/jufirogllk/category-5.jpg\"]',0,0,0,0,0,0,0,0,'2023-10-28 20:59:39',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`akenord_connection`@`localhost`*/ /*!50003 TRIGGER `quantityCart` AFTER UPDATE ON `products` FOR EACH ROW begin
	if(new.stock != 0) then
		update cart_products cp set cp.quantity = 1 where cp.quantity>new.stock ;
	else 
		delete cp from cart_products cp where cp.product_id = new.id;
	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31 19:30:13
