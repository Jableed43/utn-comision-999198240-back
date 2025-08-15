CREATE DATABASE  IF NOT EXISTS `linkedin` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `linkedin`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: linkedin
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
-- Table structure for table `audit_principal`
--

DROP TABLE IF EXISTS `audit_principal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_principal` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `headline` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `WorkExperience_company` varchar(100) DEFAULT NULL,
  `WorkExperience_position` varchar(100) DEFAULT NULL,
  `Posts_content` text DEFAULT NULL,
  `Comments_content` text DEFAULT NULL,
  `Messages_content` text DEFAULT NULL,
  `Connections_status` varchar(20) DEFAULT NULL,
  `connected_first_name` varchar(50) DEFAULT NULL,
  `connected_last_name` varchar(50) DEFAULT NULL,
  `audit_accion` varchar(10) NOT NULL,
  `audit_fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `aprobado` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_principal`
--

LOCK TABLES `audit_principal` WRITE;
/*!40000 ALTER TABLE `audit_principal` DISABLE KEYS */;
INSERT INTO `audit_principal` VALUES (2,'Bob','Smith','bob2@example.com','Backend Dev','San Francisco, USA','Loves APIs.','DataWorks','Backend Dev','Dockerizing your Node.js app made easy.','Great tutorial!','Hey Alice!','accepted','Carol','Martinez','UPDATE','2025-04-19 02:28:38','2025-04-20 02:43:11'),(3,'Carol','Martinez','carol3@example.com','Product Mgr','Toronto, CA','Bridges tech & users.','AgileSoft','Product Manager','UX principles to boost conversion.','We all feel it.','Nice post!','rejected','Frank','Wilson','UPDATE','2025-04-19 02:31:42','2025-04-20 02:43:11'),(52,'Luna','Martínez','luna.martinez@example.com','Frontend Developer','Buenos Aires','Apasionada por el diseño y el código limpio','Globant','UI Engineer','Hoy lancé mi primer componente en producción ?','¡Gracias por compartir! Me fue útil.','Hola! Me encantaría conectar con vos.','accepted','Alice','Johnson','UPDATE','2025-04-19 23:44:56','2025-04-20 02:43:11'),(52,'Luna','Martínez','luna.martinez@example.com','Frontend Developer','Buenos Aires','Apasionada el desarrollo de videojuegos y desarrollo frontend','Globant','UI Engineer','Hoy lancé mi primer componente en producción ?','¡Gracias por compartir! Me fue útil.','Hola! Me encantaría conectar con vos.','accepted','Alice','Johnson','UPDATE','2025-04-19 23:56:42','2025-04-20 02:43:11'),(52,'Luna','Martínez','luna.martinez@example.com','Frontend Developer','Buenos Aires','Apasionada el desarrollo de videojuegos y desarrollo frontend','Globant','UI Engineer','Hoy lancé mi primer componente en producción ?','¡Gracias por compartir! Me fue útil.','Hola! Me encantaría conectar con vos.','accepted','Alice','Johnson','DELETE','2025-04-20 00:42:02','2025-04-20 02:43:11'),(1,'Alice','Johnson','alice1@example.com','Frontend Dev','New York, USA','Apasionada el desarrollo de videojuegos y desarrollo frontend','TechCorp','Frontend Engineer','New React hooks tutorial is live!','Thanks for this.','Hey Bob!','accepted','Bob','Smith','UPDATE','2025-04-20 02:38:17','2025-04-20 02:43:11'),(2,'Bob','Smith','bob2@example.com','Backend Dev','Buenos Aires, Argentina','Apasionada el desarrollo de videojuegos y desarrollo frontend','DataWorks','Backend Dev','Dockerizing your Node.js app made easy.','Great tutorial!','Hey Alice!','accepted','Carol','Martinez','UPDATE','2025-04-20 02:38:22','2025-04-20 02:43:11'),(3,'Carol','Martinez','carol3@example.com','Product Mgr','Toronto, CA','Apasionada el desarrollo de videojuegos y desarrollo frontend','AgileSoft','Product Manager','UX principles to boost conversion.','We all feel it.','Nice post!','rejected','Frank','Wilson','UPDATE','2025-04-20 02:38:27','2025-04-20 02:43:11'),(4,'David','Brown','david4@example.com','DevOps Eng','Austin, USA','Apasionada el desarrollo de videojuegos y desarrollo frontend','DevOpsX','DevOps Engineer','Intro to GraphQL vs REST.','Loved the UX tips!','Thanks!','accepted','Emma','Davis','UPDATE','2025-04-20 02:38:31','2025-04-20 02:43:11'),(1,'Alice','Johnson','alice1@example.com','Frontend Dev','New York, USA','Apasionada el desarrollo de videojuegos y desarrollo frontend','TechCorp','Frontend Engineer','New React hooks tutorial is live!','Thanks for this.','Hey Bob!','accepted','Bob','Smith','DELETE','2025-04-20 02:41:51','2025-04-20 02:43:11'),(2,'Bob','Smith','bob2@example.com','Backend Dev','Buenos Aires, Argentina','Apasionada el desarrollo de videojuegos y desarrollo frontend','DataWorks','Backend Dev','Dockerizing your Node.js app made easy.','Great tutorial!',NULL,'accepted','Carol','Martinez','DELETE','2025-04-20 02:41:56','2025-04-20 02:43:11');
/*!40000 ALTER TABLE `audit_principal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `Comments_ibfk_1` (`post_id`),
  KEY `comments_ibfk_2` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (3,3,4,'Loved the UX tips!','2025-04-19 01:29:27'),(4,4,5,'GraphQL FTW!','2025-04-19 01:29:27'),(5,5,6,'Interesting take.','2025-04-19 01:29:27'),(6,6,7,'Agree 100%!','2025-04-19 01:29:27'),(7,7,8,'Must-read.','2025-04-19 01:29:27'),(8,8,9,'Very useful, thanks!','2025-04-19 01:29:27'),(9,9,10,'So inspiring!','2025-04-19 01:29:27'),(10,10,3,'We all feel it.','2025-04-19 01:29:27'),(12,1,54,'Muy buena perspectiva, me hizo reflexionar.','2025-04-20 02:40:30'),(13,1,55,'Gracias por compartir tu experiencia, ¡muy inspirador!','2025-04-20 02:40:43'),(14,3,11,'Me encantaron los principios, súper aplicables.','2025-04-20 16:10:00'),(15,3,12,'Justo estoy rediseñando y esto me vino bárbaro.','2025-04-20 16:12:00'),(16,4,13,'REST sigue siendo más claro para mí, pero voy a probar GraphQL.','2025-04-20 16:15:00'),(17,4,14,'Buen resumen de pros y contras. ¡Gracias!','2025-04-20 16:16:00'),(18,6,15,'Dark mode es más que estética, ¡totalmente de acuerdo!','2025-04-20 16:19:00'),(19,7,16,'Coincido, sobre todo con la parte de aprender en comunidad.','2025-04-20 16:21:00'),(20,7,17,'Yo agregaría \"comunicación\" como skill esencial.','2025-04-20 16:23:00'),(21,8,18,'¡Qué buen hilo para quienes recién empiezan!','2025-04-20 16:25:00'),(22,9,19,'¡Me re sentí identificado con tu historia!','2025-04-20 16:27:00'),(23,10,20,'Ese tema debería hablarse más. Bien ahí.','2025-04-20 16:30:00'),(24,12,21,'¡Power BI es lo más! Lo usamos todo el tiempo.','2025-04-20 16:32:00'),(25,13,22,'Felicitaciones por esa charla, qué emoción debe haber sido.','2025-04-20 16:35:00'),(26,13,23,'¡Me encantaría escucharte en la próxima!','2025-04-20 16:37:00'),(27,6,24,'Estoy en pleno diseño de interfaz y esto me vino bárbaro.','2025-04-20 16:40:00'),(28,7,25,'Gran recordatorio de que nunca dejamos de aprender.','2025-04-20 16:42:00'),(29,10,26,'Impostor syndrome real af... gracias por ponerlo en palabras.','2025-04-20 16:45:00'),(30,8,27,'Estoy empezando DevOps, me encantó este enfoque inicial.','2025-04-20 16:47:00'),(31,4,28,'Tu comparación fue muy clara. Me ayudó mucho.','2025-04-20 16:50:00'),(32,9,29,'Inspirador, gracias por compartir esa historia.','2025-04-20 16:52:00'),(33,12,30,'¡Qué bueno encontrar este tipo de publicaciones en español!','2025-04-20 16:55:00'),(34,3,31,'Muy útil para quienes diseñamos pensando en conversión.','2025-04-20 17:00:00'),(35,3,32,'¡Justo estaba trabajando en eso! Mil gracias.','2025-04-20 17:02:00'),(36,4,33,'GraphQL me cuesta, pero este post me dio claridad.','2025-04-20 17:04:00'),(37,4,34,'REST es más simple, pero GraphQL tiene su magia.','2025-04-20 17:06:00'),(38,6,35,'Dark mode forever ?.','2025-04-20 17:08:00'),(39,6,36,'Lo implementamos esta semana, el cambio fue enorme.','2025-04-20 17:09:00'),(40,7,37,'Podrías hacer una segunda parte, quedó muy bueno.','2025-04-20 17:11:00'),(41,7,38,'¡Inspirador! Hay tanto por aprender aún.','2025-04-20 17:13:00'),(42,8,39,'Buen punto de partida, ¡gracias por el empujón!','2025-04-20 17:15:00'),(43,8,40,'Me guardo este post para más adelante.','2025-04-20 17:17:00'),(44,9,41,'Yo también arranqué desde cero, ¡vamos con todo!','2025-04-20 17:19:00'),(45,10,42,'Lo del síndrome del impostor me sigue pasando...','2025-04-20 17:21:00'),(46,10,43,'Post valiente, se agradece.','2025-04-20 17:23:00'),(47,12,44,'Me interesa Power BI, ¿dónde hiciste el curso?','2025-04-20 17:25:00'),(48,13,45,'¡Bravo! La accesibilidad es clave y poco visibilizada.','2025-04-20 17:27:00'),(49,13,46,'¡Felicitaciones! Muy valioso tu aporte.','2025-04-20 17:29:00'),(50,9,47,'Historias como la tuya son las que motivan.','2025-04-20 17:31:00'),(51,6,48,'Estamos re trabajando en eso en mi equipo.','2025-04-20 17:33:00'),(52,7,49,'Lo compartí con mis alumnos, ¡gracias!','2025-04-20 17:35:00'),(53,12,50,'El análisis visual lo es todo. Buen trabajo.','2025-04-20 17:37:00'),(54,13,54,'Accesibilidad también es inclusión. Gracias por visibilizar.','2025-04-20 17:39:00'),(55,12,55,'Tu post me motivó a seguir explorando Power BI.','2025-04-20 17:41:00');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_1` int(11) DEFAULT NULL,
  `user_id_2` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `connections_ibfk_1` (`user_id_1`),
  KEY `connections_ibfk_2` (`user_id_2`),
  CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`user_id_1`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`user_id_2`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `CONSTRAINT_1` CHECK (`status` in ('pending','accepted','rejected'))
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES (4,4,5,'accepted','2025-04-19 01:29:27'),(5,6,7,'pending','2025-04-19 01:29:27'),(6,8,9,'accepted','2025-04-19 01:29:27'),(9,3,6,'rejected','2025-04-19 01:29:27'),(10,7,5,'accepted','2025-04-19 01:29:27'),(11,9,10,'pending','2025-04-19 01:29:27'),(12,11,12,'accepted','2025-04-19 01:29:27'),(13,13,14,'rejected','2025-04-19 01:29:27'),(14,15,16,'accepted','2025-04-19 01:29:27'),(15,17,18,'pending','2025-04-19 01:29:27'),(16,19,20,'accepted','2025-04-19 01:29:27'),(17,21,22,'rejected','2025-04-19 01:29:27'),(18,23,24,'accepted','2025-04-19 01:29:27'),(19,25,26,'pending','2025-04-19 01:29:27'),(20,27,28,'accepted','2025-04-19 01:29:27'),(21,29,30,'rejected','2025-04-19 01:29:27'),(22,31,32,'pending','2025-04-19 01:29:27'),(23,33,34,'accepted','2025-04-19 01:29:27'),(24,35,36,'rejected','2025-04-19 01:29:27'),(25,37,38,'accepted','2025-04-19 01:29:27'),(26,39,40,'pending','2025-04-19 01:29:27'),(27,41,42,'accepted','2025-04-19 01:29:27'),(28,43,44,'rejected','2025-04-19 01:29:27'),(29,45,46,'accepted','2025-04-19 01:29:27'),(30,47,48,'pending','2025-04-19 01:29:27'),(31,49,50,'accepted','2025-04-19 01:29:27'),(32,54,55,'rejected','2025-04-19 01:29:27'),(33,10,11,'accepted','2025-04-19 01:29:27'),(34,12,13,'pending','2025-04-19 01:29:27'),(35,14,15,'accepted','2025-04-19 01:29:27'),(36,16,17,'rejected','2025-04-19 01:29:27'),(37,18,19,'accepted','2025-04-19 01:29:27'),(38,20,21,'pending','2025-04-19 01:29:27'),(39,22,23,'accepted','2025-04-19 01:29:27'),(40,24,25,'rejected','2025-04-19 01:29:27'),(41,26,27,'accepted','2025-04-19 01:29:27'),(42,28,29,'pending','2025-04-19 01:29:27'),(43,30,31,'accepted','2025-04-19 01:29:27'),(44,32,33,'rejected','2025-04-19 01:29:27'),(45,34,35,'accepted','2025-04-19 01:29:27'),(46,36,37,'pending','2025-04-19 01:29:27'),(47,38,39,'accepted','2025-04-19 01:29:27'),(48,40,41,'rejected','2025-04-19 01:29:27'),(49,42,43,'accepted','2025-04-19 01:29:27'),(50,44,45,'pending','2025-04-19 01:29:27'),(51,46,47,'accepted','2025-04-19 01:29:27'),(52,48,49,'rejected','2025-04-19 01:29:27'),(53,50,54,'accepted','2025-04-19 01:29:27'),(54,55,3,'pending','2025-04-19 01:29:27'),(55,5,8,'accepted','2025-04-19 01:29:27');
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`sender_id`),
  KEY `messages_ibfk_2` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (3,3,4,'Nice post!','2025-04-19 01:29:27'),(4,4,3,'Thanks!','2025-04-19 01:29:27'),(5,5,6,'Interested in your project.','2025-04-19 01:29:27'),(6,6,5,'Let’s talk!','2025-04-19 01:29:27'),(7,7,8,'Great portfolio.','2025-04-19 01:29:27'),(8,8,7,'Appreciate it.','2025-04-19 01:29:27'),(9,9,10,'Need a designer?','2025-04-19 01:29:27'),(10,10,9,'Let’s connect.','2025-04-19 01:29:27'),(14,3,31,'Check out this awesome article I found!','2025-04-20 17:00:00'),(15,3,32,'Let’s chat about your latest project.','2025-04-20 17:02:00'),(16,4,33,'Loved your take on REST!','2025-04-20 17:04:00'),(17,4,34,'I’d love to collaborate on something.','2025-04-20 17:06:00'),(18,6,35,'Can we schedule a meeting for next week?','2025-04-20 17:08:00'),(19,6,36,'Great article! Let me know if I can help.','2025-04-20 17:09:00'),(20,7,37,'Your portfolio is incredible. Let’s connect.','2025-04-20 17:11:00'),(21,7,38,'I have some questions about your project.','2025-04-20 17:13:00'),(22,8,39,'I’m available for a chat anytime this week.','2025-04-20 17:15:00'),(23,8,40,'Thanks for sharing your experience!','2025-04-20 17:17:00'),(24,9,41,'Any chance you’re looking for a data analyst?','2025-04-20 17:19:00'),(25,10,42,'Interested in hearing more about your journey.','2025-04-20 17:21:00'),(26,10,43,'We should discuss the future of design.','2025-04-20 17:23:00'),(27,12,44,'Let’s connect, I’m working on something similar.','2025-04-20 17:25:00'),(28,13,45,'Congrats on your talk! Would love to discuss accessibility further.','2025-04-20 17:27:00'),(29,13,46,'Let’s have a chat about your recent project.','2025-04-20 17:29:00'),(30,9,47,'I’m working on something similar. We should compare notes.','2025-04-20 17:31:00'),(31,6,48,'Can you recommend some resources for dark mode design?','2025-04-20 17:33:00'),(32,7,49,'I love your tips, let’s share knowledge!','2025-04-20 17:35:00'),(33,12,50,'Would love to collaborate on BI-related projects.','2025-04-20 17:37:00'),(34,13,54,'Your experience with web accessibility is impressive. Let’s talk!','2025-04-20 17:39:00'),(35,12,55,'Your insights on Power BI were very helpful. Thanks!','2025-04-20 17:41:00'),(123,11,12,'Looking forward to chatting!','2025-04-19 17:00:00'),(124,12,13,'Amazing insights on your latest work.','2025-04-19 17:05:00'),(125,13,14,'Would love to collaborate on a project.','2025-04-19 17:10:00'),(126,14,15,'Let’s catch up soon!','2025-04-19 17:15:00'),(127,15,16,'Check out my latest project!','2025-04-19 17:20:00'),(128,16,17,'Your work is truly inspiring!','2025-04-19 17:25:00'),(129,17,18,'Let’s chat about your tech journey!','2025-04-19 17:30:00'),(130,18,19,'Would love to connect and share experiences.','2025-04-19 17:35:00'),(131,19,20,'Awesome job on your latest project!','2025-04-19 17:40:00'),(132,20,21,'Keep up the great work, we should connect!','2025-04-19 17:45:00'),(133,21,22,'Great article, I’d like to discuss further!','2025-04-19 17:50:00'),(134,22,23,'Your blog on tech trends was really insightful.','2025-04-19 17:55:00'),(135,23,24,'Let’s connect, I’m exploring similar topics.','2025-04-19 18:00:00'),(136,24,25,'Interested in learning more about your recent project.','2025-04-19 18:05:00'),(137,25,26,'I admire your work, would love to collaborate.','2025-04-19 18:10:00'),(138,26,27,'Your portfolio is amazing, let’s chat soon!','2025-04-19 18:15:00'),(139,27,28,'Thanks for sharing your insights, it was very helpful.','2025-04-19 18:20:00'),(140,28,29,'Would love to hear more about your experience.','2025-04-19 18:25:00'),(141,29,30,'Your article on UX is outstanding!','2025-04-19 18:30:00'),(142,30,31,'I really enjoyed your latest post, very informative.','2025-04-19 18:35:00'),(143,31,32,'Looking forward to your next post!','2025-04-19 18:40:00'),(144,32,33,'Your presentation was inspiring, would love to collaborate.','2025-04-19 18:45:00'),(145,33,34,'I’ve read your work on design systems. Let’s chat.','2025-04-19 18:50:00'),(146,34,35,'Your thoughts on agile development are spot on.','2025-04-19 18:55:00'),(147,35,36,'Impressive work, would love to discuss AI trends.','2025-04-19 19:00:00'),(148,36,37,'Your experience with machine learning is fascinating.','2025-04-19 19:05:00'),(149,37,38,'Let’s talk about front-end development and best practices.','2025-04-19 19:10:00'),(150,38,39,'I agree with your views on cross-platform tools.','2025-04-19 19:15:00'),(151,39,40,'Your insights on cloud computing were very helpful!','2025-04-19 19:20:00'),(152,40,41,'I’d love to know more about your experience with Kubernetes.','2025-04-19 19:25:00'),(153,41,42,'Great post on tech stack selection. Let’s discuss!','2025-04-19 19:30:00'),(154,42,43,'Loved your article on DevOps best practices. Would love to chat.','2025-04-19 19:35:00'),(155,43,44,'You’ve got some great experience, would love to connect more.','2025-04-19 19:40:00'),(156,44,45,'Let’s connect, I have a few ideas for collaboration.','2025-04-19 19:45:00'),(157,45,46,'Your thoughts on security are really insightful, let’s discuss.','2025-04-19 19:50:00'),(158,46,47,'I enjoyed your article on testing methodologies, very informative.','2025-04-19 19:55:00'),(159,47,48,'Would love to hear your thoughts on the future of tech.','2025-04-19 20:00:00'),(160,48,49,'Let’s collaborate on something innovative!','2025-04-19 20:05:00'),(161,49,50,'Your take on user-centered design is spot on, let’s chat!','2025-04-19 20:10:00'),(162,54,55,'Let’s talk about the impact of automation in development.','2025-04-19 20:35:00'),(163,55,11,'I’d love to hear more about your work in AI.','2025-04-19 20:40:00'),(164,50,3,'Gracias por tu feedback. Me encantaría saber cómo lo usarías vos.','2025-04-20 17:43:00');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (3,3,'UX principles to boost conversion.','2025-04-19 01:29:27'),(4,4,'Intro to GraphQL vs REST.','2025-04-19 01:29:27'),(5,5,'Agile vs Waterfall: thoughts?','2025-04-19 01:29:27'),(6,6,'Why dark mode is essential in 2025.','2025-04-19 01:29:27'),(7,7,'Top 5 skills every dev should know.','2025-04-19 01:29:27'),(8,8,'DevOps for beginners: where to start?','2025-04-19 01:29:27'),(9,9,'How I got into tech with no degree.','2025-04-19 01:29:27'),(10,10,'Let’s talk about imposter syndrome.','2025-04-19 01:29:27'),(12,54,'Acabo de terminar un curso intensivo de Power BI, ¡me voló la cabeza!','2025-04-20 02:40:30'),(13,55,'¡Hoy di mi primera charla sobre accesibilidad web! ??','2025-04-20 02:40:43'),(14,11,'¿Qué libros recomiendan para mejorar en UI/UX?','2025-04-20 13:15:00'),(15,12,'Scrum vs Kanban: ¿cuál usan en sus equipos?','2025-04-20 13:17:00'),(16,13,'Estoy armando mi primer cluster en Kubernetes ?','2025-04-20 13:20:00'),(17,14,'¿Alguien más disfruta optimizar queries en SQL o solo yo?','2025-04-20 13:23:00'),(18,15,'Configuré mi primer servidor desde cero, qué experiencia ?','2025-04-20 13:25:00'),(19,16,'Mi primer juego en Unity ya está en itch.io ?️✨','2025-04-20 13:30:00'),(20,17,'¿Modelos de lenguaje o visión por computadora? ¿Qué prefieren?','2025-04-20 13:34:00'),(21,18,'Mentorear devs juniors me ayudó a crecer mucho más de lo que esperaba.','2025-04-20 13:40:00'),(22,19,'Estoy reestructurando mi blog técnico, se vienen posts nuevos.','2025-04-20 13:42:00'),(23,20,'Consejos para devs frontend que quieren meterse en UX.','2025-04-20 13:45:00'),(24,21,'¿Alguien trabajó con React Server Components? Opiniones...','2025-04-20 13:48:00'),(25,22,'Estoy encantado con Spring Boot 3.0 ?','2025-04-20 13:50:00'),(26,23,'Terraform + GitHub Actions = ❤️','2025-04-20 13:53:00'),(27,24,'¿Recomiendan hacer un máster en ciencia de datos?','2025-04-20 13:56:00'),(28,25,'Estoy diseñando un nuevo sistema de diseño y necesito feedback.','2025-04-20 13:59:00'),(29,26,'Descubrí OWASP y estoy re manija con la ciberseguridad.','2025-04-20 14:02:00'),(30,27,'Mi primer taller como formador fue mejor de lo esperado ?','2025-04-20 14:05:00'),(31,28,'Probando Scikit-Learn con datasets propios, ¡una locura!','2025-04-20 14:08:00'),(32,29,'¿Tiene sentido crear contenido técnico en español?','2025-04-20 14:10:00'),(33,30,'Implementé Cypress por primera vez. Adiós bugs escondidos ?','2025-04-20 14:13:00'),(34,31,'¿Qué dashboards usan para monitorear producción?','2025-04-20 14:16:00'),(35,32,'Implementar dark mode bien hecho no es tan simple como parece.','2025-04-20 14:19:00'),(36,33,'¿Hay espacios en español para investigación en IA?','2025-04-20 14:22:00'),(37,34,'¡Mi primer pull request fue aceptado! ?','2025-04-20 14:25:00'),(38,35,'¿Cómo motivan a sus estudiantes cuando se frustran?','2025-04-20 14:28:00'),(39,36,'GraphQL me parece genial... cuando no hay overfetching ?','2025-04-20 14:30:00'),(40,37,'Entrevistando usuarios: todo cambia cuando escuchás con intención.','2025-04-20 14:32:00'),(41,38,'¿Cómo gestionan errores en sistemas distribuidos?','2025-04-20 14:34:00'),(42,39,'Estoy desarrollando una app de rutinas de ejercicio con Flutter ?','2025-04-20 14:37:00'),(43,40,'Logré optimizar mi pipeline de datos en un 60% ?','2025-04-20 14:39:00'),(44,41,'La visión a largo plazo en tecnología es lo más difícil de enseñar.','2025-04-20 14:42:00'),(45,42,'¿Open source en proyectos sociales? ¡Sí, por favor!','2025-04-20 14:45:00'),(46,43,'IA no reemplaza a los humanos, amplifica nuestras decisiones.','2025-04-20 14:47:00'),(47,44,'Probando Figma variables: diseño más limpio y consistente.','2025-04-20 14:50:00'),(48,45,'Auditoría de seguridad completada sin findings. Feliz.','2025-04-20 14:52:00'),(49,46,'Estoy empezando con Jest y ya me atrapó.','2025-04-20 14:54:00'),(50,47,'Hice mi primer commit a un repo open source hoy ?','2025-04-20 14:57:00'),(51,48,'Refactorizar es terapéutico para mí, ¿a alguien más le pasa?','2025-04-20 15:00:00'),(52,49,'¿Qué opinan de MLflow para producción?','2025-04-20 15:03:00'),(53,50,'Estoy rediseñando un flujo de onboarding desde cero ?','2025-04-20 15:06:00');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (9,'AWS'),(10,'CI/CD'),(6,'Docker'),(8,'Figma'),(7,'Kubernetes'),(3,'Node.js'),(4,'Python'),(2,'React'),(5,'SQL'),(1,'TypeScript');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `headline` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `about` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Carol','Martinez','carol3@example.com','Product Mgr','Toronto, CA','Apasionada el desarrollo de videojuegos y desarrollo frontend'),(4,'David','Brown','david4@example.com','DevOps Eng','Austin, USA','Apasionada el desarrollo de videojuegos y desarrollo frontend'),(5,'Emma','Davis','emma5@example.com','QA Engineer','Boston, USA','Quality-driven mindset.'),(6,'Frank','Wilson','frank6@example.com','Mobile Dev','Seattle, USA','Android/iOS dev.'),(7,'Grace','Miller','grace7@example.com','Data Analyst','Denver, USA','Data storytelling.'),(8,'Henry','Moore','henry8@example.com','Fullstack Dev','Miami, USA','JS wizard.'),(9,'Ivy','Taylor','ivy9@example.com','UX Designer','Chicago, USA','User-first design.'),(10,'Jack','Anderson','jack10@example.com','Security Analyst','Houston, USA','Cybersec expert.'),(11,'Laura','Hall','laura11@example.com','UI Designer','Toronto, CA','Pixel perfectionist.'),(12,'Michael','Young','michael12@example.com','Scrum Master','Boston, USA','Team facilitator.'),(13,'Nina','Clark','nina13@example.com','Cloud Eng','Austin, USA','Kubernetes fan.'),(14,'Oscar','Wright','oscar14@example.com','DB Admin','San Diego, USA','Loves indexes.'),(15,'Paul','King','paul15@example.com','System Admin','Dallas, USA','Linux rulez.'),(16,'Quinn','Lee','quinn16@example.com','Game Dev','Orlando, USA','Unity fan.'),(17,'Rita','Harris','rita17@example.com','AI Eng','Silicon Valley','Training LLMs.'),(18,'Steve','Martin','steve18@example.com','Tech Lead','San Jose, USA','Leads with code.'),(19,'Tina','Walker','tina19@example.com','Content Creator','NYC, USA','Words + visuals.'),(20,'Uma','Green','uma20@example.com','Frontend Dev','Portland, USA','CSS magician.'),(21,'Victor','Scott','victor21@example.com','Data Eng','Los Angeles, USA','ETL pipelines.'),(22,'Wendy','Adams','wendy22@example.com','BI Analyst','Chicago, USA','Power BI pro.'),(23,'Xavier','Nelson','xavier23@example.com','Blockchain Dev','Miami, USA','Web3 believer.'),(24,'Yara','Baker','yara24@example.com','HR Tech','San Diego, USA','People + systems.'),(25,'Zane','Perez','zane25@example.com','Legal Tech','NYC, USA','Code meets law.'),(26,'Alex','Fox','alex26@example.com','SRE','Austin, USA','Reliability is key.'),(27,'Bella','Cruz','bella27@example.com','Infra Eng','Toronto, CA','Terraform all the way.'),(28,'Carl','Reed','carl28@example.com','Marketing Analyst','Chicago, USA','Growth hacking.'),(29,'Dana','Watson','dana29@example.com','SEO Spec','Miami, USA','Ranking master.'),(30,'Eli','Long','eli30@example.com','Cloud Architect','San Jose, USA','AWS certified.'),(31,'Fay','Rogers','fay31@example.com','Tech Recruiter','Seattle, USA','Hunting unicorns.'),(32,'Gina','Simmons','gina32@example.com','IoT Dev','Dallas, USA','Smart devices guru.'),(33,'Hugo','Ross','hugo33@example.com','Hardware Eng','Boston, USA','PCB wizard.'),(34,'Iris','Bailey','iris34@example.com','Tech Evangelist','Austin, USA','Talks tech.'),(35,'Jake','Barnes','jake35@example.com','Digital Artist','Portland, USA','Creative coder.'),(36,'Kara','Shaw','kara36@example.com','Data Scientist','Denver, USA','ML enthusiast.'),(37,'Liam','Murray','liam37@example.com','AI Researcher','Silicon Valley','Deep learning guy.'),(38,'Mona','Spencer','mona38@example.com','Copywriter','NYC, USA','Tells brand stories.'),(39,'Nico','Flores','nico39@example.com','Social Media Mgr','Miami, USA','Online presence expert.'),(40,'Olga','Weber','olga40@example.com','CS Professor','Chicago, USA','Teaches the future.'),(41,'Pete','Dunn','pete41@example.com','ML Eng','San Diego, USA','Model builder.'),(42,'Queenie','Ford','queenie42@example.com','Product Owner','Toronto, CA','Owns backlog.'),(43,'Raj','Bell','raj43@example.com','DevRel','Austin, USA','Speaks dev.'),(44,'Sara','Rice','sara44@example.com','Tech Writer','Seattle, USA','Loves docs.'),(45,'Tom','Payne','tom45@example.com','Python Dev','Boston, USA','? scripter.'),(46,'Usha','Hayes','usha46@example.com','Agile Coach','Denver, USA','Helps teams grow.'),(47,'Vera','Holmes','vera47@example.com','SysEng','Dallas, USA','Infra queen.'),(48,'Walt','Dean','walt48@example.com','Data Viz','Chicago, USA','Charts life.'),(49,'Xena','Griffin','xena49@example.com','Tech Support','Houston, USA','Always helps.'),(50,'Yuri','Hunt','yuri50@example.com','Robotics Eng','Austin, USA','Robot whisperer.'),(54,'Mateo','Rivas','mateo.rivas@example.com','Data Analyst','Córdoba','Curioso por naturaleza. Me encantan los datos y descubrir patrones ocultos.'),(55,'Camila','Torres','camila.torres@example.com','Full Stack Developer','Rosario','Me apasiona aprender nuevas tecnologías y participar en comunidades tech.');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER tu_Audit_Principal

AFTER UPDATE ON Users

FOR EACH ROW

BEGIN

    INSERT INTO Audit_Principal (

        id,

        first_name,

        last_name,

        email,

        headline,

        location,

        about,

        WorkExperience_company,

        WorkExperience_position,

        Posts_content,

        Comments_content,

        Messages_content,

        Connections_status,

        connected_first_name,

        connected_last_name,

        audit_accion,

        audit_fecha

    )

    SELECT

        NEW.id,

        NEW.first_name,

        NEW.last_name,

        NEW.email,

        NEW.headline,

        NEW.location,

        NEW.about,

        WorkExperience.company,

        WorkExperience.position,

        Posts.content,

        Comments.content,

        Messages.content,

        Connections.status,

        ConnectedUser.first_name,

        ConnectedUser.last_name,

        'UPDATE',

        NOW()

    FROM WorkExperience

    LEFT JOIN Posts ON Posts.user_id = NEW.id

    LEFT JOIN Comments ON Comments.user_id = NEW.id

    LEFT JOIN Messages ON Messages.sender_id = NEW.id

    LEFT JOIN Connections ON Connections.user_id_1 = NEW.id

    LEFT JOIN Users AS ConnectedUser ON Connections.user_id_2 = ConnectedUser.id

    WHERE WorkExperience.user_id = NEW.id

    LIMIT 1;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER td_Audit_Principal

BEFORE DELETE ON Users

FOR EACH ROW

BEGIN

    INSERT INTO Audit_Principal (

        id,

        first_name,

        last_name,

        email,

        headline,

        location,

        about,

        WorkExperience_company,

        WorkExperience_position,

        Posts_content,

        Comments_content,

        Messages_content,

        Connections_status,

        connected_first_name,

        connected_last_name,

        audit_accion,

        audit_fecha

    )

    SELECT

        OLD.id,

        OLD.first_name,

        OLD.last_name,

        OLD.email,

        OLD.headline,

        OLD.location,

        OLD.about,

        WorkExperience.company,

        WorkExperience.position,

        Posts.content,

        Comments.content,

        Messages.content,

        Connections.status,

        ConnectedUser.first_name,

        ConnectedUser.last_name,

        'DELETE',

        NOW()

    FROM (SELECT 1) AS Dummy

    LEFT JOIN WorkExperience ON WorkExperience.user_id = OLD.id

    LEFT JOIN Posts ON Posts.user_id = OLD.id

    LEFT JOIN Comments ON Comments.user_id = OLD.id

    LEFT JOIN Messages ON Messages.sender_id = OLD.id

    LEFT JOIN Connections ON Connections.user_id_1 = OLD.id

    LEFT JOIN Users AS ConnectedUser ON Connections.user_id_2 = ConnectedUser.id

    LIMIT 1;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `userskills`
--

DROP TABLE IF EXISTS `userskills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userskills` (
  `user_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`skill_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `userskills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userskills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userskills`
--

LOCK TABLES `userskills` WRITE;
/*!40000 ALTER TABLE `userskills` DISABLE KEYS */;
INSERT INTO `userskills` VALUES (3,5),(4,6),(5,7),(6,8),(7,9),(8,10);
/*!40000 ALTER TABLE `userskills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_audit_principal`
--

DROP TABLE IF EXISTS `v_audit_principal`;
/*!50001 DROP VIEW IF EXISTS `v_audit_principal`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_audit_principal` AS SELECT 
 1 AS `id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `email`,
 1 AS `headline`,
 1 AS `location`,
 1 AS `about`,
 1 AS `company`,
 1 AS `position`,
 1 AS `post_content`,
 1 AS `comment_content`,
 1 AS `message_content`,
 1 AS `status`,
 1 AS `connected_first_name`,
 1 AS `connected_last_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `workexperience`
--

DROP TABLE IF EXISTS `workexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workexperience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `company` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workexperience_ibfk_1` (`user_id`),
  CONSTRAINT `workexperience_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workexperience`
--

LOCK TABLES `workexperience` WRITE;
/*!40000 ALTER TABLE `workexperience` DISABLE KEYS */;
INSERT INTO `workexperience` VALUES (3,3,'AgileSoft','Product Manager','2018-03-01',NULL,'Led dev teams.'),(4,4,'DevOpsX','DevOps Engineer','2017-05-01',NULL,'Maintained CI/CD pipelines.'),(5,5,'SecureIT','Security Analyst','2016-02-01',NULL,'Monitored threats.'),(6,6,'UXLab','UX Designer','2021-01-01',NULL,'Designed for humans.'),(7,7,'Cloudify','Cloud Architect','2022-07-01',NULL,'Designed cloud infra.'),(8,8,'SmartSoft','QA Engineer','2020-09-01',NULL,'Wrote test cases.'),(9,9,'DataPro','Data Analyst','2019-10-01',NULL,'Built dashboards.'),(10,10,'Scriptify','Python Dev','2021-06-01',NULL,'Wrote scripts.'),(12,54,'Mercado Libre','Business Intelligence Analyst','2019-06-15','2023-12-01','Diseño de dashboards y automatización de reportes para equipos de producto.'),(13,55,'Baufest','Software Developer','2021-01-10',NULL,'Desarrollo full stack en proyectos para el sector financiero y de salud.'),(14,11,'VisualSoft','UI Designer','2020-04-01',NULL,'Diseño de interfaces accesibles y sistemas de diseño escalables.'),(15,12,'AgileCore','Scrum Master','2017-10-01',NULL,'Facilitación de ceremonias Agile y coaching de equipos multidisciplinarios.'),(16,13,'Cloudify','Cloud Engineer','2019-01-15',NULL,'Implementación de soluciones cloud con Kubernetes y Terraform.'),(17,14,'DataZen','DB Administrator','2016-06-01',NULL,'Optimización de queries y mantenimiento de sistemas PostgreSQL.'),(18,15,'InfraCore','System Administrator','2015-09-01',NULL,'Administración de servidores Linux y automatización con scripts Bash.'),(19,16,'IndieBits','Game Developer','2021-05-01',NULL,'Desarrollo de videojuegos narrativos en Unity y C#.'),(20,17,'NeuroNet','AI Engineer','2022-02-01',NULL,'Entrenamiento y evaluación de modelos de lenguaje a gran escala.'),(21,18,'CodeForward','Tech Lead','2020-08-01',NULL,'Liderazgo técnico de equipos backend y mentoring de juniors.'),(22,19,'MediaLab','Content Strategist','2018-03-01',NULL,'Diseño de estrategias de contenido técnico enfocado en UX.'),(23,20,'BrightApps','Frontend Developer','2019-11-01',NULL,'Desarrollo frontend accesible y optimización CSS.'),(24,21,'NerdWorks','Full Stack Dev','2020-06-01',NULL,'Proyectos de e-commerce con React y Node.js.'),(25,22,'CyberLogic','Backend Developer','2018-09-01',NULL,'APIs RESTful y microservicios con Java y Spring.'),(26,23,'TechBridge','DevOps Engineer','2017-11-01',NULL,'Infraestructura como código y monitoreo con Prometheus.'),(27,24,'DataBridge','Data Scientist','2019-05-01',NULL,'Modelado de datos y análisis predictivo en Python.'),(28,25,'UIWorks','UX/UI Designer','2020-03-01',NULL,'Prototipado interactivo y testeo de usabilidad.'),(29,26,'SecureApps','Security Engineer','2018-01-01',NULL,'Auditorías de seguridad y hardening de sistemas.'),(30,27,'EduDev','Software Trainer','2016-10-01',NULL,'Capacitación en desarrollo web para empresas.'),(31,28,'AIStart','ML Engineer','2021-04-01',NULL,'Modelos de clasificación y detección de anomalías.'),(32,29,'OpenMedia','Content Creator','2019-07-01',NULL,'Redacción técnica y edición de tutoriales tech.'),(33,30,'LogicSystems','QA Lead','2020-01-01',NULL,'Liderazgo de equipos de testing y automatización.'),(34,31,'CloudForce','DevOps Specialist','2017-12-01',NULL,'CI/CD pipelines y deployments en AWS.'),(35,32,'GreenTech','Frontend Developer','2018-05-01',NULL,'Desarrollo de interfaces sostenibles y mobile-first.'),(36,33,'NeuralSync','AI Researcher','2021-06-01',NULL,'Investigación en NLP y embeddings semánticos.'),(37,34,'SoftCore','Junior Dev','2022-02-01',NULL,'Primer experiencia laboral en proyectos internos.'),(38,35,'CodeMentor','Mentor','2019-08-01',NULL,'Mentoría a nuevos talentos en tecnologías web.'),(39,36,'TechBloom','Full Stack Dev','2017-03-01',NULL,'Stack MERN y GraphQL en proyectos de innovación.'),(40,37,'VisionX','UX Researcher','2020-11-01',NULL,'Investigación de usuarios y testeo A/B.'),(41,38,'PaySys','Backend Dev','2016-04-01',NULL,'Sistemas de pagos y arquitectura orientada a eventos.'),(42,39,'AppLab','Mobile Developer','2019-02-01',NULL,'Desarrollo de apps en Flutter y React Native.'),(43,40,'BrightLab','Data Engineer','2021-10-01',NULL,'ETL pipelines y análisis de logs a gran escala.'),(44,41,'IntelliSys','CTO','2015-01-01',NULL,'Dirección técnica de startups en crecimiento.'),(45,42,'Tech4Good','Volunteer Dev','2020-09-01',NULL,'Desarrollo web para ONGs y causas sociales.'),(46,43,'NovaEdge','AI Consultant','2022-05-01',NULL,'Asesoramiento en integración de modelos de IA.'),(47,44,'AppDesign','UI Designer','2018-06-01',NULL,'Wireframes y guías de estilo para apps móviles.'),(48,45,'SafeCode','Security Consultant','2017-08-01',NULL,'Análisis de vulnerabilidades y políticas de seguridad.'),(49,46,'NextGen','Junior QA','2023-01-01',NULL,'Testeo funcional y reporte de bugs.'),(50,47,'OpenSource Co.','Contributor','2021-11-01',NULL,'Contribuciones a proyectos de código abierto.'),(51,48,'CleanCode Inc.','Senior Dev','2019-04-01',NULL,'Buenas prácticas y refactorización de legacy code.'),(52,49,'AlgoLabs','ML Ops Engineer','2022-03-01',NULL,'Deploy de modelos y monitoreo de rendimiento.'),(53,50,'UXWorks','UX Designer','2020-07-01',NULL,'Investigación de usuarios y rediseño de journeys.');
/*!40000 ALTER TABLE `workexperience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'linkedin'
--

--
-- Dumping routines for database 'linkedin'
--

--
-- Final view structure for view `v_audit_principal`
--

/*!50001 DROP VIEW IF EXISTS `v_audit_principal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_audit_principal` AS select `users`.`id` AS `id`,`users`.`first_name` AS `first_name`,`users`.`last_name` AS `last_name`,`users`.`email` AS `email`,`users`.`headline` AS `headline`,`users`.`location` AS `location`,`users`.`about` AS `about`,`workexperience`.`company` AS `company`,`workexperience`.`position` AS `position`,`posts`.`content` AS `post_content`,`comments`.`content` AS `comment_content`,`messages`.`content` AS `message_content`,`connections`.`status` AS `status`,`connecteduser`.`first_name` AS `connected_first_name`,`connecteduser`.`last_name` AS `connected_last_name` from ((((((`users` left join `workexperience` on(`users`.`id` = `workexperience`.`user_id`)) left join `posts` on(`users`.`id` = `posts`.`user_id`)) left join `comments` on(`users`.`id` = `comments`.`user_id`)) left join `messages` on(`users`.`id` = `messages`.`sender_id`)) left join `connections` on(`users`.`id` = `connections`.`user_id_1`)) left join `users` `connecteduser` on(`connections`.`user_id_2` = `connecteduser`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-30 18:04:52
