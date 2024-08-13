export const BUSINESS_SERVER = getEnvironmentVariable("BUSINESS_SERVER");
export const PRIVATE_API_TOKEN = getEnvironmentVariable("PRIVATE_API_TOKEN");
export const NEXT_SERVER = getEnvironmentVariable("NEXT_SERVER");
export const RSA_PUBLIC_KEY = getEnvironmentVariable("RSA_PUBLIC_KEY");
export const RSA_PRIVATE_KEY = getEnvironmentVariable("RSA_PRIVATE_KEY");
export const RSA_PASSPHRASE = getEnvironmentVariable("RSA_PASSPHRASE");
export const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE
  ? parseInt(process.env.SESSION_MAX_AGE)
  : 60 * 60 * 24 * 7;

function getEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Environment variable ${name} is not set`);

  return value;
}
