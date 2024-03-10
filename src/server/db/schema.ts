import { type InferSelectModel } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const runs = sqliteTable(
  "run",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    runnerName: text("runner_name", { length: 256 }).notNull(),
    runnerUrl: text("runner_url", { length: 256 }).notNull(),
    videoUrl: text("video_url", { length: 256 }).notNull(),
    timeMillis: int("time_millis", { mode: "number" }).notNull(),
    category: text("category", { enum: ["upload%", "invalid"] }).notNull(),
    isApproved: int("is_approved", { mode: "boolean" })
      .notNull()
      .default(false),
    createdAt: int("created_at", { mode: "timestamp" }).notNull(),
    submittedBy: text("submitted_by").references(() => users.id),
  },
  (t) => ({
    timeIdx: index("name_idx").on(t.timeMillis),
    approvedIdx: index("approved_idx").on(t.isApproved),
    categoryIdx: index("category_idx").on(t.category),
  }),
);

export type Run = InferSelectModel<typeof runs>;

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  githubId: int("github_id").notNull().unique(),
  username: text("username").notNull(),
});

export const sessions = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: int("expires_at").notNull(),
});
