/*
  Warnings:

  - You are about to drop the column `desription` on the `collections` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_collections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "releaseYear" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_collections" ("createdAt", "id", "name", "releaseYear", "updatedAt") SELECT "createdAt", "id", "name", "releaseYear", "updatedAt" FROM "collections";
DROP TABLE "collections";
ALTER TABLE "new_collections" RENAME TO "collections";
CREATE UNIQUE INDEX "collections_name_key" ON "collections"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
