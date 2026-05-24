export interface ConversionHistoryRecord {
  id: string;
  toolId: string;
  status: 'completed' | 'failed' | 'queued';
  createdAt: string;
}

export const conversionHistoryService = {
  async listHistory(): Promise<ConversionHistoryRecord[]> {
    // Future dashboard/history integration point.
    return [];
  },
};
