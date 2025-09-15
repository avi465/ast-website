import { ApiResponse, extractErrorMessage, isApiError } from "@/types/api-response";

interface User {
  _id: string;
  email: string;
  name: string;
}

export const login = async (email: string, password: string): Promise<User | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const json: ApiResponse<User> = await response.json();

  if (isApiError(response, json)) {
    throw new Error(extractErrorMessage(json));
  }

  return json.data;
};

export async function logout(): Promise<User | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logout`, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
  });

  const json: ApiResponse<User> = await response.json();

  if (isApiError(response, json)) {
    throw new Error(extractErrorMessage(json));
  }

  return json.data;
}
