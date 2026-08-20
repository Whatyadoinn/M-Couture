/*
  Warnings:

  - You are about to drop the column `razorpayOrderId` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'confirmed', 'rejected');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "razorpayOrderId",
ADD COLUMN     "paymentScreenshotUrl" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';
