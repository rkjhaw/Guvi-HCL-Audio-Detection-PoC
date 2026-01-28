
export const SUPPORTED_LANGUAGES = [
  'English',
  'Tamil',
  'Hindi',
  'Malayalam',
  'Telugu'
];

export const APP_THEME = {
  primary: 'blue-700',
  secondary: 'indigo-600',
  accent: 'emerald-500',
  error: 'rose-500',
  warning: 'amber-500'
};

export const API_SPEC_DOCS = {
  endpoint: 'POST /api/v1/detect-voice',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <YOUR_API_KEY>'
  },
  body: {
    audio_base64: 'string (base64 encoded mp3)',
    language_context: 'string (optional)'
  }
};
