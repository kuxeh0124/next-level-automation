export interface ProposedChange {
  path: string;
  changeType: 'create' | 'update' | 'reuse';
  rationale: string;
}

export interface ReviewPacket {
  feature: string;
  scenario: string;
  reuseFindings: string[];
  proposedChanges: ProposedChange[];
  humanReviewRequired: true;
}
