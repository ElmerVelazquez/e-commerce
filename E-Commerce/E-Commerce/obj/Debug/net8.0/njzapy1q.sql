IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Categories] (
    [id] int NOT NULL IDENTITY,
    [name] nvarchar(100) NOT NULL,
    [description] nvarchar(255) NULL,
    CONSTRAINT [PK__Categori__3213E83F031292D7] PRIMARY KEY ([id])
);
GO

CREATE TABLE [Products] (
    [id] int NOT NULL IDENTITY,
    [name] nvarchar(100) NOT NULL,
    [description] nvarchar(255) NULL,
    [price] decimal(10,2) NOT NULL,
    [stock] int NOT NULL,
    [category_id] int NULL,
    [creation_date] datetime NULL DEFAULT ((getdate())),
    CONSTRAINT [PK__Products__3213E83F89537CFC] PRIMARY KEY ([id]),
    CONSTRAINT [FK__Products__catego__4222D4EF] FOREIGN KEY ([category_id]) REFERENCES [Categories] ([id])
);
GO

CREATE TABLE [Address] (
    [id] int NOT NULL IDENTITY,
    [user_id] int NOT NULL,
    [address] nvarchar(255) NOT NULL,
    [city] nvarchar(100) NOT NULL,
    [postal_code] nvarchar(20) NOT NULL,
    [country] nvarchar(100) NOT NULL,
    CONSTRAINT [PK__Address__3213E83F05D10CD9] PRIMARY KEY ([id])
);
GO

CREATE TABLE [Users] (
    [id] int NOT NULL IDENTITY,
    [name] nvarchar(100) NOT NULL,
    [email] nvarchar(100) NOT NULL,
    [password] nvarchar(255) NOT NULL,
    [phone] nvarchar(20) NULL,
    [registration_date] datetime NULL DEFAULT ((getdate())),
    [address_id] int NULL,
    CONSTRAINT [PK__Users__3213E83F790F4474] PRIMARY KEY ([id]),
    CONSTRAINT [FK__Users__address_i__3C69FB99] FOREIGN KEY ([address_id]) REFERENCES [Address] ([id])
);
GO

CREATE TABLE [Orders] (
    [id] int NOT NULL IDENTITY,
    [user_id] int NOT NULL,
    [order_date] datetime NULL DEFAULT ((getdate())),
    [status] nvarchar(50) NULL,
    [total] decimal(10,2) NOT NULL,
    CONSTRAINT [PK__Orders__3213E83F7C04BB24] PRIMARY KEY ([id]),
    CONSTRAINT [FK__Orders__user_id__45F365D3] FOREIGN KEY ([user_id]) REFERENCES [Users] ([id])
);
GO

CREATE TABLE [Shopping_Carts] (
    [id] int NOT NULL IDENTITY,
    [user_id] int NOT NULL,
    [creation_date] datetime NULL DEFAULT ((getdate())),
    CONSTRAINT [PK__Shopping__3213E83F3F03299A] PRIMARY KEY ([id]),
    CONSTRAINT [FK__Shopping___user___4D94879B] FOREIGN KEY ([user_id]) REFERENCES [Users] ([id])
);
GO

CREATE TABLE [Order_Details] (
    [id] int NOT NULL IDENTITY,
    [order_id] int NOT NULL,
    [product_id] int NOT NULL,
    [quantity] int NOT NULL,
    [price] decimal(10,2) NOT NULL,
    CONSTRAINT [PK__Order_De__3213E83FA6719921] PRIMARY KEY ([id]),
    CONSTRAINT [FK__Order_Det__order__48CFD27E] FOREIGN KEY ([order_id]) REFERENCES [Orders] ([id]),
    CONSTRAINT [FK__Order_Det__produ__49C3F6B7] FOREIGN KEY ([product_id]) REFERENCES [Products] ([id])
);
GO

CREATE TABLE [Cart_Items] (
    [id] int NOT NULL IDENTITY,
    [cart_id] int NOT NULL,
    [product_id] int NOT NULL,
    [quantity] int NOT NULL,
    CONSTRAINT [PK__Cart_Ite__3213E83F9374A5CE] PRIMARY KEY ([id]),
    CONSTRAINT [FK__Cart_Item__cart___5070F446] FOREIGN KEY ([cart_id]) REFERENCES [Shopping_Carts] ([id]),
    CONSTRAINT [FK__Cart_Item__produ__5165187F] FOREIGN KEY ([product_id]) REFERENCES [Products] ([id])
);
GO

CREATE INDEX [IX_Address_user_id] ON [Address] ([user_id]);
GO

CREATE INDEX [IX_Cart_Items_cart_id] ON [Cart_Items] ([cart_id]);
GO

CREATE INDEX [IX_Cart_Items_product_id] ON [Cart_Items] ([product_id]);
GO

CREATE INDEX [IX_Order_Details_order_id] ON [Order_Details] ([order_id]);
GO

CREATE INDEX [IX_Order_Details_product_id] ON [Order_Details] ([product_id]);
GO

CREATE INDEX [IX_Orders_user_id] ON [Orders] ([user_id]);
GO

CREATE INDEX [IX_Products_category_id] ON [Products] ([category_id]);
GO

CREATE INDEX [IX_Shopping_Carts_user_id] ON [Shopping_Carts] ([user_id]);
GO

CREATE INDEX [IX_Users_address_id] ON [Users] ([address_id]);
GO

CREATE UNIQUE INDEX [UQ__Users__AB6E616485D4CFEF] ON [Users] ([email]);
GO

ALTER TABLE [Address] ADD CONSTRAINT [FK__Address__user_id__3B75D760] FOREIGN KEY ([user_id]) REFERENCES [Users] ([id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240614145347_init', N'8.0.6');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Users] DROP CONSTRAINT [FK__Users__address_i__3C69FB99];
GO

DROP INDEX [IX_Users_address_id] ON [Users];
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'address_id');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Users] DROP COLUMN [address_id];
GO

ALTER TABLE [Users] ADD [rol] nvarchar(50) NULL DEFAULT (Regular);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240618160707_rolfield', N'8.0.6');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240618174646_fix', N'8.0.6');
GO

COMMIT;
GO

