/*
  Warnings:

  - Added the required column `apiKey` to the `Endpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fitness` to the `Process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "apiKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "fitness" INTEGER NOT NULL;
