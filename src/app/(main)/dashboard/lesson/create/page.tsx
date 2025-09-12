"use client";

import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";

import { LessonCard } from "./_components/lesson-cards";

import { Lesson, fetchAllLesson } from "@/service/lesson-service";

export default function Page() {
  const response = useQuery<Lesson[]>({
    queryKey: ["lessons"],
    queryFn: fetchAllLesson,
  });

  return (
    response.data && (
      <div className="flex flex-col gap-4 md:gap-6">
        <LessonCard />
      </div>
    )
  );
}
