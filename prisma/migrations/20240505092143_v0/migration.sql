-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "profileUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);
