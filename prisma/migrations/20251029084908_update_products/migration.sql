-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;
