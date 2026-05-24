export interface AdminPlatformOverview {
  totalUsers: number;
  totalJobs: number;
  failedJobs: number;
}

export const adminService = {
  async getOverview(): Promise<AdminPlatformOverview> {
    // Future admin dashboard integration point.
    return {
      totalUsers: 0,
      totalJobs: 0,
      failedJobs: 0,
    };
  },
};
