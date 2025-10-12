"use client";

import { File, fetchFiles } from "@/service/file-service";

export function FileItem({ file }: { file: File }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️";
      case "pdf":
        return "📄";
      case "video":
        return "🎬";
      default:
        return "📁";
    }
  };

  return (
    <div className="flex flex-col items-center rounded bg-white p-4 shadow hover:bg-gray-50">
      <div className="mb-2 text-4xl">{getIcon(file.type)}</div>
      <div className="mb-1 font-medium">{file.name}</div>
      <button className="text-sm text-blue-600 hover:underline">Open</button>
    </div>
  );
}
