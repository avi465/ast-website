"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export function FileView() {
  const router = useRouter();

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <CardHeader>
        <CardTitle>All Files</CardTitle>
        <CardDescription>Track and manage your files.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            {/* <DataTableViewOptions table={table} />*/}
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/files/add")}>
              <Plus />
              <span className="hidden lg:inline">New File</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto"></TabsContent>
    </Tabs>
  );
}
