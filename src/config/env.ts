interface EnvConfig {
  appEnv: string;
  appUrl: string;
  analyticsEnabled: boolean;
}

const parseBoolean = (value: string | undefined, fallback = false): boolean => {
  if (!value) return fallback;
  return value.toLowerCase() === 'true';
};

export const env: EnvConfig = {
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  appUrl: import.meta.env.VITE_APP_URL ?? 'http://localhost:5173',
  analyticsEnabled: parseBoolean(import.meta.env.VITE_ANALYTICS_ENABLED),
};
