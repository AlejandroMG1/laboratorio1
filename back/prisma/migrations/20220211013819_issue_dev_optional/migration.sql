-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_developerId_fkey";

-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "developerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
