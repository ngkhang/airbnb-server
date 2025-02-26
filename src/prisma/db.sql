/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_accounts_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `accounts` (`id`, `email`, `password_hash`, `is_locked`, `created_at`, `updated_at`) VALUES
(1, 'user1@gmail.com', '$2b$10$..e4XT6YxnBnQevo66zWe.JLyHIqEFd.e5XDY6CR3BDqmwRw7jYWG', 0, '2025-02-18 10:15:29', '2025-02-20 04:58:55');
INSERT INTO `accounts` (`id`, `email`, `password_hash`, `is_locked`, `created_at`, `updated_at`) VALUES
(2, 'user2@gmail.com', '$2b$10$..e4XT6YxnBnQevo66zWe.JLyHIqEFd.e5XDY6CR3BDqmwRw7jYWG', 0, '2025-02-18 10:15:29', '2025-02-18 10:15:29');
INSERT INTO `accounts` (`id`, `email`, `password_hash`, `is_locked`, `created_at`, `updated_at`) VALUES
(3, 'user3@gmail.com', '$2b$10$..e4XT6YxnBnQevo66zWe.JLyHIqEFd.e5XDY6CR3BDqmwRw7jYWG', 0, '2025-02-18 10:15:29', '2025-02-18 10:15:29');
INSERT INTO `accounts` (`id`, `email`, `password_hash`, `is_locked`, `created_at`, `updated_at`) VALUES
(4, 'user4@gmail.com', '$2b$10$..e4XT6YxnBnQevo66zWe.JLyHIqEFd.e5XDY6CR3BDqmwRw7jYWG', 0, '2025-02-18 10:15:29', '2025-02-18 10:15:29'),
(5, 'admin1@gmail.com', '$2b$10$..e4XT6YxnBnQevo66zWe.JLyHIqEFd.e5XDY6CR3BDqmwRw7jYWG', 0, '2025-02-18 10:15:29', '2025-02-18 10:15:29');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;