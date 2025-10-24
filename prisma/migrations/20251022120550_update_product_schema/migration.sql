/*
  Warnings:

  - You are about to drop the column `created_at` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `product` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_id_fkey";

-- DropIndex
DROP INDEX "public"."product_code_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "sales" DROP NOT NULL,
ALTER COLUMN "sales" DROP DEFAULT,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "currency" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;
