import { ApiResponse } from "@/types/api-response";

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: "live" | "recorded";
  videoUrl?: string;
  instructor: string;
}

export interface CreateLessonPayload {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: "live" | "recorded";
  videoUrl?: string;
  module: string;
  instructor: string;
}

export const fetchAllLesson = async (): Promise<Lesson[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const json: ApiResponse<Lesson[]> = await response.json();

  if (!json.success) {
    throw new Error(json.message ?? "Failed to fetch courses");
  }

  if (!json.data) {
    throw new Error("No courses found");
  }
  return json.data;
};

export const createLesson = async (lesson: Partial<CreateLessonPayload>): Promise<Lesson> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(lesson),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const json: ApiResponse<Lesson> = await response.json();
  if (!json.success) {
    throw new Error(json.message ?? "Failed to create lesson");
  }
  if (!json.data) {
    throw new Error("No lesson data returned");
  }
  return json.data;
};

export const updateLesson = async (id: string, lesson: Partial<Lesson>): Promise<Lesson> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(lesson),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const json: ApiResponse<Lesson> = await response.json();
  if (!json.success) {
    throw new Error(json.message ?? "Failed to update lesson");
  }
  if (!json.data) {
    throw new Error("No lesson data returned");
  }
  return json.data;
};

export const deleteLesson = async (id: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const json: ApiResponse<null> = await response.json();
  if (!json.success) {
    throw new Error(json.message ?? "Failed to delete lesson");
  }
};
