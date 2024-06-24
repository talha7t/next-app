/*
  Warnings:

  - You are about to drop the column `isActie` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `isActie`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
