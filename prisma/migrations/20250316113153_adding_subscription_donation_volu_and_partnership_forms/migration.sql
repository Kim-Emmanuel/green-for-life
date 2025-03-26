/*
  Warnings:

  - You are about to drop the `NewsletterSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PartnershipType" AS ENUM ('CORPORATE', 'COMMUNITY', 'RESEARCH');

-- CreateEnum
CREATE TYPE "DonationFrequency" AS ENUM ('ONE_TIME', 'MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "VolunteerInterest" AS ENUM ('FIELDWORK', 'EDUCATION', 'RESEARCH');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('WEEKDAYS', 'WEEKENDS', 'BOTH');

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "category_id" TEXT;

-- DropTable
DROP TABLE "NewsletterSubscription";

-- CreateTable
CREATE TABLE "newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subscribed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribed_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partnership" (
    "id" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "partnershipType" "PartnershipType" NOT NULL,
    "proposal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Partnership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "frequency" "DonationFrequency" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "transactionId" TEXT,
    "donorEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "interests" "VolunteerInterest" NOT NULL,
    "availability" "Availability" NOT NULL,
    "skills" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_key" ON "newsletter_subscriptions"("email");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_subscribed_at_idx" ON "newsletter_subscriptions"("subscribed_at");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_unsubscribed_at_idx" ON "newsletter_subscriptions"("unsubscribed_at");

-- CreateIndex
CREATE INDEX "Partnership_createdAt_idx" ON "Partnership"("createdAt");

-- CreateIndex
CREATE INDEX "Partnership_partnershipType_idx" ON "Partnership"("partnershipType");

-- CreateIndex
CREATE INDEX "Donation_createdAt_idx" ON "Donation"("createdAt");

-- CreateIndex
CREATE INDEX "Donation_donorEmail_idx" ON "Donation"("donorEmail");

-- CreateIndex
CREATE INDEX "Donation_paymentMethod_idx" ON "Donation"("paymentMethod");

-- CreateIndex
CREATE INDEX "Volunteer_createdAt_idx" ON "Volunteer"("createdAt");

-- CreateIndex
CREATE INDEX "Volunteer_email_idx" ON "Volunteer"("email");

-- CreateIndex
CREATE INDEX "Volunteer_interests_idx" ON "Volunteer"("interests");
