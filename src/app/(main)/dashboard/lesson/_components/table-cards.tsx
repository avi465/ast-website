"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Plus, FilePlus2 } from "lucide-react";
import { z } from "zod";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
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
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
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
        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-md border">
            <DataTable table={table} columns={recentLeadsColumns} />
          </div>
          <DataTablePagination table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
