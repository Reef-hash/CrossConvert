export interface BillingPlan {
  id: string;
  name: string;
  maxFileSizeMb: number;
  maxMonthlyConversions: number;
}

export const billingService = {
  async getPlans(): Promise<BillingPlan[]> {
    // Future backend integration point (Stripe products/prices).
    return [
      {
        id: 'free',
        name: 'Free',
        maxFileSizeMb: 25,
        maxMonthlyConversions: 300,
      },
      {
        id: 'pro',
        name: 'Pro',
        maxFileSizeMb: 250,
        maxMonthlyConversions: 5000,
      },
    ];
  },
};
