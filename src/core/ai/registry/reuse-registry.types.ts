export type ReuseArtifactType =
  | 'feature'
  | 'step-definition'
  | 'flow'
  | 'page'
  | 'component'
  | 'selector'
  | 'api-client'
  | 'assertion';

export interface ReuseArtifact {
  id: string;
  type: ReuseArtifactType;
  name: string;
  path: string;
  summary: string;
  tags?: string[];
}

export interface ReuseSearchResult {
  query: string;
  exactMatches: ReuseArtifact[];
  relatedMatches: ReuseArtifact[];
  gaps: string[];
}
