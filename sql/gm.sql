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

Date: 2019-12-03 10:44:25
*/


-- ----------------------------
-- Table structure for gm
-- ----------------------------
DROP TABLE [dbo].[gm]
GO
CREATE TABLE [dbo].[gm] (
[user] varchar(32) NULL ,
[log] varchar(8000) NULL ,
[logtime] varchar(100) NULL ,
[opt] varchar(100) NULL 
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
-- Indexes structure for table users
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE [dbo].[users] ADD PRIMARY KEY ([user])
GO
