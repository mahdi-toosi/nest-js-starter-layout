-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(250),
    "last_name" VARCHAR(250),
    "mobile" VARCHAR(10) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mobile_key" ON "Users"("mobile");

-- CreateIndex
CREATE INDEX "Users_mobile_idx" ON "Users"("mobile");
