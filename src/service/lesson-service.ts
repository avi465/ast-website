import { ApiResponse } from "@/types/api-response";

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: "live" | "recorded";
  status: string;
  videoUrl?: string;
  stream: Stream;
  instructor: string;
  updatedAt: string;
}

export interface Stream {
  streamKey: string;
  createdAt: string;
  updatedAt: string;
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

  const json: ApiResponse<Lesson[]> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
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

  const json: ApiResponse<Lesson> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    console.log(json);
    throw new Error(json.errors?.toString() ?? json.message);
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

  const json: ApiResponse<Lesson> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
  }

  return json.data;
};

export const deleteLesson = async (id: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json: ApiResponse<null> = await response.json();

  if (!json.success || !response.ok || !json.data) {
    throw new Error(json.errors?.toString() ?? json.message);
  }
};
