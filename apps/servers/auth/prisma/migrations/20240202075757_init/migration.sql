/*
  Warnings:

  - You are about to drop the column `email` on the `authentication` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "authentication_email_key";

-- AlterTable
ALTER TABLE "authentication" DROP COLUMN "email";
