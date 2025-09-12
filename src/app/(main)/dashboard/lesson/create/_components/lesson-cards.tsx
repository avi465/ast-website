"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Save, Radio, Archive } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { DateTimePicker } from "./date-time-picker";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createLesson, Lesson } from "@/service/lesson-service";
import { createStream } from "@/service/stream-service";

const lessonSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description is too short"),
    startTime: z.date({ required_error: "Start time is required" }),
    endTime: z.date({ required_error: "End time is required" }),
    type: z.enum(["live", "recorded"]),
    videoUrl: z.string().url("Must be valid URL").optional(),
    module: z.string(),
    instructor: z.string().optional(),
  })
  .refine((data) => data.startTime > new Date(), {
    path: ["startTime"],
    message: "Start time must be in the future",
  })
  .refine((data) => data.endTime > data.startTime, {
    path: ["endTime"],
    message: "End time must be after start time",
  });

type LessonForm = z.infer<typeof lessonSchema>;

export function LessonCard() {
  const form = useForm<LessonForm>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: undefined,
      endTime: undefined,
      type: "live",
      videoUrl: "",
      module: "",
    },
  });

  const [loading, setLoading] = React.useState(false);
  const [streamUrl, setStreamUrl] = React.useState<string | null>(null);

  const createLessonMutation = useMutation({
    mutationFn: (lesson: Partial<LessonForm>) =>
      createLesson({
        ...lesson,
        startTime: lesson.startTime?.toISOString(),
        endTime: lesson.endTime?.toISOString(),
      }),
    onError: (error: any) => {
      toast.error(error.message ?? "Failed to create lesson");
    },
  });

  const createStreamMutation = useMutation({
    mutationFn: (lessonId: string) => createStream(lessonId),
    onError: (error: any) => {
      toast.error(error.message ?? "Failed to create stream");
    },
  });

  async function onSubmit(values: LessonForm, action: "save" | "stream" | "draft") {
    try {
      setLoading(true);

      const lesson = await createLessonMutation.mutateAsync(values);

      if (action === "stream" || values.type === "live") {
        const stream = await createStreamMutation.mutateAsync(lesson._id);
        setStreamUrl(`http://localhost:8000/live/${stream.streamKey}/index.m3u8`);
        toast.success("Stream created! Use the URL in OBS.");
      } else if (action === "save") {
        toast.success("Lesson saved successfully!");
      } else if (action === "draft") {
        toast.success("Lesson saved as draft!");
      }

      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isRecorded = form.watch("type") === "recorded";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Lesson</CardTitle>
        <CardDescription>Fill in the details and configure streaming.</CardDescription>
        <CardAction className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => form.handleSubmit((values) => onSubmit(values, isRecorded ? "save" : "stream"))()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isRecorded ? (
              <>
                <Save className="mr-1 h-4 w-4" />
                Save
              </>
            ) : (
              <>
                <Radio className="mr-1 h-4 w-4" />
                Start Stream
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => form.handleSubmit((values) => onSubmit(values, "draft"))()}
            disabled={loading}
          >
            <Archive className="mr-1 h-4 w-4" />
            Save as Draft
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Lesson Details Card */}
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Lesson Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => onSubmit(values, "stream"))}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2"
              >
                {/* Left side */}
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lesson Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter lesson title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea rows={4} placeholder="Enter lesson description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select start date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Select end date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="module"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module</FormLabel>
                        <FormControl>
                          <Input placeholder="Please select module" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor</FormLabel>
                        <FormControl>
                          <Input placeholder="Instructor name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right side */}
                <div className="flex flex-col gap-6">
                  {/* Switch for type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <FormLabel>Recorded Lesson</FormLabel>
                          <p className="text-muted-foreground text-sm">Toggle between live and recorded</p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "recorded"}
                            onCheckedChange={(checked) => field.onChange(checked ? "recorded" : "live")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {isRecorded && (
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/video" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Streaming Details Card */}
        {streamUrl && (
          <Card className="border shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Streaming Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/40 rounded-md border p-4">
                <p className="text-muted-foreground mb-1 text-sm">OBS Stream URL</p>
                <code className="block text-sm break-all">{streamUrl}</code>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
