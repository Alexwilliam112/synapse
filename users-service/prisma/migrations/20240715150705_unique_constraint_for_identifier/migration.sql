/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `DataLink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Process` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DataLink_identifier_key" ON "DataLink"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Event_identifier_key" ON "Event"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Process_identifier_key" ON "Process"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "State_identifier_key" ON "State"("identifier");
