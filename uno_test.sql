/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 100424 (10.4.24-MariaDB)
 Source Host           : localhost:3308
 Source Schema         : uno_test

 Target Server Type    : MySQL
 Target Server Version : 100424 (10.4.24-MariaDB)
 File Encoding         : 65001

 Date: 15/06/2023 13:55:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_size` int NOT NULL,
  `mime_type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 445 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO `files` VALUES (444, '323463559_1015499609260645_7277675755134843459_n.jpg', 'uploads/images/2023-06-15/sam_323463559_1015499609260645_7277675755134843459_n.jpg', 44917, 'image/jpeg', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_id` enum('1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '3',
  `created_by` int NOT NULL,
  `updated_by` int NULL DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NULL DEFAULT current_timestamp(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_user`(`phone_number` ASC, `user_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '1233', 'nhf', '+84987654321', '8d3c25b52cbfd3be.a1eda7e5c0d8984e68c2ed3367c46b0b3dc7e7b340abfb3ce94c63f886bd49e8', '3', 0, NULL, '2023-06-14 11:42:43.431005', '2023-06-15 10:59:20.511594');
INSERT INTO `users` VALUES (6, 'test1', 'test1', '0987654322', 'd1e6db88982277e8.3fa1b5a2f9878ca7f59548914e4416a57fce6681d73eacc6ee00763fc4cf5ada', '1', 0, NULL, '2023-06-14 11:46:04.042088', '2023-06-15 11:44:03.847871');
INSERT INTO `users` VALUES (7, 'test2', '09', '0987654323', '6ba8d1209c738696.b232c7ecb5fd9b3b071314e2c0a281591572449f4ff9ed99aa6224aac8d6db5c', '3', 0, NULL, '2023-06-14 11:56:02.826301', '2023-06-15 10:59:20.570257');
INSERT INTO `users` VALUES (13, 'test22', '09', '0987654324', '262c873e050a7817.1a3b0c2c6efe04834360e306f13f8fbf5625dc7b25d1d1b23ededba08271d093', '3', 0, NULL, '2023-06-14 13:52:05.361788', '2023-06-15 10:59:20.595103');
INSERT INTO `users` VALUES (14, '', '', '', NULL, '3', 0, NULL, '2023-06-14 15:35:52.162893', '2023-06-15 10:59:20.620302');

-- ----------------------------
-- Table structure for vehicles
-- ----------------------------
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `license_plates` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_id` int NOT NULL,
  `license` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type_id` enum('1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1',
  `created_by` int NOT NULL,
  `updated_by` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `vehicle_unique`(`license_plates` ASC, `license` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vehicles
-- ----------------------------
INSERT INTO `vehicles` VALUES (1, 'bnhnn', '3521521', 444, '1223', '1', 0, NULL, '2023-06-15 11:51:58', '2023-06-15 13:53:44');

SET FOREIGN_KEY_CHECKS = 1;
