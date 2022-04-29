-- CreateTable
CREATE TABLE "MultiColDedupe1" (
    "id" SERIAL NOT NULL,
    "a" TEXT NOT NULL,
    "b" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "d" TEXT NOT NULL,
    "e" TEXT NOT NULL,
    "f" TEXT NOT NULL,
    "g" TEXT NOT NULL,

    CONSTRAINT "MultiColDedupe1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiColDedupe2" (
    "id" SERIAL NOT NULL,
    "a" TEXT NOT NULL,
    "b" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "d" TEXT NOT NULL,
    "e" TEXT NOT NULL,
    "f" TEXT NOT NULL,
    "g" TEXT NOT NULL,

    CONSTRAINT "MultiColDedupe2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiColDedupe3" (
    "id" SERIAL NOT NULL,
    "a" TEXT NOT NULL,
    "b" TEXT NOT NULL,
    "c" TEXT NOT NULL,
    "d" TEXT NOT NULL,
    "e" TEXT NOT NULL,
    "f" TEXT NOT NULL,
    "g" TEXT NOT NULL,

    CONSTRAINT "MultiColDedupe3_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MultiColDedupe1_a_key" ON "MultiColDedupe1"("a");

-- CreateIndex
CREATE UNIQUE INDEX "MultiColDedupe2_a_b_key" ON "MultiColDedupe2"("a", "b");

-- CreateIndex
CREATE UNIQUE INDEX "MultiColDedupe3_a_b_c_d_e_key" ON "MultiColDedupe3"("a", "b", "c", "d", "e");
