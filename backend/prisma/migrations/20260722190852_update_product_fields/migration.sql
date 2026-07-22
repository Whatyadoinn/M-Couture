/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `collection` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "stock",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "collection" TEXT NOT NULL,
ADD COLUMN     "comparePrice" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "inStock" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
