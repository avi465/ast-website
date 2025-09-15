import { ApiResponse } from "@/types/api-response";

export interface Stream {
  streamKey: string;
  lesson: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchAllStreams = async (): Promise<Stream[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stream/`, {
    method: "GET",
    credentials: "include",
  });

  const json: ApiResponse<Stream[]> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
  }

  return json.data;
};

export const createStream = async (lesson: string): Promise<Stream> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stream/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ lesson }),
  });

  const json: ApiResponse<Stream> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
  }

  return json.data;
};
