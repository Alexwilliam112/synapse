/*
  Warnings:

  - Added the required column `text` to the `DataLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataLink" ADD COLUMN     "text" TEXT NOT NULL;
