/*
  Warnings:

  - Made the column `title` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" DROP DEFAULT;
