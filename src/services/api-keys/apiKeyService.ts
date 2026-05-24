export interface ApiKeyRecord {
  id: string;
  name: string;
  lastUsedAt?: string;
  scopes: string[];
}

export const apiKeyService = {
  async listKeys(): Promise<ApiKeyRecord[]> {
    // Future backend integration point for API marketplace and usage pricing.
    return [];
  },
};
