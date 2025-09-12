"use client";

import * as React from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DateTimePicker({ value, onChange, placeholder }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState(value ? format(value, "HH:mm") : "12:00");

  React.useEffect(() => {
    if (date) {
      const [hours, minutes] = time.split(":").map(Number);
      const updated = new Date(date);
      updated.setHours(hours);
      updated.setMinutes(minutes);
      onChange(updated);
    } else {
      onChange(undefined);
    }
  }, [date, time]);

  return (
    <div className="flex items-center gap-2">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-[200px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder ?? "Pick a date"}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      {/* Time Input */}
      <Input type="time" className="w-[120px]" value={time} onChange={(e) => setTime(e.target.value)} />
    </div>
  );
}
