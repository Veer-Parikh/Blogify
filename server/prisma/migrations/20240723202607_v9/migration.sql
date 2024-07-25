/*
  Warnings:

  - You are about to drop the column `textSentimentScore` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `titleSentimentScore` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "textSentimentScore" INTEGER,
ADD COLUMN     "titleSentimentScore" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "textSentimentScore",
DROP COLUMN "titleSentimentScore";
