import { ApiResponse, extractErrorMessage, isApiError } from "@/types/api-response";

export interface File {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

export const fetchFiles = async (): Promise<File[] | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/files`, {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  });

  const json: ApiResponse<File[]> = await response.json();

  if (isApiError(response, json)) {
    throw new Error(extractErrorMessage(json));
  }

  return json.data;
};
