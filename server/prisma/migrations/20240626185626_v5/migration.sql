-- CreateTable
CREATE TABLE "Images" (
    "imageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blogBlogId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("imageId")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_blogBlogId_fkey" FOREIGN KEY ("blogBlogId") REFERENCES "Blog"("blogId") ON DELETE RESTRICT ON UPDATE CASCADE;
