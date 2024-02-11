/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "authentication" ADD COLUMN     "lastIPAddress" TEXT,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "passwordResetExpiresAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "authentication_email_key" ON "authentication"("email");
