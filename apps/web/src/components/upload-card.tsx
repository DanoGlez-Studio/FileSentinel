"use client";

import { useState } from "react";
import { AnalyzeResponse } from "@/types/magika";

type UploadCardProps = {
  labels: {
    uploadLabel: string;
    submit: string;
    analyzing: string;
    noResult: string;
    resultTitle: string;
    error: string;
  };
};

export function UploadCard({ labels }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        throw new Error(labels.error);
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

  return (
    <div className="rounded-2xl border border-brand-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <label className="text-sm font-semibold text-brand-900" htmlFor="file-input">
          {labels.uploadLabel}
        </label>
        <input
          className="rounded-lg border border-brand-300 bg-white px-3 py-2 text-sm"
          id="file-input"
          name="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          type="file"
        />
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
        {!result && !error ? <p className="mt-2 text-sm text-brand-700">{labels.noResult}</p> : null}
        {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
        {result ? (
          <pre className="mt-2 overflow-x-auto text-xs text-brand-900">{JSON.stringify(result, null, 2)}</pre>
        ) : null}
      </div>
    </div>
  );
}
