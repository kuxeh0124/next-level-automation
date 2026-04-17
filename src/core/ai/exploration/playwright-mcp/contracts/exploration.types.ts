export interface ExplorationRequest {
  app: string;
  goal: string;
  startPath?: string;
  expectedOutcome?: string;
  tags?: string[];
}

export interface ObservedElement {
  name: string;
  role?: string;
  text?: string;
  suggestedSelector?: string;
  notes?: string[];
}

export interface ExplorationEvidence {
  visitedPaths: string[];
  screenshots: string[];
  observedElements: ObservedElement[];
  notes: string[];
}

export interface ExplorationResult {
  request: ExplorationRequest;
  evidence: ExplorationEvidence;
  recommendedReuse: string[];
  identifiedGaps: string[];
}
