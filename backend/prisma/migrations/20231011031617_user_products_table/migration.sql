-- CreateTable
CREATE TABLE `UserProductsTable` (
    `usersId` VARCHAR(191) NOT NULL,
    `productsId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `UserProductsTable_usersId_key`(`usersId`),
    UNIQUE INDEX `UserProductsTable_productsId_key`(`productsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProductsTable` ADD CONSTRAINT `UserProductsTable_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProductsTable` ADD CONSTRAINT `UserProductsTable_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
