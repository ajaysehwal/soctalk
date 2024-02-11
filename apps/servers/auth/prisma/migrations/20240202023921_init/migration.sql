/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "authentication_username_key" ON "authentication"("username");
