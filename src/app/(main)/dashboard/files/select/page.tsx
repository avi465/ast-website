"use client";

import { FileView } from "@/app/(main)/dashboard/files/_components/file-view";
import { Button } from "@/components/ui/button";
import { useFileSelect } from "@/context/file-select-context";

export default function Page() {
  const selectFile = useFileSelect();

  const handlePick = async () => {
    const file = await selectFile();
    if (file) {
      // Use the selected file
    }
  };

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <FileView />
      <div className={"flex items-center justify-center"}>
        <Button variant="outline" size="sm" type="button" onClick={handlePick}>
          Pick a File
        </Button>
      </div>
    </div>
  );
}
