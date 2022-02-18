-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_enterpriseId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "enterpriseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
