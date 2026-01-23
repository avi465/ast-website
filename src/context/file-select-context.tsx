"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type File = {
  id: string;
  name: string;
  type: "image" | "doc";
};

const dummyFiles: File[] = [
  { id: "1", name: "Photo.png", type: "image" },
  { id: "2", name: "Resume.pdf", type: "doc" },
  { id: "3", name: "Logo.jpg", type: "image" },
  { id: "4", name: "Report.docx", type: "doc" },
];

type FileSelectContextType = {
  selectFile: () => Promise<File | null>;
};

const FileSelectContext = createContext<FileSelectContextType | undefined>(undefined);

export const FileSelectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [resolver, setResolver] = useState<((file: File | null) => void) | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectFile = useCallback(() => {
    setOpen(true);
    setFiles(dummyFiles);
    setSelectedId(null);
    return new Promise<File | null>((resolve) => setResolver(() => resolve));
  }, []);

  const handleSelect = (file: File) => {
    setSelectedId(file.id);
    setTimeout(() => {
      resolver?.(file);
      setOpen(false);
      setResolver(null);
    }, 150); // slight delay for selection effect
  };

  const handleClose = () => {
    resolver?.(null);
    setOpen(false);
    setResolver(null);
    setSelectedId(null);
  };

  const contextValue = useMemo(() => ({ selectFile }), [selectFile]);

  return (
    <FileSelectContext.Provider value={contextValue}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>File Manager</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-6 py-4">
            {files.map((file) => (
              <Card
                key={file.id}
                className={`cursor-pointer border-2 transition ${
                  selectedId === file.id
                    ? "border-primary bg-primary/10"
                    : "border-muted hover:border-primary/60 hover:bg-muted"
                }`}
                onClick={() => handleSelect(file)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(file);
                }}
                aria-selected={selectedId === file.id}
                role="option"
              >
                <CardContent className="flex flex-col items-center gap-3 py-6">
                  <span className="text-4xl">{file.type === "image" ? "🖼️" : "📄"}</span>
                  <span className="text-muted-foreground w-32 truncate text-center text-sm font-medium">
                    {file.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="mt-2 w-full" onClick={handleClose}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </FileSelectContext.Provider>
  );
};

export const useFileSelect = () => {
  const ctx = useContext(FileSelectContext);
  if (!ctx) throw new Error("useFileSelect must be used within FileSelectProvider");
  return ctx.selectFile;
};
