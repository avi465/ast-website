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
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const json: ApiResponse<Stream[]> = await response.json();
  if (!json.success) {
    throw new Error(json.message ?? "Failed to fetch streams");
  }
  if (!json.data) {
    throw new Error("No streams found");
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
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const json: ApiResponse<Stream> = await response.json();
  if (!json.success) {
    throw new Error(json.message ?? "Failed to create stream");
  }
  if (!json.data) {
    throw new Error("No stream data returned");
  }
  return json.data;
};
