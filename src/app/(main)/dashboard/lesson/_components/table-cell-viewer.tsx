import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

import { lessonSchema } from "./schema";

export function TableCellViewer({ item }: { item: z.infer<typeof lessonSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.title}</DrawerTitle>
          <DrawerDescription>{item.description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Server</Label>
              <Input
                id="header"
                readOnly={true}
                defaultValue={`rtmp://${process.env.NEXT_PUBLIC_RTMP_SERVER_URL}/live`}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Stream Key</Label>
              <Input id="header" readOnly={true} defaultValue={item.stream?.streamKey} />
            </div>
            {/* <div className="grid grid-cols-2 gap-4">*/}
            {/*  <div className="flex flex-col gap-3">*/}
            {/*    <Label htmlFor="type">Type</Label>*/}
            {/*    <Select defaultValue={item.type}>*/}
            {/*      <SelectTrigger id="type" className="w-full">*/}
            {/*        <SelectValue placeholder="Select a type" />*/}
            {/*      </SelectTrigger>*/}
            {/*      <SelectContent>*/}
            {/*        <SelectItem value="Table of Contents">Table of Contents</SelectItem>*/}
            {/*        <SelectItem value="Executive Summary">Executive Summary</SelectItem>*/}
            {/*      </SelectContent>*/}
            {/*    </Select>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col gap-3">*/}
            {/*    <Label htmlFor="status">Status</Label>*/}
            {/*    <Select defaultValue={item.status}>*/}
            {/*      <SelectTrigger id="status" className="w-full">*/}
            {/*        <SelectValue placeholder="Select a status" />*/}
            {/*      </SelectTrigger>*/}
            {/*      <SelectContent>*/}
            {/*        <SelectItem value="Done">Done</SelectItem>*/}
            {/*        <SelectItem value="In Progress">In Progress</SelectItem>*/}
            {/*        <SelectItem value="Not Started">Not Started</SelectItem>*/}
            {/*      </SelectContent>*/}
            {/*    </Select>*/}
            {/*  </div>*/}
            {/* </div>*/}
            {/* <div className="grid grid-cols-2 gap-4">*/}
            {/*  <div className="flex flex-col gap-3">*/}
            {/*    <Label htmlFor="target">Vide Url</Label>*/}
            {/*    <Input id="target" defaultValue={item.videoUrl} />*/}
            {/*  </div>*/}
            {/*   <div className="flex flex-col gap-3">*/}
            {/*    <Label htmlFor="limit">Limit</Label>*/}
            {/*    <Input id="limit" defaultValue={item.limit} />*/}
            {/*   </div>*/}
            {/* </div>*/}
            {/* <div className="flex flex-col gap-3">*/}
            {/*  <Label htmlFor="reviewer">Reviewer</Label>*/}
            {/*  <Select defaultValue={item.reviewer}>*/}
            {/*    <SelectTrigger id="reviewer" className="w-full">*/}
            {/*      <SelectValue placeholder="Select a reviewer" />*/}
            {/*    </SelectTrigger>*/}
            {/*    <SelectContent>*/}
            {/*      <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>*/}
            {/*      <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>*/}
            {/*      <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>*/}
            {/*    </SelectContent>*/}
            {/*  </Select>*/}
            {/* </div>*/}
          </form>
        </div>
        <DrawerFooter>
          <Button disabled={true}>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={true}>
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
