"use client";

import * as React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Save, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export function AddFile() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedFile && selectedFile.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview((e.target?.result as string)?.slice(0, 100)); // First 100 chars
      };
      reader.readAsText(selectedFile);
    } else {
      setFilePreview(null);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <CardHeader>
        <CardTitle>Add File</CardTitle>
        <CardDescription>Upload and organize files for your course or content library.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/files/add")}>
              <Save />
              <span className="hidden lg:inline">Save</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="flex aspect-[3/1] w-full flex-1 items-center justify-center rounded-lg border border-dashed">
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm" asChild>
              <span className="flex cursor-pointer items-center gap-2">
                <Upload />
                <span>Choose File</span>
              </span>
            </Button>
          </label>
        </div>
        {selectedFile && (
          <div className="mt-2 flex items-center gap-3">
            {selectedFile.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded border object-cover"
              />
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Upload size={20} color="#6366F1" />
                  <span className="text-sm text-gray-600">{selectedFile.name}</span>
                </div>
                {filePreview && (
                  <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs text-gray-500">{filePreview}</pre>
                )}
              </div>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
