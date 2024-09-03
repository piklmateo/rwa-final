-- Creator:       MySQL Workbench 8.0.34/ExportSQLite Plugin 0.1.0
-- Author:        Mateo
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-11-25 16:00
-- Created:       2023-10-22 12:03
BEGIN;
CREATE TABLE "tip_korisnika"(
  "id_tipa_korisnika" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(50) NOT NULL,
  "opis" TEXT,
  CONSTRAINT "naziv_UNIQUE"
    UNIQUE("naziv")
);
CREATE TABLE "serija"(
  "id_serije" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "tmdb_id_serije" INTEGER NOT NULL,
  "naziv" VARCHAR(255) NOT NULL,
  "opis" TEXT NOT NULL,
  "popularnost" DECIMAL NOT NULL,
  "ocjena" DECIMAL NOT NULL,
  "slika" TEXT NOT NULL,
  "broj_sezona" INTEGER NOT NULL,
  "broj_epizoda" INTEGER NOT NULL,
  CONSTRAINT "tmdb_id_serije_UNIQUE"
    UNIQUE("tmdb_id_serije")
);
CREATE TABLE "sezona"(
  "id_sezone" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "tmdb_id_sezone" INTEGER NOT NULL,
  "naziv" VARCHAR(255) NOT NULL,
  "opis" TEXT NOT NULL,
  "slika" TEXT NOT NULL,
  "broj_epizoda" INTEGER NOT NULL,
  "serija_id_serije" INTEGER NOT NULL,
  CONSTRAINT "tmdb_id_sezone_UNIQUE"
    UNIQUE("tmdb_id_sezone"),
  CONSTRAINT "fk_sezona_serija1"
    FOREIGN KEY("serija_id_serije")
    REFERENCES "serija"("id_serije")
);
CREATE INDEX "sezona.fk_sezona_serija1_idx" ON "sezona" ("serija_id_serije");
CREATE TABLE "korisnik"(
  "id_korisnika" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "ime" VARCHAR(55),
  "prezime" VARCHAR(55),
  "adresa" VARCHAR(55),
  "postanski_broj" INTEGER,
  "broj_mobitela" INTEGER,
  "korime" VARCHAR(100) NOT NULL,
  "lozinka" VARCHAR(45) NOT NULL,
  "email" VARCHAR(55) NOT NULL,
  "tip_korisnika_id" INTEGER NOT NULL,
  "aktivan" BIT NOT NULL,
  "totp_kljuc" TEXT,
  "aktivacijski_kod" INTEGER,
  CONSTRAINT "korime_UNIQUE"
    UNIQUE("korime"),
  CONSTRAINT "email_UNIQUE"
    UNIQUE("email"),
  CONSTRAINT "fk_korisnik_tip_korisnika"
    FOREIGN KEY("tip_korisnika_id")
    REFERENCES "tip_korisnika"("id_tipa_korisnika")
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
);
CREATE INDEX "korisnik.fk_korisnik_tip_korisnika_idx" ON "korisnik" ("tip_korisnika_id");
CREATE TABLE "dnevnik"(
  "id_dnevnika" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "datum" DATE NOT NULL,
  "vrijeme" TIME NOT NULL,
  "tip_zahtjeva" VARCHAR(45) NOT NULL,
  "resurs" VARCHAR(100) NOT NULL,
  "tijelo" TEXT,
  "korisnik_id_korisnika" INTEGER NOT NULL,
  CONSTRAINT "fk_dnevnik_korisnik1"
    FOREIGN KEY("korisnik_id_korisnika")
    REFERENCES "korisnik"("id_korisnika")
);
CREATE INDEX "dnevnik.fk_dnevnik_korisnik1_idx" ON "dnevnik" ("korisnik_id_korisnika");
CREATE TABLE "favoriti"(
  "id_favorita" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "korisnik_id_korisnika" INTEGER NOT NULL,
  "serija_id_serije" INTEGER NOT NULL,
  CONSTRAINT "fk_favoriti_korisnik1"
    FOREIGN KEY("korisnik_id_korisnika")
    REFERENCES "korisnik"("id_korisnika"),
  CONSTRAINT "fk_favoriti_serija1"
    FOREIGN KEY("serija_id_serije")
    REFERENCES "serija"("id_serije")
);
CREATE INDEX "favoriti.fk_favoriti_korisnik1_idx" ON "favoriti" ("korisnik_id_korisnika");
CREATE INDEX "favoriti.fk_favoriti_serija1_idx" ON "favoriti" ("serija_id_serije");
COMMIT;
