-- AlterTable: add missing profile fields to users
ALTER TABLE "users" ADD COLUMN     "bio" TEXT;
ALTER TABLE "users" ADD COLUMN     "website" TEXT;
ALTER TABLE "users" ADD COLUMN     "twitter" TEXT;
