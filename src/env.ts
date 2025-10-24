/**
 * Environment Variable Validation
 * Validates required environment variables at build/runtime
 */

import { z } from 'astro/zod';

/**
 * Environment variable schema
 * Define all required and optional environment variables here
 */
const envSchema = z.object({
  // Dashboard password hash (required)
  DASHBOARD_PASSWORD_HASH: z.string().min(1, 'Dashboard password hash is required'),
  
  // Site URL (optional, defaults to production URL)
  SITE_URL: z.string().url().optional().default('https://bedalo.pages.dev'),
  
  // Development mode (auto-detected)
  DEV: z.boolean().optional().default(false),
  
  // Mode (auto-detected)
  MODE: z.enum(['development', 'production', 'test']).optional().default('production'),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables
 * Throws detailed error if validation fails
 */
export function validateEnv(): Env {
  const env = {
    DASHBOARD_PASSWORD_HASH: import.meta.env.DASHBOARD_PASSWORD_HASH,
    SITE_URL: import.meta.env.SITE_URL,
    DEV: import.meta.env.DEV,
    MODE: import.meta.env.MODE,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => {
        return `  • ${err.path.join('.')}: ${err.message}`;
      }).join('\n');

      throw new Error(
        `❌ Invalid environment variables:\n\n${missingVars}\n\n` +
        `Please check your .env file and ensure all required variables are set.\n` +
        `See .env.example for reference.`
      );
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 * Use this instead of directly accessing import.meta.env
 */
export function getEnv(): Env {
  return validateEnv();
}

/**
 * Check if a specific environment variable is set
 */
export function hasEnv(key: keyof Env): boolean {
  try {
    const env = validateEnv();
    return env[key] !== undefined && env[key] !== '';
  } catch {
    return false;
  }
}

/**
 * Get environment variable with fallback
 */
export function getEnvOr<K extends keyof Env>(
  key: K,
  fallback: Env[K]
): Env[K] {
  try {
    const env = validateEnv();
    return env[key] ?? fallback;
  } catch {
    return fallback;
  }
}

// Validate on module load (fails fast if env vars are missing)
if (import.meta.env.PROD) {
  // Only validate in production to avoid breaking dev server
  try {
    validateEnv();
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    // In production, we want to fail fast
    if (import.meta.env.SSR) {
      process.exit(1);
    }
  }
}
