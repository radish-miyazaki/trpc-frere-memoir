/*
  Warnings:

  - You are about to drop the column `deliversDays` on the `Flower` table. All the data in the column will be lost.
  - Added the required column `deliveryDays` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Flower` DROP COLUMN `deliversDays`,
    ADD COLUMN `deliveryDays` INTEGER NOT NULL;
