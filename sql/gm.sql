/*
Navicat SQL Server Data Transfer

Source Server         : 192.168.1.128
Source Server Version : 105000
Source Host           : 192.168.1.128,1433:1433
Source Database       : nodetest
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 105000
File Encoding         : 65001

Date: 2019-12-17 14:22:48
*/


-- ----------------------------
-- Table structure for gm
-- ----------------------------
DROP TABLE [dbo].[gm]
GO
CREATE TABLE [dbo].[gm] (
[id] int NOT NULL IDENTITY(1,1) ,
[user] varchar(32) NULL ,
[log] varchar(8000) NULL ,
[logtime] datetime NULL ,
[opt] varchar(100) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[gm]', RESEED, 57)
GO

-- ----------------------------
-- Table structure for server
-- ----------------------------
DROP TABLE [dbo].[server]
GO
CREATE TABLE [dbo].[server] (
[id] int NOT NULL ,
[name] varchar(100) NULL ,
[stat] int NULL ,
[flag] int NULL ,
[open] int NULL 
)


GO

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE [dbo].[users]
GO
CREATE TABLE [dbo].[users] (
[user] varchar(32) NOT NULL ,
[passwd] varchar(32) NULL 
)


GO

-- ----------------------------
-- Indexes structure for table gm
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table gm
-- ----------------------------
ALTER TABLE [dbo].[gm] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Indexes structure for table server
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table server
-- ----------------------------
ALTER TABLE [dbo].[server] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE [dbo].[users] ADD PRIMARY KEY ([user])
GO
