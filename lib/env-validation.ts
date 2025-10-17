/**
 * Environment variable validation
 * Ensures required environment variables are set
 */

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_GTM_ID?: string;
}

/**
 * Validate environment variables
 */
export function validateEnv(): EnvConfig {
  const env = process.env;

  // Required variables
  const required: (keyof EnvConfig)[] = ['NODE_ENV'];

  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  // Validate NODE_ENV
  if (!['development', 'production', 'test'].includes(env.NODE_ENV || '')) {
    throw new Error(
      `Invalid NODE_ENV: ${env.NODE_ENV}. Must be 'development', 'production', or 'test'`
    );
  }

  return {
    NODE_ENV: env.NODE_ENV as 'development' | 'production' | 'test',
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GTM_ID: env.NEXT_PUBLIC_GTM_ID,
  };
}

/**
 * Get validated environment config
 */
let cachedEnv: EnvConfig | null = null;

export function getEnvConfig(): EnvConfig {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getEnvConfig().NODE_ENV === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getEnvConfig().NODE_ENV === 'development';
}

/**
 * Check if running in test
 */
export function isTest(): boolean {
  return getEnvConfig().NODE_ENV === 'test';
}

/**
 * Get site URL with fallback
 */
export function getSiteUrl(): string {
  const config = getEnvConfig();
  return config.NEXT_PUBLIC_SITE_URL || 'https://theskitbit.com';
}
