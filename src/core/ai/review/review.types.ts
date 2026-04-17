import type { EvidencePacket } from '@core/ai/exploration/playwright-mcp/evidence/evidence-packet.types';

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
  evidencePacket?: EvidencePacket;
  humanReviewRequired: true;
}
