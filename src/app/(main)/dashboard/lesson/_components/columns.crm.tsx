import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { lessonSchema } from "./schema";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { timeAgo } from "@/utils/formate-date";

export const recentLeadsColumns: ColumnDef<z.infer<typeof lessonSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => (
      <Button variant="link" className="text-foreground w-fit px-0 text-left">
        {row.original.title}
      </Button>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start" />,
    cell: ({ row }) => <Badge variant="outline">{row.original.startTime}</Badge>,
    enableSorting: false,
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End" />,
    cell: ({ row }) => <Badge variant="outline">{row.original.endTime}</Badge>,
    enableSorting: false,
  },
  {
    accessorKey: "lastActivity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Activity" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{timeAgo(row.original.updatedAt)}</span>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
        <EllipsisVertical />
        <span className="sr-only">Open menu</span>
      </Button>
    ),
    enableSorting: false,
  },
];
