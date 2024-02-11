/*
  Warnings:

  - You are about to alter the column `password` on the `authentication` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "authentication" ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);
