export interface UserSession {
  userId: string;
  email: string;
  plan: 'free' | 'premium' | 'enterprise';
}

export const authService = {
  async getSession(): Promise<UserSession | null> {
    // Future Auth.js/Clerk/Supabase integration point.
    return null;
  },
};
