/*
  Warnings:

  - Added the required column `authtoken` to the `authentication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `authentication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `authentication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authentication" ADD COLUMN     "authtoken" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
