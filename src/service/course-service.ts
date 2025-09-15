import { ApiResponse } from "@/types/api-response";

export interface Course {
  _id: string;
  name: string;
  language: string;
  status: string;
  price: number;
  discount: number;
  updatedAt: string;
}

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`, {
    method: "GET",
    cache: "no-cache",
  });

  const json: ApiResponse<Course[]> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
  }

  return json.data;
};
