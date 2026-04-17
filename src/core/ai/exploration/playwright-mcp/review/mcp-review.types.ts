import type { EvidencePacket } from '@core/ai/exploration/playwright-mcp/evidence/evidence-packet.types';

export interface McpReviewNote {
  title: string;
  detail: string;
}

export interface McpAssistedReview {
  evidencePacket?: EvidencePacket;
  notes: McpReviewNote[];
  rule: 'discovery-only';
}
