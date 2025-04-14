IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'Northwind')
BEGIN
  CREATE DATABASE Northwind;
END
GO
