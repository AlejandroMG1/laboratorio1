-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "status" SET DEFAULT E'NotAssigned',
ALTER COLUMN "hourEstimate" DROP NOT NULL,
ALTER COLUMN "closeDate" DROP NOT NULL;
