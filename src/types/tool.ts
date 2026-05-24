export type ToolCategoryId =
  | 'image-tools'
  | 'pdf-tools'
  | 'video-tools'
  | 'audio-tools'
  | 'ai-tools'
  | 'developer-tools'
  | 'file-utilities';

export type ToolAvailability = 'live' | 'beta' | 'planned';

export type ToolExecutionMode = 'browser' | 'worker' | 'api' | 'queue' | 'ai';

export type ToolSurface = 'file-workbench' | 'interactive' | 'service';

export type MonetizationModel = 'free' | 'premium' | 'credits' | 'api' | 'enterprise';

export interface ToolSeoDefinition {
  title: string;
  description: string;
  keywords: string[];
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  categoryId: ToolCategoryId;
  shortDescription: string;
  longDescription: string;
  accepts?: string[];
  outputs?: string[];
  searchAliases: string[];
  featured?: boolean;
  trendingScore?: number;
  availability: ToolAvailability;
  executionModes: ToolExecutionMode[];
  surface: ToolSurface;
  processorId?: string;
  seo: ToolSeoDefinition;
  monetization: {
    primary: MonetizationModel;
    adsEligible: boolean;
    apiReady: boolean;
  };
}

export interface ToolCategoryDefinition {
  id: ToolCategoryId;
  name: string;
  shortName: string;
  description: string;
  iconKey:
    | 'image'
    | 'file-text'
    | 'video'
    | 'audio'
    | 'sparkles'
    | 'code'
    | 'folder';
  heroTitle: string;
  heroDescription: string;
  seo: ToolSeoDefinition;
}
