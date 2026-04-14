import { auth } from "@/lib/auth";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  const session = await auth();
  const apiKey = request.headers.get("x-api-key") ?? "";

  if (!session?.user && !apiKey) {
    return Response.json({ detail: "Unauthorized" }, { status: 401 });
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
