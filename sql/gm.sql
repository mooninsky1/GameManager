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

Date: 2020-03-25 09:46:27
*/


-- ----------------------------
-- Table structure for actorlog
-- ----------------------------
DROP TABLE [dbo].[actorlog]
GO
CREATE TABLE [dbo].[actorlog] (
[id] int NOT NULL IDENTITY(1,1) ,
[opt] varchar(100) NULL ,
[param1] varchar(100) NULL ,
[param2] varchar(100) NULL ,
[param3] varchar(100) NULL ,
[param4] varchar(100) NULL ,
[param5] varchar(100) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[actorlog]', RESEED, 272)
GO

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
DBCC CHECKIDENT(N'[dbo].[gm]', RESEED, 271)
GO

-- ----------------------------
-- Table structure for mac
-- ----------------------------
DROP TABLE [dbo].[mac]
GO
CREATE TABLE [dbo].[mac] (
[mac] varchar(64) NOT NULL 
)


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
[open] int NULL ,
[tips] varchar(200) NULL 
)


GO

-- ----------------------------
-- Table structure for updateflag
-- ----------------------------
DROP TABLE [dbo].[updateflag]
GO
CREATE TABLE [dbo].[updateflag] (
[id] int NOT NULL ,
[flag] int NULL ,
[version] varchar(128) NULL 
)


GO

-- ----------------------------
-- Table structure for url
-- ----------------------------
DROP TABLE [dbo].[url]
GO
CREATE TABLE [dbo].[url] (
[url] varchar(256) NOT NULL 
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
-- Indexes structure for table actorlog
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table actorlog
-- ----------------------------
ALTER TABLE [dbo].[actorlog] ADD PRIMARY KEY ([id])
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
-- Indexes structure for table mac
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table mac
-- ----------------------------
ALTER TABLE [dbo].[mac] ADD PRIMARY KEY ([mac])
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
-- Indexes structure for table updateflag
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table updateflag
-- ----------------------------
ALTER TABLE [dbo].[updateflag] ADD PRIMARY KEY ([id])
GO

-- ----------------------------
-- Indexes structure for table url
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table url
-- ----------------------------
ALTER TABLE [dbo].[url] ADD PRIMARY KEY ([url])
GO

-- ----------------------------
-- Indexes structure for table users
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE [dbo].[users] ADD PRIMARY KEY ([user])
GO
