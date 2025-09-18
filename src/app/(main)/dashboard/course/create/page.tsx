"use client";

import { CreateCourse } from "./_components/create-course";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <CreateCourse />
    </div>
  );
}
