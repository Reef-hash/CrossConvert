export interface UsageSummary {
  conversionsThisMonth: number;
  creditsRemaining: number;
  apiCallsThisMonth: number;
}

export const usageService = {
  async getUsageSummary(): Promise<UsageSummary> {
    return {
      conversionsThisMonth: 0,
      creditsRemaining: 0,
      apiCallsThisMonth: 0,
    };
  },
};
