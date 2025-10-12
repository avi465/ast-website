import { ApiResponse, extractErrorMessage, isApiError } from "@/types/api-response";

export interface Profile {
  _id: string;
  name: string;
  email: string;
  userName: string;
  avatar: string;
  phone?: string;
  role: "admin";
  createdAt: string;
  updatedAt: string;
}

export const fetchProfile = async (): Promise<Profile | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/admin`, {
    method: "GET",
    credentials: "include",
    cache: "force-cache",
  });

  const json: ApiResponse<Profile> = await response.json();

  if (isApiError(response, json)) {
    throw new Error(extractErrorMessage(json));
  }

  return json.data;
};

export const updateProfile = async (profile: Partial<Profile>): Promise<Profile | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/admin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profile),
  });

  const json: ApiResponse<Profile> = await response.json();

  if (isApiError(response, json)) {
    throw new Error(extractErrorMessage(json));
  }

  return json.data;
};
