import { auth } from "@/lib/auth";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
const DEFAULT_DEV_API_KEY = process.env.NEXT_PUBLIC_DEV_API_KEY ?? "local-dev-key";

export async function POST(request: Request) {
  const session = await auth();
  let apiKey = request.headers.get("x-api-key") ?? "";

  // Use default dev key in development if no auth provided
  if (!session?.user && !apiKey) {
    apiKey = DEFAULT_DEV_API_KEY;
  }

  const formData = await request.formData();

  const backendResponse = await fetch(`${API_BASE_URL}/api/v1/analyze/file`, {
    method: "POST",
    headers: {
      ...(apiKey ? { "x-api-key": apiKey } : {})
    },
    body: formData
  });

  const contentType = backendResponse.headers.get("content-type") ?? "application/json";
  const body = await backendResponse.text();

  return new Response(body, {
    status: backendResponse.status,
    headers: {
      "content-type": contentType
    }
  });
}
