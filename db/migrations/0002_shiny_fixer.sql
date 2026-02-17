ALTER TABLE "ai_insights" ALTER COLUMN "insights" SET DEFAULT '[]';--> statement-breakpoint
ALTER TABLE "ai_insights" ADD COLUMN "status" text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_insights" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;