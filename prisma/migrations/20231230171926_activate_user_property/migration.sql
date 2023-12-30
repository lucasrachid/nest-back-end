-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "configEmail" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "templateHtml" TEXT NOT NULL,

    CONSTRAINT "configEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configEmail_id_key" ON "configEmail"("id");
