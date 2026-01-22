"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Save, Radio, Archive } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fetchCourses, Course } from "@/service/course-service";
import { createLesson, Lesson } from "@/service/lesson-service";
import { fetchModulesByCourse, Module } from "@/service/module-service";
import { createStream } from "@/service/stream-service";

import { DateTimePicker } from "./date-time-picker";

const lessonSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Description is too short"),
    startTime: z.date({ required_error: "Start time is required" }),
    endTime: z.date({ required_error: "End time is required" }),
    type: z.enum(["live", "recorded"]),
    videoUrl: z.string().url("Must be valid URL").optional(),
    module: z.string().optional(),
    course: z.string().optional(),
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
  const router = useRouter();

  const form = useForm<LessonForm>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: undefined,
      endTime: undefined,
      type: "live",
      videoUrl: undefined,
      module: "",
    },
  });

  const [onSaveLoading, setOnSaveLoading] = React.useState(false);
  const [onStartStreamLoading, setOnStartStreamLoading] = React.useState(false);
  const [onSaveAsDraftLoading, setOnSaveAsDraftLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [serverUrl, setServerUrl] = React.useState<string | null>(null);
  const [streamKey, setStreamKey] = React.useState<string | null>(null);

  // Fetch courses
  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // Watch selected course
  const selectedCourse = form.watch("course");

  React.useEffect(() => {
    // When course changes, reset module
    form.setValue("module", undefined, { shouldValidate: true });
  }, [selectedCourse, form]);

  // Fetch modules for selected course
  const { data: modules = [], isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: ["modules", selectedCourse],
    queryFn: () => (selectedCourse ? fetchModulesByCourse(selectedCourse) : Promise.resolve([])),
    enabled: !!selectedCourse,
  });

  const instructors = [
    { id: "inst1", name: "Instructor 1" },
    { id: "inst2", name: "Instructor 2" },
  ];

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

  async function onSave(values: LessonForm) {
    try {
      setOnSaveLoading(true);
      await createLessonMutation.mutateAsync(values);
      toast.success("Lesson saved successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setOnSaveLoading(false);
    }
  }

  async function onStartStream(values: LessonForm) {
    try {
      setOnStartStreamLoading(true);
      const lesson = await createLessonMutation.mutateAsync(values);
      const stream = await createStreamMutation.mutateAsync(lesson._id);
      setServerUrl(`rtmp://${process.env.NEXT_PUBLIC_RTMP_SERVER_URL}/live`);
      setStreamKey(`${stream.streamKey}`);
      toast.success("Stream created! Set up OBS with the details.");

      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setOnStartStreamLoading(false);
    }
  }

  async function onSaveAsDraft(values: LessonForm) {
    try {
      setOnSaveAsDraftLoading(true);
      await createLessonMutation.mutateAsync(values);
      toast.success("Lesson saved as draft!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setOnSaveAsDraftLoading(false);
    }
  }

  const isRecorded = form.watch("type") === "recorded";

  return (
    <>
      <CardHeader>
        <CardTitle>Create Lesson</CardTitle>
        <CardDescription>Fill in the details and configure streaming.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={
                () =>
                  form.handleSubmit((values) => {
                    const type = form.getValues("type");
                    if (type === "recorded") {
                      onSave(values);
                    } else {
                      onStartStream(values);
                    }
                  })() // <-- call the returned function
              }
              disabled={onSaveLoading || onStartStreamLoading}
            >
              {onSaveLoading || onStartStreamLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isRecorded ? (
                <>
                  <Save className="mr-1 h-4 w-4" />
                  Save
                </>
              ) : (
                <>
                  <Radio />
                  <span className="hidden lg:inline">Start Stream</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => form.handleSubmit(onSaveAsDraft)()}
              disabled={onSaveAsDraftLoading}
            >
              {onSaveAsDraftLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Archive />
                  <span className="hidden lg:inline">Save as Draft</span>
                </>
              )}
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="border shadow-none lg:col-span-2">
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                {/* Lesson Details Section */}
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

                {/* Description */}
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

                {/* Start Time */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <DateTimePicker value={field.value} onChange={field.onChange} placeholder="Select start date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Time */}
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

                {/* Course & Instructor Section */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Course Select */}
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange} disabled={coursesLoading}>
                          <FormControl>
                            <SelectTrigger className="w-full truncate">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                            {courses.map((course) => (
                              <SelectItem key={course._id} value={course._id}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Module Select */}
                  <FormField
                    control={form.control}
                    name="module"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module</FormLabel>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                          disabled={!selectedCourse || modulesLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full truncate">
                              <SelectValue placeholder="Select module" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                            {modules.map((mod) => (
                              <SelectItem key={mod._id} value={mod._id}>
                                {mod.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Instructor Select */}
                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange} disabled={true}>
                          <FormControl>
                            <SelectTrigger className="w-full truncate">
                              <SelectValue placeholder="Select instructor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                            {instructors.map((inst) => (
                              <SelectItem key={inst.id} value={inst.id}>
                                {inst.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Lesson Type Section */}
                <div className="space-y-6">
                  {/* Type Switch */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-md border p-4">
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

                  {/* Video URL if recorded */}
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

          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                form.reset();
                router.push("/dashboard/lesson");
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={() => form.handleSubmit(onSave)()} disabled={!isRecorded || onSaveLoading}>
              {onSaveLoading || onStartStreamLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="mr-1 h-4 w-4" />
                  Save Lesson
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* OBS Setup Guide */}
        <Card className="hidden border shadow-none lg:block">
          <CardHeader>
            <CardTitle className="text-base">How to Start Streaming with OBS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1 - Server URL */}
            <div className="bg-muted/40 rounded-md border p-4">
              <p className="text-sm font-medium">1. Server (OBS Stream URL)</p>
              <code className="mt-1 block text-sm break-all">{serverUrl}</code>
              <p className="text-muted-foreground mt-1 text-xs">
                Copy this and paste it in OBS under <strong>Settings → Stream → Server</strong>.
              </p>
            </div>

            {/* Step 2 - Stream Key */}
            <div className="bg-muted/40 rounded-md border p-4">
              <p className="text-sm font-medium">2. Stream Key</p>
              <code className="mt-1 block text-sm break-all">
                {streamKey ?? "Your unique stream key will appear here"}
              </code>
              <p className="text-muted-foreground mt-1 text-xs">
                Paste this in OBS under <strong>Settings → Stream → Stream Key</strong>. Never share this key with
                anyone!
              </p>
            </div>

            {/* Step 3 - OBS Setup Tips */}
            <div className="bg-muted/40 space-y-2 rounded-md border p-4">
              <p className="text-sm font-medium">3. OBS Setup Tips</p>
              <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                <li>
                  Open OBS and go to <strong>Settings → Stream</strong>.
                </li>
                <li>
                  Set <strong>Service</strong> to <code>Custom</code>.
                </li>
                <li>
                  Paste the <strong>Server URL</strong> and <strong>Stream Key</strong> provided above.
                </li>
                <li>
                  Click <strong>Apply</strong> and then <strong>Start Streaming</strong>.
                </li>
              </ul>
            </div>

            {/* Step 4 - Verify */}
            <div className="bg-muted/40 rounded-md border p-4">
              <p className="text-sm font-medium">4. Verify Stream</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Once streaming starts, come back here and refresh to see your live stream status.
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </>
  );
}
