-- CreateTable
CREATE TABLE "trabajadores" (
    "codigo" VARCHAR(6) NOT NULL,
    "isWorking" BOOLEAN NOT NULL DEFAULT false,
    "ultima_entrada" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trabajadores_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "registros" (
    "id" SERIAL NOT NULL,
    "codigo_trabajador" TEXT NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL,
    "hora_salida" TIMESTAMP(3) NOT NULL,
    "tiempo_total" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registros_codigo_trabajador_idx" ON "registros"("codigo_trabajador");

-- CreateIndex
CREATE INDEX "registros_hora_entrada_idx" ON "registros"("hora_entrada");

-- CreateIndex
CREATE INDEX "registros_created_at_idx" ON "registros"("created_at");

-- AddForeignKey
ALTER TABLE "registros" ADD CONSTRAINT "registros_codigo_trabajador_fkey" FOREIGN KEY ("codigo_trabajador") REFERENCES "trabajadores"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;
