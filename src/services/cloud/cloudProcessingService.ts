export interface CloudJobRequest {
  toolId: string;
  inputAssetIds: string[];
  options?: Record<string, unknown>;
}

export const cloudProcessingService = {
  async enqueueJob(request: CloudJobRequest): Promise<{ jobId: string }> {
    // Future queue/microservice orchestration boundary.
    void request;
    return { jobId: 'planned-job-id' };
  },
};
