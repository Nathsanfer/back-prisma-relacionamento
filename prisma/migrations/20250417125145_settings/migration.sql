/*
  Warnings:

  - You are about to drop the column `createAt` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `collections` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "attackPoints" INTEGER NOT NULL,
    "defensePoints" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "collectionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cards_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("attackPoints", "collectionId", "defensePoints", "id", "imageUrl", "name", "rarity", "updatedAt") SELECT "attackPoints", "collectionId", "defensePoints", "id", "imageUrl", "name", "rarity", "updatedAt" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
CREATE UNIQUE INDEX "cards_name_key" ON "cards"("name");
CREATE UNIQUE INDEX "cards_collectionId_key" ON "cards"("collectionId");
CREATE TABLE "new_collections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desription" TEXT,
    "releaseYear" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_collections" ("desription", "id", "name", "releaseYear", "updatedAt") SELECT "desription", "id", "name", "releaseYear", "updatedAt" FROM "collections";
DROP TABLE "collections";
ALTER TABLE "new_collections" RENAME TO "collections";
CREATE UNIQUE INDEX "collections_name_key" ON "collections"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
