/*
  Warnings:

  - You are about to drop the `registros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trabajadores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "registros" DROP CONSTRAINT "registros_codigo_trabajador_fkey";

-- DropTable
DROP TABLE "registros";

-- DropTable
DROP TABLE "trabajadores";
