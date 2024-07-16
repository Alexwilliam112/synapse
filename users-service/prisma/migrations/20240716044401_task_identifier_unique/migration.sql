/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_identifier_key" ON "Task"("identifier");
