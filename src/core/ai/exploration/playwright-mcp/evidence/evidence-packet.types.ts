import type { ExplorationEvidence, ExplorationRequest } from '@core/ai/exploration/playwright-mcp/contracts/exploration.types';

export interface EvidencePacket {
  request: ExplorationRequest;
  summary: string;
  evidence: ExplorationEvidence;
  generatedAt: string;
}
