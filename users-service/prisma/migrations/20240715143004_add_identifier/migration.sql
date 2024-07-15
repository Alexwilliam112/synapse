/*
  Warnings:

  - Added the required column `identifier` to the `DataLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `Process` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifier` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataLink" ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "identifier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "identifier" TEXT NOT NULL;
