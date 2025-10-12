"use client";

import { useQuery } from "@tanstack/react-query";

import { AddFile } from "./_components/add-file";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AddFile />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4"></div>
    </div>
  );
}
