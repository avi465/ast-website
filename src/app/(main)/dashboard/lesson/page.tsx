"use client";

import { useQuery } from "@tanstack/react-query";

import { Lesson, fetchAllLesson } from "@/service/lesson-service";

import { TableCards } from "./_components/table-cards";

export default function Page() {
  const response = useQuery<Lesson[]>({
    queryKey: ["lessons"],
    queryFn: fetchAllLesson,
  });

  return (
    response.data && (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <TableCards data={response.data} />
      </div>
    )
  );
}
