import { ApiResponse } from "@/types/api-response";

export interface Module {
  _id: string;
  title: string;
  description: string;
  course: string;
  status: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const fetchModulesByCourse = async (courseId: string): Promise<Module[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/module/course/${courseId}`, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
  });

  const json: ApiResponse<Module[]> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
  }

  return json.data;
};
