/*
  Warnings:

  - You are about to drop the column `payment_method_id` on the `transactions` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "booking_services" (
    "booking_service_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booking_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "booking_services_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "booking_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("service_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "transaction_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proof_of_payment_image_url" TEXT,
    "amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "payment_account_id" INTEGER,
    "payment_status_id" INTEGER,
    CONSTRAINT "transactions_payment_account_id_fkey" FOREIGN KEY ("payment_account_id") REFERENCES "payment_accounts" ("payment_account_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transactions_payment_status_id_fkey" FOREIGN KEY ("payment_status_id") REFERENCES "payment_statuses" ("payment_status_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("amount", "created_at", "payment_account_id", "payment_status_id", "proof_of_payment_image_url", "transaction_id", "updated_at") SELECT "amount", "created_at", "payment_account_id", "payment_status_id", "proof_of_payment_image_url", "transaction_id", "updated_at" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
