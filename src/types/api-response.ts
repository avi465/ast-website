export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: [] | null;
}

export function isApiError<T>(response: Response, json: ApiResponse<T>): boolean {
  return !response.ok || !json.success || !json.data;
}

export function extractErrorMessage<T>(json: ApiResponse<T>): string {
  if (!json) return "An unknown error occurred";

  if (Array.isArray(json.errors) && json.errors.length > 0) {
    return json.errors.join(", ");
  }

  if (json.message) {
    return json.message;
  }

  return "An unexpected error occurred";
}
