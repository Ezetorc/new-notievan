process.loadEnvFile()

type Env = {
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  port: string
};

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;

  if (!value) throw new Error(`Missing environment variable: ${key}`);

  return value;
}

export const env: Env = {
  jwt: {
    secret: getEnvVar("JWT_SECRET", "JWT_SECRET"),
    expiresIn: getEnvVar("JWT_EXPIRES_IN", "24h"),
  },
  cloudinary: {
    cloudName: getEnvVar("CLOUDINARY_CLOUD_NAME"),
    apiKey: getEnvVar("CLOUDINARY_API_KEY"),
    apiSecret: getEnvVar("CLOUDINARY_API_SECRET"),
  },
  port: getEnvVar("PORT", "3000")
};
