
export const SUPPORTED_LANGUAGES = [
  'English',
  'Tamil',
  'Hindi',
  'Malayalam',
  'Telugu'
];

export const MOCK_API_ENDPOINT = 'https://api.voice-detect.hcl/v1/analyze';

export const API_SPEC_DOCS = {
  endpoint: 'POST /api/v1/detect-voice',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '<YOUR_HCL_API_KEY>'
  },
  body: {
    audio_base64: 'BASE64_ENCODED_MP3_STRING',
    language: 'Tamil | English | Hindi | Malayalam | Telugu',
    format: 'mp3'
  }
};
