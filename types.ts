
export enum SlideType {
  TITLE = 'TITLE',
  OVERVIEW = 'OVERVIEW',
  API_PLATFORM = 'API_PLATFORM',
  UI_FRAMEWORK = 'UI_FRAMEWORK',
  AI_AGENT = 'AI_AGENT',
  MEMORY_MAP = 'MEMORY_MAP',
  FUTURE = 'FUTURE',
  END = 'END'
}

export interface GeneratedStep {
  action: string;
  target: string;
  reason: string;
}

export interface SlideProps {
  isActive: boolean;
}
