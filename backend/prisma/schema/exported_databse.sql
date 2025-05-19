PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('0252bb09-b0c8-4ec1-84fc-f0bd875c78b5','336c73b3000acd0aab9375b1c00b68deac5d54569918dd0a81d1c4be63224ad6',1747584219206,'20250430143436_update',NULL,NULL,1747584218952,1);
CREATE TABLE IF NOT EXISTS "audit_logs" (
    "audit_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT NOT NULL,
    "user_account_id" TEXT NOT NULL,
    CONSTRAINT "audit_logs_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts" ("user_account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "bookings" (
    "booking_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reference_code" TEXT NOT NULL,
    "check_in" DATETIME NOT NULL,
    "check_out" DATETIME NOT NULL,
    "total_pax" INTEGER NOT NULL,
    "notes" TEXT,
    "message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "booking_status_id" INTEGER NOT NULL,
    "transaction_id" TEXT NOT NULL,
    CONSTRAINT "bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_booking_status_id_fkey" FOREIGN KEY ("booking_status_id") REFERENCES "booking_statuses" ("booking_status_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "booking_services" (
    "booking_service_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "booking_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "booking_services_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings" ("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "booking_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("service_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "booking_statuses" (
    "booking_status_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO booking_statuses VALUES(1,'Pending',1747584223184,1747584223184);
INSERT INTO booking_statuses VALUES(2,'Approved',1747584223184,1747584223184);
INSERT INTO booking_statuses VALUES(3,'Cancelled',1747584223184,1747584223184);
INSERT INTO booking_statuses VALUES(4,'Rescheduled',1747584223184,1747584223184);
INSERT INTO booking_statuses VALUES(5,'Completed',1747584223184,1747584223184);
CREATE TABLE IF NOT EXISTS "cabins" (
    "cabin_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_id" INTEGER NOT NULL,
    "min_capacity" INTEGER NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "cabins_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services" ("service_id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "categories" (
    "category_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO categories VALUES(1,'cabins',1747584223176,1747584223176);
INSERT INTO categories VALUES(2,'day-tour',1747584223176,1747584223176);
CREATE TABLE IF NOT EXISTS "customers" (
    "customer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personal_detail_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "customers_personal_detail_id_fkey" FOREIGN KEY ("personal_detail_id") REFERENCES "personal_details" ("personal_detail_id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "day_tour_activities" (
    "day_tour_activity_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "serviceId" INTEGER NOT NULL,
    CONSTRAINT "day_tour_activities_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services" ("service_id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "feedbacks" (
    "feedback_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback_status_id" INTEGER DEFAULT 1,
    "bookingId" INTEGER,
    CONSTRAINT "feedbacks_feedback_status_id_fkey" FOREIGN KEY ("feedback_status_id") REFERENCES "feedback_statuses" ("feedback_status_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "feedbacks_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings" ("booking_id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "feedback_statuses" (
    "feedback_status_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO feedback_statuses VALUES(1,'For Review',1747584223218,1747584223218);
INSERT INTO feedback_statuses VALUES(2,'Approved',1747584223218,1747584223218);
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
    "password_reset_token_id" TEXT NOT NULL PRIMARY KEY,
    "user_account_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "password_reset_tokens_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts" ("user_account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "payment_accounts" (
    "payment_account_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "payment_method_id" INTEGER,
    CONSTRAINT "payment_accounts_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods" ("payment_method_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO payment_accounts VALUES(1,1747584223208,1747584223208,1);
CREATE TABLE IF NOT EXISTS "payment_methods" (
    "payment_method_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO payment_methods VALUES(1,'Checking Account','GCASH',1747584223194,1747584223194);
CREATE TABLE IF NOT EXISTS "payment_statuses" (
    "payment_status_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "personal_details" (
    "personal_detail_id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO personal_details VALUES('fa1219a1-bcb1-4345-969c-40a6d2815be5','admin','account','admin@twincjresort.com','09123456789',1747584223162,1747584223162);
CREATE TABLE IF NOT EXISTS "services" (
    "service_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "serviceCategoryId" INTEGER NOT NULL,
    CONSTRAINT "services_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "service_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "service_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "service_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("category_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "services_statuses" (
    "service_status_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "sessions" (
    "session_id" TEXT NOT NULL PRIMARY KEY,
    "user_account_id" TEXT NOT NULL,
    "user_agent" TEXT,
    "expires_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts" ("user_account_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO sessions VALUES('05ba39d4-0fb7-475f-95b7-a60c37dcdfc6','929c2b79-9b8d-4a5c-a8f5-9d3deb130261','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0',1750176235659,1747584235660,1747584235660);
CREATE TABLE IF NOT EXISTS "transactions" (
    "transaction_id" TEXT NOT NULL PRIMARY KEY,
    "proof_of_payment_image_url" TEXT,
    "amount" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "payment_account_id" INTEGER,
    CONSTRAINT "transactions_payment_account_id_fkey" FOREIGN KEY ("payment_account_id") REFERENCES "payment_accounts" ("payment_account_id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "user_accounts" (
    "user_account_id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "personal_id" TEXT NOT NULL,
    "user_account_status_id" INTEGER,
    CONSTRAINT "user_accounts_personal_id_fkey" FOREIGN KEY ("personal_id") REFERENCES "personal_details" ("personal_detail_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_accounts_user_account_status_id_fkey" FOREIGN KEY ("user_account_status_id") REFERENCES "user_account_statuses" ("user_account_status_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO user_accounts VALUES('929c2b79-9b8d-4a5c-a8f5-9d3deb130261','$2b$12$zMcOrZdXzON.Na3a2bxHYu/MFPeU2z5tlpjuN/G6YZ7bL2aMrQ2rm',1,1747584223162,1747584223162,'fa1219a1-bcb1-4345-969c-40a6d2815be5',NULL);
CREATE TABLE IF NOT EXISTS "user_account_statuses" (
    "user_account_status_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "verification_codes" (
    "verification_code_id" TEXT NOT NULL PRIMARY KEY,
    "user_account_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "verification_codes_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts" ("user_account_id") ON DELETE CASCADE ON UPDATE CASCADE
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('categories',2);
INSERT INTO sqlite_sequence VALUES('booking_statuses',5);
INSERT INTO sqlite_sequence VALUES('payment_methods',1);
INSERT INTO sqlite_sequence VALUES('payment_accounts',1);
INSERT INTO sqlite_sequence VALUES('feedback_statuses',2);
CREATE UNIQUE INDEX "bookings_reference_code_key" ON "bookings"("reference_code");
CREATE UNIQUE INDEX "bookings_transaction_id_key" ON "bookings"("transaction_id");
CREATE UNIQUE INDEX "booking_statuses_name_key" ON "booking_statuses"("name");
CREATE UNIQUE INDEX "customers_personal_detail_id_key" ON "customers"("personal_detail_id");
CREATE UNIQUE INDEX "services_statuses_name_key" ON "services_statuses"("name");
CREATE UNIQUE INDEX "user_accounts_personal_id_key" ON "user_accounts"("personal_id");
CREATE UNIQUE INDEX "user_accounts_user_account_status_id_key" ON "user_accounts"("user_account_status_id");
CREATE UNIQUE INDEX "user_account_statuses_name_key" ON "user_account_statuses"("name");
CREATE UNIQUE INDEX "verification_codes_user_account_id_key" ON "verification_codes"("user_account_id");
COMMIT;
