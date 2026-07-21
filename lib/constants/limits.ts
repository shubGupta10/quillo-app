import { PlanType } from "@/features/subscriptions/model/subscriptions.interface";

export const USAGE_QUOTAS = {
  AI_GENERATIONS_PER_MONTH: {
    [PlanType.FREE]: 40,
    [PlanType.BETA_PRO]: 150,
    [PlanType.ADMIN]: Number.MAX_SAFE_INTEGER,
  } as Record<PlanType, number>,

  PROJECTS_PER_USER: {
    [PlanType.FREE]: 10,
    [PlanType.BETA_PRO]: 25,
    [PlanType.ADMIN]: Number.MAX_SAFE_INTEGER,
  } as Record<PlanType, number>,

  DAILY_UPDATES_PER_USER: {
    [PlanType.FREE]: 4,
    [PlanType.BETA_PRO]: 10,
    [PlanType.ADMIN]: Number.MAX_SAFE_INTEGER,
  } as Record<PlanType, number>,

  PLAN_PRICING: {
    [PlanType.FREE]: 0,
    [PlanType.BETA_PRO]: 5,
    [PlanType.ADMIN]: 0,
  } as Record<PlanType, number>,

  AI_QUOTA_WARNING_THRESHOLD: 0.8,
  AI_VARIATIONS_PER_GENERATION: 2,

  PLAN_PERIOD_DAYS: 30,
} as const;

export const VALIDATION_LIMITS = {
  MAX_LOG_LENGTH_CHARS: 5000,

  // Project Limits
  MAX_PROJECT_NAME_CHARS: 100,
  MAX_PROJECT_DESC_CHARS: 5000,
  MAX_PROJECT_TAGS: 10,

  // Content Generation Limits
  MAX_SOURCE_UPDATES: 10,
  MAX_GENERATED_CONTENT_CHARS: 10000,

  // File Uploads
  UPLOAD_MAX_FILE_COUNT: 5,
  UPLOAD_MAX_IMAGE_SIZE: "8MB" as const,
  UPLOAD_MAX_PDF_SIZE: "16MB" as const,
  UPLOAD_MAX_TEXT_SIZE: "4MB" as const,
} as const;

export const INFRA_RATE_LIMITS = {
  AI_GENERATION_DAILY_REQUESTS: 500,
} as const;
