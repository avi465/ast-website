"use client";

import { useQuery } from "@tanstack/react-query";

import { FileItem } from "@/app/(main)/dashboard/files/_components/file-item";
import { FileView } from "@/app/(main)/dashboard/files/_components/file-view";
import { File, fetchFiles } from "@/service/file-service";

export default function Page() {
  const response = useQuery<File[] | null>({
    queryKey: ["files"],
    queryFn: fetchFiles,
  });

  // if (response.isLoading) return <div>Loading files...</div>;
  // if (response.isError) return <div>Error loading files.</div>;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <FileView />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {response.data?.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
