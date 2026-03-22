export const PROVIDER_ENV_API_KEY_CANDIDATES: Record<string, string[]> = {
  openai: ["OPENAI_API_KEY"],
  ollama: ["OLLAMA_API_KEY"],
};

export function listKnownProviderEnvApiKeyNames(): string[] {
  return [...new Set(Object.values(PROVIDER_ENV_API_KEY_CANDIDATES).flat())];
}
