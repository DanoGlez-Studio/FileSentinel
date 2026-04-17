"use client";

import { useRef, useState } from "react";
import { AnalyzeResponse } from "@/types/magika";

type UploadCardProps = {
  labels: {
    uploadLabel: string;
    dropHint: string;
    dropActive: string;
    selectedFile: string;
    submit: string;
    analyzing: string;
    noResult: string;
    resultTitle: string;
    error: string;
    detectedType: string;
    mimeType: string;
    confidence: string;
    confidenceLevel: string;
    elapsedTime: string;
    score: string;
    warnings: string;
    technicalDetails: string;
  };
};

export function UploadCard({ labels }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = (nextFile: File | null) => {
    setFile(nextFile);
    setError(null);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    selectFile(droppedFile);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const responseBody = (await response.text()).trim();
        throw new Error(responseBody || labels.error);
      }

      const payload = (await response.json()) as AnalyzeResponse;
      setResult(payload);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : labels.error);
    } finally {
      setLoading(false);
    }
  };

  const scorePercentage = result ? Math.round(result.score * 100) : 0;

  return (
    <div className="rounded-2xl border border-brand-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="text-sm font-semibold text-brand-900" htmlFor="file-input">
          {labels.uploadLabel}
        </label>
        <div
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
            isDragging
              ? "border-brand-700 bg-brand-50"
              : "border-brand-300 bg-white hover:border-brand-500 hover:bg-brand-50/50"
          }`}
          onClick={() => inputRef.current?.click()}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
        >
          <p className="text-sm font-medium text-brand-900">
            {isDragging ? labels.dropActive : labels.dropHint}
          </p>
          {file ? (
            <p className="mt-2 text-xs text-brand-700">
              {labels.selectedFile}: {file.name}
            </p>
          ) : null}
          <input
            className="hidden"
            id="file-input"
            name="file"
            onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
            ref={inputRef}
            type="file"
          />
        </div>
        <button
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-brand-300"
          disabled={!file || loading}
          type="submit"
        >
          {loading ? labels.analyzing : labels.submit}
        </button>
      </form>

      <div className="mt-6 rounded-lg border border-brand-100 bg-brand-50 p-4">
        <h2 className="text-sm font-semibold text-brand-900">{labels.resultTitle}</h2>
        {!result && !error ? (
          <p className="mt-2 text-sm text-brand-700">{labels.noResult}</p>
        ) : null}
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
        {result ? (
          <div className="mt-3 space-y-2 text-sm text-brand-900">
            <p>
              <span className="font-semibold">{labels.detectedType}:</span> {result.magika_label} (
              {result.description})
            </p>
            <p>
              <span className="font-semibold">{labels.mimeType}:</span> {result.mime_type}
            </p>
            <p>
              <span className="font-semibold">{labels.confidence}:</span> {scorePercentage}%
            </p>
            <p>
              <span className="font-semibold">{labels.confidenceLevel}:</span>{" "}
              {result.confidence_level}
            </p>
            <p>
              <span className="font-semibold">{labels.elapsedTime}:</span> {result.elapsed_ms} ms
            </p>
            <p>
              <span className="font-semibold">{labels.score}:</span> {result.score.toFixed(3)}
            </p>
            {result.warnings.length > 0 ? (
              <p>
                <span className="font-semibold">{labels.warnings}:</span>{" "}
                {result.warnings.join(", ")}
              </p>
            ) : null}
            <details className="rounded-md border border-brand-200 bg-white p-2">
              <summary className="cursor-pointer text-xs font-semibold text-brand-800">
                {labels.technicalDetails}
              </summary>
              <pre className="mt-2 overflow-x-auto text-xs text-brand-900">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        ) : null}
      </div>
    </div>
  );
}
