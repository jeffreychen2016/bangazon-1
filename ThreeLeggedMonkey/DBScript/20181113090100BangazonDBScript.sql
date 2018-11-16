/*
   Tuesday, November 13, 20188:59:08 PM
   User: 
   Server: DESKTOP-MMKHIT7
   Database: BangazonDB
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.OrderStage
	DROP CONSTRAINT FK_OrderId
GO
ALTER TABLE dbo.[Order] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.OrderStage ADD CONSTRAINT
	FK_OrderId FOREIGN KEY
	(
	OrderId
	) REFERENCES dbo.[Order]
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  CASCADE 
	
GO
ALTER TABLE dbo.OrderStage SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
