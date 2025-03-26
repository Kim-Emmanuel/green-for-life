/*
  Warnings:

  - The values [NEWS] on the enum `PostCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `featured_image_url` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to alter the column `value` on the `ImpactMetric` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `updated_at` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterEnum
BEGIN;
CREATE TYPE "PostCategory_new" AS ENUM ('BLOG', 'PUBLICATION', 'IMPACT_STORY', 'TENDER', 'CAREER');
ALTER TABLE "BlogPost" ALTER COLUMN "category" TYPE "PostCategory_new" USING ("category"::text::"PostCategory_new");
ALTER TYPE "PostCategory" RENAME TO "PostCategory_old";
ALTER TYPE "PostCategory_new" RENAME TO "PostCategory";
DROP TYPE "PostCategory_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CONTENT_MANAGER';

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "featured_image_url",
ADD COLUMN     "apply_url" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "featured_image" TEXT,
ADD COLUMN     "file_attachment" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ImpactMetric" ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
