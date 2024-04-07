-- CreateTable
CREATE TABLE `Flower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flowerCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `deliversDays` INTEGER NOT NULL,
    `purchaseQuantity` INTEGER NOT NULL,
    `maintableDays` INTEGER NOT NULL,

    UNIQUE INDEX `Flower_flowerCode_key`(`flowerCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bonquet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bonquetCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bonquet_bonquetCode_key`(`bonquetCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BonquetDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flowerId` INTEGER NOT NULL,
    `flowerQuantity` INTEGER NOT NULL,
    `bonquetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BonquetDetail` ADD CONSTRAINT `BonquetDetail_flowerId_fkey` FOREIGN KEY (`flowerId`) REFERENCES `Flower`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BonquetDetail` ADD CONSTRAINT `BonquetDetail_bonquetId_fkey` FOREIGN KEY (`bonquetId`) REFERENCES `Bonquet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
