import { env } from '../../config/env';

export const analyticsService = {
  track(eventName: string, payload?: Record<string, unknown>) {
    if (!env.analyticsEnabled) return;
    // Placeholder for GA/PostHog/Segment integration.
    console.info('[analytics]', eventName, payload);
  },
};
