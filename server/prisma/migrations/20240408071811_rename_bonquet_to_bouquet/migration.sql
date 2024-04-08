/*
  Warnings:

  - You are about to drop the `Bonquet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BonquetDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BonquetDetail` DROP FOREIGN KEY `BonquetDetail_bonquetId_fkey`;

-- DropForeignKey
ALTER TABLE `BonquetDetail` DROP FOREIGN KEY `BonquetDetail_flowerId_fkey`;

-- DropTable
DROP TABLE `Bonquet`;

-- DropTable
DROP TABLE `BonquetDetail`;

-- CreateTable
CREATE TABLE `Bouquet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bouquetCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bouquet_bouquetCode_key`(`bouquetCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BouquetDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flowerId` INTEGER NOT NULL,
    `flowerQuantity` INTEGER NOT NULL,
    `bouquetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BouquetDetail` ADD CONSTRAINT `BouquetDetail_flowerId_fkey` FOREIGN KEY (`flowerId`) REFERENCES `Flower`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BouquetDetail` ADD CONSTRAINT `BouquetDetail_bouquetId_fkey` FOREIGN KEY (`bouquetId`) REFERENCES `Bouquet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
