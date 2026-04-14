export type AnalyzeResponse = {
  request_id: string;
  filename: string;
  size: number;
  magika_label: string;
  description: string;
  mime_type: string;
  score: number;
  confidence_level: "high" | "medium" | "low";
  elapsed_ms: number;
  warnings: string[];
};
