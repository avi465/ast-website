"use client";

import { useQuery } from "@tanstack/react-query";

import { Course, fetchCourses } from "@/service/course-service";

import { DataTable } from "./_components/data-table";

export default function Page() {
  const response = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  return (
    response.data && (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <DataTable data={response.data} />
      </div>
    )
  );
}
