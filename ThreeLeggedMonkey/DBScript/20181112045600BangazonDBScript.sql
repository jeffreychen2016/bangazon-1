---------------------------------- Create Database ----------------------------
-- DROP DATABASE BangazonDB;
-- CREATE DATABASE BangazonDB;

USE BangazonDB
GO
---------------------------------- Drop All FK Constraints ---------------------
WHILE(EXISTS(SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_TYPE='FOREIGN KEY'))
BEGIN
	DECLARE @sql NVARCHAR(2000)
	SELECT TOP 1 @sql=('ALTER TABLE ' + TABLE_SCHEMA + '.[' + TABLE_NAME
	+ '] DROP CONSTRAINT [' + CONSTRAINT_NAME + ']')
	FROM information_schema.table_constraints
	WHERE CONSTRAINT_TYPE = 'FOREIGN KEY'
	EXEC (@sql)
END
---------------------------------- Drop Tables --------------------------------

IF  OBJECT_ID('Employee','U') IS NOT NULL
DROP TABLE Employee

IF  OBJECT_ID('Department','U') IS NOT NULL
DROP TABLE Department

IF  OBJECT_ID('EmployeeType','U') IS NOT NULL
DROP TABLE EmployeeType

IF  OBJECT_ID('Department','U') IS NOT NULL
DROP TABLE Department;

IF  OBJECT_ID('Computers','U') IS NOT NULL
DROP TABLE Computers;

IF  OBJECT_ID('EmployeeTrainings','U') IS NOT NULL
DROP TABLE EmployeeTrainings;

IF  OBJECT_ID('TrainingProgram','U') IS NOT NULL
DROP TABLE TrainingProgram;

IF  OBJECT_ID('Customer','U') IS NOT NULL
DROP TABLE Customer;

IF  OBJECT_ID('PaymentType','U') IS NOT NULL
DROP TABLE PaymentType;

IF  OBJECT_ID('OrderStage','U') IS NOT NULL
DROP TABLE OrderStage;

IF  OBJECT_ID('Order','U') IS NOT NULL
DROP TABLE [Order];

IF  OBJECT_ID('Product','U') IS NOT NULL
DROP TABLE Product;

IF  OBJECT_ID('ProductType','U') IS NOT NULL
DROP TABLE ProductType;

------------------------ Create Tables ---------------------------

CREATE TABLE Employee (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  FirstName varchar(50) not null,
  LastName varchar(50) not null,
  DepartmentId int not null,
  EmployeeTypeId int not null,
  AssignedComputer int not null
);
CREATE TABLE EmployeeType(
  Id int not null PRIMARY KEY IDENTITY(1,1),
  EmployeeTypeName varchar(50) not null UNIQUE
)
CREATE TABLE Department (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  DepartmentName varchar(50) not null UNIQUE
)
CREATE TABLE Computers(
  Id int not null PRIMARY KEY IDENTITY(1,1),
  SerialNumber varchar(50) not null UNIQUE,
  DateOfPurchase datetime not null,
  DecommissionedDate datetime not null,
  IsOperable bit not null
)
CREATE TABLE TrainingProgram (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  ProgramName varchar(50) not null UNIQUE,
  StartDate datetime not null,
  EndDate datetime not null,
  MaxAttendees int not null
)
CREATE TABLE EmployeeTrainings(
  Id int not null PRIMARY KEY IDENTITY(1,1),
  EmployeeId int not null,
  TrainingProgramId int not null
)
CREATE TABLE Product (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  ProductTypeId int not null,
  Price bigint not null,
  Name varchar(50) not null UNIQUE,
  Description varchar(50) not null,
  Quantity int not null
)
CREATE TABLE ProductType (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  ProductTypeName varchar(50) not null UNIQUE
)
CREATE TABLE Customer (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  FirstName varchar(50) not null,
  LastName varchar(50) not null,
  IsActive bit not null
)
CREATE TABLE PaymentType(
  Id int not null PRIMARY KEY IDENTITY(1,1),
  PaymentTypeName varchar(50) not null UNIQUE,
  CustomerId int not null
)
CREATE TABLE [Order] (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  CustomerId int not null,
  IsComplete bit not null,
  IsActive bit not null
)
CREATE TABLE OrderStage (
  Id int not null PRIMARY KEY IDENTITY(1,1),
  ProductId int not null,
  OrderId int not null
)

-------------------------- Add Foreign Keys --------------------------

ALTER TABLE Employee
ADD CONSTRAINT FK_DepartmentId
FOREIGN KEY (DepartmentId) REFERENCES Department(Id)
ON DELETE CASCADE;

ALTER TABLE Employee
ADD CONSTRAINT FK_EmployeeTypeId
FOREIGN KEY (EmployeeTypeId) REFERENCES EmployeeType(Id)
ON DELETE CASCADE;

ALTER TABLE Employee
ADD CONSTRAINT FK_AssignedComputer
FOREIGN KEY (AssignedComputer) REFERENCES Computers(Id)
ON DELETE CASCADE;

ALTER TABLE EmployeeTrainings
ADD CONSTRAINT FK_TrainingProgramId
FOREIGN KEY (TrainingProgramId) REFERENCES TrainingProgram(Id)
ON DELETE CASCADE;

ALTER TABLE PaymentType
ADD CONSTRAINT FK_CustomerId_1
FOREIGN KEY (CustomerId) REFERENCES Customer(Id)
ON DELETE CASCADE;

ALTER TABLE EmployeeTrainings
ADD CONSTRAINT FK_EmployeeId
FOREIGN KEY (EmployeeId) REFERENCES Employee(Id)
ON DELETE CASCADE;

ALTER TABLE [Order]
ADD CONSTRAINT FK_CustomerId_2
FOREIGN KEY (CustomerId) REFERENCES Customer(Id)
ON DELETE CASCADE;

ALTER TABLE OrderStage
ADD CONSTRAINT FK_OrderId
FOREIGN KEY (OrderId) REFERENCES [Order](Id)
ON DELETE CASCADE;

ALTER TABLE OrderStage
ADD CONSTRAINT FK_ProductId
FOREIGN KEY (ProductId) REFERENCES Product(Id)
ON DELETE CASCADE;

ALTER TABLE Product
ADD CONSTRAINT FK_ProductType
FOREIGN KEY (ProductTypeId) REFERENCES ProductType(Id)
ON DELETE CASCADE;

---------------------------- Populating Seed Data ------------------------------
-- Department Table --
DECLARE @departmentCounter int
		,@departmentName nvarchar(50);

SET @departmentCounter = 1;
WHILE @departmentCounter < 11
BEGIN  
	SET @departmentName = 'Department-' + CAST(@departmentCounter AS nvarchar);
	INSERT INTO Department (DepartmentName)
	VALUES (@departmentName)
	SET @departmentCounter = @departmentCounter + 1;
END  

-- Employee Type Table --
DECLARE @EmployeeTypeCounter int;
DECLARE @EmployeeTypeName nvarchar(50);
SET @EmployeeTypeCounter = 1;
WHILE @EmployeeTypeCounter < 11
BEGIN  
	SET @EmployeeTypeName = 'EmployeeType-' + CAST(@EmployeeTypeCounter AS nvarchar);
	INSERT INTO EmployeeType(EmployeeTypeName)
	VALUES (@EmployeeTypeName)
	SET @EmployeeTypeCounter = @EmployeeTypeCounter + 1;
END  

-- Computers Table --
DECLARE @ComputerCounter int
		,@ComputerSerialNumber varchar(50)
		,@ComputerDateOfPurchase datetime
		,@ComputerDecommissionedDate datetime
		,@isOperable bit;

SET @ComputerCounter = 1;
SET @ComputerDateOfPurchase = '2000/01/01';
SET @ComputerDecommissionedDate = '2000/01/01'
WHILE @ComputerCounter < 11
BEGIN  
	SET @ComputerSerialNumber = 'Computer-' + CAST(@ComputerCounter AS nvarchar);
	SET @ComputerDateOfPurchase = DATEADD(month, 1, @ComputerDateOfPurchase);
	SET @ComputerDecommissionedDate = DATEADD(year, 1, @ComputerDecommissionedDate);
	INSERT INTO Computers(SerialNumber,DateOfPurchase,DecommissionedDate,IsOperable)
	VALUES (@ComputerSerialNumber,@ComputerDateOfPurchase,@ComputerDecommissionedDate, 1)
	SET @ComputerCounter = @ComputerCounter + 1;
END  

-- Training Program Table --
DECLARE @TraninngProgramCounter int
		,@TraninngProgramProgramName varchar(50)
		,@TraninngProgramStartDate datetime
		,@TraninngProgramEndDate datetime
		,@TraninngProgramMaxAttendees int;

SET @TraninngProgramCounter = 1
SET @TraninngProgramStartDate = '2015/01/01'
SET @TraninngProgramEndDate = '2016/01/01'
WHILE @TraninngProgramCounter < 11
BEGIN  
	SET @TraninngProgramProgramName = 'ProgramName-' + CAST(@TraninngProgramCounter AS nvarchar);
	SET @TraninngProgramStartDate = DATEADD(year, 1, @TraninngProgramStartDate);
	SET @TraninngProgramEndDate = DATEADD(year, 1, @TraninngProgramEndDate);
	INSERT INTO TrainingProgram(ProgramName,StartDate,EndDate,MaxAttendees)
	VALUES (@TraninngProgramProgramName,@TraninngProgramStartDate,@TraninngProgramEndDate, 10)
	SET @TraninngProgramCounter = @TraninngProgramCounter + 1;
END  

-- Employee Table --
DECLARE @EmployeeCounter int
		,@EmployeeFirstName varchar(50)
		,@EmployeeLastName varchar(50)
		,@EmployeeDepartmentId int
		,@EmployeeTypeId int
		,@EmployeeAssignedCuomputer int
		,@EmployeeUpperLimit int
		,@EmployeeLowerLimit int
		,@EmployeeRandom int

SET @EmployeeCounter = 1
SET @EmployeeUpperLimit = 10
SET @EmployeeLowerLimit = 1

WHILE @EmployeeCounter < 11
BEGIN  
	SET @EmployeeFirstName = 'FirstName-' + CAST(@EmployeeCounter AS nvarchar);
	SET @EmployeeLastName = 'LastName-' + CAST(@EmployeeCounter AS nvarchar);
	SET @EmployeeRandom = ROUND(((@EmployeeUpperLimit - @EmployeeLowerLimit -1) * RAND() + @EmployeeLowerLimit), 0)

	INSERT INTO Employee(FirstName,LastName,DepartmentId,EmployeeTypeId,AssignedComputer)
	VALUES (@EmployeeFirstName,@EmployeeLastName,@EmployeeRandom, @EmployeeRandom,@EmployeeCounter)
	SET @EmployeeCounter = @EmployeeCounter + 1;
END  

-- Employee Trainings Table --

DECLARE @EmployeeTrainingsCounter int
		,@EmployeeTrainingsEmployee int
		,@EmployeeTrainingsProgram int
		,@EmployeeTrainingsUpperLimit int
		,@EmployeeTrainingsLowerLimit int
		,@EmployeeTrainingsRandomEmployee int
		,@EmployeeTrainingsRandomProgram int

SET @EmployeeTrainingsCounter = 1
SET @EmployeeUpperLimit = 10
SET @EmployeeLowerLimit = 1

WHILE @EmployeeTrainingsCounter < 11
BEGIN  
	SET @EmployeeTrainingsRandomEmployee = ROUND(((@EmployeeUpperLimit - @EmployeeLowerLimit -1) * RAND() + @EmployeeLowerLimit), 0)
	SET @EmployeeTrainingsRandomProgram = ROUND(((@EmployeeUpperLimit - @EmployeeLowerLimit -1) * RAND() + @EmployeeLowerLimit), 0)
	SET @EmployeeTrainingsEmployee = @EmployeeTrainingsRandomEmployee
	SET @EmployeeTrainingsProgram = @EmployeeTrainingsRandomProgram
	
	INSERT INTO EmployeeTrainings(EmployeeId,TrainingProgramId)
	VALUES (@EmployeeTrainingsEmployee,@EmployeeTrainingsProgram)
	SET @EmployeeTrainingsCounter = @EmployeeTrainingsCounter + 1;
END  

-- Customer Table --

DECLARE @CustomerCounter int
		,@CustomerFirstName varchar(50)
		,@CustomerLastName varchar(50)

SET @CustomerCounter = 1


WHILE @CustomerCounter < 11
BEGIN  
	SET @CustomerFirstName = 'CustomerFirstName-' + CAST(@CustomerCounter AS nvarchar);
	SET @CustomerLastName = 'CustomerLastName-' + CAST(@CustomerCounter AS nvarchar);

	
	INSERT INTO Customer(FirstName,LastName,isActive)
	VALUES (@CustomerFirstName,@CustomerLastName, 1)
	SET @CustomerCounter = @CustomerCounter + 1;
END  

-- Payment Type Table --
DECLARE @PaymentTypeName varchar(50)

SET @PaymentTypeName = 'Visa'

INSERT INTO PaymentType(PaymentTypeName,CustomerId)
VALUES (@PaymentTypeName,1)

-- Order Table --
DECLARE @OrderCounter int
		,@OrderCustomerId varchar(50)
		,@IsCompelete varchar(50)
		,@IsActive varchar(50)
		,@OrderCustomerIdLowerLimit int
		,@OrderCustomerIdUpperLimit int
		,@OrderIsComplete int
		,@OrderisActive int
		,@OrderIsCompleteLowerLimit int
		,@OrderIsCompleteUpperLimit int

SET @OrderCounter = 1
SET @OrderCustomerIdLowerLimit = 1
SET @OrderCustomerIdUpperLimit = 10
SET @OrderIsCompleteLowerLimit = 0
SET @OrderIsCompleteUpperLimit = 2

WHILE @OrderCounter < 11
BEGIN  
	SET @OrderCustomerId = ROUND(((@OrderCustomerIdUpperLimit - @OrderCustomerIdLowerLimit -1) * RAND() + @OrderCustomerIdLowerLimit), 0);
	SET @OrderIsComplete = ROUND(((@OrderIsCompleteUpperLimit - @OrderIsCompleteLowerLimit -1) * RAND() + @OrderIsCompleteLowerLimit), 0);
	SET @OrderIsActive = ROUND(((@OrderIsCompleteUpperLimit - @OrderIsCompleteLowerLimit -1) * RAND() + @OrderIsCompleteLowerLimit), 0);

	INSERT INTO [Order](CustomerId,IsComplete,IsActive)
	VALUES (@OrderCustomerId, @OrderIsComplete, @OrderIsActive)
	SET @OrderCounter = @OrderCounter + 1;
END  

-- Product Type Table -- 
DECLARE @ProductTypeCounter int
		,@ProductTypeName varchar(50)

SET @ProductTypeCounter = 1

WHILE @ProductTypeCounter < 11
BEGIN  
	SET @ProductTypeName = 'ProductType-' + CAST(@ProductTypeCounter AS nvarchar);

	INSERT INTO ProductType(ProductTypeName)
	VALUES (@ProductTypeName)
	SET @ProductTypeCounter = @ProductTypeCounter + 1;
END  

-- Product Table --
DECLARE @ProductCounter int
		,@ProductProductType varchar(50)
		,@ProductPrice bigint
		,@ProductName varchar(50)
		,@ProductDescription varchar(50)
		,@ProductQuantity int
		,@ProductProductTypeLowerLimit int
		,@ProductProductTypeUpperLimit int

SET @ProductCounter = 1
SET @ProductProductTypeLowerLimit = 1
SET @ProductProductTypeUpperLimit = 10

WHILE @ProductCounter < 11
BEGIN  
	SET @ProductName = 'Product-' + CAST(@ProductCounter AS nvarchar);
	SET @ProductDescription = 'Description-' + CAST(@ProductCounter AS nvarchar);
	SET @ProductProductType = ROUND(((@ProductProductTypeUpperLimit - @ProductProductTypeLowerLimit -1) * RAND() + @ProductProductTypeLowerLimit), 0);

	INSERT INTO Product(ProductTypeId,Price,[Name],[Description],Quantity)
	VALUES (@ProductProductType,@ProductCounter, @ProductName ,@ProductDescription,@ProductCounter)
	SET @ProductCounter = @ProductCounter + 1;
END  

-- Order Stage Table --
DECLARE @OrderStageCounter int
		,@OrderStageProductId int
		,@OrderStageOrderId int
		,@OrderStageProductIdUpperLimit int
		,@OrderStagePorudctIdLowerLimit int
		,@OrderStageOrderIdUpperLimit int
		,@OrderStateOrderIdLowerLimit int

SET @OrderStageCounter = 1
SET @OrderStageProductIdUpperLimit = 10
SET @OrderStagePorudctIdLowerLimit = 1
SET @OrderStageOrderIdUpperLimit = 10
SET @OrderStateOrderIdLowerLimit = 1

WHILE @OrderStageCounter < 1001
BEGIN  
	SET @OrderStageProductId = ROUND(((@OrderStageProductIdUpperLimit - @OrderStagePorudctIdLowerLimit -1) * RAND() + @OrderStagePorudctIdLowerLimit), 0);
	SET @OrderStageOrderId = ROUND(((@OrderStageOrderIdUpperLimit - @OrderStateOrderIdLowerLimit -1) * RAND() + @OrderStateOrderIdLowerLimit), 0);


	INSERT INTO OrderStage(ProductId,OrderId)
	VALUES (@OrderStageProductId,@OrderStageOrderId)
	SET @OrderStageCounter = @OrderStageCounter + 1;
END  

