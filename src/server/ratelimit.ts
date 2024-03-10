import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

export const ratelimit =
  env.UPSTASH_REDIS_REST_TOKEN && env.UPSTASH_REDIS_REST_URL
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "10 s"),
        analytics: true,
      })
    : null;
