import { ApiResponse, extractErrorMessage, isApiError } from "@/types/api-response";

export interface Course {
  _id: string;
  name: string;
  language: string;
  status: string;
  price: number;
  discount: number;
  updatedAt: string;
}

export interface CourseInput {
  name: string;
  description: string;
  details: string;
  price: number;
  discount: number;
  category: string;
  image: string;
}

export interface CategoryOutput {
  _id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  slug: string;
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

export const createCourse = async (course: Partial<CourseInput>): Promise<Course> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(course),
  });

  const json: ApiResponse<Course> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    console.log(json);
    throw new Error(json.errors?.toString() ?? json.message);
  }

  return json.data;
};

export const fetchAllCategories = async (): Promise<CategoryOutput[] | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/category`, {
    method: "GET",
    cache: "no-cache",
  });

  const json: ApiResponse<CategoryOutput[]> = await response.json();

  if (isApiError(response, json)) {
    throw new Error(extractErrorMessage(json));
  }

  return json.data;
};
