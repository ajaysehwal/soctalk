-- CreateTable
CREATE TABLE "authentication" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authentication_pkey" PRIMARY KEY ("id")
);
