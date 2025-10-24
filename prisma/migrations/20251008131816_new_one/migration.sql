/*
  Warnings:

  - You are about to drop the column `category` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "category",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'USD';

-- CreateTable
CREATE TABLE "category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_id_fkey" FOREIGN KEY ("id") REFERENCES "category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
