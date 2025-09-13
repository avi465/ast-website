"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { map } from "zod";

import { Course, fetchCourses } from "@/service/course-service";

import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";

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
