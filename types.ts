
export enum Classification {
  AI_GENERATED = 'AI_GENERATED',
  HUMAN = 'HUMAN'
}

export interface DetectionResult {
  classification: Classification;
  confidence: number;
  explanation: string;
  language: string;
  metadata?: {
    sampleRate?: string;
    bitDepth?: string;
    detectedArtifacts?: string[];
  };
}

export interface ApiTestRequest {
  endpoint: string;
  apiKey: string;
  language: string;
  audioUrl: string;
  audioFormat: 'mp3';
}

export interface ApiResponse {
  status: 'success' | 'error';
  data?: DetectionResult;
  message?: string;
  timestamp: string;
  request_payload?: any;
}
