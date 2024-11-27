-- CreateEnum
CREATE TYPE "Situation" AS ENUM ('ABANDONADO', 'ACOLHIDO', 'ADOTADO', 'DESAPARECIDO', 'FALECIDO');

-- CreateEnum
CREATE TYPE "Species" AS ENUM ('GATO', 'CACHORRO');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('HOSPITAL', 'DOCTOR', 'TUTOR', 'SHELTER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "cod_microchip" VARCHAR(15) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "breed" VARCHAR(15) NOT NULL,
    "age" DATE NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "gender" "Gender" NOT NULL,
    "species" "Species" NOT NULL,
    "vaccines" JSON,
    "castrated" BOOLEAN NOT NULL,
    "situation" "Situation" NOT NULL,
    "tutorId" TEXT,
    "shelter_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutors" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" VARCHAR(14) NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "dt_birth" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" JSON NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logins" (
    "id" TEXT NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelters" (
    "id" TEXT NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "address" JSON NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shelters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL,
    "company_name" VARCHAR(60) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "type" CHAR(1) NOT NULL,
    "address" JSON NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "procedure" VARCHAR(15) NOT NULL,
    "disease" VARCHAR(30),
    "vaccine" VARCHAR(30),
    "restriction" VARCHAR(100),
    "recurrence" BOOLEAN NOT NULL DEFAULT false,
    "dt_recurrence" DATE,
    "report" VARCHAR(250) NOT NULL,
    "petId" TEXT NOT NULL,
    "hospital_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "crvm" VARCHAR(4) NOT NULL,
    "State" VARCHAR(2) NOT NULL,
    "hospital_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "type" CHAR(1) NOT NULL,
    "value" DECIMAL NOT NULL,
    "donor" VARCHAR(30) NOT NULL,
    "recipient" VARCHAR(36) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "shelter_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "procedure" VARCHAR(15) NOT NULL,
    "patient_id" TEXT,
    "author_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pets_tutorId_key" ON "pets"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "pets_shelter_id_key" ON "pets"("shelter_id");

-- CreateIndex
CREATE UNIQUE INDEX "logins_user_id_key" ON "logins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_petId_key" ON "procedures"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "procedures_hospital_id_key" ON "procedures"("hospital_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_hospital_id_key" ON "doctors"("hospital_id");

-- CreateIndex
CREATE UNIQUE INDEX "donations_shelter_id_key" ON "donations"("shelter_id");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_patient_id_key" ON "appointments"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_author_id_key" ON "appointments"("author_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "shelters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logins" ADD CONSTRAINT "logins_id_fkey" FOREIGN KEY ("id") REFERENCES "tutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "shelters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "tutors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
