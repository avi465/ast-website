"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Plus, FilePlus2 } from "lucide-react";
import { z } from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { recentLeadsColumns } from "./columns.crm";
import { recentLeadsData } from "./crm.config";
import { lessonSchema } from "./schema";

export function TableCards({ data: initialData }: { data: z.infer<typeof lessonSchema>[] }) {
  const [data, setData] = React.useState(() => initialData);
  const router = useRouter();
  const table = useDataTableInstance({
    data: data,
    columns: recentLeadsColumns,
    getRowId: (row) => row._id,
  });

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <CardHeader>
        <CardTitle>All lessons</CardTitle>
        <CardDescription>Manage your lessons and their status.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/lesson/create")}>
              <FilePlus2 />
              <span className="hidden lg:inline">New Lesson</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-md border">
          <DataTable table={table} columns={recentLeadsColumns} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
    </Tabs>
  );
}
